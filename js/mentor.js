// Mentor Dashboard and Features
function loadMentorContent(contentType) {
    const contentArea = document.getElementById('contentArea');
    
    switch (contentType) {
        case 'mentor-dashboard':
            contentArea.innerHTML = getMentorDashboard();
            break;
        case 'my-students':
            contentArea.innerHTML = getMyStudents();
            break;
        case 'guidance-sessions':
            contentArea.innerHTML = getGuidanceSessions();
            break;
        case 'progress-tracking':
            contentArea.innerHTML = getProgressTracking();
            break;
        case 'career-resources':
            contentArea.innerHTML = getCareerResources();
            break;
        case 'industry-insights':
            contentArea.innerHTML = getIndustryInsights();
            break;
        case 'skill-development':
            contentArea.innerHTML = getSkillDevelopment();
            break;
        default:
            contentArea.innerHTML = getMentorDashboard();
    }
    
    contentArea.classList.add('fade-in');
}

function getMentorDashboard() {
    return `
        <div class="dashboard-header">
            <div class="dashboard-title">
                <h1>Mentor Dashboard</h1>
                <p class="dashboard-subtitle">Guide and support your assigned students</p>
            </div>
            <div class="dashboard-actions">
                <button class="btn btn-primary" onclick="scheduleSession()">
                    <i class="fas fa-calendar-plus"></i> Schedule Session
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
                            <div class="stat-number">24</div>
                            <div class="stat-label">Assigned Students</div>
                            <div class="stat-change positive">+2 this month</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">18</div>
                            <div class="stat-label">Sessions This Month</div>
                            <div class="stat-change positive">+25% from last month</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">15</div>
                            <div class="stat-label">Students Placed</div>
                            <div class="stat-change positive">+3 this quarter</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="stat-item">
                        <div class="stat-icon bg-info">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">4.8</div>
                            <div class="stat-label">Average Rating</div>
                            <div class="stat-change positive">+0.2 this month</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 mb-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Upcoming Sessions</h3>
                    <a href="#" onclick="loadContent('guidance-sessions')" class="btn btn-sm btn-secondary">View All</a>
                </div>
                <div class="card-body">
                    <div class="sessions-list">
                        <div class="session-item">
                            <div class="session-time">
                                <div class="time">2:00 PM</div>
                                <div class="date">Today</div>
                            </div>
                            <div class="session-details">
                                <h4>Career Planning Session</h4>
                                <p class="student-name">with John Doe</p>
                                <p class="session-type">Individual Session</p>
                            </div>
                            <div class="session-actions">
                                <button class="btn btn-sm btn-primary">Join</button>
                                <button class="btn btn-sm btn-secondary">Reschedule</button>
                            </div>
                        </div>
                        <div class="session-item">
                            <div class="session-time">
                                <div class="time">4:30 PM</div>
                                <div class="date">Tomorrow</div>
                            </div>
                            <div class="session-details">
                                <h4>Interview Preparation</h4>
                                <p class="student-name">with Jane Smith</p>
                                <p class="session-type">Group Session</p>
                            </div>
                            <div class="session-actions">
                                <button class="btn btn-sm btn-primary">Join</button>
                                <button class="btn btn-sm btn-secondary">Reschedule</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Students Requiring Attention</h3>
                </div>
                <div class="card-body">
                    <div class="attention-list">
                        <div class="attention-item">
                            <div class="student-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="student-info">
                                <h4>Alice Johnson</h4>
                                <p class="issue">Low application success rate</p>
                                <span class="priority high">High Priority</span>
                            </div>
                            <div class="attention-actions">
                                <button class="btn btn-sm btn-primary">Contact</button>
                            </div>
                        </div>
                        <div class="attention-item">
                            <div class="student-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="student-info">
                                <h4>Bob Wilson</h4>
                                <p class="issue">Missed last two sessions</p>
                                <span class="priority medium">Medium Priority</span>
                            </div>
                            <div class="attention-actions">
                                <button class="btn btn-sm btn-primary">Contact</button>
                            </div>
                        </div>
                        <div class="attention-item">
                            <div class="student-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="student-info">
                                <h4>Carol Brown</h4>
                                <p class="issue">Profile incomplete</p>
                                <span class="priority low">Low Priority</span>
                            </div>
                            <div class="attention-actions">
                                <button class="btn btn-sm btn-primary">Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Recent Achievements</h3>
                </div>
                <div class="card-body">
                    <div class="achievements-list">
                        <div class="achievement-item">
                            <div class="achievement-icon success">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="achievement-content">
                                <h4>Student Placed</h4>
                                <p>John Doe got placed at TechCorp</p>
                                <span class="achievement-time">2 days ago</span>
                            </div>
                        </div>
                        <div class="achievement-item">
                            <div class="achievement-icon info">
                                <i class="fas fa-medal"></i>
                            </div>
                            <div class="achievement-content">
                                <h4>High Rating</h4>
                                <p>Received 5-star feedback</p>
                                <span class="achievement-time">1 week ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Session Statistics</h3>
                </div>
                <div class="card-body">
                    <div class="session-stats">
                        <div class="stat-row">
                            <span class="stat-label">This Week</span>
                            <span class="stat-value">8 sessions</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">This Month</span>
                            <span class="stat-value">18 sessions</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Total</span>
                            <span class="stat-value">156 sessions</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Average Duration</span>
                            <span class="stat-value">45 minutes</span>
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
                        <button class="action-btn" onclick="sendBulkMessage()">
                            <i class="fas fa-envelope"></i>
                            Send Message to All
                        </button>
                        <button class="action-btn" onclick="createResource()">
                            <i class="fas fa-plus"></i>
                            Create Resource
                        </button>
                        <button class="action-btn" onclick="viewReports()">
                            <i class="fas fa-chart-bar"></i>
                            View Reports
                        </button>
                        <button class="action-btn" onclick="exportData()">
                            <i class="fas fa-download"></i>
                            Export Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getMyStudents() {
    return `
        <div class="page-header">
            <h1>My Students</h1>
            <p>Manage and track your assigned students</p>
            <div class="page-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> Export List
                </button>
                <button class="btn btn-primary" onclick="sendBulkMessage()">
                    <i class="fas fa-envelope"></i> Send Message
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
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status</label>
                            <select class="form-select" id="statusFilter">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="placed">Placed</option>
                                <option value="needs-attention">Needs Attention</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Progress</label>
                            <select class="form-select" id="progressFilter">
                                <option value="">All Progress</option>
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="needs-improvement">Needs Improvement</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="students-grid">
            ${getStudentsCardsHTML()}
        </div>
    `;
}

function getStudentsCardsHTML() {
    return mockData.students.map(student => `
        <div class="student-card">
            <div class="student-header">
                <div class="student-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="student-basic-info">
                    <h4>${student.name}</h4>
                    <p class="student-department">${student.department}</p>
                    <p class="student-email">${student.email}</p>
                </div>
                <div class="student-status">
                    <span class="status-badge ${student.offers > 0 ? 'success' : 'info'}">
                        ${student.offers > 0 ? 'Placed' : 'Active'}
                    </span>
                </div>
            </div>
            
            <div class="student-stats">
                <div class="stat-item">
                    <span class="stat-label">CGPA</span>
                    <span class="stat-value ${student.cgpa >= 8.0 ? 'excellent' : student.cgpa >= 7.0 ? 'good' : 'average'}">
                        ${student.cgpa}
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Applications</span>
                    <span class="stat-value">${student.applications}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Offers</span>
                    <span class="stat-value">${student.offers}</span>
                </div>
            </div>
            
            <div class="student-skills">
                <h5>Skills</h5>
                <div class="skills-list">
                    ${student.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="student-progress">
                <div class="progress-item">
                    <span>Profile Completion</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 85%"></div>
                    </div>
                    <span class="progress-text">85%</span>
                </div>
                <div class="progress-item">
                    <span>Career Readiness</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 70%"></div>
                    </div>
                    <span class="progress-text">70%</span>
                </div>
            </div>
            
            <div class="student-actions">
                <button class="btn btn-sm btn-primary" onclick="contactStudent(${student.id})">
                    <i class="fas fa-envelope"></i> Message
                </button>
                <button class="btn btn-sm btn-secondary" onclick="scheduleWithStudent(${student.id})">
                    <i class="fas fa-calendar"></i> Schedule
                </button>
                <button class="btn btn-sm btn-info" onclick="viewStudentDetails(${student.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>
            </div>
        </div>
    `).join('');
}

function getGuidanceSessions() {
    return `
        <div class="page-header">
            <h1>Guidance Sessions</h1>
            <p>Manage your mentoring sessions and appointments</p>
            <div class="page-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-calendar-alt"></i> View Calendar
                </button>
                <button class="btn btn-primary" onclick="scheduleSession()">
                    <i class="fas fa-plus"></i> Schedule Session
                </button>
            </div>
        </div>

        <div class="sessions-container">
            <div class="grid grid-cols-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Today's Sessions</h3>
                    </div>
                    <div class="card-body">
                        <div class="today-sessions">
                            <div class="session-item">
                                <div class="session-time">2:00 PM</div>
                                <div class="session-info">
                                    <h4>Career Planning</h4>
                                    <p>with John Doe</p>
                                </div>
                                <button class="btn btn-sm btn-success">Join</button>
                            </div>
                            <div class="session-item">
                                <div class="session-time">4:30 PM</div>
                                <div class="session-info">
                                    <h4>Interview Prep</h4>
                                    <p>with Jane Smith</p>
                                </div>
                                <button class="btn btn-sm btn-primary">Upcoming</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">This Week</h3>
                    </div>
                    <div class="card-body">
                        <div class="week-overview">
                            <div class="day-sessions">
                                <span class="day">Mon</span>
                                <span class="count">3</span>
                            </div>
                            <div class="day-sessions active">
                                <span class="day">Tue</span>
                                <span class="count">2</span>
                            </div>
                            <div class="day-sessions">
                                <span class="day">Wed</span>
                                <span class="count">4</span>
                            </div>
                            <div class="day-sessions">
                                <span class="day">Thu</span>
                                <span class="count">1</span>
                            </div>
                            <div class="day-sessions">
                                <span class="day">Fri</span>
                                <span class="count">3</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Session Types</h3>
                    </div>
                    <div class="card-body">
                        <div class="session-types">
                            <div class="type-stat">
                                <span class="type-name">Career Planning</span>
                                <span class="type-count">12</span>
                            </div>
                            <div class="type-stat">
                                <span class="type-name">Interview Prep</span>
                                <span class="type-count">8</span>
                            </div>
                            <div class="type-stat">
                                <span class="type-name">Skill Development</span>
                                <span class="type-count">6</span>
                            </div>
                            <div class="type-stat">
                                <span class="type-name">Resume Review</span>
                                <span class="type-count">4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Event handlers for mentor functions
function scheduleSession() {
    showNotification('Session scheduling form will open here', 'info');
}

function contactStudent(studentId) {
    showNotification(`Opening message compose for student ID: ${studentId}`, 'info');
}

function scheduleWithStudent(studentId) {
    showNotification(`Scheduling session with student ID: ${studentId}`, 'info');
}

function viewStudentDetails(studentId) {
    showNotification(`Viewing details for student ID: ${studentId}`, 'info');
}

function sendBulkMessage() {
    showNotification('Bulk message composer will open here', 'info');
}

function createResource() {
    showNotification('Resource creation form will open here', 'info');
}

function viewReports() {
    showNotification('Reports dashboard will open here', 'info');
}

function exportData() {
    showNotification('Data export initiated', 'success');
}

// Stub functions for other mentor content
function getProgressTracking() {
    return `
        <div class="page-header">
            <h1>Progress Tracking</h1>
            <p>Monitor student progress and performance metrics</p>
        </div>
        <div class="content-placeholder">
            <p>Progress tracking dashboard coming soon...</p>
        </div>
    `;
}

function getCareerResources() {
    return `
        <div class="page-header">
            <h1>Career Resources</h1>
            <p>Access and manage career development resources</p>
        </div>
        <div class="content-placeholder">
            <p>Career resources library coming soon...</p>
        </div>
    `;
}

function getIndustryInsights() {
    return `
        <div class="page-header">
            <h1>Industry Insights</h1>
            <p>Latest industry trends and job market analysis</p>
        </div>
        <div class="content-placeholder">
            <p>Industry insights dashboard coming soon...</p>
        </div>
    `;
}

function getSkillDevelopment() {
    return `
        <div class="page-header">
            <h1>Skill Development</h1>
            <p>Resources and tools for student skill enhancement</p>
        </div>
        <div class="content-placeholder">
            <p>Skill development tools coming soon...</p>
        </div>
    `;
}