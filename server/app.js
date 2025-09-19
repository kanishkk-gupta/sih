const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_me';
const CORS_ORIGIN = process.env.CORS_ORIGIN || process.env.ORIGIN || true;
const NODE_ENV = process.env.NODE_ENV || 'development';
const COOKIE_SECURE = String(process.env.COOKIE_SECURE || '').toLowerCase() === 'true' || NODE_ENV === 'production';
const COOKIE_SAMESITE = process.env.COOKIE_SAMESITE || (COOKIE_SECURE ? 'none' : 'lax');

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
		projects: [String],
		certifications: [String],
		coverLetter: String
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

// App
const app = express();
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

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
