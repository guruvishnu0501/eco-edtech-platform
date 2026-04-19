import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { doc, setDoc, getDoc, increment, collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import EcoLeaderboard from './EcoLeaderboard';
import Login from './Login';
import Overview from './Overview';
import MyCourses from './MyCourses';
import './index.css';
import './Dashboard.css';

function App() {
  const [phase, setPhase] = useState('input'); // 'input' | 'quiz' | 'results'
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name);
          }
        } catch (err) {
          console.error("Error fetching user data", err);
        }
      } else {
        setUserName('');
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Phase 1: Request 5 Questions from FastAPI
  const handleStartQuiz = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      const data = await res.json();
      
      setQuestions(data.questions);
      setPhase('quiz');
      setCurrentQIndex(0);
      setScore(0);
    } catch (err) {
      setError(err.message || "Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  // Phase 2: Handle user answering a question
  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === questions[currentQIndex].correct_answer;
    
    // Each question is worth 20%, total 100%
    let currentScore = score;
    if (isCorrect) {
      currentScore += 20; 
      setScore(currentScore);
    }

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Quiz Finished! Proceed to phase 3
      finishQuiz(currentScore);
    }
  };

  // Phase 3: Submit Score, Update Firebase, Generate Study Plan
  const finishQuiz = async (finalScore) => {
    setPhase('results');
    setLoading(true);
    setError(null);

    const bonus = isLowBandwidth ? 5 : 0;
    const totalPoints = finalScore + bonus;
    setEarnedPoints(totalPoints);

    try {
      // Target Study Plan Generation
      const responsePromise = fetch('http://127.0.0.1:8000/generate-study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic, quiz_score: finalScore, low_bandwidth: isLowBandwidth }),
      });

      // Target Firestore Update (Add final score to total eco_points)
      const userRef = doc(db, 'users', user.uid);
      const firestorePromise = setDoc(userRef, {
        name: userName || 'Anonymous',
        eco_points: increment(totalPoints)
      }, { merge: true });

      const [response] = await Promise.all([responsePromise, firestorePromise]);

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);
      const data = await response.json();
      
      setPlan(data.study_plan);

      // Save course to Firestore
      try {
        await addDoc(collection(db, 'courses'), {
          uid: user.uid,
          topic: topic,
          quiz_score: finalScore,
          study_plan_text: data.study_plan,
          createdAt: new Date().toISOString()
        });
      } catch (saveErr) {
        console.error("Failed to save course:", saveErr);
      }
    } catch (err) {
      setError(err.message || "Failed to generate study plan.");
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setPhase('input');
    setTopic('');
    setQuestions([]);
    setPlan('');
    setScore(0);
    setEarnedPoints(0);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (authLoading) {
    return <div className="flex min-h-screen bg-[#0a0e17] items-center justify-center title-glow">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .option-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-align: left;
          padding: 16px;
          background: var(--bg-input);
          border: var(--glass-border);
          color: #fff;
          border-radius: 12px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .option-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--accent-primary);
          transform: translateX(4px);
        }
        .option-letter {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          font-weight: bold;
          font-family: var(--font-headline);
        }
      `}</style>
      
      {/* Fixed Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-icon">
            <span className="material-symbols-outlined">architecture</span>
          </div>
          <div className="sidebar-title">
            <h1>The Atelier</h1>
            <p>Precision Learning</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2">
          <div 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={{ cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined">dashboard</span>
            Overview
          </div>
          <div 
            className={`nav-link ${activeTab === 'study_planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('study_planner')}
            style={{ cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined">psychology_alt</span>
            Study Planner
          </div>
          <div 
            className={`nav-link ${activeTab === 'my_courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('my_courses')}
            style={{ cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined">school</span>
            My Courses
          </div>
        </nav>
      </aside>

      {/* Main UI Area */}
      <div className="flex-1 flex flex-col p-12" style={{ marginLeft: '260px' }}>
        
        {/* Top App Header */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="top-bar-title title-glow">Study Session Setup</h2>
          
          <div className="flex gap-4 items-center">
            {/* Low Bandwidth Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: phase !== 'input' ? 'not-allowed' : 'pointer', color: 'var(--text-secondary)', fontSize: '0.9rem', opacity: phase !== 'input' ? 0.5 : 1 }}>
                <input 
                  type="checkbox" 
                  checked={isLowBandwidth} 
                  onChange={(e) => setIsLowBandwidth(e.target.checked)}
                  disabled={phase !== 'input'}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
                />
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>speed</span>
                Low-Bandwidth Mode
              </label>
              {isLowBandwidth && (
                <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  Eco-Active
                </span>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button 
                className="icon-btn" 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ position: 'relative' }}
              >
                <span className="material-symbols-outlined">notifications</span>
                {/* Red dot badge */}
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  border: '2px solid var(--bg-main)'
                }}></span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '320px',
                  background: 'var(--bg-sidebar)',
                  border: 'var(--glass-border)',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Notifications</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', cursor: 'pointer' }}>Mark all as read</span>
                  </div>
                  
                  <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                      <span style={{ fontSize: '1.2rem', marginRight: '8px', verticalAlign: 'middle' }}>🎉</span>
                      Welcome to The Atelier! You earned 10 starting Eco-Points.
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>2 hours ago</span>
                  </div>

                  <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-secondary)' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                      <span style={{ fontSize: '1.2rem', marginRight: '8px', verticalAlign: 'middle' }}>📚</span>
                      Your AI study plan for Python Lists is ready.
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>1 day ago</span>
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '20px', border: 'var(--glass-border)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent-primary)' }}>account_circle</span>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{userName || user.email}</span>
              <button 
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px', display: 'flex', alignItems: 'center' }}
                title="Logout"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* ERROR HANDLER */}
        {error && (
          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', color: '#ef4444', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Tailwind Grid layout strictly specifying 2/3 left, 1/3 right */}
        <div className="grid grid-cols-3 gap-8 items-start">
          
          {/* Main Content (left 2/3) */}
          <div className="col-span-2 flex flex-col gap-8">
            {activeTab === 'overview' && (
              <Overview 
                user={user} 
                userName={userName} 
                onStartSession={() => setActiveTab('study_planner')} 
              />
            )}
            
            {activeTab === 'my_courses' && (
              <MyCourses user={user} />
            )}

            {activeTab === 'study_planner' && (
              <>
                {/* PHASE 1: INPUT */}
                {phase === 'input' && (
              <section className="card form-card">
                <h3 className="card-title">Calibration Protocol</h3>
                <p className="card-subtitle">Choose a topic. Our AI will generate a rapid-fire quiz to assess your knowledge.</p>
                
                <form onSubmit={handleStartQuiz}>
                  <div className="form-group">
                    <label className="form-label">Subject / Topic</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g., Cognitive Science, Linear Algebra..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span>
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">psychology</span>
                        Start Quiz
                      </>
                    )}
                  </button>
                </form>
              </section>
            )}

            {/* PHASE 2: QUIZ */}
            {phase === 'quiz' && questions.length > 0 && (
              <section className="card form-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 className="card-title">Question {currentQIndex + 1} of {questions.length}</h3>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Topic: {topic}</span>
                </div>
                
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {questions[currentQIndex].question_text}
                </p>
                
                <div>
                  {questions[currentQIndex].options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      className="option-btn"
                      onClick={() => handleAnswer(idx)}
                    >
                      <span className="option-letter">{['A', 'B', 'C', 'D'][idx]}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* PHASE 3: RESULTS & STUDY PLAN */}
            {phase === 'results' && (
              <>
                <section className="card form-card" style={{ marginBottom: '0' }}>
                  <h3 className="card-title" style={{ fontSize: '2rem', color: 'var(--accent-primary)' }}>
                    You Scored {score}%!
                  </h3>
                  <p className="card-subtitle">
                    {earnedPoints} points have been successfully added to your EcoLeaderboard wallet.
                    {isLowBandwidth && <span style={{ color: '#4ade80', fontWeight: 'bold' }}> (Includes your +5 'Efficiency Bonus'!)</span>}
                  </p>
                  <button onClick={resetFlow} className="submit-btn" style={{ background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}>
                    <span className="material-symbols-outlined">replay</span>
                    Start New Topic
                  </button>
                </section>

                <section className="card plan-result" style={{ minHeight: '350px' }}>
                  <h3 className="card-title">Your Personalized Study Plan</h3>
                  <p className="card-subtitle">AI-generated recommendations targeting your weak points.</p>

                  <div className="plan-content">
                    {loading ? (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--accent-primary)' }}>
                        <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span>
                        Analyzing results and generating plan...
                      </div>
                    ) : (
                      plan ? (
                        <ReactMarkdown>{plan}</ReactMarkdown>
                      ) : (
                        <div className="empty-state">
                          <span className="material-symbols-outlined empty-icon">import_contacts</span>
                          <p>Failed to load study plan.</p>
                        </div>
                      )
                    )}
                  </div>
                </section>
              </>
            )}
              </>
            )}
            {/* END STUDY PLANNER PHASES */}
          </div>

          {/* Leaderboard panel (right 1/3) */}
          <div className="col-span-1 h-full flex flex-col">
            <EcoLeaderboard currentUser={user} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
