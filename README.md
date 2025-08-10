# 🎓 EduBuddy - AI-Powered Learning Platform

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-Active-brightgreen.svg)]()

A comprehensive AI-powered educational platform that revolutionizes learning through gamification, personalized AI assistance, and advanced progress tracking. EduBuddy serves both students and teachers with tailored experiences for enhanced education.

## 🌟 Key Features

### 🤖 AI-Powered Learning
- **Intelligent Chat Assistant** with subject-specific expertise
- **Role-aware responses** optimized for students and teachers
- **Real-time AI tutoring** with markdown-formatted explanations
- **Multi-subject support** (Math, Science, History, Literature, Geography)

### 🎮 Gamification System
- **XP Points & Leveling** system to motivate learning
- **Achievement Badges** with 8+ unique accomplishments
- **Daily Learning Streaks** to build consistent habits
- **Star Collection** system for milestone rewards
- **Interactive Challenges** with instant feedback

### 📚 Student Tools
- **Personalized Learning Paths** with progress tracking
- **AI-Generated Flashcards** for effective memorization
- **Study Timer** with Pomodoro technique integration
- **Smart Notes System** for organized study materials
- **Daily Challenges** with adaptive difficulty
- **Comprehensive Analytics** dashboard

### 👨‍🏫 Teacher Tools
- **Intelligent Lesson Planner** with AI assistance
- **Student Progress Monitoring** with detailed insights
- **Assignment Management** system
- **Digital Gradebook** with automated calculations
- **Class Analytics** for performance optimization
- **Resource Library** for teaching materials

### 📊 Advanced Analytics
- **Learning Velocity Tracking** with trend analysis
- **Subject Mastery Visualization** 
- **Performance Insights** with AI recommendations
- **Weekly Activity Reports**
- **Real-time Progress Monitoring**

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18.x or higher)
- **npm** or **yarn** package manager
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edubuddy.git
   cd edubuddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_AI_API_KEY=your_ai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Backend Setup (Optional - for AI features)

1. **Set up the AI backend**
   ```bash
   cd backend
   npm install
   node server.js
   ```

2. **Configure AI integration**
   - Update the AI API endpoint in the frontend
   - Ensure proper API keys are configured

## 💻 Usage

### For Students

1. **Getting Started**
   - Select "Student" role from the sidebar
   - Start chatting with the AI tutor
   - Choose your subject area for personalized help

2. **Learning Features**
   - Use **Chat** for instant AI tutoring
   - Track progress in **Dashboard**
   - Follow **Learning Paths** for structured learning
   - Complete **Daily Challenges** for XP
   - Create **Flashcards** for memorization
   - Use **Study Timer** for focused sessions

3. **Progress Tracking**
   - Monitor your **level and XP**
   - View **achievement badges**
   - Analyze your **learning patterns**
   - Track **subject mastery**

### For Teachers

1. **Getting Started**
   - Switch to "Teacher" role
   - Access the comprehensive teacher dashboard
   - Set up your class and students

2. **Teaching Tools**
   - Create lessons with **Lesson Planner**
   - Monitor students in **My Students**
   - Assign tasks via **Assignments**
   - Track grades in **Gradebook**
   - Access **Teaching Resources**

3. **Analytics & Insights**
   - Review **Class Analytics**
   - Monitor student **progress trends**
   - Generate **performance reports**
   - Identify students needing **additional support**

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **JavaScript ES6+** - Core programming language
- **CSS3** with custom styling - Advanced styling
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering

### Backend (Optional)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **AI Integration** - Custom API endpoints

### Features
- **Responsive Design** - Mobile-first approach
- **Local Storage** - Client-side data persistence
- **Real-time Updates** - Dynamic content updates
- **Modern Animations** - Smooth user experience

## 📱 Responsive Design

EduBuddy is fully responsive and works seamlessly across:
- **Desktop** computers (1024px+)
- **Tablets** (768px - 1024px)
- **Mobile phones** (320px - 768px)

### Mobile Features
- Collapsible navigation menu
- Touch-optimized interface
- Swipe gestures support
- Mobile-specific layouts

## 🎨 UI/UX Features

### Design System
- **Dark theme** with neon accents
- **Glassmorphism** effects
- **Smooth animations** and transitions
- **Consistent color palette**
- **Modern typography**

### User Experience
- **Intuitive navigation**
- **Visual feedback** for interactions
- **Progress visualization**
- **Error handling** with user-friendly messages
- **Accessibility** considerations

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AI_API_KEY=your_openai_api_key

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_SOCIAL_FEATURES=true
REACT_APP_DEBUG_MODE=false
```

### Customization Options
- **Theme colors** in `src/styles/theme.js`
- **AI prompts** in `src/config/aiConfig.js`
- **Gamification settings** in `src/config/gameConfig.js`
- **Subject configuration** in `src/config/subjects.js`

## 📚 API Documentation

### Core Endpoints
```javascript
// Chat with AI
POST /api/chat
{
  "message": "Explain photosynthesis",
  "subject": "Science",
  "userRole": "student"
}

// Get user progress
GET /api/user/progress/:userId

// Update user stats
PUT /api/user/stats/:userId
{
  "xp": 100,
  "level": 5,
  "streak": 7
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow **React best practices**
- Maintain **consistent code style**
- Write **meaningful commit messages**
- Add **comments** for complex logic
- Test your changes thoroughly

### Code Style
```javascript
// Use functional components with hooks
const MyComponent = () => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Side effects here
  }, [dependencies]);
  
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};
```

## 🐛 Bug Reports & Feature Requests

### Reporting Bugs
1. Check existing **issues** first
2. Create a **detailed bug report**
3. Include **screenshots** if applicable
4. Provide **steps to reproduce**
5. Mention your **browser/OS**

### Feature Requests
1. **Search** existing feature requests
2. **Describe** the feature clearly
3. **Explain** the use case
4. **Provide** mockups if possible

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 EduBuddy Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Lucide Icons** - For beautiful icons
- **OpenAI** - For AI integration possibilities
- **Education Community** - For inspiration and feedback

## 📞 Support & Contact

- **Documentation**: [docs.edubuddy.com](https://docs.edubuddy.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/edubuddy/issues)
- **Email**: support@edubuddy.com
- **Discord**: [Join our community](https://discord.gg/edubuddy)

## 🗺️ Roadmap

### Version 2.0 (Upcoming)
- [ ] **Multi-language support**
- [ ] **Voice interaction**
- [ ] **Collaborative learning**
- [ ] **Advanced AI models**
- [ ] **Mobile app**

### Version 2.1
- [ ] **Offline mode**
- [ ] **Custom themes**
- [ ] **Parent dashboard**
- [ ] **Integration with LMS**
- [ ] **Advanced analytics**

---

<div align="center">

**Built with ❤️ for educators and learners worldwide**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/edubuddy.svg?style=social)](https://github.com/yourusername/edubuddy/stargazers)
[![Twitter Follow](https://img.shields.io/twitter/follow/edubuddy?style=social)](https://twitter.com/edubuddy)

[Website](https://edubuddy.com) • [Documentation](https://docs.edubuddy.com) • [Community](https://discord.gg/edubuddy)

</div>
