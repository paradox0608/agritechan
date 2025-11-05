// ========== STATE MANAGEMENT ==========
let currentUser = null;
let currentLanguage = 'en';
let recognition = null;
let isListening = false;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('agritech_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showPage('dashboard-page');
        loadUserData();
        loadDashboardContent();
    }
    
    // Initialize speech recognition
    initSpeechRecognition();
});

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

// ========== AUTHENTICATION ==========
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation (in real app, use backend)
    if (email && password) {
        // Create or retrieve user
        currentUser = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            points: 250,
            level: 3,
            badges: 5,
            challengesCompleted: 12,
            streak: 3,
            region: 'India',
            crops: ['Rice', 'Wheat']
        };
        
        // Save to localStorage
        localStorage.setItem('agritech_user', JSON.stringify(currentUser));
        
        // Show dashboard
        showPage('dashboard-page');
        loadUserData();
        loadDashboardContent();
        showToast('Login successful!', 'success');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const region = document.getElementById('signup-region').value;
    const crops = document.getElementById('signup-crops').value.split(',').map(c => c.trim());
    
    if (name && email && password && region && crops) {
        currentUser = {
            id: Date.now(),
            name: name,
            email: email,
            points: 0,
            level: 1,
            badges: 0,
            challengesCompleted: 0,
            streak: 0,
            region: region,
            crops: crops
        };
        
        localStorage.setItem('agritech_user', JSON.stringify(currentUser));
        showPage('dashboard-page');
        loadUserData();
        loadDashboardContent();
        showToast('Account created successfully!', 'success');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('agritech_user');
        showPage('landing-page');
        showToast('Logged out successfully', 'success');
    }
}

// ========== USER DATA ==========
function loadUserData() {
    if (!currentUser) return;
    
    // Update navbar
    document.getElementById('user-avatar').textContent = currentUser.name[0].toUpperCase();
    document.getElementById('user-points').textContent = currentUser.points;
    
    // Update dashboard
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-streak').textContent = currentUser.streak;
    document.getElementById('dashboard-points').textContent = currentUser.points;
    document.getElementById('user-level').textContent = currentUser.level;
    
    // Update profile
    document.getElementById('profile-avatar').textContent = currentUser.name[0].toUpperCase();
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-level').textContent = currentUser.level;
    document.getElementById('profile-info-name').textContent = currentUser.name;
    document.getElementById('profile-info-email').textContent = currentUser.email;
    document.getElementById('profile-info-region').textContent = currentUser.region;
    document.getElementById('profile-info-crops').textContent = currentUser.crops.join(', ');
}

// ========== SIDEBAR ==========
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open');
    } else {
        sidebar.classList.toggle('closed');
        mainContent.classList.toggle('full-width');
    }
}

function showDashboardSection(sectionName) {
    // Remove active class from all sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    event.target.closest('.sidebar-item').classList.add('active');
    
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-content').classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// ========== DASHBOARD CONTENT ==========
function loadDashboardContent() {
    loadChallenges();
    loadLessons();
    loadSchemes();
    loadLeaderboard();
}

function loadChallenges() {
    const challenges = [
        {
            id: 1,
            title: 'Water Conservation',
            description: 'Learn 3 water-saving techniques and implement one',
            points: 50,
            duration: '30 min',
            difficulty: 'Easy',
            icon: '💧'
        },
        {
            id: 2,
            title: 'Organic Fertilizer',
            description: 'Create compost from kitchen waste',
            points: 100,
            duration: '1 hour',
            difficulty: 'Medium',
            icon: '🌿'
        },
        {
            id: 3,
            title: 'Crop Rotation',
            description: 'Plan a 3-season crop rotation schedule',
            points: 150,
            duration: '2 hours',
            difficulty: 'Hard',
            icon: '🌾'
        },
        {
            id: 4,
            title: 'Soil Testing',
            description: 'Test your soil pH and share results',
            points: 75,
            duration: '45 min',
            difficulty: 'Easy',
            icon: '🧪'
        }
    ];
    
    const container = document.getElementById('challenges-list');
    container.innerHTML = challenges.map(challenge => `
        <div class="challenge-card card">
            <div class="challenge-header">
                <div class="challenge-icon">${challenge.icon}</div>
                <div class="challenge-difficulty" style="color: ${getDifficultyColor(challenge.difficulty)}">
                    ${challenge.difficulty}
                </div>
            </div>
            <h3 class="challenge-title">${challenge.title}</h3>
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-meta">
                <div class="meta-item">⏱️ ${challenge.duration}</div>
                <div class="meta-item">⭐ ${challenge.points} XP</div>
            </div>
            <button class="btn btn-primary btn-block" onclick="completeChallenge(${challenge.id}, ${challenge.points})">
                Start Challenge
            </button>
        </div>
    `).join('');
}

function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'Easy': return '#4CAF50';
        case 'Medium': return '#FF9800';
        case 'Hard': return '#F44336';
        default: return '#757575';
    }
}

