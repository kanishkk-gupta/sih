// Student Dashboard and Features
function loadStudentContent(contentType) {
    const contentArea = document.getElementById('contentArea');
    
    switch (contentType) {
        case 'student-dashboard':
            contentArea.innerHTML = getStudentDashboard();
            initializeDashboardCharts();
            break;
        case 'student-profile':
            contentArea.innerHTML = getStudentProfile();
            initializeProfileForm();
            break;
        case 'job-search':
            contentArea.innerHTML = getJobSearch();
            initializeJobSearch();
            break;
        case 'my-applications':
            contentArea.innerHTML = getMyApplications();
            break;
        case 'recommendations':
            contentArea.innerHTML = getRecommendations();
            break;
        case 'certificates':
            contentArea.innerHTML = getCertificates();
            break;
        case 'career-guidance':
            contentArea.innerHTML = getCareerGuidance();
            break;
        case 'peer-network':
            contentArea.innerHTML = getPeerNetwork();
            // Initialize local peer internships immediately after rendering
            if (typeof initializePeerInternshipsApi === 'function') {
                initializePeerInternshipsApi();
            }
            break;
        default:
            contentArea.innerHTML = getStudentDashboard();
    }
    
    contentArea.classList.add('fade-in');
}

function getStudentDashboard() {
    return `
        <div class="dashboard-header">
            <div class="dashboard-title">
                <h1>Welcome back, ${currentUser.name}!</h1>
                <p class="dashboard-subtitle">Here's your placement journey overview</p>
            </div>
            <div class="dashboard-actions">
                <button class="btn btn-primary" onclick="quickApply()">
                    <i class="fas fa-plus"></i> Quick Apply
                </button>
            </div>
        </div>

        <div class="grid grid-cols-4 mb-8">
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">5</div>
                            <div class="stat-label">Applications</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">2</div>
                            <div class="stat-label">Offers</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">3</div>
                            <div class="stat-label">Pending</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-info">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">40%</div>
                            <div class="stat-label">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 mb-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Recent Applications</h3>
                    <a href="#" onclick="loadContent('my-applications')" class="btn btn-sm btn-secondary">View All</a>
                </div>
                <div class="card-body">
                    <div class="application-list">
                        ${getRecentApplicationsHTML()}
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Recommended Jobs</h3>
                    <a href="#" onclick="loadContent('job-search')" class="btn btn-sm btn-secondary">View All</a>
                </div>
                <div class="card-body">
                    <div class="job-recommendations">
                        ${getRecommendedJobsHTML()}
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Profile Completion</h3>
                </div>
                <div class="card-body">
                    <div class="progress-section">
                        <div class="progress-item">
                            <span>Basic Information</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 100%"></div>
                            </div>
                            <span class="progress-text">100%</span>
                        </div>
                        <div class="progress-item">
                            <span>Skills & Projects</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 80%"></div>
                            </div>
                            <span class="progress-text">80%</span>
                        </div>
                        <div class="progress-item">
                            <span>Certifications</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 60%"></div>
                            </div>
                            <span class="progress-text">60%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Upcoming Deadlines</h3>
                </div>
                <div class="card-body">
                    <div class="deadline-list">
                        <div class="deadline-item">
                            <div class="deadline-date">
                                <div class="date-day">15</div>
                                <div class="date-month">Feb</div>
                            </div>
                            <div class="deadline-content">
                                <h4>TechCorp Interview</h4>
                                <p>Technical Interview Round</p>
                            </div>
                        </div>
                        <div class="deadline-item">
                            <div class="deadline-date">
                                <div class="date-day">20</div>
                                <div class="date-month">Feb</div>
                            </div>
                            <div class="deadline-content">
                                <h4>DataTech Application</h4>
                                <p>Application Deadline</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStudentProfile() {
    return `
        <div class="page-header">
            <h1>My Profile</h1>
            <p>Manage your personal information and preferences</p>
        </div>

        <!-- Resume Upload Section -->
        <div class="card mb-6">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-file-upload"></i> Resume Upload & Auto-Parse
                </h3>
                <p class="text-sm text-gray-600">Upload your PDF resume and we'll automatically extract all your details</p>
            </div>
            <div class="card-body">
                <div class="resume-upload-section">
                    <div class="upload-area" id="uploadArea">
                        <div class="upload-content">
                            <i class="fas fa-cloud-upload-alt upload-icon"></i>
                            <h4>Drop your resume here or click to browse</h4>
                            <p>Supports PDF files up to 5MB</p>
                            <input type="file" id="resumeFile" accept=".pdf" style="display: none;">
                            <button class="btn btn-primary" onclick="document.getElementById('resumeFile').click()">
                                <i class="fas fa-upload"></i> Choose File
                            </button>
                        </div>
                    </div>
                    <div class="upload-progress" id="uploadProgress" style="display: none;">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <p class="progress-text" id="progressText">Uploading and parsing resume...</p>
                    </div>
                    <div class="upload-success" id="uploadSuccess" style="display: none;">
                        <i class="fas fa-check-circle text-green-500"></i>
                        <p>Resume uploaded and parsed successfully! Your profile has been updated.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile Overview Section -->
        <div class="profile-overview-section mb-6">
            <div class="profile-header">
                <div class="profile-picture-section">
                    <div class="profile-picture-container">
                        <div class="profile-picture" id="profilePicture">
                            <img id="profileImage" src="" alt="Profile Picture" style="display: none;">
                            <i class="fas fa-user" id="profileIcon"></i>
                        </div>
                        <div class="profile-picture-actions">
                            <input type="file" id="profilePictureInput" accept="image/*" style="display: none;">
                            <button class="btn btn-sm btn-primary" onclick="document.getElementById('profilePictureInput').click()">
                                <i class="fas fa-camera"></i> Change Photo
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="removeProfilePicture()" id="removePictureBtn" style="display: none;">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div class="profile-info">
                    <h2 id="profileDisplayName">${currentUser.name}</h2>
                    <p class="profile-email" id="profileDisplayEmail">john@example.com</p>
                    <div class="profile-badges">
                        <span class="badge badge-primary" id="profileDepartmentBadge">Computer Science</span>
                        <span class="badge badge-secondary" id="profileYearBadge">4th Year</span>
                        <span class="badge badge-success" id="profileCgpaBadge">CGPA: 8.5</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Personal Information Section -->
        <div class="card mb-6">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-user-edit"></i> Personal Information
                </h3>
                <button class="btn btn-sm btn-outline" id="editProfileBtn" onclick="toggleProfileEdit()">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
            <div class="card-body">
                <form id="profileForm">
                    <div class="profile-form-grid">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" value="${currentUser.name}" name="name" id="profileName" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" value="john@example.com" name="email" id="profileEmail" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone Number</label>
                            <input type="tel" class="form-input" value="+91 9876543210" name="phone" id="profilePhone" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Date of Birth</label>
                            <input type="date" class="form-input" value="2001-05-15" name="dob" id="profileDob" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <select class="form-select" name="department" id="profileDepartment" disabled>
                                <option value="Computer Science" selected>Computer Science</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Civil">Civil</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Year of Study</label>
                            <select class="form-select" name="year" id="profileYear" disabled>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year" selected>4th Year</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">CGPA</label>
                            <input type="number" step="0.01" class="form-input" value="8.5" name="cgpa" id="profileCgpa" readonly>
                        </div>
                        <div class="form-group full-width">
                            <label class="form-label">Cover Letter</label>
                            <textarea class="form-textarea" name="coverLetter" id="profileCoverLetter" rows="4" placeholder="Tell us about yourself..." readonly>I am a passionate computer science student with a strong interest in software development and problem-solving. I enjoy working on challenging projects and learning new technologies.</textarea>
                        </div>
                    </div>
                    <div class="form-actions" id="profileFormActions" style="display: none;">
                        <button type="button" class="btn btn-secondary" onclick="cancelProfileEdit()">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Skills Section -->
        <div class="card mb-6">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-code"></i> Skills & Technologies
                </h3>
                <button class="btn btn-sm btn-outline" onclick="toggleSkillsEdit()" id="editSkillsBtn">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
            <div class="card-body">
                <div class="skills-display" id="skillsDisplay">
                    <div class="skills-grid" id="skillsList">
                        <!-- Skills will be populated here -->
                    </div>
                </div>
                <div class="skills-edit" id="skillsEdit" style="display: none;">
                    <div class="add-skill-form">
                        <div class="input-group">
                            <input type="text" placeholder="Enter skill name" class="form-input" id="newSkill">
                            <button class="btn btn-primary" onclick="addSkill()">
                                <i class="fas fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                    <div class="skills-actions">
                        <button class="btn btn-secondary" onclick="cancelSkillsEdit()">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                        <button class="btn btn-primary" onclick="saveSkills()">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Academic Projects Section -->
        <div class="card mb-6">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-project-diagram"></i> Academic Projects
                </h3>
                <button class="btn btn-sm btn-outline" onclick="toggleProjectsEdit()" id="editProjectsBtn">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
            <div class="card-body">
                <div class="projects-display" id="projectsDisplay">
                    <div class="projects-grid" id="projectsList">
                        <!-- Projects will be populated here -->
                    </div>
                </div>
                <div class="projects-edit" id="projectsEdit" style="display: none;">
                    <div class="add-project-form">
                        <div class="form-group">
                            <label class="form-label">Project Title</label>
                            <input type="text" class="form-input" id="projectTitle" placeholder="Enter project title">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea class="form-textarea" id="projectDescription" rows="3" placeholder="Describe your project"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Technologies Used</label>
                            <input type="text" class="form-input" id="projectTechnologies" placeholder="e.g., React, Node.js, MongoDB (comma separated)">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Duration</label>
                            <input type="text" class="form-input" id="projectDuration" placeholder="e.g., 3 months, 2023">
                        </div>
                        <div class="project-actions">
                            <button class="btn btn-primary" onclick="addProject()">
                                <i class="fas fa-plus"></i> Add Project
                            </button>
                        </div>
                    </div>
                    <div class="projects-actions">
                        <button class="btn btn-secondary" onclick="cancelProjectsEdit()">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                        <button class="btn btn-primary" onclick="saveProjects()">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Experience Section -->
        <div class="card mt-6">
            <div class="card-header">
                <h3 class="card-title">Work Experience</h3>
            </div>
            <div class="card-body">
                <div class="experience-list" id="experienceList">
                    <div class="experience-item">
                        <h4>Software Developer Intern</h4>
                        <p class="company">TechCorp Inc.</p>
                        <p class="duration">June 2023 - August 2023</p>
                        <p class="description">Developed web applications using React and Node.js. Collaborated with team on various projects.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Education Section -->
        <div class="card mt-6">
            <div class="card-header">
                <h3 class="card-title">Education</h3>
            </div>
            <div class="card-body">
                <div class="education-list" id="educationList">
                    <div class="education-item">
                        <h4>Bachelor of Technology in Computer Science</h4>
                        <p class="institution">University Name</p>
                        <p class="duration">2020 - 2024</p>
                        <p class="cgpa">CGPA: 8.5/10</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-actions mt-6">
            <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
            <button class="btn btn-secondary">Cancel</button>
        </div>
    `;
}

function getJobSearch() {
    return `
        <div class="page-header">
            <h1>Job Search</h1>
            <p>Find the perfect opportunity for your career</p>
        </div>

        <div class="search-filters mb-6">
            <div class="card">
                <div class="card-body">
                    <div class="grid grid-cols-4">
                        <div class="form-group">
                            <label class="form-label">Search Jobs</label>
                            <input type="text" class="form-input" placeholder="Job title, company, skills..." id="jobSearch">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Location</label>
                            <select class="form-select" id="locationFilter">
                                <option value="">All Locations</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Pune">Pune</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Job Type</label>
                            <select class="form-select" id="typeFilter">
                                <option value="">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Part-time">Part-time</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <select class="form-select" id="departmentFilter">
                                <option value="">All Departments</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mechanical">Mechanical</option>
                            </select>
                        </div>
                    </div>
                    <div class="filter-actions">
                        <button class="btn btn-primary" onclick="searchJobs()">Search</button>
                        <button class="btn btn-secondary" onclick="clearFilters()">Clear</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="job-results">
            <div class="results-header">
                <h3>Available Opportunities</h3>
                <div class="results-count">Showing 12 of 45 jobs</div>
            </div>
            
            <div class="job-grid">
                ${getJobListHTML()}
            </div>
        </div>
    `;
}

function getJobListHTML() {
    return mockData.jobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <div class="company-logo">
                    <i class="fas fa-building"></i>
                </div>
                <div class="job-title-company">
                    <h4>${job.title}</h4>
                    <p class="company-name">${job.company}</p>
                </div>
                <div class="job-actions">
                    <button class="btn btn-sm btn-primary" onclick="applyToJob(${job.id})">
                        <i class="fas fa-paper-plane"></i> Apply
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="saveJob(${job.id})">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            </div>
            <div class="job-details">
                <div class="job-meta">
                    <span class="job-type">${job.type}</span>
                    <span class="job-location">${job.location}</span>
                    <span class="job-salary">${job.salary}</span>
                </div>
                <div class="job-requirements">
                    <h5>Required Skills:</h5>
                    <div class="skill-tags">
                        ${job.requirements.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="job-deadline">
                    <i class="fas fa-clock"></i> Apply by ${formatDate(job.deadline)}
                </div>
            </div>
        </div>
    `).join('');
}

