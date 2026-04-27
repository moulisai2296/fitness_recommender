import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', age: '', fitness_goal: 'lose_weight', activity_level: 'sedentary'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        ...formData,
        age: parseInt(formData.age),
      });
      navigate('/onboarding');
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
          <select value={formData.fitness_goal} onChange={e => setFormData({...formData, fitness_goal: e.target.value})} required style={{ marginBottom: '16px' }}>
            <option value="lose_weight">Lose Weight</option>
            <option value="build_strength">Build Strength</option>
            <option value="stay_active">Stay Active</option>
            <option value="improve_endurance">Improve Endurance</option>
          </select>
          <select value={formData.activity_level} onChange={e => setFormData({...formData, activity_level: e.target.value})} required style={{ marginBottom: '16px' }}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register</button>
        </form>
        <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
