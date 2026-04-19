import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export default function Overview({ user, userName, onStartSession }) {
  const [ecoPoints, setEcoPoints] = useState(0);

  useEffect(() => {
    if (!user?.uid) return;
    
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setEcoPoints(docSnap.data().eco_points || 0);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <section className="card form-card" style={{ marginBottom: 0, borderTop: '4px solid var(--accent-primary)' }}>
        <h2 className="title-glow" style={{ fontSize: '2rem', marginBottom: '8px', fontFamily: 'var(--font-headline)' }}>
          Welcome Back, {userName || user?.email?.split('@')[0]}!
        </h2>
        <p className="card-subtitle">
          Ready to continue your learning journey? Check your stats and resume your progress below.
        </p>
      </section>

      {/* Grid for Cards */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* Stat Card */}
        <div className="card form-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px', marginBottom: 0 }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#4ade80' }}>
              eco
            </span>
          </div>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Total Eco-Points
          </h3>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {ecoPoints}
          </div>
        </div>

        {/* Quick Action Card */}
        <div className="card form-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px', marginBottom: 0 }}>
          <div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent-primary)', fontSize: '24px' }}>
                bolt
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px', fontFamily: 'var(--font-headline)' }}>
              Jump Back In
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Launch a rapid-fire quiz to earn more eco-points and generate a new study plan.
            </p>
          </div>
          
          <button 
            onClick={onStartSession}
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px var(--accent-glow)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span className="material-symbols-outlined">play_arrow</span>
            Start a New Study Session
          </button>
        </div>

      </div>
    </div>
  );
}