function getMyApplications() {
    return `
        <div class="page-header">
            <h1>My Applications</h1>
            <p>Track your job application status</p>
        </div>

        <div class="application-stats mb-6">
            <div class="grid grid-cols-4">
                <div class="stat-card">
                    <div class="stat-icon bg-info">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">5</div>
                        <div class="stat-label">Total Applications</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon bg-warning">
                        <i class="fas fa-hourglass-half"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">2</div>
                        <div class="stat-label">Under Review</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon bg-success">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">1</div>
                        <div class="stat-label">Interview Scheduled</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon bg-success">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">2</div>
                        <div class="stat-label">Offers Received</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Application Timeline</h3>
                <div class="card-actions">
                    <select class="form-select">
                        <option>All Status</option>
                        <option>Applied</option>
                        <option>Under Review</option>
                        <option>Interview Scheduled</option>
                        <option>Offer Received</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="applications-list">
                    ${getApplicationListHTML()}
                </div>
            </div>
        </div>
    `;
}

function getApplicationListHTML() {
    return mockData.applications.map(application => {
        const job = mockData.jobs.find(j => j.id === application.jobId);
        if (!job) return '';
        
        return `
            <div class="application-item">
                <div class="application-info">
                    <div class="job-info">
                        <h4>${job.title}</h4>
                        <p class="company">${job.company}</p>
                        <p class="application-date">Applied on ${formatDate(application.appliedDate)}</p>
                    </div>
                    <div class="application-status">
                        <span class="status-badge ${getStatusBadgeClass(application.status)}">${application.status}</span>
                    </div>
                </div>
                <div class="application-timeline">
                    <div class="timeline-item active">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h5>Application Submitted</h5>
                            <p>${formatDate(application.appliedDate)}</p>
                        </div>
                    </div>
                    <div class="timeline-item ${application.status !== 'Applied' ? 'active' : ''}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h5>Under Review</h5>
                            <p>${application.status !== 'Applied' ? formatDate(application.lastUpdate) : 'Pending'}</p>
                        </div>
                    </div>
                    <div class="timeline-item ${application.status === 'Interview Scheduled' || application.status === 'Offer Received' ? 'active' : ''}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h5>Interview</h5>
                            <p>${application.status === 'Interview Scheduled' ? 'Scheduled' : 'Pending'}</p>
                        </div>
                    </div>
                    <div class="timeline-item ${application.status === 'Offer Received' ? 'active' : ''}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h5>Decision</h5>
                            <p>Pending</p>
                        </div>
                    </div>
                </div>
                <div class="application-actions">
                    <button class="btn btn-sm btn-secondary">View Details</button>
                    <button class="btn btn-sm btn-primary">Send Follow-up</button>
                </div>
            </div>
        `;
    }).join('');
}

