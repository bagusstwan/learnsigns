import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
      
      // Mengambil data profil user saat ini berdasarkan Token Google
      fetch(`${API_BASE_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(userData => {
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard', { replace: true });
      })
      .catch(() => navigate('/login?error=SessionFailed'));
    } else {
      navigate('/login?error=GoogleAuthFailed');
    }
  }, [location, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F8FAFC' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <span className="spinner" style={{ width: '32px', height: '32px', border: '3px solid #E2E8F0', borderBottomColor: '#0F172A', borderRadius: '50%', display: 'inline-block', boxSizing: 'border-box', animation: 'spin 1s linear infinite' }}></span>
        <span style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A', fontFamily: '"Geist Sans", sans-serif' }}>Mengamankan Sesi Google...</span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}