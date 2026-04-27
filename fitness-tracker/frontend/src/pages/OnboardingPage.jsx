import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    height_cm: '', weight_kg: '', medical_notes: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.put('/users/profile', {
        height_cm: parseFloat(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
        medical_notes: formData.medical_notes || null
      });
      setUser(res.data);
      navigate('/dashboard');
    } catch (err) {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Complete Your Profile (Step {step}/2)</h2>
        
        {step === 1 && (
          <div>
            <label>Height (cm)</label>
            <input type="number" value={formData.height_cm} onChange={e => setFormData({...formData, height_cm: e.target.value})} />
            <label>Weight (kg)</label>
            <input type="number" value={formData.weight_kg} onChange={e => setFormData({...formData, weight_kg: e.target.value})} />
            <button className="btn btn-primary mt-4" style={{ width: '100%' }} onClick={nextStep}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>Medical Notes (Optional)</label>
            <textarea placeholder="Any injuries, conditions, etc..." value={formData.medical_notes} onChange={e => setFormData({...formData, medical_notes: e.target.value})} />
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={prevStep}>Back</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>Finish</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
