// Admin Dashboard and Features
function loadAdminContent(contentType) {
    const contentArea = document.getElementById('contentArea');
    
    switch (contentType) {
        case 'admin-dashboard':
            contentArea.innerHTML = getAdminDashboard();
            break;
        case 'student-management':
            contentArea.innerHTML = getStudentManagement();
            break;
        case 'job-management':
            contentArea.innerHTML = getJobManagement();
            break;
        case 'application-tracking':
            contentArea.innerHTML = getApplicationTracking();
            break;
        case 'placement-stats':
            contentArea.innerHTML = getPlacementStats();
            break;
        case 'company-reports':
            contentArea.innerHTML = getCompanyReports();
            break;
        case 'student-analytics':
            contentArea.innerHTML = getStudentAnalytics();
            break;
        case 'system-config':
            contentArea.innerHTML = getSystemConfig();
            break;
        case 'user-management':
            contentArea.innerHTML = getUserManagement();
            break;
        default:
            contentArea.innerHTML = getAdminDashboard();
    }
    
    contentArea.classList.add('fade-in');
}

function getAdminDashboard() {
    return `
        <div class="dashboard-header">
            <div class="dashboard-title">
                <h1>Admin Dashboard</h1>
                <p class="dashboard-subtitle">System overview and management</p>
            </div>
            <div class="dashboard-actions">
                <button class="btn btn-primary">
                    <i class="fas fa-download"></i> Export Report
                </button>
            </div>
        </div>

        <div class="grid grid-cols-4 mb-8">
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">2,547</div>
                            <div class="stat-label">Total Students</div>
                            <div class="stat-change positive">+12% from last month</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">156</div>
                            <div class="stat-label">Active Jobs</div>
                            <div class="stat-change positive">+8% from last week</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">3,421</div>
                            <div class="stat-label">Applications</div>
                            <div class="stat-change positive">+15% from last month</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-info">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">78%</div>
                            <div class="stat-label">Placement Rate</div>
                            <div class="stat-change positive">+3% from last year</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 mb-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Recent Applications</h3>
                    <select class="form-select" style="width: auto;">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                    </select>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-chart-line"></i>
                            <p>Applications Timeline Chart</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Department-wise Placement</h3>
                </div>
                <div class="card-body">
                    <div class="department-stats">
                        <div class="dept-stat">
                            <div class="dept-info">
                                <span class="dept-name">Computer Science</span>
                                <span class="dept-rate">85%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="dept-stat">
                            <div class="dept-info">
                                <span class="dept-name">Electronics</span>
                                <span class="dept-rate">78%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 78%"></div>
                            </div>
                        </div>
                        <div class="dept-stat">
                            <div class="dept-info">
                                <span class="dept-name">Mechanical</span>
                                <span class="dept-rate">72%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 72%"></div>
                            </div>
                        </div>
                        <div class="dept-stat">
                            <div class="dept-info">
                                <span class="dept-name">Civil</span>
                                <span class="dept-rate">68%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 68%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Top Recruiters</h3>
                </div>
                <div class="card-body">
                    <div class="recruiter-list">
                        <div class="recruiter-item">
                            <div class="recruiter-logo">
                                <i class="fas fa-building"></i>
                            </div>
                            <div class="recruiter-info">
                                <h4>TechCorp</h4>
                                <p>45 positions</p>
                            </div>
                        </div>
                        <div class="recruiter-item">
                            <div class="recruiter-logo">
                                <i class="fas fa-building"></i>
                            </div>
                            <div class="recruiter-info">
                                <h4>DataTech</h4>
                                <p>28 positions</p>
                            </div>
                        </div>
                        <div class="recruiter-item">
                            <div class="recruiter-logo">
                                <i class="fas fa-building"></i>
                            </div>
                            <div class="recruiter-info">
                                <h4>InnovateIT</h4>
                                <p>22 positions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Recent Activities</h3>
                </div>
                <div class="card-body">
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <div class="activity-content">
                                <p>New student registered</p>
                                <span class="activity-time">2 minutes ago</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-briefcase"></i>
                            </div>
                            <div class="activity-content">
                                <p>New job posting approved</p>
                                <span class="activity-time">15 minutes ago</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="activity-content">
                                <p>Application status updated</p>
                                <span class="activity-time">1 hour ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">System Alerts</h3>
                </div>
                <div class="card-body">
                    <div class="alert-list">
                        <div class="alert-item warning">
                            <div class="alert-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="alert-content">
                                <p>Server maintenance scheduled</p>
                                <span class="alert-time">Tonight 2:00 AM</span>
                            </div>
                        </div>
                        <div class="alert-item info">
                            <div class="alert-icon">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="alert-content">
                                <p>New feature deployment</p>
                                <span class="alert-time">Tomorrow</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStudentManagement() {
    return `
        <div class="page-header">
            <h1>Student Management</h1>
            <p>Manage student profiles and academic data</p>
            <div class="page-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> Export Data
                </button>
                <button class="btn btn-primary" onclick="addNewStudent()">
                    <i class="fas fa-user-plus"></i> Add Student
                </button>
            </div>
        </div>

        <div class="filters-section mb-6">
            <div class="card">
                <div class="card-body">
                    <div class="grid grid-cols-4">
                        <div class="form-group">
                            <label class="form-label">Search Students</label>
                            <input type="text" class="form-input" placeholder="Name, email, ID..." id="studentSearch">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <select class="form-select" id="deptFilter">
                                <option value="">All Departments</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Civil">Civil</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Year</label>
                            <select class="form-select" id="yearFilter">
                                <option value="">All Years</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status</label>
                            <select class="form-select" id="statusFilter">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="placed">Placed</option>
                                <option value="graduated">Graduated</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Students List</h3>
                <div class="card-actions">
                    <button class="btn btn-sm btn-secondary">
                        <i class="fas fa-filter"></i> Advanced Filters
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>CGPA</th>
                                <th>Applications</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getStudentsTableHTML()}
                        </tbody>
                    </table>
                </div>
                
                <div class="table-pagination">
                    <div class="pagination-info">
                        Showing 1 to 10 of 2,547 students
                    </div>
                    <div class="pagination-controls">
                        <button class="btn btn-sm btn-secondary">Previous</button>
                        <button class="btn btn-sm btn-primary">1</button>
                        <button class="btn btn-sm btn-secondary">2</button>
                        <button class="btn btn-sm btn-secondary">3</button>
                        <button class="btn btn-sm btn-secondary">Next</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStudentsTableHTML() {
    return mockData.students.map((student, index) => `
        <tr>
            <td>#${1000 + student.id}</td>
            <td>
                <div class="user-cell">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-info">
                        <div class="user-name">${student.name}</div>
                        <div class="user-email">${student.email}</div>
                    </div>
                </div>
            </td>
            <td>${student.department}</td>
            <td>4th Year</td>
            <td>
                <span class="grade ${student.cgpa >= 8.0 ? 'excellent' : student.cgpa >= 7.0 ? 'good' : 'average'}">
                    ${student.cgpa}
                </span>
            </td>
            <td>${student.applications}</td>
            <td>
                <span class="status-badge ${student.offers > 0 ? 'success' : 'info'}">
                    ${student.offers > 0 ? 'Placed' : 'Active'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-secondary" onclick="viewStudent(${student.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getJobManagement() {
    return `
        <div class="page-header">
            <h1>Job Management</h1>
            <p>Manage job postings and recruitment processes</p>
            <div class="page-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> Export Jobs
                </button>
                <button class="btn btn-primary" onclick="addNewJob()">
                    <i class="fas fa-plus"></i> Add Job
                </button>
            </div>
        </div>

        <div class="grid grid-cols-4 mb-6">
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">156</div>
                            <div class="stat-label">Total Jobs</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">89</div>
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
                            <div class="stat-number">23</div>
                            <div class="stat-label">Pending Approval</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-info">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">45</div>
                            <div class="stat-label">Companies</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Job Listings</h3>
                <div class="card-actions">
                    <select class="form-select">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Closed</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="jobs-grid">
                    ${getJobManagementCardsHTML()}
                </div>
            </div>
        </div>
    `;
}

function getJobManagementCardsHTML() {
    return mockData.jobs.map(job => `
        <div class="job-management-card">
            <div class="job-card-header">
                <div class="job-title-section">
                    <h4>${job.title}</h4>
                    <p class="company-name">${job.company}</p>
                </div>
                <div class="job-status">
                    <span class="status-badge success">Active</span>
                </div>
            </div>
            <div class="job-card-body">
                <div class="job-details-grid">
                    <div class="job-detail">
                        <span class="detail-label">Type:</span>
                        <span class="detail-value">${job.type}</span>
                    </div>
                    <div class="job-detail">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${job.location}</span>
                    </div>
                    <div class="job-detail">
                        <span class="detail-label">Salary:</span>
                        <span class="detail-value">${job.salary}</span>
                    </div>
                    <div class="job-detail">
                        <span class="detail-label">Deadline:</span>
                        <span class="detail-value">${formatDate(job.deadline)}</span>
                    </div>
                </div>
                <div class="job-stats">
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
            </div>
            <div class="job-card-actions">
                <button class="btn btn-sm btn-secondary" onclick="viewJobDetails(${job.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-sm btn-primary" onclick="editJob(${job.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-warning" onclick="manageApplications(${job.id})">
                    <i class="fas fa-users"></i> Applications
                </button>
            </div>
        </div>
    `).join('');
}

// Event handlers for admin functions
function addNewStudent() {
    showNotification('Add student form will open here', 'info');
}

function viewStudent(studentId) {
    showNotification(`Viewing student profile for ID: ${studentId}`, 'info');
}

function editStudent(studentId) {
    showNotification(`Editing student profile for ID: ${studentId}`, 'info');
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        showNotification('Student deleted successfully', 'success');
    }
}

function addNewJob() {
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
        showNotification('Job created', 'success');
        // reload jobs list
        if (typeof loadBackendData === 'function') {
            loadBackendData().then(() => loadContent('job-management'));
        } else {
            loadContent('job-management');
        }
    }).catch(() => showNotification('Failed to create job', 'error'));
}

function viewJobDetails(jobId) {
    showNotification(`Viewing job details for ID: ${jobId}`, 'info');
}

function editJob(jobId) {
    const job = (window.mockData?.jobs || []).find(j => String(j.id) === String(jobId));
    if (!job) return showNotification('Job not found', 'error');
    const title = prompt('Job title', job.title) || job.title;
    const company = prompt('Company', job.company) || job.company;
    const type = prompt('Type', job.type) || job.type;
    const location = prompt('Location', job.location) || job.location;
    const salary = prompt('Salary', job.salary) || job.salary;
    const deadline = prompt('Deadline (YYYY-MM-DD)', (job.deadline || '').toString().slice(0,10)) || job.deadline;
    const requirements = prompt('Requirements (comma separated)', (job.requirements || []).join(', ')) || (job.requirements || []).join(',');
    fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, company, type, location, salary, deadline, requirements: requirements.split(',').map(s => s.trim()).filter(Boolean) })
    }).then(r => {
        if (!r.ok) throw new Error();
        return r.json();
    }).then(() => {
        showNotification('Job updated', 'success');
        if (typeof loadBackendData === 'function') {
            loadBackendData().then(() => loadContent('job-management'));
        } else {
            loadContent('job-management');
        }
    }).catch(() => showNotification('Update failed', 'error'));
}

function manageApplications(jobId) {
    showNotification(`Managing applications for job ID: ${jobId}`, 'info');
}

// Stub functions for other admin content
function getApplicationTracking() {
    return `
        <div class="page-header">
            <h1>Application Tracking</h1>
            <p>Monitor and manage all job applications</p>
        </div>
        <div class="content-placeholder">
            <p>Application tracking interface coming soon...</p>
        </div>
    `;
}

function getPlacementStats() {
    return `
        <div class="page-header">
            <h1>Placement Statistics</h1>
            <p>Comprehensive placement analytics and reports</p>
        </div>
        <div class="content-placeholder">
            <p>Placement statistics dashboard coming soon...</p>
        </div>
    `;
}

function getCompanyReports() {
    return `
        <div class="page-header">
            <h1>Company Reports</h1>
            <p>Analytics and insights about recruiting companies</p>
        </div>
        <div class="content-placeholder">
            <p>Company reports feature coming soon...</p>
        </div>
    `;
}

function getStudentAnalytics() {
    return `
        <div class="page-header">
            <h1>Student Analytics</h1>
            <p>Detailed analytics about student performance and trends</p>
        </div>
        <div class="content-placeholder">
            <p>Student analytics dashboard coming soon...</p>
        </div>
    `;
}

function getSystemConfig() {
    return `
        <div class="page-header">
            <h1>System Configuration</h1>
            <p>Manage system settings and configurations</p>
        </div>
        <div class="content-placeholder">
            <p>System configuration panel coming soon...</p>
        </div>
    `;
}

function getUserManagement() {
    return `
        <div class="page-header">
            <h1>User Management</h1>
            <p>Manage system users and permissions</p>
        </div>
        <div class="content-placeholder">
            <p>User management interface coming soon...</p>
        </div>
    `;
}