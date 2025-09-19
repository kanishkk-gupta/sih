const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_me';
const CORS_ORIGIN = process.env.CORS_ORIGIN || process.env.ORIGIN || true;
const NODE_ENV = process.env.NODE_ENV || 'development';
const COOKIE_SECURE = String(process.env.COOKIE_SECURE || '').toLowerCase() === 'true' || NODE_ENV === 'production';
const COOKIE_SAMESITE = process.env.COOKIE_SAMESITE || (COOKIE_SECURE ? 'none' : 'lax');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDw5juGWmyFUuEJWqAhnjnEjVesLuONwVM';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Schemas
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	role: { type: String, enum: ['student', 'admin', 'mentor', 'recruiter'], required: true },
	profile: {
		department: String,
		year: String,
		skills: [String],
		projects: [{
			title: String,
			description: String,
			technologies: [String],
			duration: String
		}],
		certifications: [String],
		coverLetter: String,
		cgpa: Number,
		phone: String,
		dateOfBirth: Date,
		experience: [{
			company: String,
			position: String,
			startDate: Date,
			endDate: Date,
			description: String,
			current: Boolean
		}],
		education: [{
			institution: String,
			degree: String,
			field: String,
			startDate: Date,
			endDate: Date,
			cgpa: Number,
			current: Boolean
		}],
		resumeParsed: { type: Boolean, default: false },
		resumeFile: String
	}
}, { timestamps: true });

const jobSchema = new mongoose.Schema({
	title: { type: String, required: true },
	company: { type: String, required: true },
	type: { type: String, default: 'Full-time' },
	location: String,
	salary: String,
	deadline: Date,
	requirements: [String],
	status: { type: String, default: 'Open' }
}, { timestamps: true });

const applicationSchema = new mongoose.Schema({
	studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
	status: { type: String, enum: ['Applied', 'Under Review', 'Interview Scheduled', 'Offer Received', 'Rejected'], default: 'Applied' }
}, { timestamps: true });

const certificateSchema = new mongoose.Schema({
	studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	title: String,
	issuer: String,
	issuedAt: Date,
	url: String
}, { timestamps: true });

const peerPostSchema = new mongoose.Schema({
	title: { type: String, required: true },
	company: { type: String, required: true },
	description: String,
	tags: [String],
	contactInfo: String,
	tips: String,
	postedBy: {
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		name: String,
		email: String
	}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Job = mongoose.model('Job', jobSchema);
const Application = mongoose.model('Application', applicationSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
const PeerPost = mongoose.model('PeerPost', peerPostSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, 'resume-' + uniqueSuffix + '.pdf');
	}
});

const upload = multer({ 
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'application/pdf') {
			cb(null, true);
		} else {
			cb(new Error('Only PDF files are allowed'), false);
		}
	},
	limits: {
		fileSize: 5 * 1024 * 1024 // 5MB limit
	}
});

// Resume parsing function using Gemini AI
async function parseResumeWithGemini(pdfText) {
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		
		const prompt = `
		Please extract the following information from this resume text and return it as a JSON object:
		
		{
			"name": "Full name",
			"email": "Email address",
			"phone": "Phone number",
			"dateOfBirth": "Date of birth (YYYY-MM-DD format or null if not found)",
			"cgpa": "CGPA as a number (or null if not found)",
			"skills": ["skill1", "skill2", "skill3"],
			"projects": [
				{
					"title": "Project title",
					"description": "Project description",
					"technologies": ["tech1", "tech2"],
					"duration": "Project duration"
				}
			],
			"experience": [
				{
					"company": "Company name",
					"position": "Job title",
					"startDate": "Start date (YYYY-MM-DD format)",
					"endDate": "End date (YYYY-MM-DD format or null if current)",
					"description": "Job description",
					"current": true/false
				}
			],
			"education": [
				{
					"institution": "Institution name",
					"degree": "Degree name",
					"field": "Field of study",
					"startDate": "Start date (YYYY-MM-DD format)",
					"endDate": "End date (YYYY-MM-DD format or null if current)",
					"cgpa": "CGPA as a number (or null if not found)",
					"current": true/false
				}
			]
		}
		
		Resume text:
		${pdfText}
		
		Please return only the JSON object, no additional text.
		`;
		
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		
		// Clean up the response to extract JSON
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			const parsedData = JSON.parse(jsonMatch[0]);
			
			// Validate and clean the data
			return {
				name: parsedData.name || null,
				email: parsedData.email || null,
				phone: parsedData.phone || null,
				dateOfBirth: parsedData.dateOfBirth || null,
				cgpa: parsedData.cgpa || null,
				skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
				projects: Array.isArray(parsedData.projects) ? parsedData.projects : [],
				experience: Array.isArray(parsedData.experience) ? parsedData.experience : [],
				education: Array.isArray(parsedData.education) ? parsedData.education : []
			};
		}
		throw new Error('No valid JSON found in response');
	} catch (error) {
		console.error('Error parsing resume with Gemini:', error);
		throw new Error('Failed to parse resume');
	}
}

