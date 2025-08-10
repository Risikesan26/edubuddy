import React, { useState, useEffect, useRef } from "react";

import {
  Send,
  BookOpen,
  Star,
  Brain,
  Lightbulb,
  Trophy,
  Sparkles,
  User,
  Settings,
  BarChart3,
  Target,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Download,
  FileText,
  Play,
  ChevronRight,
  Home,
  MessageCircle,
  Menu,
  Pause,
  X,
  Shield,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const EduBuddyComplete = () => {
  // Core State
  const [currentView, setCurrentView] = useState("chat");
  const [userRole, setUserRole] = useState("student");
  const [currentNote, setCurrentNote] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Risikesan",
    avatar: "👨‍🎓",
    grade: "10th Grade",
    joinDate: "2024-01-15",
  });

  // Chat State
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "EduBuddy",
      text: "Welcome back,Risikesan Ready for today's learning adventure? 🎓",
      timestamp: new Date(),
      isWelcome: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("General");
  const [showStarAnimation, setShowStarAnimation] = useState(false);
  const messagesEndRef = useRef(null);
  const [studyTimer, setStudyTimer] = useState({
  minutes: 25,
  seconds: 0,
  isActive: false,
  isBreak: false,
  sessions: 0
});
  // Replace the current notes state initialization
  const [notes, setNotes] = useState({
  student: [
    { id: 1, title: 'Math Notes', content: '# Quadratic Equations\n\nRemember the formula: ax² + bx + c = 0', subject: 'Math', date: new Date() }
  ],
  teacher: [
    { id: 2, title: 'Lesson Plan - Quadratic Equations', content: '# Teaching Plan\n\n## Objectives\n- Students will understand quadratic formula\n- Practice solving equations', subject: 'Math', date: new Date() }
  ]
});
  // User Progress & Analytics
  const [userStats, setUserStats] = useState({
    totalStars: 125,
    xpPoints: 2850,
    level: 12,
    streak: 7,
    questionsAsked: 89,
    subjectMastery: {
      Math: { level: 8, xp: 650, accuracy: 87 },
      Science: { level: 6, xp: 420, accuracy: 92 },
      History: { level: 4, xp: 280, accuracy: 78 },
      Literature: { level: 7, xp: 550, accuracy: 85 },
      Geography: { level: 3, xp: 180, accuracy: 81 },
    },
    badges: [
      {
        id: 1,
        name: "First Steps",
        icon: "👶",
        earned: true,
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "Math Whiz",
        icon: "🔢",
        earned: true,
        date: "2024-02-01",
      },
      {
        id: 3,
        name: "Science Explorer",
        icon: "🔬",
        earned: true,
        date: "2024-02-15",
      },
      {
        id: 4,
        name: "History Buff",
        icon: "📜",
        earned: true,
        date: "2024-03-01",
      },
      {
        id: 5,
        name: "Week Warrior",
        icon: "⚡",
        earned: true,
        date: "2024-03-10",
      },
      { id: 6, name: "Question Master", icon: "❓", earned: false },
      { id: 7, name: "Perfect Score", icon: "💯", earned: false },
      { id: 8, name: "Study Streak", icon: "🔥", earned: false },
    ],
    weeklyActivity: [
      { day: "Mon", questions: 12, xp: 240 },
      { day: "Tue", questions: 8, xp: 160 },
      { day: "Wed", questions: 15, xp: 300 },
      { day: "Thu", questions: 10, xp: 200 },
      { day: "Fri", questions: 9, xp: 180 },
      { day: "Sat", questions: 6, xp: 120 },
      { day: "Sun", questions: 11, xp: 220 },
    ],
  });

  const questionBank = [
    {
      id: 1,
      subject: "Science",
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
      difficulty: "Medium",
      xpReward: 50,
      completed: false,
    },
    {
      id: 2,
      subject: "Math",
      question: "What is 8 × 7?",
      options: ["54", "56", "64", "49"],
      correct: 1,
      difficulty: "Easy",
      xpReward: 30,
      completed: false,
    },
    {
      id: 3,
      subject: "Geography",
      question: "What is the capital of Canada?",
      options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
      correct: 1,
      difficulty: "Hard",
      xpReward: 80,
      completed: false,
    },
  ];

  const [dailyChallenge, setDailyChallenge] = useState(() => {
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    return questionBank[randomIndex];
  });

  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      subject: "Math",
      question: "What is the quadratic formula?",
      answer: "x = (-b ± √(b²-4ac)) / 2a",
      mastered: false,
    },
    {
      id: 2,
      subject: "Science",
      question: "What is photosynthesis?",
      answer: "The process by which plants convert sunlight into energy",
      mastered: true,
    },
    {
      id: 3,
      subject: "History",
      question: "When did World War II end?",
      answer: "1945",
      mastered: true,
    },
  ]);

  // Learning Path State
  const [learningPaths, setLearningPaths] = useState({
    Math: {
      currentTopic: "Quadratic Equations",
      progress: 68,
      nextMilestone: "Complete 5 more problems",
      topics: [
        { name: "Basic Algebra", completed: true, score: 92 },
        { name: "Linear Equations", completed: true, score: 88 },
        { name: "Quadratic Equations", completed: false, score: 68 },
        { name: "Polynomials", completed: false, score: 0 },
        { name: "Functions", completed: false, score: 0 },
      ],
    },
    Science: {
      currentTopic: "Chemical Reactions",
      progress: 45,
      nextMilestone: "Study 3 more reaction types",
      topics: [
        { name: "Atomic Structure", completed: true, score: 95 },
        { name: "Chemical Bonds", completed: true, score: 87 },
        { name: "Chemical Reactions", completed: false, score: 45 },
        { name: "Acids and Bases", completed: false, score: 0 },
        { name: "Organic Chemistry", completed: false, score: 0 },
      ],
    },
  });

  // Mobile & UI State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add this useEffect with your other useEffects
  useEffect(() => {
  setCurrentNote(null);
}, [userRole]);
  

  // Modern Styles - Dark Theme with Neon Accents - FIXED WHITE SPACE
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      background:
        "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: 0,
    },

    // Add animated background particles
    backgroundPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 255, 198, 0.05) 0%, transparent 50%)
      `,
      animation: "float 20s ease-in-out infinite",
    },

    sidebar: {
      width: "280px",
      background: "rgba(15, 15, 35, 0.95)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(120, 119, 198, 0.2)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      zIndex: 10,
      boxShadow: "0 0 50px rgba(120, 119, 198, 0.1)",
      height: "100vh",
      flexShrink: 0,
    },

    sidebarHeader: {
      padding: "32px 24px 24px",
      borderBottom: "1px solid rgba(120, 119, 198, 0.1)",
      textAlign: "center",
      background:
        "linear-gradient(135deg, rgba(120, 119, 198, 0.1), rgba(255, 119, 198, 0.05))",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      fontSize: "28px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #7877c6, #ff77c6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "8px",
      filter: "drop-shadow(0 0 20px rgba(120, 119, 198, 0.3))",
    },

    subtitle: {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "14px",
      fontWeight: "500",
    },

    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "20px",
      margin: "16px",
      background:
        "linear-gradient(135deg, rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.1))",
      borderRadius: "16px",
      border: "1px solid rgba(120, 119, 198, 0.3)",
      transition: "all 0.3s ease",
    },

    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #7877c6, #ff77c6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      boxShadow: "0 0 20px rgba(120, 119, 198, 0.4)",
      animation: "pulse 3s ease-in-out infinite",
    },

    nav: {
      flex: 1,
      padding: "0 16px",
      overflowY: "auto",
    },

    navItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "16px 20px",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "15px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.7)",
      marginBottom: "8px",
      position: "relative",
      overflow: "hidden",
    },

    navItemActive: {
      background: "linear-gradient(135deg, #7877c6, #ff77c6)",
      color: "white",
      transform: "translateX(4px) scale(1.02)",
      boxShadow: "0 8px 25px rgba(120, 119, 198, 0.4)",
    },

    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
      height: "100vh",
    },

    header: {
      background: "rgba(15, 15, 35, 0.9)",
      backdropFilter: "blur(20px)",
      padding: "20px 32px",
      borderBottom: "1px solid rgba(120, 119, 198, 0.2)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 10,
      flexShrink: 0,
    },

    headerTitle: {
      fontSize: "32px",
      fontWeight: "800",
      color: "white",
      textShadow: "0 0 20px rgba(120, 119, 198, 0.5)",
      margin: 0,
    },

    statsBar: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
    },

    statCard: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      background: "rgba(120, 119, 198, 0.2)",
      borderRadius: "25px",
      fontSize: "14px",
      fontWeight: "700",
      color: "white",
      border: "1px solid rgba(120, 119, 198, 0.3)",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },

    contentArea: {
      flex: 1,
      padding: "24px",
      overflow: "auto",
      position: "relative",
      height: "calc(100vh - 100px)",
    },

    card: {
      background: "rgba(26, 26, 46, 0.8)",
      borderRadius: "20px",
      padding: "32px",
      border: "1px solid rgba(120, 119, 198, 0.2)",
      backdropFilter: "blur(20px)",
      marginBottom: "24px",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },

    cardGlow: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(135deg, rgba(120, 119, 198, 0.1), rgba(255, 119, 198, 0.05))",
      borderRadius: "20px",
      opacity: 0,
      transition: "opacity 0.3s ease",
      pointerEvents: "none",
    },

    button: {
      background: "linear-gradient(135deg, #7877c6, #ff77c6)",
      color: "white",
      border: "none",
      padding: "16px 32px",
      borderRadius: "12px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "15px",
      boxShadow: "0 8px 25px rgba(120, 119, 198, 0.3)",
      position: "relative",
      overflow: "hidden",
    },

    input: {
      flex: 1,
      padding: "16px 24px",
      background: "rgba(26, 26, 46, 0.8)",
      border: "2px solid rgba(120, 119, 198, 0.3)",
      borderRadius: "12px",
      outline: "none",
      color: "white",
      fontSize: "15px",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "24px",
      marginBottom: "24px",
    },

    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "700",
      background: "rgba(120, 119, 198, 0.2)",
      color: "#7877c6",
      border: "1px solid rgba(120, 119, 198, 0.3)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    // Chat specific styles
    chatContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "rgba(26, 26, 46, 0.6)",
      borderRadius: "20px",
      border: "1px solid rgba(120, 119, 198, 0.2)",
      backdropFilter: "blur(20px)",
      overflow: "hidden",
    },

    messagesArea: {
      flex: 1,
      overflowY: "auto",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },

    chatInputArea: {
      padding: "24px",
      background: "rgba(15, 15, 35, 0.8)",
      borderTop: "1px solid rgba(120, 119, 198, 0.2)",
      flexShrink: 0,
    },

    messageUser: {
      alignSelf: "flex-end",
      maxWidth: "75%",
      padding: "16px 24px",
      background: "linear-gradient(135deg, #7877c6, #ff77c6)",
      borderRadius: "20px 20px 6px 20px",
      color: "white",
      fontWeight: "500",
      boxShadow: "0 8px 25px rgba(120, 119, 198, 0.3)",
      animation: "slideInRight 0.3s ease",
    },

    messageBot: {
      alignSelf: "flex-start",
      maxWidth: "75%",
      padding: "16px 24px",
      background: "rgba(26, 26, 46, 0.9)",
      border: "1px solid rgba(120, 119, 198, 0.3)",
      borderRadius: "20px 20px 20px 6px",
      color: "white",
      backdropFilter: "blur(10px)",
      animation: "slideInLeft 0.3s ease",
    },

    messageWelcome: {
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      border: "none",
      boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
    },

    select: {
      padding: "12px 16px",
      background: "rgba(26, 26, 46, 0.8)",
      border: "2px solid rgba(120, 119, 198, 0.3)",
      borderRadius: "10px",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      outline: "none",
      cursor: "pointer",
    },
  };

  // Add CSS animations and global styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html, body {
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(1deg); }
        66% { transform: translateY(-10px) rotate(-1deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes slideInRight {
        from { transform: translateX(30px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideInLeft {
        from { transform: translateX(-30px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(120, 119, 198, 0.3); }
        50% { box-shadow: 0 0 40px rgba(120, 119, 198, 0.6), 0 0 60px rgba(255, 119, 198, 0.4); }
      }
      
      .nav-item-hover:hover {
        background: rgba(120, 119, 198, 0.15);
        transform: translateX(8px);
      }
      
      .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 60px rgba(120, 119, 198, 0.4);
      }
      
      .card-hover:hover .card-glow {
        opacity: 1;
      }
      
      .button-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(120, 119, 198, 0.5);
      }
      
      .stat-card-hover:hover {
        transform: scale(1.05);
        background: rgba(120, 119, 198, 0.3);
        box-shadow: 0 8px 25px rgba(120, 119, 198, 0.4);
      }
      
      .input-focus:focus {
        border-color: #7877c6;
        box-shadow: 0 0 0 3px rgba(120, 119, 198, 0.2);
      }
      
      .select-focus:focus {
        border-color: #7877c6;
        box-shadow: 0 0 0 3px rgba(120, 119, 198, 0.2);
      }
      
      /* Scrollbar Styling */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(15, 15, 35, 0.5);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #7877c6, #ff77c6);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #8988d4, #ff88d4);
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  // Utility Functions
  const getXPToNextLevel = () => {
    const baseXP = 200;
    const nextLevelXP = baseXP * userStats.level;
    const currentLevelXP = baseXP * (userStats.level - 1);
    return nextLevelXP - userStats.xpPoints;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Replace the getAIResponse function in your React component with this:

const getAIResponse = async (text) => {
  const roleContext = userRole === 'teacher' 
    ? 'You are EduBuddy assisting a teacher. Provide educational insights, curriculum guidance, student assessment help, and teaching strategies.'
    : 'You are EduBuddy helping a student learn. Provide clear explanations, examples, and encourage learning.';
  
  const fullPrompt = `${roleContext} Subject: ${subject}. Question: ${text}`;

  try {
    // Updated URL - make sure this matches your Railway deployment URL
    const response = await fetch('https://edubuddy-production.up.railway.app/ask', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || '⚠️ No response from EduBuddy.';
  } catch (error) {
    console.error('API Error:', error);
    return '⚠️ Sorry, I\'m having trouble connecting. Please try again!';
  }
};
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      id: messages.length + 1,
      sender: 'You', 
      text: input, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    const botReply = await getAIResponse(input);
    
    const botMessage = { 
      id: messages.length + 2,
      sender: 'EduBuddy', 
      text: botReply, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, botMessage]);
    setInput('');
    setLoading(false);
  };

  // Component Renderers
  const renderNavigation = () => {
    const studentNavItems = [
      { id: "chat", label: "Chat with AI", icon: MessageCircle },
      { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      { id: "learning-paths", label: "Learning Paths", icon: Target },
      { id: "challenges", label: "Daily Challenges", icon: Calendar },
      { id: "flashcards", label: "Flashcards", icon: FileText },
      { id: 'notes', label: 'Notes', icon: BookOpen },
      { id: "achievements", label: "Achievements", icon: Trophy },
      { id: "analytics", label: "Analytics", icon: TrendingUp },
      { id: 'study-timer', label: 'Study Timer', icon: Clock },
    ];

    const teacherNavItems = [
      { id: "chat", label: "AI Assistant", icon: MessageCircle },
      { id: "lesson-planner", label: "Lesson Planner", icon: BookOpen },
      { id: "students", label: "My Students", icon: Users },
      { id: 'notes', label: 'Notes', icon: FileText },
      { id: "assignments", label: "Assignments", icon: FileText },
      { id: "gradebook", label: "Gradebook", icon: BarChart3 },
      { id: "resources", label: "Resources", icon: Lightbulb },
      { id: "analytics", label: "Class Analytics", icon: TrendingUp },
    ];
    const navItems = userRole === "teacher" ? teacherNavItems : studentNavItems;

    return (
      <div style={styles.nav}>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item-hover ${currentView === item.id ? "" : ""}`}
            style={{
              ...styles.navItem,
              ...(currentView === item.id ? styles.navItemActive : {}),
            }}
            onClick={() => {
              setCurrentView(item.id);
              if (isMobile) setIsMobileMenuOpen(false);
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderChatView = () => {
    return (
      <div style={styles.chatContainer}>
        {/* Messages Area */}
        <div style={styles.messagesArea}>
          {messages.map((msg) => (
            <div key={msg.id}>
              {/* Message Header */}
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.5)",
                  marginBottom: "8px",
                  textAlign: msg.sender === "You" ? "right" : "left",
                }}
              >
                {msg.sender} • {formatDate(msg.timestamp)}
              </div>

              {/* Message Content */}
              <div
                style={{
                  ...(msg.sender === "You"
                    ? styles.messageUser
                    : styles.messageBot),
                  ...(msg.isWelcome ? styles.messageWelcome : {}),
                }}
              >
                {msg.sender === "EduBuddy" ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p
                          style={{
                            margin: "0 0 12px 0",
                            lineHeight: "1.6",
                          }}
                        >
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul
                          style={{
                            margin: "8px 0",
                            paddingLeft: "20px",
                          }}
                        >
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol
                          style={{
                            margin: "8px 0",
                            paddingLeft: "20px",
                          }}
                        >
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li
                          style={{
                            margin: "4px 0",
                            lineHeight: "1.5",
                          }}
                        >
                          {children}
                        </li>
                      ),
                      h3: ({ children }) => (
                        <h3
                          style={{
                            margin: "16px 0 8px 0",
                            fontSize: "18px",
                            fontWeight: "700",
                          }}
                        >
                          {children}
                        </h3>
                      ),
                      code: ({ children }) => (
                        <code
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontFamily: "monospace",
                          }}
                        >
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "12px",
                            borderRadius: "8px",
                            overflow: "auto",
                            margin: "8px 0",
                          }}
                        >
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div
              style={{
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 24px",
                background: "rgba(26, 26, 46, 0.9)",
                borderRadius: "20px 20px 20px 6px",
                border: "1px solid rgba(120, 119, 198, 0.3)",
              }}
            >
              <Brain size={20} className="animate-pulse" />
              <span style={{ color: "white" }}>EduBuddy is thinking...</span>
            </div>
          )}

          {/* Auto-scroll reference */}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        <div style={styles.chatInputArea}>
          {/* Subject Selection */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={styles.select}
              className="select-focus"
            >
              <option value="General">🧠 General</option>
              <option value="Math">📊 Math</option>
              <option value="Science">🔬 Science</option>
              <option value="History">📜 History</option>
              <option value="Literature">📚 Literature</option>
              <option value="Geography">🌍 Geography</option>
            </select>
          </div>

          {/* Input and Send Button */}
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything! Try 'Explain photosynthesis' or 'Help with quadratic equations'"
              style={styles.input}
              className="input-focus"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                ...styles.button,
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
              className="button-hover"
            >
              <Send size={18} />
              Ask
            </button>
          </div>
        </div>
      </div>
    );
  };
  const renderLearningPaths = () => (
    <div>
      <div style={styles.grid}>
        {Object.entries(learningPaths).map(([subject, path]) => (
          <div key={subject} style={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
                color: "white",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                }}
              >
                <Target size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{subject} Path</h3>
                <div style={{ fontSize: "14px", color: "#6b7280" }}>
                  {path.currentTopic}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "16px",
              }}
            >
              <div style={{ fontSize: "14px", marginBottom: "8px" }}>
                Progress: {path.progress}%
              </div>
              <div
                style={{
                  height: "8px",
                  background: "#e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    width: `${path.progress}%`,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <div
                style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}
              >
                {path.nextMilestone}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                color: "white",
              }}
            >
              {path.topics.map((topic, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: topic.completed
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(156, 163, 175, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: topic.completed ? "#10b981" : "#9ca3af",
                      }}
                    />
                    <span style={{ fontSize: "14px" }}>{topic.name}</span>
                  </div>
                  {topic.completed && (
                    <span
                      style={{
                        fontSize: "12px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: "#dcfce7",
                        color: "#059669",
                      }}
                    >
                      {topic.score}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div>
      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            color: "white",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Calendar size={24} />
              Daily Challenge
            </h2>
            <p style={{ margin: "4px 0 0", color: "#6b7280" }}>
              Complete today's challenge to earn bonus XP!
            </p>
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              background: dailyChallenge.completed ? "#dcfce7" : "#fef3c7",
              color: dailyChallenge.completed ? "#059669" : "#d97706",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {dailyChallenge.completed
              ? "Completed"
              : `${dailyChallenge.xpReward} XP`}
          </div>
        </div>

        <div
          style={{
            padding: "24px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
            border: "2px solid rgba(102, 126, 234, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "16px",
                background: "rgba(102, 126, 234, 0.2)",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {dailyChallenge.subject}
            </span>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "16px",
                background:
                  dailyChallenge.difficulty === "Easy"
                    ? "#dcfce7"
                    : dailyChallenge.difficulty === "Medium"
                    ? "#fef3c7"
                    : "#fee2e2",
                color:
                  dailyChallenge.difficulty === "Easy"
                    ? "#059669"
                    : dailyChallenge.difficulty === "Medium"
                    ? "#d97706"
                    : "#dc2626",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {dailyChallenge.difficulty}
            </span>
          </div>

          <h3 style={{ marginBottom: "16px" }}>{dailyChallenge.question}</h3>

          <div style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
            {dailyChallenge.options.map((option, index) => (
              <button
                key={index}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "2px solid #e5e7eb",
                  background: "white",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.background =
                    "rgba(102, 126, 234, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.background = "white";
                }}
                onClick={() => {
                  if (index === dailyChallenge.correct) {
                    setDailyChallenge((prev) => ({ ...prev, completed: true }));
                    setUserStats((prev) => ({
                      ...prev,
                      xpPoints: prev.xpPoints + dailyChallenge.xpReward,
                      totalStars: prev.totalStars + 3,
                    }));
                  }
                }}
                disabled={dailyChallenge.completed}
              >
                <span style={{ fontWeight: "600", marginRight: "8px" }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          {!dailyChallenge.completed && (
            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              💡 Choose your answer above to complete the challenge
            </div>
          )}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div style={styles.card}>
        <h3
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "white",
          }}
        >
          <Trophy size={20} />
          Weekly Challenges
        </h3>
        <div style={styles.grid}>
          {[
            {
              name: "Math Marathon",
              progress: 80,
              total: 50,
              current: 40,
              reward: "500 XP",
            },
            {
              name: "Science Streak",
              progress: 60,
              total: 7,
              current: 4,
              reward: "300 XP",
            },
            {
              name: "History Hunter",
              progress: 30,
              total: 20,
              current: 6,
              reward: "400 XP",
            },
          ].map((challenge, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(102, 126, 234, 0.2)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Target size={16} />
                {challenge.name}
              </h4>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "12px",
                }}
              >
                {challenge.current} / {challenge.total} completed
              </div>
              <div
                style={{
                  height: "6px",
                  background: "#e5e7eb",
                  borderRadius: "3px",
                  overflow: "hidden",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    width: `${challenge.progress}%`,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#667eea",
                  fontWeight: "600",
                }}
              >
                Reward: {challenge.reward}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFlashcards = () => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "white",
          }}
        >
          <FileText size={24} />
          AI-Generated Flashcards
        </h2>
        <button
          style={styles.button}
          onClick={() => {
            // Generate new flashcard
            const newCard = {
              id: flashcards.length + 1,
              subject: subject,
              question: `Sample question about ${subject}`,
              answer: `Sample answer for ${subject} topic`,
              mastered: false,
            };
            setFlashcards((prev) => [...prev, newCard]);
          }}
        >
          <Sparkles size={16} />
          Generate New
        </button>
      </div>

      <div style={styles.grid}>
        {flashcards.map((card) => (
          <div
            key={card.id}
            style={{
              ...styles.card,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(0, 0, 0, 0.05)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                display: "flex",
                gap: "8px",
              }}
            >
              <span
                style={{
                  ...styles.badge,
                  background: card.mastered ? "#dcfce7" : "#fef3c7",
                  color: card.mastered ? "#059669" : "#d97706",
                }}
              >
                {card.mastered ? "Mastered" : "Learning"}
              </span>
              <span style={styles.badge}>{card.subject}</span>
            </div>

            <div style={{ marginTop: "40px" }}>
              <h4 style={{ marginBottom: "12px", color: "#ffffffff" }}>
                Q: {card.question}
              </h4>
              <div
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(102, 126, 234, 0.05)",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                A: {card.answer}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
                gap: "8px",
              }}
            >
              <button
                style={{
                  ...styles.button,
                  background: card.mastered
                    ? "linear-gradient(135deg, #f87171, #ef4444)"
                    : "linear-gradient(135deg, #22c55e, #16a34a)",
                  fontSize: "12px",
                  padding: "8px 16px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFlashcards((prev) =>
                    prev.map((c) =>
                      c.id === card.id ? { ...c, mastered: !c.mastered } : c
                    )
                  );
                }}
              >
                {card.mastered ? "Reset" : "Mark Mastered"}
              </button>
              <button
                style={{
                  ...styles.button,
                  background: "linear-gradient(135deg, #9ca3af, #6b7280)",
                  fontSize: "12px",
                  padding: "8px 16px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFlashcards((prev) => prev.filter((c) => c.id !== card.id));
                }}
              >
                <X size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {flashcards.length === 0 && (
          <div
            style={{
              ...styles.card,
              textAlign: "center",
              padding: "48px",
              color: "#6b7280",
            }}
          >
            <FileText
              size={48}
              style={{ margin: "0 auto 16px", opacity: 0.5 }}
            />
            <h3>No flashcards yet</h3>
            <p>
              Start asking questions in the chat to automatically generate
              flashcards!
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div>
      {/* Achievements Overview */}
      <div style={styles.grid}>
        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
              }}
            >
              <Trophy size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                5
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Badges Earned
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#22c55e",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            3 more to unlock! 🎯
          </div>
        </div>

        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                color: "white",
                boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)",
              }}
            >
              <Star size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                125
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Total Points
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.7)",
              position: "relative",
              zIndex: 2,
            }}
          >
            From achievements
          </div>
        </div>

        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
              }}
            >
              <Award size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                62%
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Completion
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#22c55e",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            Great progress! 🚀
          </div>
        </div>
      </div>

      {/* Badges */}
      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <h3
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
            fontSize: "24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Trophy size={24} />
          Achievement Badges
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {userStats.badges.map((badge) => (
            <div
              key={badge.id}
              style={{
                padding: "24px",
                background: badge.earned
                  ? "linear-gradient(135deg, rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.1))"
                  : "rgba(60, 60, 80, 0.3)",
                borderRadius: "16px",
                border: `1px solid ${
                  badge.earned
                    ? "rgba(120, 119, 198, 0.3)"
                    : "rgba(120, 120, 120, 0.2)"
                }`,
                transition: "all 0.3s ease",
                opacity: badge.earned ? 1 : 0.6,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {badge.earned && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  ✓
                </div>
              )}
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  filter: badge.earned ? "none" : "grayscale(100%)",
                }}
              >
                {badge.icon}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  marginBottom: "8px",
                  color: badge.earned ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                {badge.name}
              </div>
              {badge.earned && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: "500",
                  }}
                >
                  Earned {new Date(badge.date).toLocaleDateString()}
                </div>
              )}
              {!badge.earned && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontWeight: "500",
                  }}
                >
                  Not earned yet
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <h3
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
            fontSize: "24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Clock size={24} />
          Recent Achievements
        </h3>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "20px",
              background: "rgba(120, 119, 198, 0.1)",
              borderRadius: "12px",
              marginBottom: "16px",
              border: "1px solid rgba(120, 119, 198, 0.2)",
            }}
          >
            <div style={{ fontSize: "24px" }}>⚡</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Week Warrior Badge Earned!
              </div>
              <div
                style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}
              >
                Completed 7 days of continuous learning
              </div>
            </div>
            <div
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}
            >
              March 10, 2024
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "20px",
              background: "rgba(120, 119, 198, 0.1)",
              borderRadius: "12px",
              marginBottom: "16px",
              border: "1px solid rgba(120, 119, 198, 0.2)",
            }}
          >
            <div style={{ fontSize: "24px" }}>📜</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                History Buff Badge Earned!
              </div>
              <div
                style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}
              >
                Mastered 10 history topics
              </div>
            </div>
            <div
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}
            >
              March 1, 2024
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "20px",
              background: "rgba(120, 119, 198, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(120, 119, 198, 0.2)",
            }}
          >
            <div style={{ fontSize: "24px" }}>🔬</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Science Explorer Badge Earned!
              </div>
              <div
                style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}
              >
                Completed advanced science modules
              </div>
            </div>
            <div
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}
            >
              February 15, 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotes = () => {
  const currentRoleNotes = notes[userRole] || [];
  
  return (
    <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 200px)' }}>
      {/* Notes Sidebar */}
      <div style={{
        width: '300px',
        ...styles.card,
        padding: '20px',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4 style={{ margin: 0, color: 'white' }}>
            {userRole === 'teacher' ? 'Lesson Notes' : 'Study Notes'}
          </h4>
          <button
            onClick={() => {
              const newNote = {
                id: Date.now(),
                title: userRole === 'teacher' ? 'New Lesson Plan' : 'New Note',
                content: '',
                subject: subject,
                date: new Date()
              };
              setNotes(prev => ({
                ...prev,
                [userRole]: [newNote, ...(prev[userRole] || [])]
              }));
              setCurrentNote(newNote);
            }}
            style={{ ...styles.button, padding: '8px 16px', fontSize: '12px' }}
          >
            + New
          </button>
        </div>
        
        {currentRoleNotes.map(note => (
          <div
            key={note.id}
            onClick={() => setCurrentNote(note)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
              background: currentNote?.id === note.id 
                ? 'rgba(120, 119, 198, 0.3)' 
                : 'rgba(120, 119, 198, 0.1)',
              border: `1px solid ${currentNote?.id === note.id ? 'rgba(120, 119, 198, 0.5)' : 'rgba(120, 119, 198, 0.2)'}`,
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontWeight: '600', color: 'white', fontSize: '14px' }}>
              {note.title}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
              {note.subject} • {note.date.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Note Editor */}
      <div style={{ flex: 1, ...styles.card, padding: '20px' }}>
        {currentNote ? (
          <>
            <input
              value={currentNote.title}
              onChange={(e) => {
                const updatedNote = { ...currentNote, title: e.target.value };
                setCurrentNote(updatedNote);
                setNotes(prev => ({
                  ...prev,
                  [userRole]: (prev[userRole] || []).map(n => n.id === updatedNote.id ? updatedNote : n)
                }));
              }}
              style={{
                ...styles.input,
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '16px',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid rgba(120, 119, 198, 0.3)'
              }}
              placeholder={userRole === 'teacher' ? 'Lesson title...' : 'Note title...'}
            />
            
            <textarea
              value={currentNote.content}
              onChange={(e) => {
                const updatedNote = { ...currentNote, content: e.target.value };
                setCurrentNote(updatedNote);
                setNotes(prev => ({
                  ...prev,
                  [userRole]: (prev[userRole] || []).map(n => n.id === updatedNote.id ? updatedNote : n)
                }));
              }}
              style={{
                width: '100%',
                height: 'calc(100% - 100px)',
                padding: '16px',
                background: 'rgba(26, 26, 46, 0.6)',
                border: '1px solid rgba(120, 119, 198, 0.3)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                resize: 'none',
                outline: 'none'
              }}
              placeholder={userRole === 'teacher' ? 'Start writing your lesson plan...' : 'Start writing your notes...'}
            />
          </>
        ) : (
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', marginTop: '100px' }}>
            <FileText size={64} style={{ marginBottom: '16px' }} />
            <h3>Select a {userRole === 'teacher' ? 'lesson plan' : 'note'} to edit or create a new one</h3>
          </div>
        )}
      </div>
    </div>
  );
};
  const renderAnalytics = () => (
    <div>
      <div style={styles.grid}>
        {/* Learning Velocity */}
        <div style={styles.card}>
          <h3
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
            }}
          >
            <TrendingUp size={20} />
            Learning Velocity
          </h3>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#667eea",
              marginBottom: "8px",
            }}
          >
            +15%
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Questions per week vs last month
          </div>
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              borderRadius: "8px",
              background: "rgba(16, 185, 129, 0.1)",
              color: "#059669",
              fontSize: "14px",
            }}
          >
            📈 You're learning faster than before!
          </div>
        </div>

        {/* Subject Distribution */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: "16px", color: "white" }}>
            Subject Focus
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              color: "white",
            }}
          >
            {Object.entries(userStats.subjectMastery).map(([subject, data]) => (
              <div key={subject}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                    fontSize: "14px",
                  }}
                >
                  <span>{subject}</span>
                  <span>{Math.round((data.xp / 800) * 100)}%</span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "#e5e7eb",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: `linear-gradient(135deg, ${
                        subject === "Math"
                          ? "#f59e0b"
                          : subject === "Science"
                          ? "#10b981"
                          : subject === "History"
                          ? "#ef4444"
                          : subject === "Literature"
                          ? "#8b5cf6"
                          : "#06b6d4"
                      }, ${
                        subject === "Math"
                          ? "#d97706"
                          : subject === "Science"
                          ? "#059669"
                          : subject === "History"
                          ? "#dc2626"
                          : subject === "Literature"
                          ? "#7c3aed"
                          : "#0891b2"
                      })`,
                      width: `${(data.xp / 800) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div style={styles.card}>
          <h3
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
            }}
          >
            <Brain size={20} />
            AI Insights
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              color: "white",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "rgba(59, 130, 246, 0.1)",
                borderLeft: "4px solid #3b82f6",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                🎯 Strength: Science
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                92% accuracy rate - keep up the excellent work!
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "rgba(245, 158, 11, 0.1)",
                borderLeft: "4px solid #f59e0b",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                💡 Focus Area: History
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                78% accuracy - try more practice questions
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "rgba(16, 185, 129, 0.1)",
                borderLeft: "4px solid #10b981",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                🚀 Recommendation
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Study for 20 minutes daily to maintain your streak
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: "20px", color: "white" }}>
          Monthly Progress Report
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#667eea" }}
            >
              89
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Questions Asked
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981" }}
            >
              23h 15m
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>Study Time</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#f59e0b" }}
            >
              85%
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Average Score
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#8b5cf6" }}
            >
              7
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Badges Earned
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudyTimer = () => (
  <div>
    <div style={styles.card} className="card-hover">
      <div style={styles.cardGlow} className="card-glow" />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h3 style={{ color: 'white', marginBottom: '24px' }}>
          {studyTimer.isBreak ? '☕ Break Time' : '📚 Study Session'}
        </h3>
        
        <div style={{
          fontSize: '72px',
          fontWeight: '800',
          color: 'white',
          fontFamily: 'monospace',
          marginBottom: '32px',
          textShadow: '0 0 20px rgba(120, 119, 198, 0.5)'
        }}>
          {String(studyTimer.minutes).padStart(2, '0')}:
          {String(studyTimer.seconds).padStart(2, '0')}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
          <button
            onClick={() => setStudyTimer(prev => ({ ...prev, isActive: !prev.isActive }))}
            style={{
              ...styles.button,
              background: studyTimer.isActive 
                ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                : 'linear-gradient(135deg, #22c55e, #16a34a)'
            }}
            className="button-hover"
          >
            {studyTimer.isActive ? <Pause size={18} /> : <Play size={18} />}
            {studyTimer.isActive ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={() => setStudyTimer({
              minutes: studyTimer.isBreak ? 5 : 25,
              seconds: 0,
              isActive: false,
              isBreak: studyTimer.isBreak,
              sessions: studyTimer.sessions
            })}
            style={styles.button}
            className="button-hover"
          >
            Reset
          </button>
        </div>

        <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Sessions completed: {studyTimer.sessions}
        </div>
      </div>
    </div>
  </div>
);

  const renderStudentsDashboard = () => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "white",
          }}
        >
          <Users size={24} />
          {userRole === "parent" ? "My Children" : "My Students"}
        </h2>
        <button style={styles.button}>
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div style={styles.grid}>
        {[
          {
            name: "Risikesan",
            avatar: "👨‍🎓",
            level: 12,
            xp: 2850,
            subjects: { Math: 87, Science: 92, History: 78 },
            streak: 7,
            lastActive: "Currently online",
            isCurrentUser: true,
          },
          {
            name: "Emma Johnson",
            avatar: "👩‍🎓",
            level: 8,
            xp: 1250,
            subjects: { Math: 85, Science: 92, History: 78 },
            streak: 5,
            lastActive: "2 hours ago",
            isCurrentUser: false,
          },
          {
            name: "Liam Chen",
            avatar: "👨‍🎓",
            level: 6,
            xp: 980,
            subjects: { Math: 78, Science: 88, History: 85 },
            streak: 3,
            lastActive: "1 day ago",
            isCurrentUser: false,
          },
          {
            name: "Sofia Rodriguez",
            avatar: "👩‍🎓",
            level: 10,
            xp: 1680,
            subjects: { Math: 92, Science: 89, History: 94 },
            streak: 12,
            lastActive: "30 minutes ago",
            isCurrentUser: false,
          },
        ].map((student, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              cursor: "pointer",
              transition: "transform 0.2s",
              ...(student.isCurrentUser && {
                border: "2px solid #7877c6",
                boxShadow: "0 0 20px rgba(120, 119, 198, 0.4)",
              }),
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  ...styles.avatar,
                  fontSize: "20px",
                  ...(student.isCurrentUser && {
                    boxShadow: "0 0 25px rgba(120, 119, 198, 0.6)",
                  }),
                }}
              >
                {student.avatar}
              </div>
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <h4 style={{ margin: 0, color: "white" }}>{student.name}</h4>
                  {student.isCurrentUser && (
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      YOU
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Level {student.level} • {student.xp} XP
                </div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  background: student.streak >= 7 ? "#dcfce7" : "#fef3c7",
                  color: student.streak >= 7 ? "#059669" : "#d97706",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {student.streak} day streak
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "white",
                }}
              >
                Subject Performance
              </div>
              {Object.entries(student.subjects).map(([subject, score]) => (
                <div
                  key={subject}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {subject}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background:
                        score >= 90
                          ? "#dcfce7"
                          : score >= 80
                          ? "#fef3c7"
                          : "#fee2e2",
                      color:
                        score >= 90
                          ? "#059669"
                          : score >= 80
                          ? "#d97706"
                          : "#dc2626",
                    }}
                  >
                    {score}%
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: student.isCurrentUser
                  ? "#22c55e"
                  : "rgba(255, 255, 255, 0.6)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: "12px",
                fontWeight: student.isCurrentUser ? "600" : "400",
              }}
            >
              Last active: {student.lastActive}
            </div>
          </div>
        ))}
      </div>

      {/* Class Overview */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: "20px" }}>Class Overview</h3>
        <div style={styles.grid}>
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "rgba(16, 185, 129, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#10b981",
                marginBottom: "8px",
              }}
            >
              87%
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Average Performance
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "rgba(59, 130, 246, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#3b82f6",
                marginBottom: "8px",
              }}
            >
              156
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Total Questions This Week
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "rgba(245, 158, 11, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#f59e0b",
                marginBottom: "8px",
              }}
            >
              6.7
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Average Study Streak
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div>
      {/* Quick Stats */}
      <div style={styles.grid}>
        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
              }}
            >
              <Star size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                {userStats.totalStars}
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Total Stars
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#22c55e",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            +{userStats.streak} day streak! 🔥
          </div>
        </div>

        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                color: "white",
                boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)",
              }}
            >
              <Trophy size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                Level {userStats.level}
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                {userStats.xpPoints} XP
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.7)",
              position: "relative",
              zIndex: 2,
            }}
          >
            {getXPToNextLevel()} XP to next level
          </div>
          <div
            style={{
              marginTop: "12px",
              height: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              overflow: "hidden",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                width: `${((userStats.xpPoints % 200) / 200) * 100}%`,
                borderRadius: "6px",
                boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
              }}
            />
          </div>
        </div>

        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
              }}
            >
              <Brain size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                {userStats.questionsAsked}
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Questions Asked
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#22c55e",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            Keep asking to learn more! 🎓
          </div>
        </div>
      </div>

      {/* Subject Mastery */}
      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <h3
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
            fontSize: "24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Target size={24} />
          Subject Mastery
        </h3>
        <div
          style={{
            display: "grid",
            gap: "20px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {Object.entries(userStats.subjectMastery).map(([subject, data]) => (
            <div
              key={subject}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
                background: "rgba(120, 119, 198, 0.1)",
                borderRadius: "16px",
                border: "1px solid rgba(120, 119, 198, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    {subject}
                  </span>
                  <span
                    style={{
                      ...styles.badge,
                      background: "linear-gradient(135deg, #7877c6, #ff77c6)",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Level {data.level}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: "600",
                    }}
                  >
                    {data.accuracy}% accuracy
                  </span>
                </div>
                <div
                  style={{
                    height: "10px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "linear-gradient(135deg, #7877c6, #ff77c6)",
                      width: `${(data.xp / 800) * 100}%`,
                      borderRadius: "6px",
                      boxShadow: "0 0 10px rgba(120, 119, 198, 0.5)",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginLeft: "24px",
                  fontSize: "16px",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: "600",
                }}
              >
                {data.xp}/800 XP
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <h3
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
            fontSize: "24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <BarChart3 size={24} />
          This Week's Activity
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: "12px",
            height: "150px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {userStats.weeklyActivity.map((day, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #7877c6, #ff77c6)",
                  borderRadius: "6px 6px 0 0",
                  height: `${(day.questions / 15) * 100}px`,
                  minHeight: "8px",
                  marginBottom: "12px",
                  boxShadow: "0 0 15px rgba(120, 119, 198, 0.4)",
                  transition: "all 0.3s ease",
                }}
              />
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "4px",
                  color: "white",
                }}
              >
                {day.questions}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: "600",
                }}
              >
                {day.day}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div>
      <div style={styles.grid}>
        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
              }}
            >
              <Users size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                24
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Active Students
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#22c55e",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            +3 new this week 📈
          </div>
        </div>

        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
              }}
            >
              <FileText size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                12
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Assignments
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.7)",
              position: "relative",
              zIndex: 2,
            }}
          >
            3 pending review
          </div>
        </div>

        <div style={styles.card} className="card-hover">
          <div style={styles.cardGlow} className="card-glow" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                color: "white",
                boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)",
              }}
            >
              <BarChart3 size={28} />
            </div>
            <div>
              <div
                style={{ fontSize: "28px", fontWeight: "800", color: "white" }}
              >
                87%
              </div>
              <div
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "16px" }}
              >
                Class Average
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#22c55e",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            +5% from last month 🚀
          </div>
        </div>
      </div>

      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <h3
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
            fontSize: "24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Clock size={24} />
          Recent Activity
        </h3>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: "rgba(120, 119, 198, 0.1)",
              borderRadius: "12px",
              marginBottom: "12px",
              border: "1px solid rgba(120, 119, 198, 0.2)",
            }}
          >
            <div style={{ fontSize: "20px" }}>📝</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Risikesan submitted Math Assignment #3
              </div>
              <div
                style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}
              >
                Score: 92% - Excellent work on quadratic equations
              </div>
            </div>
            <div
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}
            >
              2 hours ago
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: "rgba(120, 119, 198, 0.1)",
              borderRadius: "12px",
              marginBottom: "12px",
              border: "1px solid rgba(120, 119, 198, 0.2)",
            }}
          >
            <div style={{ fontSize: "20px" }}>🎯</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Emma completed Science Quiz
              </div>
              <div
                style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}
              >
                Score: 88% - Good understanding of chemical reactions
              </div>
            </div>
            <div
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}
            >
              1 day ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLessonPlanner = () => (
    <div>
      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "white",
              fontSize: "24px",
              position: "relative",
              zIndex: 2,
            }}
          >
            Today's Lessons
          </h3>
          <button style={styles.button} className="button-hover">
            <BookOpen size={16} />
            New Lesson
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              padding: "20px",
              background: "rgba(120, 119, 198, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(120, 119, 198, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h4 style={{ margin: 0, color: "white" }}>
                Mathematics - Quadratic Equations
              </h4>
              <span
                style={{
                  ...styles.badge,
                  background: "#22c55e",
                  color: "white",
                }}
              >
                Ready
              </span>
            </div>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "12px",
              }}
            >
              Introduction to solving quadratic equations using factoring and
              the quadratic formula.
            </p>
            <div
              style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}
            >
              Duration: 45 minutes • Grade 10 • 24 students
            </div>
          </div>

          <div
            style={{
              padding: "20px",
              background: "rgba(120, 119, 198, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(120, 119, 198, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h4 style={{ margin: 0, color: "white" }}>
                Science - Chemical Reactions
              </h4>
              <span
                style={{
                  ...styles.badge,
                  background: "#f59e0b",
                  color: "white",
                }}
              >
                In Progress
              </span>
            </div>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "12px",
              }}
            >
              Exploring different types of chemical reactions and their
              applications.
            </p>
            <div
              style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}
            >
              Duration: 50 minutes • Grade 10 • 24 students
            </div>
          </div>
        </div>
      </div>

      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <h3
          style={{
            marginBottom: "20px",
            color: "white",
            position: "relative",
            zIndex: 2,
          }}
        >
          Lesson Templates
        </h3>
        <div style={styles.grid}>
          {[
            "Math Worksheet",
            "Science Lab",
            "History Discussion",
            "Literature Analysis",
          ].map((template, index) => (
            <div
              key={index}
              style={{
                padding: "16px",
                background: "rgba(120, 119, 198, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(120, 119, 198, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>📝</div>
              <div style={{ color: "white", fontWeight: "600" }}>
                {template}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ margin: 0, color: "white" }}>Assignments</h2>
        <button style={styles.button} className="button-hover">
          <FileText size={16} />
          Create Assignment
        </button>
      </div>

      <div style={styles.grid}>
        {[
          {
            title: "Math Quiz #3",
            subject: "Mathematics",
            dueDate: "Aug 12",
            submitted: 18,
            total: 24,
            status: "Active",
          },
          {
            title: "Science Lab Report",
            subject: "Science",
            dueDate: "Aug 15",
            submitted: 12,
            total: 24,
            status: "Active",
          },
          {
            title: "History Essay",
            subject: "History",
            dueDate: "Aug 10",
            submitted: 24,
            total: 24,
            status: "Completed",
          },
        ].map((assignment, index) => (
          <div key={index} style={styles.card} className="card-hover">
            <div style={styles.cardGlow} className="card-glow" />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h4 style={{ margin: 0, color: "white" }}>
                  {assignment.title}
                </h4>
                <span
                  style={{
                    ...styles.badge,
                    background:
                      assignment.status === "Completed" ? "#22c55e" : "#f59e0b",
                    color: "white",
                  }}
                >
                  {assignment.status}
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "12px",
                }}
              >
                Subject: {assignment.subject}
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "12px",
                }}
              >
                Due: {assignment.dueDate}
              </p>
              <div
                style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}
              >
                Submitted: {assignment.submitted}/{assignment.total} students
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGradebook = () => (
    <div>
      <div style={styles.card} className="card-hover">
        <div style={styles.cardGlow} className="card-glow" />
        <h3
          style={{
            marginBottom: "20px",
            color: "white",
            position: "relative",
            zIndex: 2,
          }}
        >
          Class Gradebook
        </h3>

        <div
          style={{
            overflowX: "auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "white",
            }}
          >
            <thead>
              <tr
                style={{ borderBottom: "2px solid rgba(120, 119, 198, 0.3)" }}
              >
                <th style={{ padding: "12px", textAlign: "left" }}>Student</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Math</th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Science
                </th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  History
                </th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Average
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Risikesan",
                  math: 87,
                  science: 92,
                  history: 78,
                  average: 86,
                },
                {
                  name: "Emma Johnson",
                  math: 85,
                  science: 92,
                  history: 78,
                  average: 85,
                },
                {
                  name: "Liam Chen",
                  math: 78,
                  science: 88,
                  history: 85,
                  average: 84,
                },
                {
                  name: "Sofia Rodriguez",
                  math: 92,
                  science: 89,
                  history: 94,
                  average: 92,
                },
              ].map((student, index) => (
                <tr
                  key={index}
                  style={{ borderBottom: "1px solid rgba(120, 119, 198, 0.1)" }}
                >
                  <td style={{ padding: "12px" }}>{student.name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {student.math}%
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {student.science}%
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {student.history}%
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "700",
                      color:
                        student.average >= 90
                          ? "#22c55e"
                          : student.average >= 80
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  >
                    {student.average}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div>
      <div style={styles.grid}>
        {[
          {
            title: "Teaching Materials",
            icon: "📚",
            description: "Lesson plans, worksheets, and educational resources",
          },
          {
            title: "Assessment Tools",
            icon: "📊",
            description: "Quizzes, tests, and grading rubrics",
          },
          {
            title: "Interactive Content",
            icon: "🎮",
            description: "Educational games and interactive exercises",
          },
          {
            title: "Reference Library",
            icon: "📖",
            description: "Textbooks, articles, and research materials",
          },
        ].map((resource, index) => (
          <div key={index} style={styles.card} className="card-hover">
            <div style={styles.cardGlow} className="card-glow" />
            <div
              style={{ textAlign: "center", position: "relative", zIndex: 2 }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                {resource.icon}
              </div>
              <h4 style={{ margin: "0 0 12px", color: "white" }}>
                {resource.title}
              </h4>
              <p
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}
              >
                {resource.description}
              </p>
              <button
                style={{ ...styles.button, marginTop: "16px" }}
                className="button-hover"
              >
                <ChevronRight size={16} />
                Browse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return userRole === "teacher"
          ? renderStudentsDashboard()
          : renderDashboard();
      case "achievements":
        return renderAchievements();
      case "learning-paths":
        return renderLearningPaths(); 
      case "challenges":
        return renderChallenges(); 
      case "flashcards":
        return renderFlashcards();
      case "analytics":
        return renderAnalytics();
      case 'study-timer': return renderStudyTimer();
      case "students":
        return renderStudentsDashboard();
      case 'notes': return renderNotes();
      case "lesson-planner":
        return renderLessonPlanner();
      case "assignments":
        return renderAssignments();
      case "gradebook":
        return renderGradebook();
      case "resources":
        return renderResources();
      case "chat":
      default:
        return renderChatView();
    }
  };

  const viewTitles = {
    chat: userRole === "teacher" ? "AI Teaching Assistant" : "Chat with AI",
    dashboard: userRole === "teacher" ? "Teacher Dashboard" : "Your Dashboard",
    "learning-paths": "Learning Paths",
    challenges: "Daily Challenges",
    flashcards: "Flashcards",
    achievements: "Achievements",
    analytics: userRole === "teacher" ? "Class Analytics" : "Analytics",
    students: "My Students",
    "lesson-planner": "Lesson Planner",
    assignments: "Assignments",
    'study-timer': 'Study Timer',
    gradebook: "Gradebook",
    resources: "Teaching Resources",
  };

  // Timer Effect
useEffect(() => {
  let interval = null;
  if (studyTimer.isActive) {
    interval = setInterval(() => {
      setStudyTimer(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Timer finished
          const isBreakTime = !prev.isBreak;
          const newSessions = prev.isBreak ? prev.sessions : prev.sessions + 1;
          return {
            minutes: isBreakTime ? 5 : 25,
            seconds: 0,
            isActive: false,
            isBreak: isBreakTime,
            sessions: newSessions
          };
        }
      });
    }, 1000);
  }
  return () => clearInterval(interval);
}, [studyTimer.isActive, studyTimer.minutes, studyTimer.seconds]);

  // Auto scroll for chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Main Render
  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundPattern} />

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            zIndex: 999,
            backdropFilter: "blur(10px)",
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          ...(isMobile && {
            position: "fixed",
            left: 0,
            top: 0,
            height: "100%",
            zIndex: 1000,
            transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 60px rgba(120, 119, 198, 0.3)",
          }),
        }}
      >
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(120, 119, 198, 0.2)",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
            }}
          >
            <X size={24} />
          </button>
        )}

        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <Brain size={32} />
            EduBuddy
          </div>
          <div style={styles.subtitle}>AI Learning Platform</div>
        </div>

        <div style={styles.userProfile}>
          <div style={styles.avatar}>{currentUser.avatar}</div>
          <div>
            <div
              style={{ fontWeight: "700", fontSize: "16px", color: "white" }}
            >
              {currentUser.name}
            </div>
            <div
              style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}
            >
              {currentUser.grade}
            </div>
          </div>
        </div>

        {renderNavigation()}

        <div
          style={{
            padding: "24px",
            borderTop: "1px solid rgba(120, 119, 198, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.7)",
              cursor: "pointer",
              fontWeight: "600",
              transition: "color 0.3s ease",
            }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label
              htmlFor="role-select"
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                display: "block",
                marginBottom: "12px",
                fontWeight: "600",
              }}
            >
              Change Role
            </label>
            <select
              id="role-select"
              value={userRole}
              onChange={(e) => {
                const newRole = e.target.value;
                setUserRole(newRole);
                setCurrentUser((prev) => ({
                  ...prev,
                  name: newRole === "student" ? "Risikesan" : "Mr. Davis",
                  avatar: newRole === "student" ? "👨‍🎓" : "👨‍🏫",
                  grade: newRole === "student" ? "10th Grade" : "Teacher",
                }));
                const welcomeMessage =
                  newRole === "teacher"
                    ? "Welcome, Mr. Davis! I'm here to help with lesson planning, student assessments, and educational resources. How can I assist you today? 👨‍🏫"
                    : "Welcome back, Risikesan! Ready for today's learning adventure? 🎓";
                setMessages([
                  {
                    id: 1,
                    sender: "EduBuddy",
                    text: welcomeMessage,
                    timestamp: new Date(),
                    isWelcome: true,
                  },
                ]);
                setCurrentView("chat");
                if (isMobile) setIsMobileMenuOpen(false);
              }}
              style={styles.select}
              className="select-focus"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                style={{
                  background: "rgba(120, 119, 198, 0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
                className="button-hover"
              >
                <Menu size={24} color="white" />
              </button>
            )}
            <h1 style={styles.headerTitle}>{viewTitles[currentView]}</h1>
          </div>
          {!isMobile && (
            <div style={styles.statsBar}>
              <div style={styles.statCard} className="stat-card-hover">
                <Star size={18} /> {userStats.totalStars}
              </div>
              <div style={styles.statCard} className="stat-card-hover">
                <Sparkles size={18} /> {userStats.xpPoints} XP
              </div>
              <div style={styles.statCard} className="stat-card-hover">
                <TrendingUp size={18} /> {userStats.streak} day streak
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>{renderCurrentView()}</div>
      </div>

      {/* Star Animation Overlay */}
      {showStarAnimation && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 2000,
            pointerEvents: "none",
            animation: "glow 1.5s ease-out forwards",
          }}
        >
          <Star size={100} color="#FFD700" fill="#FFD700" />
        </div>
      )}
    </div>
  );
};

export default EduBuddyComplete;
