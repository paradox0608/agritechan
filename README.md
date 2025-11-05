# 🌱 AgriTech - Gamified Sustainable Farming Platform

A simple, standalone HTML/CSS/JavaScript web application for promoting sustainable agriculture through gamification.

## 🎯 Features

### ✨ Implemented Features

- **🎮 Gamified Learning**
  - Earn XP points and level up
  - Complete challenges for rewards
  - Track your streak and progress
  - Unlock badges and achievements

- **🗣️ Multi-Language Support**
  - Switch between 5+ languages
  - Real-time language selection
  - Voice recognition support

- **🎙️ Voice Search**
  - Speech-to-text functionality
  - Voice commands for search
  - Web Speech API integration

- **👤 User Authentication**
  - Login/Signup system
  - Profile management
  - Progress tracking
  - Local storage persistence

- **📚 Educational Content**
  - Interactive lessons
  - Daily/Weekly challenges
  - Government schemes database
  - Progress tracking

- **🤖 AI Advisory**
  - Chatbot interface
  - Farming advice
  - Interactive responses

- **🏆 Leaderboard**
  - Global rankings
  - User highlighting
  - Point system

- **📱 Fully Responsive**
  - Works on desktop, tablet, and mobile
  - Adaptive sidebar navigation
  - Touch-friendly interface

## 📁 File Structure

```
agritech-simple/
├── index.html      # Main HTML file with all pages
├── style.css       # Complete stylesheet
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🚀 Quick Start

### Option 1: Direct Open
1. Navigate to `C:\Users\anjal\agritech-simple`
2. Double-click `index.html`
3. It will open in your default browser

### Option 2: Live Server (Recommended)
If you have VS Code with Live Server extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Access at `http://localhost:5500`

### Option 3: Local Server
Using Python:
```bash
# Navigate to folder
cd C:\Users\anjal\agritech-simple

# Python 3
python -m http.server 8000

# Access at http://localhost:8000
```

Using Node.js:
```bash
npx http-server -p 8000
```

## 🎨 Design

- **Color Scheme**: Nature-inspired greens and earth tones
- **Font**: Poppins (from Google Fonts)
- **Icons**: Emoji-based for simplicity
- **Layout**: Responsive grid system

## 📖 How to Use

### 1. Landing Page
- View platform features
- Click "Get Started" or "Login"

### 2. Signup/Login
- Create account with:
  - Name
  - Email
  - Password
  - Region
  - Crops you grow
- Or login with existing credentials

### 3. Dashboard
- View your stats (Points, Level, Badges, Streak)
- Quick action cards
- Recent achievements

### 4. Challenges
- Browse daily/weekly challenges
- Click "Start Challenge" to complete
- Earn XP and track progress

### 5. Lessons
- Learn about sustainable farming
- Complete lessons to earn XP
- Track completed modules

### 6. Government Schemes
- Browse available schemes
- Search functionality
- Learn about eligibility

### 7. Leaderboard
- See global rankings
- Your position highlighted
- Compare with other farmers

### 8. AI Advisory
- Chat with AI assistant
- Ask farming questions
- Get personalized advice

### 9. Profile
- View personal information
- Check achievements
- Track statistics

### 10. Features Available Everywhere
- **Voice Search**: Click microphone icon in navbar
- **Language Switch**: Click globe icon
- **Sidebar Navigation**: Click menu icon (☰)
- **Search**: Use search bar in navbar

## 🎮 Demo Credentials

For testing, use any email/password combination:
- Email: `farmer@agritech.com`
- Password: `anything`

The system will create a demo user with initial stats.

## 🔧 Customization

### Change Colors
Edit `style.css` line 2-16:
```css
:root {
    --primary-green: #4CAF50;
    --dark-green: #2E7D32;
    /* ... more colors */
}
```

### Add More Challenges
Edit `script.js` line 177-214 in `loadChallenges()` function

### Add More Lessons
Edit `script.js` line 261-332 in `loadLessons()` function

### Add Languages
1. Add to `script.js` line 418 in `changeLanguage()` function
2. Update HTML dropdown in `index.html` line 194-199

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Voice features require Chrome/Edge (Web Speech API)

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly buttons
- Collapsible sidebar
- Optimized for all screen sizes

## 💾 Data Storage

- Uses **localStorage** for persistence
- No backend required
- Data stays on your device
- Clear browser cache to reset

## 🔐 Security Note

This is a demo application. For production use:
- Implement proper backend authentication
- Use HTTPS
- Add input validation
- Implement rate limiting
- Use secure password hashing
- Add CSRF protection

## 🚀 Future Enhancements

To extend this app, you could add:
- Real backend with Node.js/Express
- Database (MongoDB/PostgreSQL)
- Real AI integration (OpenAI API)
- Weather API integration
- Market rates API
- Push notifications
- Progressive Web App (PWA)
- Social features
- Photo upload
- Video lessons
- Payment integration

## 🐛 Troubleshooting

### Voice search not working?
- Ensure you're using Chrome or Edge
- Check microphone permissions
- Try HTTPS (localhost works)

### Styles not loading?
- Check file paths are correct
- Ensure all 3 files are in same folder
- Clear browser cache

### Data disappeared?
- Check if browser cache was cleared
- localStorage might be disabled
- Try incognito/private mode

## 📄 License

This project is open-source and free to use for educational purposes.

## 👥 Credits

- Design: Nature-inspired sustainable theme
- Icons: Emoji (universal compatibility)
- Fonts: Google Fonts (Poppins)
- Framework: Vanilla JavaScript (no dependencies!)

---

**🌱 Built for a greener future | AgriTech 2025**