function completeChallenge(challengeId, points) {
    if (!currentUser) return;
    
    currentUser.points += points;
    currentUser.challengesCompleted++;
    currentUser.level = Math.floor(currentUser.points / 100) + 1;
    
    localStorage.setItem('agritech_user', JSON.stringify(currentUser));
    loadUserData();
    
    showToast(`Challenge completed! +${points} XP`, 'success');
}

function loadLessons() {
    const lessons = [
        {
            id: 1,
            title: 'Introduction to Sustainable Farming',
            description: 'Learn the basics of eco-friendly agriculture',
            duration: '15 min',
            category: 'Basics',
            icon: '📚',
            completed: true
        },
        {
            id: 2,
            title: 'Water Management Techniques',
            description: 'Efficient irrigation and water conservation',
            duration: '20 min',
            category: 'Water',
            icon: '💧',
            completed: true
        },
        {
            id: 3,
            title: 'Organic Pest Control',
            description: 'Natural methods to protect your crops',
            duration: '25 min',
            category: 'Pest Control',
            icon: '🐛',
            completed: false
        },
        {
            id: 4,
            title: 'Soil Health & Fertility',
            description: 'Understanding and improving soil quality',
            duration: '30 min',
            category: 'Soil',
            icon: '🌱',
            completed: false
        },
        {
            id: 5,
            title: 'Crop Rotation Strategies',
            description: 'Maximize yield with proper rotation',
            duration: '20 min',
            category: 'Crops',
            icon: '🌾',
            completed: false
        },
        {
            id: 6,
            title: 'Composting 101',
            description: 'Create your own organic fertilizer',
            duration: '15 min',
            category: 'Composting',
            icon: '♻️',
            completed: false
        }
    ];
    
    const container = document.getElementById('lessons-list');
    container.innerHTML = lessons.map(lesson => `
        <div class="lesson-card card ${lesson.completed ? 'completed' : ''}">
            <div class="lesson-category">${lesson.category}</div>
            <div class="feature-icon">${lesson.icon}</div>
            <h3 class="lesson-title">${lesson.title}</h3>
            <p class="lesson-description">${lesson.description}</p>
            <div class="lesson-footer">
                <span class="lesson-duration">⏱️ ${lesson.duration}</span>
                ${lesson.completed 
                    ? '<button class="btn btn-secondary">✅ Completed</button>' 
                    : '<button class="btn btn-primary" onclick="startLesson(' + lesson.id + ')">▶️ Start Lesson</button>'}
            </div>
        </div>
    `).join('');
}

function startLesson(lessonId) {
    showToast('Lesson started! Complete it to earn XP', 'success');
}

function loadSchemes() {
    const schemes = [
        {
            id: 1,
            name: 'PM-KISAN',
            description: 'Financial benefit of ₹6000 per year for all farmers',
            eligibility: 'All farmers',
            icon: '💰'
        },
        {
            id: 2,
            name: 'Soil Health Card Scheme',
            description: 'Free soil testing and personalized recommendations',
            eligibility: 'All farmers',
            icon: '🌱'
        },
        {
            id: 3,
            name: 'Pradhan Mantri Fasal Bima Yojana',
            description: 'Comprehensive crop insurance scheme',
            eligibility: 'All farmers',
            icon: '🛡️'
        },
        {
            id: 4,
            name: 'Kisan Credit Card',
            description: 'Easy credit facility for agricultural needs',
            eligibility: 'Land-owning farmers',
            icon: '💳'
        }
    ];
    
    const container = document.getElementById('schemes-list');
    container.innerHTML = schemes.map(scheme => `
        <div class="card scheme-card">
            <div class="feature-icon">${scheme.icon}</div>
            <h3>${scheme.name}</h3>
            <p>${scheme.description}</p>
            <div class="scheme-eligibility">Eligibility: ${scheme.eligibility}</div>
            <button class="btn btn-primary">Learn More</button>
        </div>
    `).join('');
}

