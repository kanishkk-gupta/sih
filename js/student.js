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

        <div class="grid grid-cols-3">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Profile Picture</h3>
                </div>
                <div class="card-body text-center">
                    <div class="profile-picture-container">
                        <div class="profile-picture">
                            <i class="fas fa-user"></i>
                        </div>
                        <button class="btn btn-sm btn-primary mt-4">Change Picture</button>
                    </div>
                </div>
            </div>

            <div class="card" style="grid-column: span 2;">
                <div class="card-header">
                    <h3 class="card-title">Personal Information</h3>
                </div>
                <div class="card-body">
                    <form id="profileForm">
                        <div class="grid grid-cols-2">
                            <div class="form-group">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-input" value="${currentUser.name}" name="name">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" value="john@example.com" name="email">
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="form-group">
                                <label class="form-label">Phone Number</label>
                                <input type="tel" class="form-input" value="+91 9876543210" name="phone">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Date of Birth</label>
                                <input type="date" class="form-input" value="2001-05-15" name="dob">
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="form-group">
                                <label class="form-label">Department</label>
                                <select class="form-select" name="department">
                                    <option value="Computer Science" selected>Computer Science</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Year</label>
                                <select class="form-select" name="year">
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year" selected>4th Year</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">CGPA</label>
                            <input type="number" step="0.01" class="form-input" value="8.5" name="cgpa">
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="card mt-6">
            <div class="card-header">
                <h3 class="card-title">Skills & Technologies</h3>
            </div>
            <div class="card-body">
                <div class="skills-section">
                    <div class="current-skills">
                        <h4>Current Skills</h4>
                        <div class="skills-list">
                            <span class="skill-tag">JavaScript</span>
                            <span class="skill-tag">Python</span>
                            <span class="skill-tag">React</span>
                            <span class="skill-tag">Node.js</span>
                            <span class="skill-tag">SQL</span>
                        </div>
                    </div>
                    <div class="add-skills">
                        <h4>Add New Skills</h4>
                        <div class="add-skill-form">
                            <input type="text" placeholder="Enter skill name" class="form-input" id="newSkill">
                            <button class="btn btn-primary" onclick="addSkill()">Add Skill</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-6">
            <div class="card-header">
                <h3 class="card-title">Academic Projects</h3>
                <button class="btn btn-primary" onclick="addProject()">Add Project</button>
            </div>
            <div class="card-body">
                <div class="projects-list">
                    <div class="project-item">
                        <h4>E-commerce Web Application</h4>
                        <p>Built using React, Node.js, and MongoDB. Features include user authentication, product catalog, and payment integration.</p>
                        <div class="project-tags">
                            <span class="tag">React</span>
                            <span class="tag">Node.js</span>
                            <span class="tag">MongoDB</span>
                        </div>
                        <div class="project-actions">
                            <button class="btn btn-sm btn-secondary">Edit</button>
                            <button class="btn btn-sm btn-danger">Delete</button>
                        </div>
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
        const skillsList = document.querySelector('.skills-list');
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

function saveProfile() {
    showNotification('Profile updated successfully!', 'success');
    // Implement profile save logic
}

function initializeProfileForm() {
    // Add form validation and enhancement logic
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
        <div class="guidance-content">
            <p>Career guidance feature coming soon...</p>
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