// App
const app = express();
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// RBAC helpers
function requireAuth(req, res, next) {
	const authHeader = req.headers.authorization;
	const cookieToken = req.cookies?.token;
	const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : cookieToken;
	if (!token) return res.status(401).json({ message: 'Unauthorized' });
	try {
		req.user = jwt.verify(token, JWT_SECRET);
		return next();
	} catch {
		return res.status(401).json({ message: 'Invalid token' });
	}
}

function requireRole(...roles) {
	return (req, res, next) => {
		if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
		if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
		next();
	};
}

// Seed demo users in code (Mongo only)
async function seedDemoUsers() {
    // Seed only when the users collection is empty
    const existing = await User.estimatedDocumentCount();
    if (existing > 0) return;

    const defaults = [
        { name: 'Admin User', email: 'admin@demo.com', password: 'demo123', role: 'admin' },
        { name: 'John Doe', email: 'student@demo.com', password: 'demo123', role: 'student' },
        { name: 'Anurag', email: 'anurag@demo.com', password: 'demo123', role: 'student' },
        { name: 'Shreshth', email: 'shreshth@demo.com', password: 'demo123', role: 'student' },
        { name: 'Kanishk', email: 'kanishk@demo.com', password: 'demo123', role: 'student' },
        { name: 'Dr. Sarah Wilson', email: 'mentor@demo.com', password: 'demo123', role: 'mentor' },
        { name: 'Recruiter Name', email: 'recruiter@demo.com', password: 'demo123', role: 'recruiter' }
    ];
    await User.insertMany(defaults.map(u => ({
        name: u.name,
        email: u.email,
        passwordHash: bcrypt.hashSync(u.password, 10),
        role: u.role
    })));
}

// Auth
app.post('/api/auth/login', async (req, res) => {
	const { email, password } = req.body || {};
	if (!email || !password) return res.status(400).json({ message: 'email and password required' });
	const user = await User.findOne({ email });
	if (!user) return res.status(401).json({ message: 'Invalid credentials' });
	const ok = bcrypt.compareSync(password, user.passwordHash);
	if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, sameSite: COOKIE_SAMESITE, secure: COOKIE_SECURE });
	res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/logout', (req, res) => {
	res.clearCookie('token');
	res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
	res.json({ user: req.user });
});

// Students (admin/mentor)
app.get('/api/students', requireAuth, requireRole('admin', 'mentor'), async (req, res) => {
	const students = await User.find({ role: 'student' }).lean();
	const mapped = students.map((s) => ({
		id: String(s._id),
		name: s.name,
		email: s.email,
		department: s.profile?.department || 'Unknown',
		year: s.profile?.year || '',
		cgpa: s.profile?.cgpa || 0,
		skills: s.profile?.skills || [],
		offers: s.profile?.offersCount || 0,
		applications: s.profile?.applicationsCount || 0
	}));
	res.json(mapped);
});

// Jobs
app.get('/api/jobs', requireAuth, async (req, res) => {
	const jobs = await Job.find().sort({ createdAt: -1 }).lean();
	res.json(jobs);
});
app.post('/api/jobs', requireAuth, requireRole('admin', 'recruiter'), async (req, res) => {
	try { const job = await Job.create(req.body); return res.status(201).json(job); } catch (e) { return res.status(400).json({ message: 'Invalid job data' }); }
});
app.put('/api/jobs/:id', requireAuth, requireRole('admin', 'recruiter'), async (req, res) => {
	try { const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true }); return res.json(job); } catch { return res.status(400).json({ message: 'Update failed' }); }
});
app.delete('/api/jobs/:id', requireAuth, requireRole('admin', 'recruiter'), async (req, res) => {
	await Job.findByIdAndDelete(req.params.id); res.json({ ok: true });
});

