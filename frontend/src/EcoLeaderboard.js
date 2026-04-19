import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import './EcoLeaderboard.css';

export default function EcoLeaderboard({ currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('eco_points', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="card leaderboard-card">
      <div className="leaderboard-header">
        <div>
          <h3 className="card-title">Top Scholars</h3>
          <p className="card-subtitle">Eco-points Rankings</p>
        </div>
        <div className="leaderboard-icon">
          <span className="material-symbols-outlined">workspace_premium</span>
        </div>
      </div>

      <div className="leaderboard-list">
        {users.length === 0 ? (
          <div className="empty-state">No scholars yet.</div>
        ) : (
          users.map((user, index) => {
            const isCurrentUser = currentUser && user.id === currentUser.uid;
            return (
              <div 
                key={user.id} 
                className="leaderboard-item" 
                style={isCurrentUser ? { 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  borderLeft: '4px solid var(--accent-primary)' 
                } : {}}
              >
                <div className="rank">
                  {index + 1}
                </div>
                <div className="user-info">
                  <span className="username" style={isCurrentUser ? { fontWeight: 'bold', color: 'var(--accent-primary)' } : {}}>
                    {user.name || user.username || 'Anonymous'}
                    {isCurrentUser && ' (You)'}
                  </span>
                </div>
                <div className="points">
                  <span className="material-symbols-outlined star-icon">star</span>
                  {user.eco_points}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
