// Main application JavaScript
let currentUser = null;
let currentRole = null;
let sidebarOpen = true;

// Backend data cache (populated from API)
const mockData = {
    students: [],
    jobs: [],
    applications: [],
    notifications: []
};

async function loadBackendData() {
    try {
        const [jobsRes, appsRes, studentsRes] = await Promise.all([
            fetch('/api/jobs', { credentials: 'include' }),
            fetch('/api/applications', { credentials: 'include' }),
            fetch('/api/students', { credentials: 'include' }).catch(() => ({ ok: false, json: async () => [] }))
        ]);
        const [jobs, apps, students] = await Promise.all([jobsRes.json(), appsRes.json(), studentsRes.ok ? studentsRes.json() : []]);
        // Map jobs to frontend shape
        mockData.jobs = (Array.isArray(jobs) ? jobs : []).map(j => ({
            id: j._id || j.id,
            title: j.title,
            company: j.company,
            type: j.type,
            location: j.location,
            salary: j.salary,
            deadline: j.deadline,
            requirements: j.requirements || [],
            status: j.status
        }));
        // Map applications to frontend shape
        mockData.applications = (Array.isArray(apps) ? apps : []).map(a => ({
            id: a._id || a.id,
            studentId: a.studentId,
            jobId: (typeof a.jobId === 'object' && a.jobId?._id) ? a.jobId._id : a.jobId,
            status: a.status,
            appliedDate: a.createdAt || a.appliedDate,
            lastUpdate: a.updatedAt || a.lastUpdate
        }));
        mockData.students = Array.isArray(students) ? students : [];
    } catch (e) {
        console.error('Failed to load backend data', e);
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('currentRole');
    
    if (savedUser && savedRole) {
        currentUser = JSON.parse(savedUser);
        currentRole = savedRole;
        showMainApp();
    } else {
        showLoginPage();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    updateUserInfo();
    loadNavigation();
    loadBackendData().then(() => {
        loadDefaultContent();
    });
}

function updateUserInfo() {
    document.getElementById('userName').textContent = currentUser ? currentUser.name : 'Guest User';
    document.getElementById('userRole').textContent = currentRole ? currentRole.charAt(0).toUpperCase() + currentRole.slice(1) : 'Guest';
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
    sidebarOpen = !sidebarOpen;
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('active');
}

function logout() {
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).finally(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRole');
        currentUser = null;
        currentRole = null;
        showLoginPage();
    });
}

// Global search functionality
document.getElementById('globalSearch').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        performGlobalSearch(query);
    }
});

function performGlobalSearch(query) {
    // Mock search implementation
    console.log('Searching for:', query);
    // In a real implementation, this would search across all relevant data
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
        notificationDropdown.classList.remove('active');
    }
});

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function getStatusBadgeClass(status) {
    const statusClasses = {
        'Open': 'success',
        'Closed': 'danger',
        'Under Review': 'warning',
        'Interview Scheduled': 'info',
        'Offer Received': 'success',
        'Rejected': 'danger',
        'Applied': 'info'
    };
    return statusClasses[status] || 'info';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Loading state management
function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="loading"></div>';
    element.appendChild(loader);
}

function hideLoading(element) {
    const loader = element.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Export functions for use in other modules
window.mockData = mockData;
window.currentUser = currentUser;
window.currentRole = currentRole;
window.showNotification = showNotification;
window.formatDate = formatDate;
window.formatCurrency = formatCurrency;
window.getStatusBadgeClass = getStatusBadgeClass;