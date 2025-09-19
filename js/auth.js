// Authentication JavaScript
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (role && data.user.role !== role) {
            showNotification('Invalid role for this user', 'error');
            return;
        }
        currentUser = data.user;
        currentRole = data.user.role;
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('currentRole', data.user.role);
        showNotification('Login successful!', 'success');
        setTimeout(() => { showMainApp(); }, 400);
    } catch {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
});

async function authenticateUser() { return null; }

async function quickLogin(role) {
    const credentials = {
        'student': { email: 'student@demo.com', password: 'demo123' },
        'admin': { email: 'admin@demo.com', password: 'demo123' },
        'mentor': { email: 'mentor@demo.com', password: 'demo123' },
        'recruiter': { email: 'recruiter@demo.com', password: 'demo123' },
        'anurag': { email: 'anurag@demo.com', password: 'demo123' },
        'shreshth': { email: 'shreshth@demo.com', password: 'demo123' },
        'kanishk': { email: 'kanishk@demo.com', password: 'demo123' }
    };
    
    const cred = credentials[role];
    if (cred) {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email: cred.email, password: cred.password })
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            currentUser = data.user;
            currentRole = data.user.role;
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('currentRole', data.user.role);
            showNotification(`Logged in as ${data.user.name}`, 'success');
            setTimeout(() => { showMainApp(); }, 300);
        } catch {
            showNotification('Login failed', 'error');
        }
    }
}

// Password reset functionality (mock)
function resetPassword(email) {
    showNotification('Password reset link sent to your email!', 'info');
}

// Registration functionality (mock)
function registerUser(userData) {
    // Mock registration
    showNotification('Registration successful! Please check your email for verification.', 'success');
}

// Session management
function checkSession() {
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('currentRole');
    
    if (savedUser && savedRole) {
        currentUser = JSON.parse(savedUser);
        currentRole = savedRole;
        return true;
    }
    return false;
}

async function clearSession() {
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch {}
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    currentUser = null;
    currentRole = null;
}

// Auto logout after inactivity
let activityTimer;
const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes

function resetActivityTimer() {
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        showNotification('Session expired due to inactivity', 'warning');
        setTimeout(logout, 2000);
    }, INACTIVITY_TIME);
}

// Track user activity
document.addEventListener('mousedown', resetActivityTimer);
document.addEventListener('mousemove', resetActivityTimer);
document.addEventListener('keypress', resetActivityTimer);
document.addEventListener('scroll', resetActivityTimer);
document.addEventListener('touchstart', resetActivityTimer);

// Initialize activity timer
resetActivityTimer();