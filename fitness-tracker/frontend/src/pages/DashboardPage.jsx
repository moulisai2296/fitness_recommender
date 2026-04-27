import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Activity, Clock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ total_sessions: 0, total_minutes: 0, calories: 0 });
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axiosInstance.get('/workouts/stats/summary');
        setStats(statsRes.data);
        const workoutsRes = await axiosInstance.get('/workouts?limit=3');
        setRecentWorkouts(workoutsRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="page-title">Welcome back, {user?.name}</h1>
      
      <div className="grid-3 mb-4">
        <div className="card" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ background: 'rgba(0, 255, 133, 0.1)', padding: '16px', borderRadius: '50%', marginRight: '16px' }}>
            <Activity color="var(--accent-green)" size={32} />
          </div>
          <div>
            <h4 style={{ color: 'var(--text-secondary)' }}>Total Sessions</h4>
            <h2>{stats.total_sessions}</h2>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ background: 'rgba(0, 255, 133, 0.1)', padding: '16px', borderRadius: '50%', marginRight: '16px' }}>
            <Clock color="var(--accent-green)" size={32} />
          </div>
          <div>
            <h4 style={{ color: 'var(--text-secondary)' }}>Total Minutes</h4>
            <h2>{stats.total_minutes}</h2>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ background: 'rgba(0, 255, 133, 0.1)', padding: '16px', borderRadius: '50%', marginRight: '16px' }}>
            <Flame color="var(--accent-green)" size={32} />
          </div>
          <div>
            <h4 style={{ color: 'var(--text-secondary)' }}>Calories Burned</h4>
            <h2>{Math.round(stats.calories)}</h2>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="mb-4">Recent Workouts</h3>
          {recentWorkouts.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No recent workouts.</p>
          ) : (
            recentWorkouts.map(w => (
              <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-accent)', padding: '12px 0' }}>
                <span style={{ fontWeight: 'bold' }}>{w.activity_type}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{w.duration_minutes} min | {w.intensity}</span>
              </div>
            ))
          )}
          <Link to="/log-workout" className="btn btn-ghost mt-4" style={{ width: '100%' }}>Log a Workout</Link>
        </div>
        
        <div className="card" style={{ borderTop: '4px solid var(--accent-green)' }}>
          <h3 className="mb-4">Your Goal</h3>
          <h2 style={{ color: 'var(--accent-green)', textTransform: 'capitalize' }}>
            {user?.fitness_goal.replace('_', ' ')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Activity Level: <span style={{ textTransform: 'capitalize' }}>{user?.activity_level}</span>
          </p>
          <Link to="/ai-coach" className="btn btn-primary mt-4" style={{ width: '100%' }}>Get AI Recommendation</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