// Helper functions
function getRecentApplicationsHTML() {
    return mockData.applications.slice(0, 3).map(application => {
        const job = mockData.jobs.find(j => j.id === application.jobId);
        if (!job) return '';
        
        return `
            <div class="recent-application">
                <div class="application-info">
                    <h4>${job.title}</h4>
                    <p>${job.company}</p>
                </div>
                <div class="application-status">
                    <span class="status-badge ${getStatusBadgeClass(application.status)}">${application.status}</span>
                </div>
            </div>
        `;
    }).join('');
}

function getRecommendedJobsHTML() {
    return mockData.jobs.slice(0, 3).map(job => `
        <div class="recommended-job">
            <div class="job-info">
                <h4>${job.title}</h4>
                <p>${job.company}</p>
                <p class="job-location">${job.location}</p>
            </div>
            <button class="btn btn-sm btn-primary" onclick="applyToJob(${job.id})">
                Apply Now
            </button>
        </div>
    `).join('');
}

// Event handlers
function applyToJob(jobId) {
    showNotification('Application submitted successfully!', 'success');
    // Implement job application logic
}

function saveJob(jobId) {
    showNotification('Job saved to your favorites!', 'info');
    // Implement save job logic
}

function quickApply() {
    loadContent('job-search');
}

function addSkill() {
    const skillInput = document.getElementById('newSkill');
    const skill = skillInput.value.trim();
    
    if (skill) {
        const skillsList = document.getElementById('skillsList');
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `${skill} <button onclick="removeSkill(this)">×</button>`;
        skillsList.appendChild(skillTag);
        skillInput.value = '';
        showNotification('Skill added successfully!', 'success');
    }
}

function removeSkill(button) {
    button.parentElement.remove();
    showNotification('Skill removed successfully!', 'info');
}

function addProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const technologies = document.getElementById('projectTechnologies').value.trim();
    const duration = document.getElementById('projectDuration').value.trim();
    
    if (title && description) {
        const projectsList = document.getElementById('projectsList');
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        
        const techArray = technologies ? technologies.split(',').map(t => t.trim()) : [];
        const techTags = techArray.map(tech => `<span class="tag">${tech}</span>`).join('');
        
        projectItem.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
            <div class="project-tags">
                ${techTags}
            </div>
            <div class="project-duration">${duration}</div>
            <div class="project-actions">
                <button class="btn btn-sm btn-secondary" onclick="editProject(this)">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="removeProject(this)">Delete</button>
            </div>
        `;
        
        projectsList.appendChild(projectItem);
        
        // Clear form
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('projectTechnologies').value = '';
        document.getElementById('projectDuration').value = '';
        
        showNotification('Project added successfully!', 'success');
    } else {
        showNotification('Please fill in at least title and description', 'error');
    }
}

function removeProject(button) {
    button.closest('.project-item').remove();
    showNotification('Project removed successfully!', 'info');
}

function editProject(button) {
    // Simple edit functionality - could be enhanced with a modal
    const projectItem = button.closest('.project-item');
    const title = projectItem.querySelector('h4').textContent;
    const description = projectItem.querySelector('p').textContent;
    
    // For now, just remove and let user add again
    projectItem.remove();
    
    // Pre-fill the form
    document.getElementById('projectTitle').value = title;
    document.getElementById('projectDescription').value = description;
    
    showNotification('Project moved to form for editing', 'info');
}

function saveProfile() {
    showNotification('Profile updated successfully!', 'success');
    // Implement profile save logic
}

function initializeProfileForm() {
    // Add form validation and enhancement logic
    loadUserProfile();
    setupResumeUpload();
    setupProfilePictureUpload();
    setupProfileFormSubmission();
}

// Setup profile form submission
function setupProfileFormSubmission() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileFormSubmit);
    }
}

// Handle profile form submission
async function handleProfileFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const profileData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: formData.get('dob'),
        department: formData.get('department'),
        year: formData.get('year'),
        cgpa: parseFloat(formData.get('cgpa')),
        coverLetter: formData.get('coverLetter')
    };
    
    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(profileData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Profile updated successfully!', 'success');
            // Update the display values
            updateProfileDisplay(profileData);
            // Switch back to view mode
            toggleProfileEdit();
        } else {
            throw new Error(data.message || 'Failed to update profile');
        }
    } catch (error) {
        console.error('Profile update error:', error);
        showNotification('Failed to update profile: ' + error.message, 'error');
    }
}

// Update profile display after successful update
function updateProfileDisplay(profileData) {
    // Update profile overview section
    if (profileData.name) {
        document.getElementById('profileDisplayName').textContent = profileData.name;
    }
    if (profileData.email) {
        document.getElementById('profileDisplayEmail').textContent = profileData.email;
    }
    if (profileData.department) {
        document.getElementById('profileDepartmentBadge').textContent = profileData.department;
    }
    if (profileData.year) {
        document.getElementById('profileYearBadge').textContent = profileData.year;
    }
    if (profileData.cgpa) {
        document.getElementById('profileCgpaBadge').textContent = `CGPA: ${profileData.cgpa}`;
    }
}

// Load user profile data
async function loadUserProfile() {
    try {
        const response = await fetch('/api/profile', {
            credentials: 'include'
        });
        const data = await response.json();
        
        if (data.user && data.user.profile) {
            updateProfileForm(data.user);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Update profile form with user data
function updateProfileForm(user) {
    const profile = user.profile || {};
    
    // Update basic info
    if (profile.name) document.getElementById('profileName').value = profile.name;
    if (profile.email) document.getElementById('profileEmail').value = profile.email;
    if (profile.phone) document.getElementById('profilePhone').value = profile.phone;
    if (profile.dateOfBirth) document.getElementById('profileDob').value = profile.dateOfBirth.split('T')[0];
    if (profile.department) document.getElementById('profileDepartment').value = profile.department;
    if (profile.year) document.getElementById('profileYear').value = profile.year;
    if (profile.cgpa) document.getElementById('profileCgpa').value = profile.cgpa;
    
    // Update skills
    if (profile.skills && profile.skills.length > 0) {
        updateSkillsList(profile.skills);
    }
    
    // Update projects
    if (profile.projects && profile.projects.length > 0) {
        updateProjectsList(profile.projects);
    }
    
    // Update experience
    if (profile.experience && profile.experience.length > 0) {
        updateExperienceList(profile.experience);
    }
    
    // Update education
    if (profile.education && profile.education.length > 0) {
        updateEducationList(profile.education);
    }
}

// Update skills list
function updateSkillsList(skills) {
    const skillsList = document.getElementById('skillsList');
    if (skillsList) {
        skillsList.innerHTML = skills.map(skill => 
            `<span class="skill-tag">${skill} <button onclick="removeSkill(this)">×</button></span>`
        ).join('');
    }
}

// Update projects list
function updateProjectsList(projects) {
    const projectsList = document.getElementById('projectsList');
    if (projectsList) {
        projectsList.innerHTML = projects.map(project => `
            <div class="project-item">
                <h4>${project.title || 'Untitled Project'}</h4>
                <p>${project.description || 'No description available'}</p>
                <div class="project-tags">
                    ${(project.technologies || []).map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="btn btn-sm btn-secondary">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

// Update experience list
function updateExperienceList(experience) {
    const experienceList = document.getElementById('experienceList');
    if (experienceList) {
        experienceList.innerHTML = experience.map(exp => `
            <div class="experience-item">
                <h4>${exp.position || 'Position'}</h4>
                <p class="company">${exp.company || 'Company'}</p>
                <p class="duration">${formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                <p class="description">${exp.description || 'No description available'}</p>
            </div>
        `).join('');
    }
}

// Update education list
function updateEducationList(education) {
    const educationList = document.getElementById('educationList');
    if (educationList) {
        educationList.innerHTML = education.map(edu => `
            <div class="education-item">
                <h4>${edu.degree || 'Degree'} ${edu.field ? `in ${edu.field}` : ''}</h4>
                <p class="institution">${edu.institution || 'Institution'}</p>
                <p class="duration">${formatDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                ${edu.cgpa ? `<p class="cgpa">CGPA: ${edu.cgpa}</p>` : ''}
            </div>
        `).join('');
    }
}

// Format date range
function formatDateRange(startDate, endDate, current) {
    if (!startDate) return 'Duration not specified';
    
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const end = current ? 'Present' : (endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
    
    return `${start} - ${end}`;
}

// Setup resume upload functionality
function setupResumeUpload() {
    const fileInput = document.getElementById('resumeFile');
    const uploadArea = document.getElementById('uploadArea');
    
    if (fileInput) {
        fileInput.addEventListener('change', handleResumeUpload);
    }
    
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        uploadArea.addEventListener('click', () => fileInput.click());
    }
}

// Handle resume upload
async function handleResumeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
        showNotification('Please select a PDF file', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        return;
    }
    
    await uploadResume(file);
}

// Handle drag and drop
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type === 'application/pdf') {
            uploadResume(file);
        } else {
            showNotification('Please drop a PDF file', 'error');
        }
    }
}

