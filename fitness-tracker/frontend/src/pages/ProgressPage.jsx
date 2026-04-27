import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axiosInstance.get('/workouts?limit=100');
        setWorkouts(res.data);
        
        // Group by date for simple chart
        const grouped = res.data.reduce((acc, curr) => {
          const date = new Date(curr.logged_at).toLocaleDateString();
          if (!acc[date]) acc[date] = 0;
          acc[date] += curr.duration_minutes;
          return acc;
        }, {});
        
        const data = Object.keys(grouped).map(k => ({ date: k, minutes: grouped[k] })).reverse().slice(0, 7);
        setChartData(data);
      } catch (err) {
        console.error("Failed to fetch workouts");
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div>
      <h1 className="page-title">Progress</h1>
      
      <div className="card mb-4" style={{ height: '300px' }}>
        <h3 className="mb-4">Minutes per Day (Last 7 Active Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip cursor={{fill: 'var(--bg-accent)'}} contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: 'none', color: '#fff' }} />
            <Bar dataKey="minutes" fill="var(--accent-green)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="mb-4">Workout History</h3>
        {workouts.map(w => (
          <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-accent)', padding: '12px 0' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{w.activity_type}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(w.logged_at).toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div>{w.duration_minutes} min</div>
              <div style={{ fontSize: '12px', color: w.intensity === 'high' ? 'var(--danger-red)' : w.intensity === 'medium' ? 'var(--warning-amber)' : 'var(--accent-green)' }}>{w.intensity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;
