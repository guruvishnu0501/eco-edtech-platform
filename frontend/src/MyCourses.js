import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import ReactMarkdown from 'react-markdown';

export default function MyCourses({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.uid) return;
      
      try {
        const q = query(collection(db, 'courses'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort locally by timestamp descending to avoid needing a composite index
        coursesData.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });
        
        setCourses(coursesData);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="card form-card flex items-center justify-center p-8">
        <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-primary)' }}>sync</span>
        <span style={{ marginLeft: '12px' }}>Loading your learning library...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="card form-card" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>local_library</span>
          <h2 className="title-glow" style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-headline)' }}>
            My Courses
          </h2>
        </div>
        <p className="card-subtitle">
          Review your generated study plans and continue your mastery.
        </p>
      </section>

      {courses.length === 0 ? (
        <div className="card form-card flex flex-col items-center py-12" style={{ textAlign: 'center', opacity: 0.7 }}>
          <span className="material-symbols-outlined mb-4" style={{ fontSize: '48px' }}>auto_stories</span>
          <h3 className="text-xl font-bold mb-2">No Courses Yet</h3>
          <p>Complete a study session in the Study Planner to generate your first learning path!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="card form-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headline)', fontWeight: 'bold' }}>
                  {course.topic}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(59, 130, 246, 0.1)', padding: '6px 12px', borderRadius: '20px', color: 'var(--accent-primary)', fontWeight: '600' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>assignment_turned_in</span>
                  {course.quiz_score}%
                </div>
              </div>
              
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
                {new Date(course.createdAt).toLocaleDateString()}
              </div>

              <button 
                onClick={() => toggleExpand(course.id)}
                style={{
                  background: 'none',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: 'auto',
                  transition: 'background 0.2s',
                  backgroundColor: expandedId === course.id ? 'var(--bg-input)' : 'transparent'
                }}
              >
                <span className="material-symbols-outlined">
                  {expandedId === course.id ? 'visibility_off' : 'visibility'}
                </span>
                {expandedId === course.id ? 'Hide Plan' : 'View Plan'}
              </button>

              {expandedId === course.id && (
                <div style={{ 
                  background: 'var(--bg-sidebar)', 
                  padding: '24px', 
                  borderRadius: '12px', 
                  border: 'var(--glass-border)',
                  marginTop: '8px',
                  borderLeft: '4px solid var(--accent-primary)'
                }} className="plan-content">
                  <ReactMarkdown>{course.study_plan_text}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
