// Navigation JavaScript
function loadNavigation() {
    const sidebarNav = document.getElementById('sidebarNav');
    const navigation = getNavigationByRole(currentRole);
    
    sidebarNav.innerHTML = '';
    
    navigation.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'nav-section';
        
        if (section.title) {
            const titleDiv = document.createElement('div');
            titleDiv.className = 'nav-section-title';
            titleDiv.textContent = section.title;
            sectionDiv.appendChild(titleDiv);
        }
        
        section.items.forEach(item => {
            const navItem = document.createElement('a');
            navItem.href = '#';
            navItem.className = 'nav-item';
            navItem.innerHTML = `<i class="${item.icon}"></i> <span>${item.label}</span>`;
            navItem.onclick = (e) => {
                e.preventDefault();
                setActiveNavItem(navItem);
                loadContent(item.content);
            };
            sectionDiv.appendChild(navItem);
        });
        
        sidebarNav.appendChild(sectionDiv);
    });
    
    // Set first item as active
    const firstNavItem = sidebarNav.querySelector('.nav-item');
    if (firstNavItem) {
        setActiveNavItem(firstNavItem);
    }
}

function getNavigationByRole(role) {
    const navigationConfig = {
        student: [
            {
                title: 'Dashboard',
                items: [
                    { label: 'Overview', icon: 'fas fa-tachometer-alt', content: 'student-dashboard' },
                    { label: 'My Profile', icon: 'fas fa-user', content: 'student-profile' },
                    { label: 'Job Search', icon: 'fas fa-search', content: 'job-search' },
                    { label: 'Applications', icon: 'fas fa-file-alt', content: 'my-applications' }
                ]
            },
            {
                title: 'Tools',
                items: [
                    { label: 'Recommendations', icon: 'fas fa-lightbulb', content: 'recommendations' },
                    { label: 'Certificates', icon: 'fas fa-certificate', content: 'certificates' },
                    { label: 'Career Guidance', icon: 'fas fa-compass', content: 'career-guidance' },
                    { label: 'Peer Network', icon: 'fas fa-users', content: 'peer-network' }
                ]
            }
        ],
        admin: [
            {
                title: 'Administration',
                items: [
                    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', content: 'admin-dashboard' },
                    { label: 'Student Management', icon: 'fas fa-user-graduate', content: 'student-management' },
                    { label: 'Job Management', icon: 'fas fa-briefcase', content: 'job-management' },
                    { label: 'Application Tracking', icon: 'fas fa-chart-line', content: 'application-tracking' }
                ]
            },
            {
                title: 'Reports',
                items: [
                    { label: 'Placement Stats', icon: 'fas fa-chart-bar', content: 'placement-stats' },
                    { label: 'Company Reports', icon: 'fas fa-building', content: 'company-reports' },
                    { label: 'Student Analytics', icon: 'fas fa-analytics', content: 'student-analytics' }
                ]
            },
            {
                title: 'Settings',
                items: [
                    { label: 'System Config', icon: 'fas fa-cog', content: 'system-config' },
                    { label: 'User Management', icon: 'fas fa-users-cog', content: 'user-management' }
                ]
            }
        ],
        mentor: [
            {
                title: 'Mentorship',
                items: [
                    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', content: 'mentor-dashboard' },
                    { label: 'My Students', icon: 'fas fa-user-graduate', content: 'my-students' },
                    { label: 'Guidance Sessions', icon: 'fas fa-calendar-check', content: 'guidance-sessions' },
                    { label: 'Progress Tracking', icon: 'fas fa-chart-line', content: 'progress-tracking' }
                ]
            },
            {
                title: 'Resources',
                items: [
                    { label: 'Career Resources', icon: 'fas fa-book', content: 'career-resources' },
                    { label: 'Industry Insights', icon: 'fas fa-industry', content: 'industry-insights' },
                    { label: 'Skill Development', icon: 'fas fa-brain', content: 'skill-development' }
                ]
            }
        ],
        recruiter: [
            {
                title: 'Recruitment',
                items: [
                    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', content: 'recruiter-dashboard' },
                    { label: 'Job Postings', icon: 'fas fa-plus-circle', content: 'job-postings' },
                    { label: 'Candidate Pool', icon: 'fas fa-users', content: 'candidate-pool' },
                    { label: 'Applications', icon: 'fas fa-inbox', content: 'recruiter-applications' }
                ]
            },
            {
                title: 'Management',
                items: [
                    { label: 'Interview Scheduling', icon: 'fas fa-calendar', content: 'interview-scheduling' },
                    { label: 'Offer Management', icon: 'fas fa-handshake', content: 'offer-management' },
                    { label: 'Company Profile', icon: 'fas fa-building', content: 'company-profile' }
                ]
            }
        ]
    };
    
    return navigationConfig[role] || [];
}

function setActiveNavItem(activeItem) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    activeItem.classList.add('active');
}

function loadContent(contentType) {
    const contentArea = document.getElementById('contentArea');
    
    // Show loading
    contentArea.innerHTML = '<div class="loading-container"><div class="loading"></div></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        switch (currentRole) {
            case 'student':
                loadStudentContent(contentType);
                break;
            case 'admin':
                loadAdminContent(contentType);
                break;
            case 'mentor':
                loadMentorContent(contentType);
                break;
            case 'recruiter':
                loadRecruiterContent(contentType);
                break;
            default:
                loadDefaultContent();
        }
    }, 500);
}

function loadDefaultContent() {
    if (currentRole) {
        loadContent(getDefaultContentByRole(currentRole));
    }
}

function getDefaultContentByRole(role) {
    const defaults = {
        student: 'student-dashboard',
        admin: 'admin-dashboard',
        mentor: 'mentor-dashboard',
        recruiter: 'recruiter-dashboard'
    };
    return defaults[role] || 'dashboard';
}

// Breadcrumb functionality
function updateBreadcrumb(items) {
    let breadcrumbHtml = '';
    items.forEach((item, index) => {
        if (index > 0) breadcrumbHtml += ' <i class="fas fa-chevron-right"></i> ';
        if (index === items.length - 1) {
            breadcrumbHtml += `<span class="breadcrumb-current">${item}</span>`;
        } else {
            breadcrumbHtml += `<a href="#" class="breadcrumb-link">${item}</a>`;
        }
    });
    
    const breadcrumbContainer = document.querySelector('.breadcrumb-container');
    if (breadcrumbContainer) {
        breadcrumbContainer.innerHTML = breadcrumbHtml;
    }
}