// Opportunities (admin)
const opportunitySchema = new mongoose.Schema({
	title: { type: String, required: true },
	company: { type: String, required: true },
	type: { type: String, default: 'Internship' },
	category: String,
	location: String,
	duration: String,
	stipend: String,
	description: String,
	requirements: [String],
	benefits: [String],
	departments: [String],
	applicationDeadline: Date,
	startDate: Date,
	status: { type: String, default: 'Active' },
	applications: { type: Number, default: 0 },
	postedDate: { type: Date, default: Date.now }
}, { timestamps: true });
const Opportunity = mongoose.model('Opportunity', opportunitySchema);

app.get('/api/opportunities', requireAuth, requireRole('admin'), async (req, res) => {
	const list = await Opportunity.find().sort({ createdAt: -1 }).lean();
	res.json(list);
});
app.post('/api/opportunities', requireAuth, requireRole('admin'), async (req, res) => {
	try { const doc = await Opportunity.create(req.body); return res.status(201).json(doc); } catch { return res.status(400).json({ message: 'Invalid opportunity data' }); }
});
app.put('/api/opportunities/:id', requireAuth, requireRole('admin'), async (req, res) => {
	try { const doc = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true }); return res.json(doc); } catch { return res.status(400).json({ message: 'Update failed' }); }
});
app.delete('/api/opportunities/:id', requireAuth, requireRole('admin'), async (req, res) => {
	await Opportunity.findByIdAndDelete(req.params.id); res.json({ ok: true });
});

// Applications
app.get('/api/applications', requireAuth, async (req, res) => {
	const query = req.user.role === 'student' ? { studentId: req.user.id } : {};
	const apps = await Application.find(query).sort({ createdAt: -1 }).lean();
	res.json(apps);
});
app.post('/api/applications', requireAuth, requireRole('student'), async (req, res) => {
	const { jobId } = req.body || {};
	if (!jobId) return res.status(400).json({ message: 'jobId required' });
	const appDoc = await Application.create({ studentId: req.user.id, jobId });
	res.status(201).json(appDoc);
});

// Certificates
app.get('/api/certificates', requireAuth, async (req, res) => {
	const query = req.user.role === 'student' ? { studentId: req.user.id } : {};
	const list = await Certificate.find(query).sort({ createdAt: -1 }).lean();
	res.json(list);
});
app.post('/api/certificates', requireAuth, requireRole('admin', 'mentor'), async (req, res) => {
	try { const doc = await Certificate.create(req.body); return res.status(201).json(doc); } catch { return res.status(400).json({ message: 'Invalid certificate data' }); }
});

// Peer posts
app.get('/api/peer-posts', requireAuth, async (req, res) => {
    const list = await PeerPost.find().sort({ createdAt: -1 }).lean();
    // include convenient id alias for frontend
    const mapped = list.map(p => ({ ...p, id: String(p._id) }));
    res.json(mapped);
});
app.post('/api/peer-posts', requireAuth, requireRole('student', 'admin'), async (req, res) => {
	const body = req.body || {};
	const post = await PeerPost.create({
		title: body.title,
		company: body.company,
		description: body.description,
		tags: Array.isArray(body.tags) ? body.tags : [],
		contactInfo: body.contactInfo,
		tips: body.tips,
		postedBy: { userId: req.user.id, name: req.user.name, email: req.user.email }
	});
    const json = post.toJSON();
    res.status(201).json({ ...json, id: String(json._id) });
});
app.put('/api/peer-posts/:id', requireAuth, async (req, res) => {
    const post = await PeerPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    const isOwner = String(post.postedBy?.userId) === String(req.user.id);
    if (!(isOwner || req.user.role === 'admin')) return res.status(403).json({ message: 'Forbidden' });
    const body = req.body || {};
    post.title = body.title ?? post.title;
    post.company = body.company ?? post.company;
    post.description = body.description ?? post.description;
    post.tags = Array.isArray(body.tags) ? body.tags : post.tags;
    post.contactInfo = body.contactInfo ?? post.contactInfo;
    post.tips = body.tips ?? post.tips;
    await post.save();
    const json = post.toJSON();
    res.json({ ...json, id: String(json._id) });
});
app.delete('/api/peer-posts/:id', requireAuth, async (req, res) => {
	const post = await PeerPost.findById(req.params.id);
	if (!post) return res.status(404).json({ message: 'Not found' });
	const isOwner = String(post.postedBy?.userId) === String(req.user.id);
	if (!(isOwner || req.user.role === 'admin')) return res.status(403).json({ message: 'Forbidden' });
	await PeerPost.findByIdAndDelete(req.params.id);
	res.json({ ok: true });
});

