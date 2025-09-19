// Chatbot functionality
let chatbotOpen = false;
let chatHistory = [];

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
});

function initializeChatbot() {
    const chatbot = document.getElementById('chatbot');
    
    // Position chatbot
    chatbot.style.display = 'flex';
    
    // Add sample responses for different user roles
    initializeChatResponses();
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbot.classList.add('active');
    } else {
        chatbot.classList.remove('active');
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessageToChat('user', message);
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            hideTypingIndicator();
            addMessageToChat('bot', botResponse);
        }, 1000 + Math.random() * 2000);
    }
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${sender === 'bot' ? 'robot' : 'user'}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store in chat history
    chatHistory.push({ sender, message, timestamp: new Date() });
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Get responses based on current user role
    const responses = getChatResponsesByRole(currentRole || 'student');
    
    // Simple keyword matching
    for (const category in responses) {
        const keywords = responses[category].keywords;
        const categoryResponses = responses[category].responses;
        
        for (const keyword of keywords) {
            if (message.includes(keyword)) {
                return getRandomResponse(categoryResponses);
            }
        }
    }
    
    // Default responses
    const defaultResponses = [
        "I'm here to help! Could you please provide more details about what you're looking for?",
        "That's an interesting question. Let me help you find the right information.",
        "I'd be happy to assist you with that. Could you be more specific?",
        "I understand you need help. Can you tell me more about your specific question?",
        "Let me help you with that. What exactly would you like to know?",
        "I'm designed to help students with placement-related questions. How can I assist you today?"
    ];
    
    return getRandomResponse(defaultResponses);
}

function getChatResponsesByRole(role) {
    const responseConfig = {
        student: {
            applications: {
                keywords: ['application', 'apply', 'job', 'position', 'submit'],
                responses: [
                    "To apply for a job, go to the Job Search section and click 'Apply Now' on any position that interests you. Your profile will be automatically submitted!",
                    "You can track all your applications in the 'My Applications' section. It shows real-time status updates for each application.",
                    "Make sure your profile is complete before applying - it increases your chances of getting noticed by recruiters!"
                ]
            },
            profile: {
                keywords: ['profile', 'resume', 'cv', 'information', 'update'],
                responses: [
                    "You can update your profile in the 'My Profile' section. Make sure to include your skills, projects, and achievements!",
                    "A complete profile increases your chances of getting selected. Don't forget to add your certifications and project details.",
                    "Your digital profile is your first impression with recruiters. Keep it updated and professional!"
                ]
            },
            jobs: {
                keywords: ['jobs', 'openings', 'opportunities', 'companies', 'hiring'],
                responses: [
                    "Check out the 'Job Search' section to find the latest opportunities. You can filter by location, company, and skills!",
                    "New jobs are posted regularly. I recommend checking the recommendations section for personalized job matches.",
                    "You can save interesting jobs and apply later. The system will also notify you of new relevant opportunities!"
                ]
            },
            interview: {
                keywords: ['interview', 'preparation', 'questions', 'tips'],
                responses: [
                    "Great question! Check the Career Guidance section for interview tips and common questions.",
                    "Practice makes perfect! You can schedule mock interview sessions with your mentor.",
                    "I recommend preparing your STAR format responses and researching the company beforehand."
                ]
            },
            placement: {
                keywords: ['placement', 'campus', 'recruitment', 'process'],
                responses: [
                    "The placement process typically involves application submission, screening, interviews, and final selection.",
                    "Keep track of placement deadlines and make sure your documents are ready well in advance.",
                    "Stay connected with your placement cell and mentors for the latest updates and guidance."
                ]
            }
        },
        admin: {
            system: {
                keywords: ['system', 'manage', 'users', 'settings'],
                responses: [
                    "You can manage system settings in the System Configuration section.",
                    "For user management, check the User Management panel where you can add, edit, or remove users.",
                    "System reports and analytics are available in the Reports section."
                ]
            },
            students: {
                keywords: ['student', 'students', 'profiles', 'data'],
                responses: [
                    "Student data can be managed in the Student Management section. You can view, edit, and export student information.",
                    "Use the filters to find specific students by department, year, or placement status.",
                    "Bulk operations like data export and messaging are available for efficient management."
                ]
            }
        },
        mentor: {
            guidance: {
                keywords: ['guidance', 'session', 'student', 'mentoring'],
                responses: [
                    "You can schedule guidance sessions in the Guidance Sessions section.",
                    "Track your students' progress in the Progress Tracking dashboard.",
                    "Resources for career guidance are available in the Career Resources section."
                ]
            }
        },
        recruiter: {
            hiring: {
                keywords: ['hire', 'candidate', 'job', 'posting', 'recruit'],
                responses: [
                    "You can post new jobs in the Job Postings section.",
                    "Browse the Candidate Pool to find suitable candidates for your positions.",
                    "Track your hiring pipeline and manage applications in the Applications section."
                ]
            }
        }
    };
    
    return responseConfig[role] || responseConfig.student;
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function initializeChatResponses() {
    // Add initial bot message based on user role
    setTimeout(() => {
        let welcomeMessage = "Hello! I'm PlacementBot, your placement assistant. How can I help you today?";
        
        if (currentRole) {
            const roleMessages = {
                student: "Hi there! I can help you with job applications, profile updates, interview preparation, and more. What would you like to know?",
                admin: "Hello Admin! I can assist you with system management, student data, reports, and administrative tasks. How can I help?",
                mentor: "Hello! I can help you with student guidance, session management, and mentoring resources. What do you need assistance with?",
                recruiter: "Hello! I can assist you with job postings, candidate management, and recruitment processes. How can I help you today?"
            };
            
            welcomeMessage = roleMessages[currentRole] || welcomeMessage;
        }
        
        addMessageToChat('bot', welcomeMessage);
    }, 1000);
}

// Predefined quick responses
function addQuickResponse(message) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = message;
    sendMessage();
}

// Export chat history
function exportChatHistory() {
    const historyText = chatHistory.map(msg => 
        `[${msg.timestamp.toLocaleTimeString()}] ${msg.sender.toUpperCase()}: ${msg.message}`
    ).join('\n');
    
    const blob = new Blob([historyText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Clear chat
function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        chatHistory = [];
        
        // Re-add welcome message
        setTimeout(() => {
            initializeChatResponses();
        }, 500);
    }
}