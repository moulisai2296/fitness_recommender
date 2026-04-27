import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Bot, AlertTriangle } from 'lucide-react';

const AICoachPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [apiKey, setApiKey] = useState(user?.api_key || '');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchHistory();
    if (user?.api_key) setApiKey(user.api_key);
  }, [user]);

  const fetchHistory = async () => {
    try {
      const res = await axiosInstance.get('/ai/history');
      setHistory(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveKey = async () => {
    try {
      const res = await axiosInstance.put('/users/profile', { api_key: apiKey });
      setUser(res.data);
      toast.success("API Key securely saved to your profile!");
    } catch (err) {
      toast.error("Failed to save API Key.");
    }
  };

  const handleGenerate = async () => {
    if (!user?.api_key && !apiKey) {
      toast.error("Please enter and save your Gemini API Key first.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/ai/recommend', {});
      setRecommendation(res.data);
      fetchHistory();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to generate recommendation. Check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const parseRecommendation = (text) => {
    return text.split('\n').map((str, i) => {
      let cleanStr = str.trim();
      if (!cleanStr) return null;
      
      if (cleanStr.startsWith('###')) {
        return <h3 key={i} style={{ color: 'var(--accent-green)', marginTop: '24px', marginBottom: '16px' }}>{cleanStr.replace(/###\s*/, '')}</h3>;
      }
      
      let isList = false;
      if (cleanStr.startsWith('* ') || cleanStr.startsWith('- ')) {
        isList = true;
        cleanStr = cleanStr.substring(2).trim();
      }
      
      const parts = cleanStr.split(/(\*\*.*?\*\*)/g);
      const formattedContent = parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isList) {
        return <li key={i} style={{ marginLeft: '16px', marginBottom: '12px', borderLeft: '2px solid var(--accent-green)', paddingLeft: '12px', listStyleType: 'none', color: 'var(--text-secondary)' }}>{formattedContent}</li>;
      }
      
      return <p key={i} style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>{formattedContent}</p>;
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '12px 24px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
        <AlertTriangle size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }} />
        FitCoach AI provides general guidance only. Always consult a healthcare professional before starting a new fitness programme.
      </div>

      {!user?.api_key ? (
        <div className="card mb-4" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input 
            type="password" 
            placeholder="Enter Gemini API Key" 
            value={apiKey} 
            onChange={e => setApiKey(e.target.value)} 
            style={{ margin: 0, flex: 1 }}
          />
          <button className="btn btn-ghost" onClick={handleSaveKey}>Save Key</button>
        </div>
      ) : (
        <div className="card mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid var(--accent-green)' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>✓ API Key Configured</span>
          <button className="btn btn-ghost" onClick={() => { setApiKey(''); setUser({...user, api_key: null}); }}>Update Key</button>
        </div>
      )}

      <button className="btn btn-primary mb-4" style={{ width: '100%', height: '64px', fontSize: '20px' }} onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating Plan..." : <><Bot style={{ marginRight: '12px' }} /> Generate My Fitness Plan</>}
      </button>

      {recommendation && (
        <div className="card mb-4" style={{ borderTop: '4px solid var(--accent-green)' }}>
          {recommendation.safety_warning && (
            <div style={{ background: 'rgba(255, 59, 48, 0.1)', border: '1px solid var(--danger-red)', padding: '16px', borderRadius: '8px', color: 'var(--danger-red)', marginBottom: '24px' }}>
              <strong>Safety Warning:</strong> {recommendation.safety_warning}
            </div>
          )}
          <div>{parseRecommendation(recommendation.recommendation)}</div>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '32px' }}>
            <h3 style={{ margin: 0 }}>History</h3>
            <button className="btn btn-ghost" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
          {showHistory && history.map(h => (
            <div key={h.id} className="card mb-4" style={{ opacity: 0.8 }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {new Date(h.generated_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}
              </div>
              <div>{parseRecommendation(h.recommendation)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AICoachPage;
