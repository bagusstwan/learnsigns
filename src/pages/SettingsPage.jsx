import { useState, useEffect } from 'react';

/* IKON MINIMALIS ENTERPRISE */
const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconSliders = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>;
const IconBell = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

export default function SettingsPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isMobile = windowWidth < 768;
  const paddingMain = isDesktop ? '40px 60px' : '24px 16px';
  const gridFormInput = isMobile ? '1fr' : '200px 1fr';

  /* --- CORE STATE --- */
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);

  /* --- STATE: PROFIL --- */
  const [profileData, setProfileData] = useState({ name: '', institution: '', email: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

  /* --- STATE: PASSWORD --- */
  const [passwordData, setPasswordData] = useState({ current_password: '', new_password: '' });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

  /* --- STATE: DEVICE PREFERENCES (LOCAL STORAGE) --- */
  const [sensorSensitivity, setSensorSensitivity] = useState(Number(localStorage.getItem('sensorSensitivity')) || 70);
  const [ttsSpeed, setTtsSpeed] = useState(Number(localStorage.getItem('ttsSpeed')) || 1.0);
  const [showLandmarks, setShowLandmarks] = useState(localStorage.getItem('showLandmarks') !== 'false');
  const [notifyQuest, setNotifyQuest] = useState(localStorage.getItem('notifyQuest') !== 'false');
  const [notifyAssignment, setNotifyAssignment] = useState(localStorage.getItem('notifyAssignment') !== 'false');
  const [prefsMsg, setPrefsMsg] = useState("");

  /* --- 1. FETCH PROFILE ON MOUNT --- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        const resData = await response.json();
        if (response.ok) {
          setProfileData({ name: resData.data.name, institution: resData.data.institution, email: resData.data.email });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [API_BASE_URL, token]);

  /* --- 2. HANDLER: SIMPAN PROFIL --- */
  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: profileData.name, institution: profileData.institution })
      });
      if (response.ok) {
        setProfileMsg({ text: 'Profil berhasil diperbarui.', type: 'success' });
      } else {
        setProfileMsg({ text: 'Gagal memperbarui profil.', type: 'error' });
      }
    } catch (e) {
      setProfileMsg({ text: 'Terjadi kesalahan koneksi.', type: 'error' });
    } finally {
      setIsSavingProfile(false);
      setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
    }
  };

  /* --- 3. HANDLER: SIMPAN PASSWORD --- */
  const handleSavePassword = async () => {
    if (passwordData.new_password.length < 8) {
      setPasswordMsg({ text: 'Kata sandi baru minimal 8 karakter.', type: 'error' });
      setTimeout(() => setPasswordMsg({ text: '', type: '' }), 3000);
      return;
    }

    setIsSavingPassword(true);
    try {
      const response = await fetch(`${API_BASE_URL}/settings/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(passwordData)
      });
      const resData = await response.json();
      
      if (response.ok) {
        setPasswordMsg({ text: 'Kredensial berhasil diperbarui.', type: 'success' });
        setPasswordData({ current_password: '', new_password: '' }); // Reset input
      } else {
        setPasswordMsg({ text: resData.message || 'Gagal mengubah kata sandi.', type: 'error' });
      }
    } catch (e) {
      setPasswordMsg({ text: 'Terjadi kesalahan koneksi.', type: 'error' });
    } finally {
      setIsSavingPassword(false);
      setTimeout(() => setPasswordMsg({ text: '', type: '' }), 3000);
    }
  };

  /* --- 4. HANDLER: SIMPAN PREFERENSI PERANGKAT --- */
  const handleSavePreferences = () => {
    localStorage.setItem('sensorSensitivity', sensorSensitivity);
    localStorage.setItem('ttsSpeed', ttsSpeed);
    localStorage.setItem('showLandmarks', showLandmarks);
    localStorage.setItem('notifyQuest', notifyQuest);
    localStorage.setItem('notifyAssignment', notifyAssignment);
    
    setPrefsMsg("Konfigurasi lokal berhasil diterapkan.");
    setTimeout(() => setPrefsMsg(""), 3000);
  };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #111827', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
         <p style={{ color: '#6B7280', fontWeight: '600' }}>Menyiapkan pengaturan...</p>
         <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA', padding: paddingMain, boxSizing: 'border-box' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* HEADER AREA */}
        <div style={{ boxSizing: 'border-box' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>Pengaturan Sistem</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Konfigurasi kredensial keamanan, otentikasi akun, dan parameter sensitivitas AI.</p>
        </div>

        {/* BLOK 1: PROFIL UMUM */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: '#6B7280' }}><IconUser /></div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>Informasi Terdaftar</h3>
          </div>
          
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Nama Lengkap</label>
              <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#111827', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Afiliasi Institusi</label>
              <input type="text" value={profileData.institution} onChange={(e) => setProfileData({...profileData, institution: e.target.value})} style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#111827', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Alamat Email (Login)</label>
              <input type="email" readOnly value={profileData.email} style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '14px', color: '#6B7280', width: '100%', boxSizing: 'border-box', outline: 'none', backgroundColor: '#F9FAFB', cursor: 'not-allowed' }} />
            </div>
          </div>

          <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: profileMsg.type === 'error' ? '#DC2626' : '#10B981' }}>{profileMsg.text}</span>
            <button onClick={handleSaveProfile} disabled={isSavingProfile} style={{ padding: '8px 16px', backgroundColor: isSavingProfile ? '#4B5563' : '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: isSavingProfile ? 'wait' : 'pointer' }}>
              {isSavingProfile ? 'Menyimpan...' : 'Perbarui'}
            </button>
          </div>
        </div>

        {/* BLOK 2: KEAMANAN / PASSWORD */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: '#6B7280' }}><IconLock /></div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>Kredensial Keamanan</h3>
          </div>
          
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Kata Sandi Saat Ini</label>
              <input type="password" value={passwordData.current_password} onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})} placeholder="••••••••" style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Kata Sandi Baru</label>
              <input type="password" value={passwordData.new_password} onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})} placeholder="Minimal 8 karakter" style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: passwordMsg.type === 'error' ? '#DC2626' : '#10B981' }}>{passwordMsg.text || 'Disarankan mengubah sandi secara berkala.'}</span>
            <button onClick={handleSavePassword} disabled={isSavingPassword || !passwordData.current_password || !passwordData.new_password} style={{ padding: '8px 16px', backgroundColor: (isSavingPassword || !passwordData.current_password || !passwordData.new_password) ? '#9CA3AF' : '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              {isSavingPassword ? 'Memproses...' : 'Ganti Kredensial'}
            </button>
          </div>
        </div>

        {/* BLOK 3: KONFIGURASI SENSOR & AI PARAMS */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: '#6B7280' }}><IconSliders /></div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>Parameter Rekognisi AI & Matriks</h3>
          </div>
          
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Sensitivitas Sensor Kamera</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Ambang batas minimal tracking tangan.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                <input type="range" min="50" max="95" value={sensorSensitivity} onChange={(e) => setSensorSensitivity(Number(e.target.value))} style={{ flex: 1, accentColor: '#111827', cursor: 'pointer' }} />
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827', width: '40px', textAlign: 'right' }}>{sensorSensitivity}%</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Kecepatan Suara Evaluator</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Mengatur artikulasi tempo vokal AI.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                <input type="range" min="0.5" max="2.0" step="0.1" value={ttsSpeed} onChange={(e) => setTtsSpeed(Number(e.target.value))} style={{ flex: 1, accentColor: '#111827', cursor: 'pointer' }} />
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827', width: '40px', textAlign: 'right' }}>{ttsSpeed.toFixed(1)}x</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Tampilkan Garis Koordinat Jari</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Gambar matriks skeleton jari di layar sensor.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" checked={showLandmarks} onChange={(e) => setShowLandmarks(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#111827', cursor: 'pointer' }} />
              </div>
            </div>

          </div>
        </div>

        {/* BLOK 4: PREFERENSI NOTIFIKASI */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', marginBottom: '16px' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: '#6B7280' }}><IconBell /></div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>Pusat Notifikasi</h3>
          </div>
          
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Pengingat Papan Misi Harian</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Kirim pemberitahuan berkala untuk menyelesaikan target Quest.</span>
              </div>
              <input type="checkbox" checked={notifyQuest} onChange={(e) => setNotifyQuest(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#111827', cursor: 'pointer', flexShrink: 0 }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Laporan Modul Terpersonalisasi</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Kirim email saat instruktur mendistribusikan sesi materi khusus.</span>
              </div>
              <input type="checkbox" checked={notifyAssignment} onChange={(e) => setNotifyAssignment(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#111827', cursor: 'pointer', flexShrink: 0 }} />
            </div>
          </div>

          <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {prefsMsg && <><div style={{ backgroundColor: '#10B981', borderRadius: '50%', padding: '2px', display: 'flex' }}><IconCheck /></div> {prefsMsg}</>}
            </span>
            <button onClick={handleSavePreferences} style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Terapkan Konfigurasi Lokal</button>
          </div>
        </div>

      </div>
    </main>
  );
}