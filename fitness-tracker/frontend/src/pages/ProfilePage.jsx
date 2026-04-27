import React, { useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { User, Activity, Target } from 'lucide-react';

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    fitness_goal: 'lose_weight',
    activity_level: 'sedentary',
    medical_notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || '',
        fitness_goal: user.fitness_goal || 'lose_weight',
        activity_level: user.activity_level || 'sedentary',
        medical_notes: user.medical_notes || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.put('/users/profile', {
        ...formData,
        age: parseInt(formData.age),
        api_key: user.api_key // preserve api key
      });
      setUser(res.data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <User size={32} color="var(--accent-green)" /> My Profile
      </h2>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Full Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Age</label>
            <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              <Target size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Fitness Goal
            </label>
            <select value={formData.fitness_goal} onChange={e => setFormData({...formData, fitness_goal: e.target.value})}>
              <option value="lose_weight">Lose Weight</option>
              <option value="build_strength">Build Strength</option>
              <option value="stay_active">Stay Active</option>
              <option value="improve_endurance">Improve Endurance</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              <Activity size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Activity Level
            </label>
            <select value={formData.activity_level} onChange={e => setFormData({...formData, activity_level: e.target.value})}>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Active</option>
              <option value="very_active">Very Active</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Medical Notes / Injuries (Optional)</label>
            <textarea value={formData.medical_notes} onChange={e => setFormData({...formData, medical_notes: e.target.value})} placeholder="Any previous injuries, conditions, or doctor's notes..." />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
