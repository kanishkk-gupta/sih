// Recruiter Dashboard and Features
function loadRecruiterContent(contentType) {
    const contentArea = document.getElementById('contentArea');
    
    switch (contentType) {
        case 'recruiter-dashboard':
            contentArea.innerHTML = getRecruiterDashboard();
            break;
        case 'job-postings':
            contentArea.innerHTML = getJobPostings();
            break;
        case 'candidate-pool':
            contentArea.innerHTML = getCandidatePool();
            break;
        case 'recruiter-applications':
            contentArea.innerHTML = getRecruiterApplications();
            break;
        case 'interview-scheduling':
            contentArea.innerHTML = getInterviewScheduling();
            break;
        case 'offer-management':
            contentArea.innerHTML = getOfferManagement();
            break;
        case 'company-profile':
            contentArea.innerHTML = getCompanyProfile();
            break;
        default:
            contentArea.innerHTML = getRecruiterDashboard();
    }
    
    contentArea.classList.add('fade-in');
}

function getRecruiterDashboard() {
    return `
        <div class="dashboard-header">
            <div class="dashboard-title">
                <h1>Recruiter Dashboard</h1>
                <p class="dashboard-subtitle">Manage your recruitment process efficiently</p>
            </div>
            <div class="dashboard-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> Export Report
                </button>
                <button class="btn btn-primary" onclick="postNewJob()">
                    <i class="fas fa-plus"></i> Post Job
                </button>
            </div>
        </div>

        <div class="grid grid-cols-4 mb-8">
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">8</div>
                            <div class="stat-label">Active Jobs</div>
                            <div class="stat-change positive">+2 this month</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-info">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">145</div>
                            <div class="stat-label">Total Applications</div>
                            <div class="stat-change positive">+23% from last month</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">34</div>
                            <div class="stat-label">Shortlisted</div>
                            <div class="stat-change positive">+12 this week</div>
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
                            <div class="stat-number">12</div>
                            <div class="stat-label">Hired</div>
                            <div class="stat-change positive">+4 this month</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 mb-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Recent Applications</h3>
                    <a href="#" onclick="loadContent('recruiter-applications')" class="btn btn-sm btn-secondary">View All</a>
                </div>
                <div class="card-body">
                    <div class="recent-applications">
                        <div class="application-item">
                            <div class="applicant-info">
                                <div class="applicant-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="applicant-details">
                                    <h4>John Doe</h4>
                                    <p>Computer Science • 8.5 CGPA</p>
                                    <p class="application-time">Applied 2 hours ago</p>
                                </div>
                            </div>
                            <div class="job-applied">
                                <span class="job-title">Software Developer</span>
                            </div>
                            <div class="application-actions">
                                <button class="btn btn-sm btn-success" onclick="shortlistCandidate(1)">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="rejectCandidate(1)">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="application-item">
                            <div class="applicant-info">
                                <div class="applicant-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="applicant-details">
                                    <h4>Jane Smith</h4>
                                    <p>Electronics • 9.2 CGPA</p>
                                    <p class="application-time">Applied 4 hours ago</p>
                                </div>
                            </div>
                            <div class="job-applied">
                                <span class="job-title">Data Analyst</span>
                            </div>
                            <div class="application-actions">
                                <button class="btn btn-sm btn-success" onclick="shortlistCandidate(2)">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="rejectCandidate(2)">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Job Performance</h3>
                </div>
                <div class="card-body">
                    <div class="job-performance-list">
                        ${getJobPerformanceHTML()}
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Upcoming Interviews</h3>
                    <button class="btn btn-sm btn-primary" onclick="scheduleInterview()">
                        Schedule New
                    </button>
                </div>
                <div class="card-body">
                    <div class="interviews-list">
                        <div class="interview-item">
                            <div class="interview-time">
                                <div class="time">10:00 AM</div>
                                <div class="date">Today</div>
                            </div>
                            <div class="interview-details">
                                <h4>John Doe</h4>
                                <p>Software Developer</p>
                                <p class="interview-type">Technical Round</p>
                            </div>
                            <button class="btn btn-sm btn-success">Join</button>
                        </div>
                        <div class="interview-item">
                            <div class="interview-time">
                                <div class="time">2:30 PM</div>
                                <div class="date">Tomorrow</div>
                            </div>
                            <div class="interview-details">
                                <h4>Jane Smith</h4>
                                <p>Data Analyst</p>
                                <p class="interview-type">HR Round</p>
                            </div>
                            <button class="btn btn-sm btn-primary">Upcoming</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Hiring Pipeline</h3>
                </div>
                <div class="card-body">
                    <div class="pipeline-stages">
                        <div class="pipeline-stage">
                            <div class="stage-header">
                                <span class="stage-name">Applied</span>
                                <span class="stage-count">145</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 100%"></div>
                            </div>
                        </div>
                        
                        <div class="pipeline-stage">
                            <div class="stage-header">
                                <span class="stage-name">Screening</span>
                                <span class="stage-count">89</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 61%"></div>
                            </div>
                        </div>
                        
                        <div class="pipeline-stage">
                            <div class="stage-header">
                                <span class="stage-name">Interview</span>
                                <span class="stage-count">34</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 23%"></div>
                            </div>
                        </div>
                        
                        <div class="pipeline-stage">
                            <div class="stage-header">
                                <span class="stage-name">Offer</span>
                                <span class="stage-count">12</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 8%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Quick Actions</h3>
                </div>
                <div class="card-body">
                    <div class="quick-actions">
                        <button class="action-btn" onclick="postNewJob()">
                            <i class="fas fa-plus"></i>
                            Post New Job
                        </button>
                        <button class="action-btn" onclick="reviewApplications()">
                            <i class="fas fa-tasks"></i>
                            Review Applications
                        </button>
                        <button class="action-btn" onclick="scheduleInterview()">
                            <i class="fas fa-calendar"></i>
                            Schedule Interview
                        </button>
                        <button class="action-btn" onclick="sendOffer()">
                            <i class="fas fa-handshake"></i>
                            Send Offer
                        </button>
                        <button class="action-btn" onclick="viewAnalytics()">
                            <i class="fas fa-chart-line"></i>
                            View Analytics
                        </button>
                        <button class="action-btn" onclick="exportCandidates()">
                            <i class="fas fa-download"></i>
                            Export Candidates
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getJobPerformanceHTML() {
    return mockData.jobs.map(job => `
        <div class="job-performance-item">
            <div class="job-info">
                <h4>${job.title}</h4>
                <p class="job-location">${job.location}</p>
            </div>
            <div class="performance-stats">
                <div class="stat">
                    <span class="stat-number">45</span>
                    <span class="stat-label">Applications</span>
                </div>
                <div class="stat">
                    <span class="stat-number">12</span>
                    <span class="stat-label">Shortlisted</span>
                </div>
                <div class="stat">
                    <span class="stat-number">3</span>
                    <span class="stat-label">Hired</span>
                </div>
            </div>
            <div class="conversion-rate">
                <span class="rate">26.7% conversion</span>
            </div>
        </div>
    `).join('');
}

function getJobPostings() {
    return `
        <div class="page-header">
            <h1>Job Postings</h1>
            <p>Manage your active and draft job postings</p>
            <div class="page-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-eye"></i> Preview
                </button>
                <button class="btn btn-primary" onclick="postNewJob()">
                    <i class="fas fa-plus"></i> Post New Job
                </button>
            </div>
        </div>

        <div class="grid grid-cols-3 mb-6">
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">8</div>
                            <div class="stat-label">Active Jobs</div>
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
                            <div class="stat-label">Draft</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-info">
                            <i class="fas fa-archive"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">15</div>
                            <div class="stat-label">Closed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Your Job Postings</h3>
                <div class="card-actions">
                    <select class="form-select">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Closed</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="jobs-list">
                    ${getRecruiterJobsHTML()}
                </div>
            </div>
        </div>
    `;
}

function getRecruiterJobsHTML() {
    return mockData.jobs.map(job => `
        <div class="recruiter-job-item">
            <div class="job-main-info">
                <div class="job-title-section">
                    <h4>${job.title}</h4>
                    <div class="job-meta">
                        <span class="job-type">${job.type}</span>
                        <span class="job-location">${job.location}</span>
                        <span class="job-salary">${job.salary}</span>
                    </div>
                </div>
                <div class="job-status-section">
                    <span class="status-badge success">Active</span>
                    <p class="deadline">Expires: ${formatDate(job.deadline)}</p>
                </div>
            </div>
            
            <div class="job-performance-metrics">
                <div class="metric">
                    <span class="metric-number">45</span>
                    <span class="metric-label">Applications</span>
                </div>
                <div class="metric">
                    <span class="metric-number">12</span>
                    <span class="metric-label">Shortlisted</span>
                </div>
                <div class="metric">
                    <span class="metric-number">8</span>
                    <span class="metric-label">Interviews</span>
                </div>
                <div class="metric">
                    <span class="metric-number">3</span>
                    <span class="metric-label">Offers</span>
                </div>
            </div>
            
            <div class="job-actions">
                <button class="btn btn-sm btn-secondary" onclick="viewJobDetails(${job.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-sm btn-primary" onclick="editJob(${job.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-info" onclick="viewCandidates(${job.id})">
                    <i class="fas fa-users"></i> Candidates
                </button>
                <button class="btn btn-sm btn-warning" onclick="cloneJob(${job.id})">
                    <i class="fas fa-copy"></i> Clone
                </button>
            </div>
        </div>
    `).join('');
}

function getCandidatePool() {
    return `
        <div class="page-header">
            <h1>Candidate Pool</h1>
            <p>Browse and filter available candidates</p>
            <div class="page-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-filter"></i> Advanced Filters
                </button>
                <button class="btn btn-primary" onclick="inviteCandidates()">
                    <i class="fas fa-envelope"></i> Invite to Apply
                </button>
            </div>
        </div>

        <div class="filters-section mb-6">
            <div class="card">
                <div class="card-body">
                    <div class="grid grid-cols-4">
                        <div class="form-group">
                            <label class="form-label">Search Candidates</label>
                            <input type="text" class="form-input" placeholder="Name, skills, keywords..." id="candidateSearch">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <select class="form-select" id="deptFilter">
                                <option value="">All Departments</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mechanical">Mechanical</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">CGPA Range</label>
                            <select class="form-select" id="cgpaFilter">
                                <option value="">All CGPA</option>
                                <option value="9-10">9.0 - 10.0</option>
                                <option value="8-9">8.0 - 8.9</option>
                                <option value="7-8">7.0 - 7.9</option>
                                <option value="6-7">6.0 - 6.9</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Skills</label>
                            <input type="text" class="form-input" placeholder="JavaScript, Python..." id="skillsFilter">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="candidates-grid">
            ${getCandidatesHTML()}
        </div>
    `;
}

function getCandidatesHTML() {
    return mockData.students.map(student => `
        <div class="candidate-card">
            <div class="candidate-header">
                <div class="candidate-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="candidate-basic-info">
                    <h4>${student.name}</h4>
                    <p class="candidate-department">${student.department} • 4th Year</p>
                    <div class="candidate-cgpa">
                        <span class="cgpa-label">CGPA:</span>
                        <span class="cgpa-value ${student.cgpa >= 8.0 ? 'excellent' : student.cgpa >= 7.0 ? 'good' : 'average'}">
                            ${student.cgpa}
                        </span>
                    </div>
                </div>
                <div class="candidate-status">
                    <span class="availability-badge ${student.offers > 0 ? 'placed' : 'available'}">
                        ${student.offers > 0 ? 'Placed' : 'Available'}
                    </span>
                </div>
            </div>
            
            <div class="candidate-skills">
                <h5>Skills</h5>
                <div class="skills-list">
                    ${student.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="candidate-stats">
                <div class="stat-item">
                    <span class="stat-label">Applications</span>
                    <span class="stat-value">${student.applications}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Success Rate</span>
                    <span class="stat-value">${Math.round((student.offers / student.applications) * 100)}%</span>
                </div>
            </div>
            
            <div class="candidate-actions">
                <button class="btn btn-sm btn-primary" onclick="viewCandidateProfile(${student.id})">
                    <i class="fas fa-eye"></i> View Profile
                </button>
                <button class="btn btn-sm btn-success" onclick="inviteCandidate(${student.id})">
                    <i class="fas fa-envelope"></i> Invite
                </button>
                <button class="btn btn-sm btn-secondary" onclick="saveCandidate(${student.id})">
                    <i class="fas fa-bookmark"></i> Save
                </button>
            </div>
        </div>
    `).join('');
}

// Event handlers for recruiter functions
function postNewJob() {
    const title = prompt('Job title');
    if (!title) return;
    const company = prompt('Company');
    if (!company) return;
    const type = prompt('Type (e.g., Full-time, Internship)', 'Full-time') || 'Full-time';
    const location = prompt('Location') || '';
    const salary = prompt('Salary') || '';
    const deadline = prompt('Deadline (YYYY-MM-DD)') || '';
    const requirements = prompt('Requirements (comma separated)', 'JavaScript, Node.js') || '';
    fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, company, type, location, salary, deadline, requirements: requirements.split(',').map(s => s.trim()).filter(Boolean), status: 'Open' })
    }).then(r => {
        if (!r.ok) throw new Error();
        return r.json();
    }).then(() => {
        showNotification('Job posted', 'success');
        if (typeof loadBackendData === 'function') {
            loadBackendData().then(() => loadContent('job-postings'));
        } else {
            loadContent('job-postings');
        }
    }).catch(() => showNotification('Failed to post job', 'error'));
}

function shortlistCandidate(candidateId) {
    showNotification(`Candidate ${candidateId} shortlisted successfully`, 'success');
}

function rejectCandidate(candidateId) {
    if (confirm('Are you sure you want to reject this candidate?')) {
        showNotification(`Candidate ${candidateId} rejected`, 'info');
    }
}

function scheduleInterview() {
    showNotification('Interview scheduling form will open here', 'info');
}

function viewJobDetails(jobId) {
    showNotification(`Viewing job details for ID: ${jobId}`, 'info');
}

function editJob(jobId) {
    showNotification(`Editing job for ID: ${jobId}`, 'info');
}

function viewCandidates(jobId) {
    showNotification(`Viewing candidates for job ID: ${jobId}`, 'info');
}

function cloneJob(jobId) {
    showNotification(`Cloning job ID: ${jobId}`, 'info');
}

function inviteCandidates() {
    showNotification('Bulk candidate invitation form will open here', 'info');
}

function viewCandidateProfile(candidateId) {
    showNotification(`Viewing profile for candidate ID: ${candidateId}`, 'info');
}

function inviteCandidate(candidateId) {
    showNotification(`Invitation sent to candidate ID: ${candidateId}`, 'success');
}

function saveCandidate(candidateId) {
    showNotification(`Candidate ${candidateId} saved to your list`, 'info');
}

function reviewApplications() {
    loadContent('recruiter-applications');
}

function sendOffer() {
    showNotification('Offer management form will open here', 'info');
}

function viewAnalytics() {
    showNotification('Analytics dashboard will open here', 'info');
}

function exportCandidates() {
    showNotification('Candidates data export initiated', 'success');
}

// Stub functions for other recruiter content
function getRecruiterApplications() {
    return `
        <div class="page-header">
            <h1>Applications</h1>
            <p>Review and manage job applications</p>
        </div>
        <div class="content-placeholder">
            <p>Applications management interface coming soon...</p>
        </div>
    `;
}

function getInterviewScheduling() {
    return `
        <div class="page-header">
            <h1>Interview Scheduling</h1>
            <p>Schedule and manage candidate interviews</p>
        </div>
        <div class="content-placeholder">
            <p>Interview scheduling system coming soon...</p>
        </div>
    `;
}

function getOfferManagement() {
    return `
        <div class="page-header">
            <h1>Offer Management</h1>
            <p>Create and track job offers</p>
        </div>
        <div class="content-placeholder">
            <p>Offer management system coming soon...</p>
        </div>
    `;
}

function getCompanyProfile() {
    return `
        <div class="page-header">
            <h1>Company Profile</h1>
            <p>Manage your company information and settings</p>
        </div>
        <div class="content-placeholder">
            <p>Company profile management coming soon...</p>
        </div>
    `;
}