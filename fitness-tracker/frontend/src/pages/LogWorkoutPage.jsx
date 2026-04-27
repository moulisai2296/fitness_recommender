import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const LogWorkoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activity_type: 'Running', duration_minutes: 30, intensity: 'medium', notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/workouts', formData);
      navigate('/dashboard');
    } catch (err) {
      toast.error("Failed to log workout");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 className="page-title">Log a Workout</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Activity Type</label>
          <select value={formData.activity_type} onChange={e => setFormData({...formData, activity_type: e.target.value})}>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Yoga">Yoga</option>
            <option value="Weights">Weights</option>
            <option value="Swimming">Swimming</option>
            <option value="HIIT">HIIT</option>
            <option value="Walking">Walking</option>
            <option value="Other">Other</option>
          </select>
          
          <label>Duration (minutes)</label>
          <input type="number" min="1" max="600" value={formData.duration_minutes} onChange={e => setFormData({...formData, duration_minutes: parseInt(e.target.value)})} required />
          
          <label>Intensity</label>
          <select value={formData.intensity} onChange={e => setFormData({...formData, intensity: e.target.value})}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label>How did it feel? (Notes)</label>
          <textarea placeholder="Felt great, pushed hard..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />

          <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%' }}>Save Workout</button>
        </form>
      </div>
    </div>
  );
};

export default LogWorkoutPage;