// Notifications (stub)
app.post('/api/notify', requireAuth, requireRole('admin', 'mentor', 'recruiter'), async (req, res) => {
	// Integrate Email/SMS gateway here
	res.json({ ok: true });
});

// Resume upload and parsing
app.post('/api/resume/upload', requireAuth, requireRole('student'), upload.single('resume'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}

		// Parse PDF text
		const pdfBuffer = req.file.buffer || require('fs').readFileSync(req.file.path);
		const pdfData = await pdfParse(pdfBuffer);
		const pdfText = pdfData.text;

		// Parse resume with Gemini AI
		const parsedData = await parseResumeWithGemini(pdfText);

		// Update user profile with parsed data
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Update profile with parsed data
		user.profile = {
			...user.profile,
			name: parsedData.name || user.name,
			email: parsedData.email || user.email,
			phone: parsedData.phone || user.profile?.phone,
			dateOfBirth: parsedData.dateOfBirth ? new Date(parsedData.dateOfBirth) : user.profile?.dateOfBirth,
			cgpa: parsedData.cgpa || user.profile?.cgpa,
			skills: Array.isArray(parsedData.skills) ? parsedData.skills : (user.profile?.skills || []),
			projects: Array.isArray(parsedData.projects) ? parsedData.projects : (user.profile?.projects || []),
			experience: Array.isArray(parsedData.experience) ? parsedData.experience : (user.profile?.experience || []),
			education: Array.isArray(parsedData.education) ? parsedData.education : (user.profile?.education || []),
			resumeParsed: true,
			resumeFile: req.file.filename
		};

		await user.save();

		res.json({
			message: 'Resume uploaded and parsed successfully',
			parsedData: parsedData,
			profile: user.profile
		});
	} catch (error) {
		console.error('Resume upload error:', error);
		res.status(500).json({ message: 'Failed to process resume: ' + error.message });
	}
});

// Get user profile
app.get('/api/profile', requireAuth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-passwordHash');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json({ user });
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch profile' });
	}
});

// Update user profile
app.put('/api/profile', requireAuth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const { name, email, phone, dateOfBirth, cgpa, skills, projects, experience, education, department, year } = req.body;

		// Update basic info
		if (name) user.name = name;
		if (email) user.email = email;

		// Update profile
		user.profile = {
			...user.profile,
			phone: phone || user.profile?.phone,
			dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : user.profile?.dateOfBirth,
			cgpa: cgpa || user.profile?.cgpa,
			skills: skills || user.profile?.skills || [],
			projects: projects || user.profile?.projects || [],
			experience: experience || user.profile?.experience || [],
			education: education || user.profile?.education || [],
			department: department || user.profile?.department,
			year: year || user.profile?.year
		};

		await user.save();
		res.json({ message: 'Profile updated successfully', profile: user.profile });
	} catch (error) {
		res.status(500).json({ message: 'Failed to update profile' });
	}
});