// Upload resume to server
async function uploadResume(file) {
    const formData = new FormData();
    formData.append('resume', file);
    
    // Show progress
    showUploadProgress();
    
    try {
        const response = await fetch('/api/resume/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showUploadSuccess();
            updateProfileForm({ profile: data.profile });
            showNotification('Resume uploaded and parsed successfully!', 'success');
        } else {
            throw new Error(data.message || 'Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showNotification('Failed to upload resume: ' + error.message, 'error');
        hideUploadProgress();
    }
}

// Show upload progress
function showUploadProgress() {
    document.getElementById('uploadArea').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'block';
    document.getElementById('uploadSuccess').style.display = 'none';
}

// Show upload success
function showUploadSuccess() {
    document.getElementById('uploadArea').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('uploadSuccess').style.display = 'block';
    
    // Reset after 3 seconds
    setTimeout(() => {
        document.getElementById('uploadArea').style.display = 'block';
        document.getElementById('uploadSuccess').style.display = 'none';
    }, 3000);
}

// Hide upload progress
function hideUploadProgress() {
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('uploadSuccess').style.display = 'none';
}

// Generate career guidance
async function generateCareerGuidance() {
    const loading = document.getElementById('guidanceLoading');
    const content = document.getElementById('guidanceContent');
    
    loading.style.display = 'block';
    content.innerHTML = '';
    
    try {
        const response = await fetch('/api/career-guidance', {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            const guidance = data.guidance;
            content.innerHTML = renderStructuredGuidance(guidance);
        } else {
            throw new Error(data.message || 'Failed to generate guidance');
        }
    } catch (error) {
        console.error('Guidance error:', error);
        content.innerHTML = `
            <div class="guidance-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to generate career guidance: ${error.message}</p>
            </div>
        `;
    } finally {
        loading.style.display = 'none';
    }
}

// Render structured guidance with visual indicators
function renderStructuredGuidance(guidance) {
    return `
        <div class="guidance-dashboard">
            <!-- Overall Score Card -->
            <div class="score-card">
                <div class="score-circle ${getScoreClass(guidance.overallScore)}">
                    <div class="score-number">${guidance.overallScore}</div>
                    <div class="score-label">Overall Score</div>
                </div>
                <div class="score-details">
                    <h3 class="score-status ${getStatusClass(guidance.overallStatus)}">${guidance.overallStatus}</h3>
                    <p class="score-message">${guidance.overallMessage}</p>
                </div>
            </div>

            <!-- Strengths & Improvements Grid -->
            <div class="guidance-grid">
                <div class="guidance-section">
                    <h3 class="section-title">
                        <i class="fas fa-check-circle text-green"></i>
                        Strengths
                    </h3>
                    <div class="items-list">
                        ${guidance.strengths.map(item => `
                            <div class="guidance-item strength-item">
                                <div class="item-header">
                                    <span class="item-title">${item.title}</span>
                                    <span class="status-badge ${getStatusClass(item.status)}">${item.status}</span>
                                </div>
                                <p class="item-description">${item.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="guidance-section">
                    <h3 class="section-title">
                        <i class="fas fa-exclamation-triangle text-orange"></i>
                        Areas for Improvement
                    </h3>
                    <div class="items-list">
                        ${guidance.improvements.map(item => `
                            <div class="guidance-item improvement-item">
                                <div class="item-header">
                                    <span class="item-title">${item.title}</span>
                                    <span class="priority-badge ${getPriorityClass(item.priority)}">${item.priority}</span>
                                </div>
                                <p class="item-description">${item.description}</p>
                                <div class="action-item">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>${item.action}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Career Paths -->
            <div class="career-paths-section">
                <h3 class="section-title">
                    <i class="fas fa-route text-blue"></i>
                    Recommended Career Paths
                </h3>
                <div class="career-paths-grid">
                    ${guidance.careerPaths.map(path => `
                        <div class="career-path-card">
                            <div class="path-header">
                                <h4 class="path-title">${path.title}</h4>
                                <div class="match-score ${getMatchClass(path.match)}">
                                    ${path.match}% Match
                                </div>
                            </div>
                            <p class="path-description">${path.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Next Steps -->
            <div class="next-steps-section">
                <h3 class="section-title">
                    <i class="fas fa-tasks text-purple"></i>
                    Next Steps
                </h3>
                <div class="steps-timeline">
                    ${guidance.nextSteps.map((step, index) => `
                        <div class="timeline-item">
                            <div class="timeline-marker ${getPriorityClass(step.priority)}">${index + 1}</div>
                            <div class="timeline-content">
                                <div class="step-header">
                                    <span class="step-action">${step.action}</span>
                                    <span class="step-timeline">${step.timeline}</span>
                                </div>
                                <span class="priority-tag ${getPriorityClass(step.priority)}">${step.priority} priority</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Skill Gaps -->
            <div class="skill-gaps-section">
                <h3 class="section-title">
                    <i class="fas fa-graduation-cap text-red"></i>
                    Skill Gaps to Address
                </h3>
                <div class="skill-gaps-grid">
                    ${guidance.skillGaps.map(skill => `
                        <div class="skill-gap-card">
                            <div class="skill-header">
                                <h4 class="skill-name">${skill.skill}</h4>
                                <span class="importance-badge ${getPriorityClass(skill.importance)}">${skill.importance}</span>
                            </div>
                            <div class="skill-resources">
                                <p class="resources-label">Resources:</p>
                                <ul class="resources-list">
                                    ${skill.resources.map(resource => `<li>${resource}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Interview Tips -->
            <div class="interview-tips-section">
                <h3 class="section-title">
                    <i class="fas fa-comments text-green"></i>
                    Interview Preparation Tips
                </h3>
                <div class="tips-grid">
                    ${guidance.interviewTips.map(tip => `
                        <div class="tip-card">
                            <i class="fas fa-lightbulb"></i>
                            <span>${tip}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Helper functions for styling
function getScoreClass(score) {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'average';
    return 'needs-improvement';
}

function getStatusClass(status) {
    const statusMap = {
        'excellent': 'excellent',
        'good': 'good',
        'average': 'average',
        'needs-improvement': 'needs-improvement'
    };
    return statusMap[status] || 'average';
}

function getPriorityClass(priority) {
    const priorityMap = {
        'high': 'high',
        'medium': 'medium',
        'low': 'low'
    };
    return priorityMap[priority] || 'medium';
}

function getMatchClass(match) {
    if (match >= 80) return 'excellent';
    if (match >= 60) return 'good';
    if (match >= 40) return 'average';
    return 'needs-improvement';
}

// Profile Picture Functions
function setupProfilePictureUpload() {
    const profilePictureInput = document.getElementById('profilePictureInput');
    if (profilePictureInput) {
        profilePictureInput.addEventListener('change', handleProfilePictureUpload);
    }
}

function handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.getElementById('profileImage');
            const profileIcon = document.getElementById('profileIcon');
            const removeBtn = document.getElementById('removePictureBtn');
            
            profileImage.src = e.target.result;
            profileImage.style.display = 'block';
            profileIcon.style.display = 'none';
            removeBtn.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
}

function removeProfilePicture() {
    const profileImage = document.getElementById('profileImage');
    const profileIcon = document.getElementById('profileIcon');
    const removeBtn = document.getElementById('removePictureBtn');
    const profilePictureInput = document.getElementById('profilePictureInput');
    
    profileImage.src = '';
    profileImage.style.display = 'none';
    profileIcon.style.display = 'block';
    removeBtn.style.display = 'none';
    profilePictureInput.value = '';
}

// Profile Edit Functions
function toggleProfileEdit() {
    const editBtn = document.getElementById('editProfileBtn');
    const formActions = document.getElementById('profileFormActions');
    const inputs = document.querySelectorAll('#profileForm input, #profileForm select, #profileForm textarea');
    
    if (editBtn.textContent.includes('Edit')) {
        // Enable edit mode
        editBtn.innerHTML = '<i class="fas fa-eye"></i> View';
        formActions.style.display = 'flex';
        inputs.forEach(input => {
            input.removeAttribute('readonly');
            input.disabled = false;
        });
    } else {
        // Disable edit mode
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        formActions.style.display = 'none';
        inputs.forEach(input => {
            input.setAttribute('readonly', 'readonly');
            input.disabled = true;
        });
    }
}

function cancelProfileEdit() {
    toggleProfileEdit();
    // Reset form to original values
    loadUserProfile();
}

// Skills Edit Functions
function toggleSkillsEdit() {
    const editBtn = document.getElementById('editSkillsBtn');
    const skillsDisplay = document.getElementById('skillsDisplay');
    const skillsEdit = document.getElementById('skillsEdit');
    
    if (editBtn.textContent.includes('Edit')) {
        editBtn.innerHTML = '<i class="fas fa-eye"></i> View';
        skillsDisplay.style.display = 'none';
        skillsEdit.style.display = 'block';
    } else {
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        skillsDisplay.style.display = 'block';
        skillsEdit.style.display = 'none';
    }
}

function cancelSkillsEdit() {
    toggleSkillsEdit();
    // Reset skills to original values
    loadUserProfile();
}

async function saveSkills() {
    const skillsList = document.querySelectorAll('#skillsList .skill-tag');
    const skills = Array.from(skillsList).map(skillTag => {
        const text = skillTag.textContent.trim();
        return text.replace('×', '').trim();
    });
    
    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ skills: skills })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Skills updated successfully!', 'success');
            toggleSkillsEdit();
        } else {
            throw new Error(data.message || 'Failed to update skills');
        }
    } catch (error) {
        console.error('Skills update error:', error);
        showNotification('Failed to update skills: ' + error.message, 'error');
    }
}

// Projects Edit Functions
function toggleProjectsEdit() {
    const editBtn = document.getElementById('editProjectsBtn');
    const projectsDisplay = document.getElementById('projectsDisplay');
    const projectsEdit = document.getElementById('projectsEdit');
    
    if (editBtn.textContent.includes('Edit')) {
        editBtn.innerHTML = '<i class="fas fa-eye"></i> View';
        projectsDisplay.style.display = 'none';
        projectsEdit.style.display = 'block';
    } else {
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        projectsDisplay.style.display = 'block';
        projectsEdit.style.display = 'none';
    }
}

function cancelProjectsEdit() {
    toggleProjectsEdit();
    // Reset projects to original values
    loadUserProfile();
}

async function saveProjects() {
    const projectItems = document.querySelectorAll('#projectsList .project-item');
    const projects = Array.from(projectItems).map(projectItem => {
        const title = projectItem.querySelector('h4')?.textContent || '';
        const description = projectItem.querySelector('p')?.textContent || '';
        const technologies = Array.from(projectItem.querySelectorAll('.tag')).map(tag => tag.textContent);
        const duration = projectItem.querySelector('.project-duration')?.textContent || '';
        
        return {
            title: title,
            description: description,
            technologies: technologies,
            duration: duration
        };
    });
    
    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ projects: projects })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Projects updated successfully!', 'success');
            toggleProjectsEdit();
        } else {
            throw new Error(data.message || 'Failed to update projects');
        }
    } catch (error) {
        console.error('Projects update error:', error);
        showNotification('Failed to update projects: ' + error.message, 'error');
    }
}

// Refresh guidance
function refreshGuidance() {
    const content = document.getElementById('guidanceContent');
    content.innerHTML = `
        <div class="guidance-placeholder">
            <i class="fas fa-graduation-cap"></i>
            <h3>Ready for Career Guidance?</h3>
            <p>Click the button above to get personalized career advice based on your profile and resume.</p>
        </div>
    `;
}

function initializeDashboardCharts() {
    const container = document.querySelector('.dashboard-title');
    if (!container) return;
    const chartCard = document.createElement('div');
    chartCard.className = 'card mt-6';
    chartCard.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">Applications Over Time</h3>
        </div>
        <div class="card-body">
            <canvas id="applicationsChart" height="120"></canvas>
        </div>
    `;
    container.parentElement.parentElement.appendChild(chartCard);

    const ctx = document.getElementById('applicationsChart');
    if (!window.Chart || !ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Applications',
                data: [1, 2, 3, 4, 3, 5],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function initializeJobSearch() {
    // Add search functionality
    const searchInput = document.getElementById('jobSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchJobs, 300));
    }
}

function searchJobs() {
    // Implement job search logic
    showNotification('Searching for jobs...', 'info');
}

function clearFilters() {
    document.getElementById('jobSearch').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('departmentFilter').value = '';
    searchJobs();
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Stub functions for other content types
function getRecommendations() {
    return `
        <div class="page-header">
            <h1>Job Recommendations</h1>
            <p>Personalized job suggestions based on your profile</p>
        </div>
        <div class="recommendations-content">
            <p>Recommendations feature coming soon...</p>
        </div>
    `;
}

function getCertificates() {
    return `
        <div class="page-header">
            <h1>Digital Certificates</h1>
            <p>Manage your certificates and achievements</p>
        </div>
        <div class="certificates-content">
            <p>Certificates feature coming soon...</p>
        </div>
    `;
}

function getCareerGuidance() {
    return `
        <div class="page-header">
            <h1>Career Guidance</h1>
            <p>Get personalized career advice and improvement suggestions</p>
        </div>
        
        <div class="card mb-6">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-lightbulb"></i> AI-Powered Career Guidance
                </h3>
                <p class="text-sm text-gray-600">Get personalized recommendations based on your profile and resume</p>
            </div>
            <div class="card-body">
                <div class="guidance-actions">
                    <button class="btn btn-primary" onclick="generateCareerGuidance()">
                        <i class="fas fa-magic"></i> Generate Career Guidance
                    </button>
                    <button class="btn btn-secondary" onclick="refreshGuidance()">
                        <i class="fas fa-sync"></i> Refresh
                    </button>
                </div>
                
                <div class="guidance-loading" id="guidanceLoading" style="display: none;">
                    <div class="loading-container">
                        <div class="loading"></div>
                        <p>Generating personalized career guidance...</p>
                    </div>
                </div>
                
                <div class="guidance-content" id="guidanceContent">
                    <div class="guidance-placeholder">
                        <i class="fas fa-graduation-cap"></i>
                        <h3>Ready for Career Guidance?</h3>
                        <p>Click the button above to get personalized career advice based on your profile and resume.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="guidance-features">
            <div class="grid grid-cols-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Profile Analysis</h3>
                    </div>
                    <div class="card-body">
                        <ul class="feature-list">
                            <li><i class="fas fa-check"></i> Skills assessment</li>
                            <li><i class="fas fa-check"></i> Experience evaluation</li>
                            <li><i class="fas fa-check"></i> Education analysis</li>
                            <li><i class="fas fa-check"></i> Project portfolio review</li>
                        </ul>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recommendations</h3>
                    </div>
                    <div class="card-body">
                        <ul class="feature-list">
                            <li><i class="fas fa-check"></i> Career path suggestions</li>
                            <li><i class="fas fa-check"></i> Skill gap identification</li>
                            <li><i class="fas fa-check"></i> Interview preparation tips</li>
                            <li><i class="fas fa-check"></i> Industry insights</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPeerNetwork() {
    return `
        <div class="page-header">
            <h1>Peer Network</h1>
            <p>Share peer-recommended internships and discover opportunities from your network</p>
        </div>
        <div class="card mb-6 peer-share-card">
            <div class="card-header">
                <h3 class="card-title">Share an Internship (Peer-Recommended)</h3>
            </div>
            <div class="card-body">
                <form id="peerForm" class="grid grid-cols-2">
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input class="form-input" name="title" required />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company</label>
                        <input class="form-input" name="company" required />
                    </div>
                    <div class="form-group" style="grid-column: span 2;">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" name="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Tags (comma separated)</label>
                        <input class="form-input" name="tags" placeholder="e.g., frontend, remote" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Info</label>
                        <input class="form-input" name="contactInfo" placeholder="Email/LinkedIn/Phone" />
                    </div>
                    <div class="form-group" style="grid-column: span 2;">
                        <label class="form-label">Application Tips</label>
                        <textarea class="form-textarea" name="tips" placeholder="What helped, how to stand out, etc."></textarea>
                    </div>
                    <div class="form-actions" style="grid-column: span 2;">
                        <button class="btn btn-primary" type="submit"><i class="fas fa-share"></i> Post</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="card peer-community-card">
            <div class="card-header">
                <h3 class="card-title">Community Posts</h3>
                <div class="card-actions">
                    <button class="btn btn-sm btn-secondary" id="refreshPeerPostsBtn"><i class="fas fa-sync"></i> Refresh</button>
                </div>
            </div>
            <div class="card-body">
                <div id="peerList" class="peer-list-grid"></div>
            </div>
        </div>

        <div id="peerEditModal" class="modal" style="display:none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Update Post</h3>
                    <button class="modal-close" id="peerEditClose">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="peerEditForm" class="grid grid-cols-2">
                        <input type="hidden" name="id" />
                        <div class="form-group">
                            <label class="form-label">Title</label>
                            <input class="form-input" name="title" required />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Company</label>
                            <input class="form-input" name="company" required />
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label class="form-label">Description</label>
                            <textarea class="form-textarea" name="description"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tags (comma separated)</label>
                            <input class="form-input" name="tags" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Info</label>
                            <input class="form-input" name="contactInfo" />
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label class="form-label">Application Tips</label>
                            <textarea class="form-textarea" name="tips"></textarea>
                        </div>
                        <div class="form-actions" style="grid-column: span 2;">
                            <button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('peerList')) initializePeerInternshipsLocal();
});

function initializePeerInternshipsApi() {
    const list = document.getElementById('peerList');
    const form = document.getElementById('peerForm');
    if (!list || !form) return;

    async function refreshList() {
        list.innerHTML = '<div class="loading-container"><div class="loading"></div></div>';
        try {
            const res = await fetch('/api/peer-posts', { credentials: 'include' });
            const items = await res.json();
            list.innerHTML = items.map(renderPeerItem).join('') || '<p>No posts yet.</p>';
        } catch {
            list.innerHTML = '<p>Failed to load posts.</p>';
        }
    }

    function renderPeerItem(item) {
        const tags = (item.tags || []).map(t => `<span class="skill-tag">${t}</span>`).join(' ');
        const postedBy = item.postedBy?.name ? `${item.postedBy.name} (${item.postedBy.email})` : 'Peer';
        const itemId = item._id || item.id;
        const postedByUserId = item.postedBy?.userId ? String(item.postedBy.userId) : '';
        const canDelete = currentUser && (currentRole === 'admin' || postedByUserId === String(currentUser.id));
        const canEdit = canDelete;
        return `
            <div class="peer-card">
                <div class="peer-card-header">
                    <div>
                        <div class="peer-title">${item.title || 'Untitled Opportunity'}</div>
                        <div class="peer-company"><i class="fas fa-building"></i> ${item.company || '—'}</div>
                    </div>
                </div>
                <div class="peer-card-body">
                    <div class="peer-field">
                        <div class="peer-label">Description</div>
                        <div class="peer-description">${(item.description || '—').replace(/\n/g, '<br/>')}</div>
                    </div>
                    <div class="peer-field">
                        <div class="peer-label">Tags</div>
                        <div class="peer-tags">${tags || '<span class="skill-tag">No tags</span>'}</div>
                    </div>
                    <div class="peer-meta-grid">
                        <div class="peer-field">
                            <div class="peer-label">Contact</div>
                            <div>${item.contactInfo || '—'}</div>
                        </div>
                        <div class="peer-field">
                            <div class="peer-label">Tips</div>
                            <div>${item.tips || '—'}</div>
                        </div>
                    </div>
                </div>
                <div class="peer-card-footer">
                    <span class="peer-posted-by">Shared by ${postedBy} on ${new Date(item.createdAt).toLocaleString()}</span>
                    <div class="peer-actions">
                        ${canEdit ? `<button class="btn btn-sm btn-secondary" data-id="${itemId}" data-action="edit"><i class="fas fa-edit"></i> Update</button>` : ''}
                        ${canDelete ? `<button class="btn btn-sm btn-danger" data-id="${itemId}" data-action="delete"><i class="fas fa-trash"></i> Delete</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        const body = {
            title: data.title,
            company: data.company,
            description: data.description || '',
            tags: (data.tags || '').split(',').map(s => s.trim()).filter(Boolean),
            contactInfo: data.contactInfo || '',
            tips: data.tips || ''
        };
        try {
            const res = await fetch('/api/peer-posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error();
            showNotification('Peer internship posted!', 'success');
            form.reset();
            refreshList();
        } catch {
            showNotification('Failed to post. Please log in and try again.', 'error');
        }
    });

    list.addEventListener('click', async (e) => {
        const delBtn = e.target.closest('button[data-action="delete"]');
        const editBtn = e.target.closest('button[data-action="edit"]');
        if (delBtn) {
            const id = delBtn.getAttribute('data-id');
            try {
                const res = await fetch(`/api/peer-posts/${id}`, { method: 'DELETE', credentials: 'include' });
                if (!res.ok) throw new Error();
                showNotification('Post deleted', 'info');
                refreshList();
            } catch {
                showNotification('Delete failed. Not authorized?', 'error');
            }
            return;
        }
        if (editBtn) {
            openEditModal(editBtn.getAttribute('data-id'));
            return;
        }
    });

    const refreshBtn = document.getElementById('refreshPeerPostsBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', refreshList);

    // Modal logic
    const modal = document.getElementById('peerEditModal');
    const modalClose = document.getElementById('peerEditClose');
    const editForm = document.getElementById('peerEditForm');

    function openEditModal(id) {
        fetch('/api/peer-posts', { credentials: 'include' })
            .then(r => r.json())
            .then(items => items.find(x => String(x._id || x.id) === String(id)))
            .then(item => {
                if (!item) return;
                editForm.elements['id'].value = item._id || item.id;
                editForm.elements['title'].value = item.title || '';
                editForm.elements['company'].value = item.company || '';
                editForm.elements['description'].value = item.description || '';
                editForm.elements['tags'].value = (item.tags || []).join(', ');
                editForm.elements['contactInfo'].value = item.contactInfo || '';
                editForm.elements['tips'].value = item.tips || '';
                modal.style.display = 'block';
            }).catch(() => {});
    }

    if (modalClose) modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (evt) => { if (evt.target === modal) modal.style.display = 'none'; });

    if (editForm) editForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const formData = Object.fromEntries(new FormData(editForm).entries());
        const id = formData.id;
        const body = {
            title: formData.title,
            company: formData.company,
            description: formData.description || '',
            tags: (formData.tags || '').split(',').map(s => s.trim()).filter(Boolean),
            contactInfo: formData.contactInfo || '',
            tips: formData.tips || ''
        };
        try {
            const res = await fetch(`/api/peer-posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error();
            showNotification('Post updated successfully', 'success');
            modal.style.display = 'none';
            refreshList();
        } catch {
            showNotification('Update failed. Not authorized?', 'error');
        }
    });

    refreshList();
}