function loadLeaderboard() {
    const topFarmers = [
        { rank: 1, name: 'Rajesh Kumar', points: 5200, region: 'Punjab', avatar: 'R' },
        { rank: 2, name: 'Priya Singh', points: 4800, region: 'Maharashtra', avatar: 'P' },
        { rank: 3, name: 'Ahmed Ali', points: 4500, region: 'Uttar Pradesh', avatar: 'A' },
        { rank: 4, name: currentUser?.name || 'You', points: currentUser?.points || 250, region: currentUser?.region || 'India', avatar: currentUser?.name?.[0] || 'Y' },
        { rank: 5, name: 'Lakshmi Devi', points: 4000, region: 'Tamil Nadu', avatar: 'L' }
    ];
    
    const container = document.getElementById('leaderboard-list');
    container.innerHTML = topFarmers.map(farmer => `
        <div class="leaderboard-row card ${farmer.name === currentUser?.name ? 'current-user' : ''}">
            <div class="rank" style="font-size: 24px; font-weight: 700; color: #4CAF50; min-width: 50px;">
                #${farmer.rank}
            </div>
            <div class="user-avatar" style="width: 50px; height: 50px;">
                ${farmer.avatar}
            </div>
            <div class="farmer-info" style="flex: 1;">
                <div class="farmer-name" style="font-size: 18px; font-weight: 600;">${farmer.name}</div>
                <div class="farmer-region" style="font-size: 14px; color: #9E9E9E;">${farmer.region}</div>
            </div>
            <div class="farmer-points" style="font-size: 20px; font-weight: 700; color: #2E7D32;">
                ${farmer.points} XP
            </div>
        </div>
    `).join('');
}

// ========== LANGUAGE ==========
function toggleLanguages() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('hidden');
}

function changeLanguage(code, name) {
    currentLanguage = code;
    document.getElementById('current-language').textContent = name;
    document.getElementById('language-dropdown').classList.add('hidden');
    showToast(`Language changed to ${name}`, 'success');
}

// ========== VOICE SEARCH ==========
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            document.getElementById('voice-transcript').textContent = transcript;
            
            if (event.results[current].isFinal) {
                document.getElementById('search-input').value = transcript;
                stopVoiceSearch();
            }
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoiceSearch();
            showToast('Voice recognition error. Please try again.', 'error');
        };
        
        recognition.onend = () => {
            isListening = false;
            document.getElementById('mic-icon').classList.remove('listening');
            document.getElementById('voice-btn').textContent = 'Start';
            document.getElementById('voice-instruction').textContent = 'Click Start to begin voice search';
        };
    }
}

function startVoiceSearch() {
    document.getElementById('voice-modal').classList.remove('hidden');
}

function stopVoiceSearch() {
    if (recognition && isListening) {
        recognition.stop();
    }
    document.getElementById('voice-modal').classList.add('hidden');
    document.getElementById('voice-transcript').textContent = '';
}

function toggleVoiceRecognition() {
    if (!recognition) {
        showToast('Voice recognition not supported', 'error');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        isListening = true;
        recognition.start();
        document.getElementById('mic-icon').classList.add('listening');
        document.getElementById('voice-btn').textContent = 'Stop';
        document.getElementById('voice-instruction').textContent = 'Listening... Speak now';
    }
}

// ========== AI CHAT ==========
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML += `<div class="message user">${message}</div>`;
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const responses = [
            'That\'s a great question! For sustainable farming, I recommend focusing on crop rotation and organic composting.',
            'Based on your region, you should consider water conservation techniques like drip irrigation.',
            'I suggest checking out our lessons on organic pest control. It\'s very effective and eco-friendly!',
            'Have you tried mulching? It helps retain soil moisture and prevents weed growth.',
            'For better soil health, consider using green manure and cover crops between seasons.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        messagesContainer.innerHTML += `<div class="message bot">${randomResponse}</div>`;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// ========== NOTIFICATIONS ==========
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ========== WINDOW RESIZE ==========
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        if (!sidebar.classList.contains('closed')) {
            mainContent.classList.remove('full-width');
        }
    } else {
        sidebar.classList.remove('closed');
        mainContent.classList.add('full-width');
    }
});

// ========== CLOSE DROPDOWNS ON OUTSIDE CLICK ==========
document.addEventListener('click', (event) => {
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageSelector && !languageSelector.contains(event.target)) {
        languageDropdown.classList.add('hidden');
    }
});