// Fallback function for consistent career guidance
function generateFallbackGuidance(user, overallScore, overallStatus, skillsCount, projectsCount, experienceCount, cgpa) {
	const strengths = [];
	const improvements = [];
	const careerPaths = [];
	const nextSteps = [];
	const skillGaps = [];
	
	// Generate strengths based on actual data
	if (skillsCount >= 5) {
		strengths.push({
			title: "Technical Skills",
			description: `You have ${skillsCount} technical skills listed`,
			status: "excellent"
		});
	} else if (skillsCount >= 3) {
		strengths.push({
			title: "Technical Skills",
			description: `You have ${skillsCount} technical skills listed`,
			status: "good"
		});
	}
	
	if (projectsCount >= 3) {
		strengths.push({
			title: "Project Experience",
			description: `You have completed ${projectsCount} projects`,
			status: "good"
		});
	}
	
	if (experienceCount >= 1) {
		strengths.push({
			title: "Work Experience",
			description: `You have ${experienceCount} work experience(s)`,
			status: "good"
		});
	}
	
	if (cgpa >= 8.0) {
		strengths.push({
			title: "Academic Performance",
			description: `Strong CGPA of ${cgpa}`,
			status: "excellent"
		});
	}
	
	strengths.push({
		title: "Profile Completeness",
		description: "Your profile has been populated with resume data",
		status: "good"
	});
	
	// Generate improvements based on gaps
	if (skillsCount < 5) {
		improvements.push({
			title: "Expand Technical Skills",
			description: "Add more technical skills to your profile",
			priority: "high",
			action: "Learn 2-3 new technologies and add them"
		});
	}
	
	if (projectsCount < 3) {
		improvements.push({
			title: "Build More Projects",
			description: "Create additional projects to showcase your skills",
			priority: "high",
			action: "Complete 2-3 more projects in your field"
		});
	}
	
	if (experienceCount === 0) {
		improvements.push({
			title: "Gain Work Experience",
			description: "Look for internships or freelance opportunities",
			priority: "high",
			action: "Apply for internships or start freelancing"
		});
	}
	
	if (cgpa < 7.0 && cgpa > 0) {
		improvements.push({
			title: "Improve Academic Performance",
			description: "Focus on improving your CGPA",
			priority: "medium",
			action: "Study harder and aim for better grades"
		});
	}
	
	improvements.push({
		title: "Profile Optimization",
		description: "Keep your profile updated with latest achievements",
		priority: "medium",
		action: "Regularly update your profile with new skills and projects"
	});
	
	// Generate career paths with calculated match percentages
	careerPaths.push({
		title: "Software Developer",
		match: Math.min(95, 60 + (skillsCount * 3) + (projectsCount * 5)),
		description: "Based on your technical skills and projects"
	});
	
	careerPaths.push({
		title: "Data Analyst",
		match: Math.min(90, 50 + (skillsCount * 2) + (projectsCount * 3)),
		description: "If you have data-related skills and projects"
	});
	
	careerPaths.push({
		title: "Full Stack Developer",
		match: Math.min(85, 45 + (skillsCount * 2) + (projectsCount * 4)),
		description: "For students with web development skills"
	});
	
	// Generate next steps
	if (skillsCount < 5) {
		nextSteps.push({
			action: "Learn 2-3 new technologies",
			timeline: "1-2 months",
			priority: "high"
		});
	}
	
	if (projectsCount < 3) {
		nextSteps.push({
			action: "Complete 2 more projects",
			timeline: "1 month",
			priority: "high"
		});
	}
	
	if (experienceCount === 0) {
		nextSteps.push({
			action: "Apply for internships",
			timeline: "2-3 months",
			priority: "high"
		});
	}
	
	nextSteps.push(
		{
			action: "Update LinkedIn profile",
			timeline: "1 week",
			priority: "medium"
		},
		{
			action: "Prepare for technical interviews",
			timeline: "2 weeks",
			priority: "medium"
		}
	);
	
	// Generate skill gaps
	if (skillsCount < 5) {
		skillGaps.push({
			skill: "Additional Programming Languages",
			importance: "high",
			resources: ["FreeCodeCamp", "Codecademy", "YouTube tutorials"]
		});
	}
	
	if (projectsCount < 3) {
		skillGaps.push({
			skill: "Project Development",
			importance: "high",
			resources: ["GitHub", "Build real-world applications", "Follow tutorials"]
		});
	}
	
	skillGaps.push(
		{
			skill: "System Design",
			importance: "medium",
			resources: ["Grokking System Design", "High Scalability blog", "YouTube system design videos"]
		},
		{
			skill: "Data Structures & Algorithms",
			importance: "high",
			resources: ["LeetCode", "Cracking the Coding Interview", "GeeksforGeeks"]
		}
	);
	
	return {
		overallScore,
		overallStatus,
		overallMessage: `Based on your ${skillsCount} skills, ${projectsCount} projects, ${experienceCount} experiences, and ${cgpa > 0 ? 'CGPA of ' + cgpa : 'academic record'}, your profile shows ${overallStatus.toLowerCase()} potential.`,
		strengths,
		improvements,
		careerPaths,
		nextSteps,
		interviewTips: [
			"Practice coding problems on LeetCode or HackerRank",
			"Prepare STAR method examples for behavioral questions",
			"Research the company and role before the interview",
			"Practice explaining your projects clearly",
			"Prepare questions to ask the interviewer"
		],
		skillGaps
	};
}

