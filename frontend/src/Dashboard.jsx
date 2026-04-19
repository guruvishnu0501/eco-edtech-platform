import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from './firebase';
import './Dashboard.css';

export default function Dashboard() {
  const [phase, setPhase] = useState('input'); // 'input' | 'quiz' | 'results'
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      // Target Study Plan Generation
      const responsePromise = fetch('http://127.0.0.1:8000/generate-study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic, quiz_score: finalScore }),
      });

      // Target Firestore Update (Add final score to total eco_points)
      const userRef = doc(db, 'users', 'test_user');
      const firestorePromise = setDoc(userRef, {
        name: 'Test Setup User',
        eco_points: increment(finalScore)
      }, { merge: true });

      const [response] = await Promise.all([responsePromise, firestorePromise]);

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);
      const data = await response.json();
      
      setPlan(data.study_plan);
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
  };

  return (
    <>
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

      {/* ERROR HANDLER */}
      {error && (
        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', color: '#ef4444', marginBottom: '20px' }}>
          {error}
        </div>
      )}

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
              Points have been successfully added to your EcoLeaderboard wallet.
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
  );
}
