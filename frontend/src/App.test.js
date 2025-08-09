import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, BookOpen, Star, Brain, Lightbulb, Trophy, Sparkles, 
  User, Settings, BarChart3, Target, Award, Calendar,
  Clock, TrendingUp, Users, Download, FileText, Play,
  ChevronRight, Home, MessageCircle, Menu, X, Shield
} from 'lucide-react';

const EduBuddyComplete = () => {
  // Core State
  const [currentView, setCurrentView] = useState('chat');
  const [userRole, setUserRole] = useState('student'); // student, parent, teacher
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Alex Johnson',
    avatar: '👨‍🎓',
    grade: '10th Grade',
    joinDate: '2024-01-15'
  });

  // Chat State
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1,
      sender: 'EduBuddy', 
      text: 'Welcome back, Alex! Ready for today\'s learning adventure? 🎓', 
      timestamp: new Date(),
      isWelcome: true 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('General');
  const [showStarAnimation, setShowStarAnimation] = useState(false);
  const messagesEndRef = useRef(null);

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
      Geography: { level: 3, xp: 180, accuracy: 81 }
    },
    badges: [
      { id: 1, name: 'First Steps', icon: '👶', earned: true, date: '2024-01-15' },
      { id: 2, name: 'Math Whiz', icon: '🔢', earned: true, date: '2024-02-01' },
      { id: 3, name: 'Science Explorer', icon: '🔬', earned: true, date: '2024-02-15' },
      { id: 4, name: 'History Buff', icon: '📜', earned: true, date: '2024-03-01' },
      { id: 5, name: 'Week Warrior', icon: '⚡', earned: true, date: '2024-03-10' },
      { id: 6, name: 'Question Master', icon: '❓', earned: false },
      { id: 7, name: 'Perfect Score', icon: '💯', earned: false },
      { id: 8, name: 'Study Streak', icon: '🔥', earned: false }
    ],
    weeklyActivity: [
      { day: 'Mon', questions: 12, xp: 240 },
      { day: 'Tue', questions: 8, xp: 160 },
      { day: 'Wed', questions: 15, xp: 300 },
      { day: 'Thu', questions: 10, xp: 200 },
      { day: 'Fri', questions: 9, xp: 180 },
      { day: 'Sat', questions: 6, xp: 120 },
      { day: 'Sun', questions: 11, xp: 220 }
    ]
  });

  // Quiz & Challenge State
  const [dailyChallenge, setDailyChallenge] = useState({
    id: 1,
    subject: 'Science',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correct: 2,
    difficulty: 'Medium',
    xpReward: 50,
    completed: false
  });

  const [flashcards, setFlashcards] = useState([
    { id: 1, subject: 'Math', question: 'What is the quadratic formula?', answer: 'x = (-b ± √(b²-4ac)) / 2a', mastered: false },
    { id: 2, subject: 'Science', question: 'What is photosynthesis?', answer: 'The process by which plants convert sunlight into energy', mastered: true },
    { id: 3, subject: 'History', question: 'When did World War II end?', answer: '1945', mastered: true }
  ]);

  // Learning Path State
  const [learningPaths, setLearningPaths] = useState({
    Math: {
      currentTopic: 'Quadratic Equations',
      progress: 68,
      nextMilestone: 'Complete 5 more problems',
      topics: [
        { name: 'Basic Algebra', completed: true, score: 92 },
        { name: 'Linear Equations', completed: true, score: 88 },
        { name: 'Quadratic Equations', completed: false, score: 68 },
        { name: 'Polynomials', completed: false, score: 0 },
        { name: 'Functions', completed: false, score: 0 }
      ]
    },
    Science: {
      currentTopic: 'Chemical Reactions',
      progress: 45,
      nextMilestone: 'Study 3 more reaction types',
      topics: [
        { name: 'Atomic Structure', completed: true, score: 95 },
        { name: 'Chemical Bonds', completed: true, score: 87 },
        { name: 'Chemical Reactions', completed: false, score: 45 },
        { name: 'Acids and Bases', completed: false, score: 0 },
        { name: 'Organic Chemistry', completed: false, score: 0 }
      ]
    }
  });

  // Mobile & UI State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Styles
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
    },
    sidebar: {
      width: '280px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'width 0.3s ease',
      flexShrink: 0,
    },
    sidebarHeader: {
      padding: '24px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      textAlign: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      background: 'rgba(102, 126, 234, 0.05)',
      borderRadius: '12px',
      margin: '24px 24px 24px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: 'white'
    },
    nav: {
      flex: 1,
      padding: '0 24px'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4b5563',
      marginBottom: '4px'
    },
    navItemActive: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      transform: 'translateX(4px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '16px 24px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexShrink: 0,
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    statsBar: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },
    statCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: '#f3f4f6',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      transition: 'all 0.2s',
    },
    contentArea: {
      flex: 1,
      padding: '24px',
      overflow: 'auto',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
      marginBottom: '24px',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '24px'
    },
    button: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      background: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea'
    }
  };

  // Utility Functions
  const getXPToNextLevel = () => {
    const baseXP = 200;
    const nextLevelXP = baseXP * userStats.level;
    const currentLevelXP = baseXP * (userStats.level - 1);
    return nextLevelXP - userStats.xpPoints;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Simulated AI Response
  const getAIResponse = async (text) => {
    const fullPrompt = `Subject: ${subject}. Question: ${text}`;

    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await response.json();
      return data.reply || '⚠️ No response from EduBuddy.';
    } catch (error) {
      return '⚠️ Sorry, I\'m having trouble connecting. Please try again!';
    }
  };

  // Chat Functions
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const botReply = await getAIResponse(input);
    
    // Star animation
    setStars((prev) => prev + 1);
    setShowStarAnimation(true);
    setTimeout(() => setShowStarAnimation(false), 1500);

    const botMessage = { sender: 'EduBuddy', text: botReply };
    setMessages((prev) => [...prev, botMessage]);
    setInput('');
    setLoading(false);
  };

  // Component Renderers
  const renderNavigation = () => {
    const navItems = [
      { id: 'chat', label: 'Chat with AI', icon: MessageCircle },
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'learning-paths', label: 'Learning Paths', icon: Target },
      { id: 'challenges', label: 'Daily Challenges', icon: Calendar },
      { id: 'flashcards', label: 'Flashcards', icon: FileText },
      { id: 'achievements', label: 'Achievements', icon: Trophy },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      ...(userRole === 'parent' || userRole === 'teacher' ? 
        [{ id: 'students', label: 'Students', icon: Users }] : [])
    ];

    return (
      <div style={styles.nav}>
        {navItems.map(item => (
          <div
            key={item.id}
            style={{
              ...styles.navItem,
              ...(currentView === item.id ? styles.navItemActive : {})
            }}
            onClick={() => {
              setCurrentView(item.id);
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            onMouseEnter={(e) => {
              if (currentView !== item.id) {
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== item.id) {
                e.currentTarget.style.background = 'none';
              }
            }}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderChatView = () => (
    <div style={{ ...styles.card, display: 'flex', flexDirection: 'column', height: 'calc(100% - 48px)'}}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '16px',
        padding: '16px',
        background: 'rgba(248, 250, 252, 0.5)',
        borderRadius: '12px'
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: '16px',
              background: msg.sender === 'You' 
                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                : msg.isWelcome 
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'white',
              color: msg.sender === 'You' || msg.isWelcome ? 'white' : '#374151',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>
                {msg.sender} • {formatDate(msg.timestamp)}
              </div>
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '16px',
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Brain size={16} className="animate-pulse" />
              <span>EduBuddy is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: 'white'
            }}
          >
            <option value="General">🧠 General</option>
            <option value="Math">📊 Math</option>
            <option value="Science">🔬 Science</option>
            <option value="History">📜 History</option>
            <option value="Literature">📚 Literature</option>
            <option value="Geography">🌍 Geography</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything! Try 'Explain photosynthesis' or 'Help with quadratic equations'"
            style={styles.input}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              ...styles.button,
              opacity: loading || !input.trim() ? 0.5 : 1
            }}
          >
            <Send size={16} />
            Ask
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div>
      {/* Quick Stats */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              padding: '12px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white'
            }}>
              <Star size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{userStats.totalStars}</div>
              <div style={{ color: '#6b7280' }}>Total Stars</div>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#10b981' }}>
            +{userStats.streak} day streak! 🔥
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              padding: '12px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white'
            }}>
              <Trophy size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Level {userStats.level}</div>
              <div style={{ color: '#6b7280' }}>{userStats.xpPoints} XP</div>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {getXPToNextLevel()} XP to next level
          </div>
          <div style={{
            marginTop: '8px',
            height: '6px',
            background: '#e5e7eb',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              width: `${((userStats.xpPoints % 200) / 200) * 100}%`
            }} />
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              padding: '12px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white'
            }}>
              <Brain size={24} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{userStats.questionsAsked}</div>
              <div style={{ color: '#6b7280' }}>Questions Asked</div>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#10b981' }}>
            Keep asking to learn more! 🎓
          </div>
        </div>
      </div>

      {/* Subject Mastery */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={20} />
          Subject Mastery
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {Object.entries(userStats.subjectMastery).map(([subject, data]) => (
            <div key={subject} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: '12px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600' }}>{subject}</span>
                  <span style={styles.badge}>Level {data.level}</span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {data.accuracy}% accuracy
                  </span>
                </div>
                <div style={{
                  height: '6px',
                  background: '#e5e7eb',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    width: `${(data.xp / 800) * 100}%`
                  }} />
                </div>
              </div>
              <div style={{ marginLeft: '16px', fontSize: '14px', color: '#6b7280' }}>
                {data.xp}/800 XP
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={20} />
          This Week's Activity
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: '8px',
          height: '120px'
        }}>
          {userStats.weeklyActivity.map((day, index) => (
            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '4px 4px 0 0',
                height: `${(day.questions / 15) * 80}px`,
                minHeight: '4px',
                marginBottom: '8px'
              }} />
              <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>
                {day.questions}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {day.day}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLearningPaths = () => (
    <div>
      <div style={styles.grid}>
        {Object.entries(learningPaths).map(([subject, path]) => (
          <div key={subject} style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white'
              }}>
                <Target size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{subject} Path</h3>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {path.currentTopic}
                </div>
              </div>
            </div>
            
            <div style={{
              background: '#f8fafc',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                Progress: {path.progress}%
              </div>
              <div style={{
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  width: `${path.progress}%`,
                  transition: 'width 0.5s ease'
                }} />
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                {path.nextMilestone}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {path.topics.map((topic, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: topic.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(156, 163, 175, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: topic.completed ? '#10b981' : '#9ca3af'
                    }} />
                    <span style={{ fontSize: '14px' }}>{topic.name}</span>
                  </div>
                  {topic.completed && (
                    <span style={{
                      fontSize: '12px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: '#dcfce7',
                      color: '#059669'
                    }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={24} />
              Daily Challenge
            </h2>
            <p style={{ margin: '4px 0 0', color: '#6b7280' }}>
              Complete today's challenge to earn bonus XP!
            </p>
          </div>
          <div style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: dailyChallenge.completed ? '#dcfce7' : '#fef3c7',
            color: dailyChallenge.completed ? '#059669' : '#d97706',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {dailyChallenge.completed ? 'Completed' : `${dailyChallenge.xpReward} XP`}
          </div>
        </div>

        <div style={{
          padding: '24px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          border: '2px solid rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              padding: '6px 12px',
              borderRadius: '16px',
              background: 'rgba(102, 126, 234, 0.2)',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {dailyChallenge.subject}
            </span>
            <span style={{
              padding: '6px 12px',
              borderRadius: '16px',
              background: dailyChallenge.difficulty === 'Easy' ? '#dcfce7' : 
                         dailyChallenge.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
              color: dailyChallenge.difficulty === 'Easy' ? '#059669' : 
                     dailyChallenge.difficulty === 'Medium' ? '#d97706' : '#dc2626',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {dailyChallenge.difficulty}
            </span>
          </div>
          
          <h3 style={{ marginBottom: '16px' }}>{dailyChallenge.question}</h3>
          
          <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
            {dailyChallenge.options.map((option, index) => (
              <button
                key={index}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  background: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.background = 'white';
                }}
                onClick={() => {
                  if (index === dailyChallenge.correct) {
                    setDailyChallenge(prev => ({ ...prev, completed: true }));
                    setUserStats(prev => ({
                      ...prev,
                      xpPoints: prev.xpPoints + dailyChallenge.xpReward,
                      totalStars: prev.totalStars + 3
                    }));
                  }
                }}
                disabled={dailyChallenge.completed}
              >
                <span style={{ fontWeight: '600', marginRight: '8px' }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
          
          {!dailyChallenge.completed && (
            <div style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
              💡 Choose your answer above to complete the challenge
            </div>
          )}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={20} />
          Weekly Challenges
        </h3>
        <div style={styles.grid}>
          {[
            { name: 'Math Marathon', progress: 80, total: 50, current: 40, reward: '500 XP' },
            { name: 'Science Streak', progress: 60, total: 7, current: 4, reward: '300 XP' },
            { name: 'History Hunter', progress: 30, total: 20, current: 6, reward: '400 XP' }
          ].map((challenge, index) => (
            <div key={index} style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h4 style={{ margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={16} />
                {challenge.name}
              </h4>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                {challenge.current} / {challenge.total} completed
              </div>
              <div style={{
                height: '6px',
                background: '#e5e7eb',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '8px'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  width: `${challenge.progress}%`
                }} />
              </div>
              <div style={{ fontSize: '12px', color: '#667eea', fontWeight: '600' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={24} />
          AI-Generated Flashcards
        </h2>
        <button style={styles.button} onClick={() => {
          // Generate new flashcard
          const newCard = {
            id: flashcards.length + 1,
            subject: subject,
            question: `Sample question about ${subject}`,
            answer: `Sample answer for ${subject} topic`,
            mastered: false
          };
          setFlashcards(prev => [...prev, newCard]);
        }}>
          <Sparkles size={16} />
          Generate New
        </button>
      </div>

      <div style={styles.grid}>
        {flashcards.map(card => (
          <div key={card.id} style={{
            ...styles.card,
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
             e.currentTarget.style.transform = 'translateY(-4px)';
             e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.05)';
          }}
          >
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              gap: '8px'
            }}>
              <span style={{
                ...styles.badge,
                background: card.mastered ? '#dcfce7' : '#fef3c7',
                color: card.mastered ? '#059669' : '#d97706'
              }}>
                {card.mastered ? 'Mastered' : 'Learning'}
              </span>
              <span style={styles.badge}>{card.subject}</span>
            </div>
            
            <div style={{ marginTop: '40px' }}>
              <h4 style={{ marginBottom: '12px', color: '#374151' }}>
                Q: {card.question}
              </h4>
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(102, 126, 234, 0.05)',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                A: {card.answer}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '16px',
              gap: '8px'
            }}>
              <button
                style={{
                  ...styles.button,
                  background: card.mastered ? 'linear-gradient(135deg, #f87171, #ef4444)' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                  fontSize: '12px',
                  padding: '8px 16px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFlashcards(prev => prev.map(c => 
                    c.id === card.id ? { ...c, mastered: !c.mastered } : c
                  ));
                }}
              >
                {card.mastered ? 'Reset' : 'Mark Mastered'}
              </button>
              <button
                style={{
                  ...styles.button,
                  background: 'linear-gradient(135deg, #9ca3af, #6b7280)',
                  fontSize: '12px',
                  padding: '8px 16px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFlashcards(prev => prev.filter(c => c.id !== card.id));
                }}
              >
                <X size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {flashcards.length === 0 && (
          <div style={{
            ...styles.card,
            textAlign: 'center',
            padding: '48px',
            color: '#6b7280'
          }}>
            <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3>No flashcards yet</h3>
            <p>Start asking questions in the chat to automatically generate flashcards!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={24} />
          Your Achievements
        </h2>
        
        <div style={styles.grid}>
          {userStats.badges.map(badge => (
            <div key={badge.id} style={{
              padding: '24px',
              borderRadius: '12px',
              background: badge.earned 
                ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))'
                : 'rgba(156, 163, 175, 0.1)',
              border: badge.earned 
                ? '2px solid rgba(251, 191, 36, 0.3)'
                : '2px solid rgba(156, 163, 175, 0.3)',
              textAlign: 'center',
              transition: 'all 0.2s',
              opacity: badge.earned ? 1 : 0.6
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '12px',
                filter: badge.earned ? 'none' : 'grayscale(100%)'
              }}>
                {badge.icon}
              </div>
              <h4 style={{ 
                margin: '0 0 8px', 
                color: badge.earned ? '#374151' : '#9ca3af' 
              }}>
                {badge.name}
              </h4>
              {badge.earned && badge.date && (
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Earned {new Date(badge.date).toLocaleDateString()}
                </div>
              )}
              {!badge.earned && (
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  Not earned yet
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Rings */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px' }}>Achievement Progress</h3>
        <div style={styles.grid}>
          {[
            { name: 'Question Master', progress: 75, description: 'Ask 100 questions' },
            { name: 'Perfect Scorer', progress: 40, description: 'Score 100% on 10 challenges' },
            { name: 'Study Streak', progress: 85, description: 'Study for 30 days straight' }
          ].map((achievement, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(102, 126, 234, 0.05)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `conic-gradient(#667eea ${achievement.progress * 3.6}deg, #e5e7eb 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#667eea'
                }}>
                  {achievement.progress}%
                </div>
              </div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {achievement.name}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {achievement.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <div style={styles.grid}>
        {/* Learning Velocity */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} />
            Learning Velocity
          </h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', marginBottom: '8px' }}>
            +15%
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Questions per week vs last month
          </div>
          <div style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#059669',
            fontSize: '14px'
          }}>
            📈 You're learning faster than before!
          </div>
        </div>

        {/* Subject Distribution */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: '16px' }}>Subject Focus</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(userStats.subjectMastery).map(([subject, data]) => (
              <div key={subject}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '4px',
                  fontSize: '14px'
                }}>
                  <span>{subject}</span>
                  <span>{Math.round((data.xp / 800) * 100)}%</span>
                </div>
                <div style={{
                  height: '6px',
                  background: '#e5e7eb',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${
                      subject === 'Math' ? '#f59e0b' :
                      subject === 'Science' ? '#10b981' :
                      subject === 'History' ? '#ef4444' :
                      subject === 'Literature' ? '#8b5cf6' : '#06b6d4'
                    }, ${
                      subject === 'Math' ? '#d97706' :
                      subject === 'Science' ? '#059669' :
                      subject === 'History' ? '#dc2626' :
                      subject === 'Literature' ? '#7c3aed' : '#0891b2'
                    })`,
                    width: `${(data.xp / 800) * 100}%`
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Brain size={20} />
            AI Insights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderLeft: '4px solid #3b82f6'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                🎯 Strength: Science
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                92% accuracy rate - keep up the excellent work!
              </div>
            </div>
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderLeft: '4px solid #f59e0b'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                💡 Focus Area: History
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                78% accuracy - try more practice questions
              </div>
            </div>
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderLeft: '4px solid #10b981'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                🚀 Recommendation
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Study for 20 minutes daily to maintain your streak
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px' }}>Monthly Progress Report</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              89
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Questions Asked
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              23h 15m
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Study Time
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              85%
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Average Score
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>
              7
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Badges Earned
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentsDashboard = () => (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={24} />
          {userRole === 'parent' ? 'My Children' : 'My Students'}
        </h2>
        <button style={styles.button}>
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div style={styles.grid}>
        {[
          {
            name: 'Emma Johnson',
            avatar: '👩‍🎓',
            level: 8,
            xp: 1250,
            subjects: { Math: 85, Science: 92, History: 78 },
            streak: 5,
            lastActive: '2 hours ago'
          },
          {
            name: 'Liam Chen',
            avatar: '👨‍🎓',
            level: 6,
            xp: 980,
            subjects: { Math: 78, Science: 88, History: 85 },
            streak: 3,
            lastActive: '1 day ago'
          },
          {
            name: 'Sofia Rodriguez',
            avatar: '👩‍🎓',
            level: 10,
            xp: 1680,
            subjects: { Math: 92, Science: 89, History: 94 },
            streak: 12,
            lastActive: '30 minutes ago'
          }
        ].map((student, index) => (
          <div key={index} style={{
            ...styles.card,
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'}}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0px)'}}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                ...styles.avatar,
                fontSize: '20px'
              }}>
                {student.avatar}
              </div>
              <div>
                <h4 style={{ margin: 0 }}>{student.name}</h4>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Level {student.level} • {student.xp} XP
                </div>
              </div>
              <div style={{
                marginLeft: 'auto',
                padding: '4px 8px',
                borderRadius: '12px',
                background: student.streak >= 7 ? '#dcfce7' : '#fef3c7',
                color: student.streak >= 7 ? '#059669' : '#d97706',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {student.streak} day streak
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Subject Performance
              </div>
              {Object.entries(student.subjects).map(([subject, score]) => (
                <div key={subject} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '14px' }}>{subject}</span>
                  <span style={{
                    fontSize: '12px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: score >= 90 ? '#dcfce7' : score >= 80 ? '#fef3c7' : '#fee2e2',
                    color: score >= 90 ? '#059669' : score >= 80 ? '#d97706' : '#dc2626'
                  }}>
                    {score}%
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '12px'
            }}>
              Last active: {student.lastActive}
            </div>
          </div>
        ))}
      </div>

      {/* Class Overview */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px' }}>Class Overview</h3>
        <div style={styles.grid}>
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              87%
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Average Performance
            </div>
          </div>
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
              156
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Total Questions This Week
            </div>
          </div>
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              6.7
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Average Study Streak
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard': return renderDashboard();
      case 'learning-paths': return renderLearningPaths();
      case 'challenges': return renderChallenges();
      case 'flashcards': return renderFlashcards();
      case 'achievements': return renderAchievements();
      case 'analytics': return renderAnalytics();
      case 'students': return renderStudentsDashboard();
      case 'chat':
      default: return renderChatView();
    }
  };
  
  const viewTitles = {
    chat: 'Chat with AI',
    dashboard: 'Your Dashboard',
    'learning-paths': 'Learning Paths',
    challenges: 'Daily Challenges',
    flashcards: 'Flashcards',
    achievements: 'Achievements',
    analytics: 'Analytics',
    students: 'Students Overview',
  };

  // Auto scroll for chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Main Render
  return (
    <div style={styles.container}>
      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.5)', zIndex: 999,
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        ...(isMobile && {
          position: 'fixed',
          left: 0, top: 0, height: '100%',
          zIndex: 1000,
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: '0 0 40px rgba(0,0,0,0.2)'
        })
      }}>
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        )}
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <Brain size={28} />
            EduBuddy
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            AI Learning Platform
          </div>
        </div>

        <div style={styles.userProfile}>
          <div style={styles.avatar}>
            {currentUser.avatar}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              {currentUser.grade}
            </div>
          </div>
        </div>

        {renderNavigation()}

        <div style={{ padding: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '14px', color: '#6b7280', cursor: 'pointer'
          }}>
            <Settings size={16} />
            <span>Settings</span>
          </div>
          <div style={{ marginTop: '16px' }}>
            <label htmlFor="role-select" style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
                Change Role
            </label>
            <select
                id="role-select"
                value={userRole}
                onChange={(e) => {
                    const newRole = e.target.value;
                    setUserRole(newRole);
                    setCurrentUser(prev => ({
                        ...prev,
                        name: newRole === 'student' ? 'Alex Johnson' : newRole === 'parent' ? 'Sarah Johnson' : 'Mr. Davis',
                        avatar: newRole === 'student' ? '👨‍🎓' : newRole === 'parent' ? '👩‍👧‍👦' : '👨‍🏫',
                        grade: newRole === 'student' ? '10th Grade' : newRole === 'parent' ? 'Parent' : 'Teacher',
                    }));
                    setCurrentView(newRole === 'student' ? 'chat' : 'students');
                    if (isMobile) setIsMobileMenuOpen(false);
                }}
                style={{
                    width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db',
                }}
            >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <button onClick={() => setIsMobileMenuOpen(true)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Menu size={24} color="#374151"/>
              </button>
            )}
            <h1 style={styles.headerTitle}>{viewTitles[currentView]}</h1>
          </div>
          {!isMobile && (
            <div style={styles.statsBar}>
              <div style={styles.statCard}><Star size={16} color="#f59e0b" /> {userStats.totalStars}</div>
              <div style={styles.statCard}><Sparkles size={16} color="#8b5cf6" /> {userStats.xpPoints} XP</div>
              <div style={styles.statCard}><TrendingUp size={16} color="#10b981" /> {userStats.streak} day streak</div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          {renderCurrentView()}
        </div>
      </div>
      
      {/* Star Animation Overlay */}
      {showStarAnimation && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          zIndex: 2000, pointerEvents: 'none',
          animation: 'star-burst 1.5s ease-out forwards',
        }}>
            <style>
                {`
                @keyframes star-burst {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    50% { transform: translate(-50%, -50%) scale(1.5) rotate(180deg); opacity: 0.8; }
                    100% { transform: translate(-50%, -150%) scale(0.5) rotate(360deg); opacity: 0; }
                }
                `}
            </style>
            <Star size={80} color="#FFD700" fill="#FFD700" />
        </div>
      )}
    </div>
  );
};

export default EduBuddyComplete;