// Career guidance based on profile
app.get('/api/career-guidance', requireAuth, requireRole('student'), async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user || !user.profile) {
			return res.status(404).json({ message: 'User profile not found' });
		}

		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		
		// Calculate objective metrics first
		const skillsCount = user.profile.skills?.length || 0;
		const projectsCount = user.profile.projects?.length || 0;
		const experienceCount = user.profile.experience?.length || 0;
		const educationCount = user.profile.education?.length || 0;
		const cgpa = user.profile.cgpa || 0;
		
		// Calculate overall score based on objective criteria
		let baseScore = 0;
		if (skillsCount >= 10) baseScore += 25;
		else if (skillsCount >= 5) baseScore += 20;
		else if (skillsCount >= 3) baseScore += 15;
		else baseScore += 5;
		
		if (projectsCount >= 5) baseScore += 25;
		else if (projectsCount >= 3) baseScore += 20;
		else if (projectsCount >= 1) baseScore += 15;
		else baseScore += 5;
		
		if (experienceCount >= 3) baseScore += 25;
		else if (experienceCount >= 1) baseScore += 20;
		else baseScore += 10;
		
		if (cgpa >= 8.5) baseScore += 25;
		else if (cgpa >= 7.5) baseScore += 20;
		else if (cgpa >= 6.5) baseScore += 15;
		else if (cgpa > 0) baseScore += 10;
		else baseScore += 5;
		
		const overallScore = Math.min(100, baseScore);
		const overallStatus = overallScore >= 80 ? "Excellent" : overallScore >= 60 ? "Good" : overallScore >= 40 ? "Average" : "Needs Improvement";
		
		const prompt = `
		Analyze this student's profile objectively and provide structured career guidance. Be consistent and factual.
		
		PROFILE DATA:
		- Name: ${user.name}
		- Department: ${user.profile.department || 'Not specified'}
		- Year: ${user.profile.year || 'Not specified'}
		- CGPA: ${cgpa || 'Not specified'}
		- Skills: ${user.profile.skills?.join(', ') || 'None listed'}
		- Projects: ${projectsCount} projects
		- Experience: ${experienceCount} work experiences
		- Education: ${educationCount} education entries
		
		OBJECTIVE SCORING (already calculated):
		- Overall Score: ${overallScore}/100
		- Overall Status: ${overallStatus}
		
		Based on the ACTUAL profile data above, provide a JSON response with this exact structure:
		{
			"overallScore": ${overallScore},
			"overallStatus": "${overallStatus}",
			"overallMessage": "Based on your ${skillsCount} skills, ${projectsCount} projects, ${experienceCount} experiences, and ${cgpa > 0 ? 'CGPA of ' + cgpa : 'academic record'}, your profile shows ${overallStatus.toLowerCase()} potential.",
			"strengths": [
				${skillsCount >= 5 ? '{"title": "Technical Skills", "description": "You have ' + skillsCount + ' technical skills listed", "status": "excellent"},' : ''}
				${projectsCount >= 3 ? '{"title": "Project Experience", "description": "You have completed ' + projectsCount + ' projects", "status": "good"},' : ''}
				${experienceCount >= 1 ? '{"title": "Work Experience", "description": "You have ' + experienceCount + ' work experience(s)", "status": "good"},' : ''}
				${cgpa >= 8.0 ? '{"title": "Academic Performance", "description": "Strong CGPA of ' + cgpa + '", "status": "excellent"},' : ''}
				{"title": "Profile Completeness", "description": "Your profile has been populated with resume data", "status": "good"}
			],
			"improvements": [
				${skillsCount < 5 ? '{"title": "Expand Technical Skills", "description": "Add more technical skills to your profile", "priority": "high", "action": "Learn 2-3 new technologies and add them"},' : ''}
				${projectsCount < 3 ? '{"title": "Build More Projects", "description": "Create additional projects to showcase your skills", "priority": "high", "action": "Complete 2-3 more projects in your field"},' : ''}
				${experienceCount === 0 ? '{"title": "Gain Work Experience", "description": "Look for internships or freelance opportunities", "priority": "high", "action": "Apply for internships or start freelancing"},' : ''}
				${cgpa < 7.0 && cgpa > 0 ? '{"title": "Improve Academic Performance", "description": "Focus on improving your CGPA", "priority": "medium", "action": "Study harder and aim for better grades"},' : ''}
				{"title": "Profile Optimization", "description": "Keep your profile updated with latest achievements", "priority": "medium", "action": "Regularly update your profile with new skills and projects"}
			],
			"careerPaths": [
				{"title": "Software Developer", "match": ${Math.min(95, 60 + (skillsCount * 3) + (projectsCount * 5))}, "description": "Based on your technical skills and projects"},
				{"title": "Data Analyst", "match": ${Math.min(90, 50 + (skillsCount * 2) + (projectsCount * 3))}, "description": "If you have data-related skills and projects"},
				{"title": "Full Stack Developer", "match": ${Math.min(85, 45 + (skillsCount * 2) + (projectsCount * 4))}, "description": "For students with web development skills"}
			],
			"nextSteps": [
				${skillsCount < 5 ? '{"action": "Learn 2-3 new technologies", "timeline": "1-2 months", "priority": "high"},' : ''}
				${projectsCount < 3 ? '{"action": "Complete 2 more projects", "timeline": "1 month", "priority": "high"},' : ''}
				${experienceCount === 0 ? '{"action": "Apply for internships", "timeline": "2-3 months", "priority": "high"},' : ''}
				{"action": "Update LinkedIn profile", "timeline": "1 week", "priority": "medium"},
				{"action": "Prepare for technical interviews", "timeline": "2 weeks", "priority": "medium"}
			],
			"interviewTips": [
				"Practice coding problems on LeetCode or HackerRank",
				"Prepare STAR method examples for behavioral questions",
				"Research the company and role before the interview",
				"Practice explaining your projects clearly",
				"Prepare questions to ask the interviewer"
			],
			"skillGaps": [
				${skillsCount < 5 ? '{"skill": "Additional Programming Languages", "importance": "high", "resources": ["FreeCodeCamp", "Codecademy", "YouTube tutorials"]},' : ''}
				${projectsCount < 3 ? '{"skill": "Project Development", "importance": "high", "resources": ["GitHub", "Build real-world applications", "Follow tutorials"]},' : ''}
				{"skill": "System Design", "importance": "medium", "resources": ["Grokking System Design", "High Scalability blog", "YouTube system design videos"]},
				{"skill": "Data Structures & Algorithms", "importance": "high", "resources": ["LeetCode", "Cracking the Coding Interview", "GeeksforGeeks"]}
			]
		}
		
		IMPORTANT: Base your analysis ONLY on the actual data provided. Be objective and consistent.
		`;
		
		// Check if we should use AI or objective analysis only
		const useAI = process.env.USE_AI_GUIDANCE !== 'false';
		
		if (!useAI) {
			// Use only objective analysis for 100% consistency
			const guidance = generateFallbackGuidance(user, overallScore, overallStatus, skillsCount, projectsCount, experienceCount, cgpa);
			res.json({ guidance });
			return;
		}
		
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		
		// Extract JSON from response
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			try {
				const guidance = JSON.parse(jsonMatch[0]);
				res.json({ guidance });
			} catch (parseError) {
				// Fallback to objective analysis if JSON parsing fails
				const fallbackGuidance = generateFallbackGuidance(user, overallScore, overallStatus, skillsCount, projectsCount, experienceCount, cgpa);
				res.json({ guidance: fallbackGuidance });
			}
		} else {
			// Fallback to objective analysis if no JSON found
			const fallbackGuidance = generateFallbackGuidance(user, overallScore, overallStatus, skillsCount, projectsCount, experienceCount, cgpa);
			res.json({ guidance: fallbackGuidance });
		}
	} catch (error) {
		console.error('Career guidance error:', error);
		res.status(500).json({ message: 'Failed to generate career guidance' });
	}
});

// Recommendation (stub)
app.get('/api/recommendations', requireAuth, requireRole('student'), async (req, res) => {
	// Use profile & skills to recommend jobs
	const jobs = await Job.find().limit(10).lean();
	res.json(jobs);
});

async function startServer() {
	await seedDemoUsers();
	return app;
}

module.exports = { startServer };
