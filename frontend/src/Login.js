import React, { useState } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './index.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: name || 'Anonymous',
          email: email,
          eco_points: 0
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <span className="material-symbols-outlined" style={styles.icon}>explore</span>
          </div>
          <h2 className="title-glow" style={styles.title}>
            {isLogin ? 'Welcome Back' : 'Join The Atelier'}
          </h2>
          <p style={styles.subtitle}>
            {isLogin ? 'Enter your credentials to continue your journey.' : 'Embark on a new learning adventure.'}
          </p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          )}
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span>
            ) : (
              <span className="material-symbols-outlined">
                {isLogin ? 'login' : 'person_add'}
              </span>
            )}
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div style={styles.toggleContainer}>
          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)} 
              style={styles.toggleBtn}
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-main)',
    padding: '20px',
    fontFamily: 'var(--font-body)'
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: 'var(--bg-sidebar)',
    border: 'var(--glass-border)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '8px'
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'rgba(59, 130, 246, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto',
    border: '1px solid rgba(59, 130, 246, 0.2)'
  },
  icon: {
    fontSize: '32px',
    color: 'var(--accent-primary)'
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    fontFamily: 'var(--font-headline)',
    marginBottom: '8px',
    margin: 0
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '15px',
    margin: 0
  },
  errorBox: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    padding: '12px 16px',
    borderRadius: '12px',
    color: '#ef4444',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg-input)',
    border: 'var(--glass-border)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  submitBtn: {
    marginTop: '8px',
    width: '100%',
    padding: '16px',
    background: 'var(--accent-primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px var(--accent-glow)'
  },
  toggleContainer: {
    textAlign: 'center',
    marginTop: '16px'
  },
  toggleText: {
    color: 'var(--text-secondary)',
    fontSize: '15px'
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent-primary)',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    marginLeft: '6px',
    padding: 0
  }
};
