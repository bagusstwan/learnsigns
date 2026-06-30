import { useState, useEffect } from 'react';

/* IKON MINIMALIS ENTERPRISE */
const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconSliders = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>;
const IconBell = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;

export default function SettingsPage() {
  /* --- SISTEM PENDETEKSI UKURAN LAYAR --- */
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

  /* --- STATE CONFIGURATION --- */
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [sensorSensitivity, setSensorSensitivity] = useState(70);
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const [notifyQuest, setNotifyQuest] = useState(true);
  const [notifyAssignment, setNotifyQuestAssignment] = useState(true);

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA', padding: paddingMain, boxSizing: 'border-box' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* HEADER AREA */}
        <div style={{ boxSizing: 'border-box' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>Pengaturan Sistem</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Konfigurasi kredensial keamanan, otentikasi akun, dan parameter sensitivitas kecerdasan buatan.</p>
        </div>

        {/* BLOK 1: PROFIL UMUM */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: '#6B7280' }}><IconUser /></div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>Informasi Profil</h3>
          </div>
          
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Nama Instruktur</label>
              <input type="text" defaultValue="Bagus Setiawan" style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '14px', color: '#111827', width: '100%', boxSizing: 'border-box', outline: 'none', backgroundColor: '#FAFAFA' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Afiliasi Institusi</label>
              <input type="text" defaultValue="UNPAB Medan" style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '14px', color: '#111827', width: '100%', boxSizing: 'border-box', outline: 'none', backgroundColor: '#FAFAFA' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Alamat Email</label>
              <input type="email" defaultValue="bagus.setiawan@edusync.ai" style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '14px', color: '#111827', width: '100%', boxSizing: 'border-box', outline: 'none', backgroundColor: '#FAFAFA' }} />
            </div>
          </div>

          <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Email ini digunakan untuk integrasi sistem laporan penugasan kelas.</span>
            <button style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#374151'} onMouseOut={(e) => e.target.style.backgroundColor = '#111827'}>Perbarui</button>
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
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Kata Sandi Lama</label>
              <input type="password" placeholder="••••••••" style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Kata Sandi Baru</label>
              <input type="password" placeholder="Minimal 8 karakter" style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Disarankan mengubah kata sandi secara berkala demi keamanan data token API.</span>
            <button style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Ganti Kata Sandi</button>
          </div>
        </div>

        {/* BLOK 3: KONFIGURASI SENSOR & AI PARAMS (PILAR KILLER UTK EDUTECH INTERAKTIF) */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: '#6B7280' }}><IconSliders /></div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>Parameter Rekognisi AI & Matriks</h3>
          </div>
          
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Tweak Sensitivitas Kamera */}
            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Sensitivitas Sensor</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Ambang batas minimal tracking tangan (*confidence score*).</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                <input type="range" min="50" max="95" value={sensorSensitivity} onChange={(e) => setSensorSensitivity(Number(e.target.value))} style={{ flex: 1, accentColor: '#111827', cursor: 'pointer' }} />
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827', width: '40px', textAlign: 'right' }}>{sensorSensitivity}%</span>
              </div>
            </div>

            {/* Tweak Kecepatan TTS Suara AI */}
            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Kecepatan Suara Evaluator</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Mengatur artikulasi tempo vokal kecerdasan buatan.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                <input type="range" min="0.5" max="2.0" step="0.1" value={ttsSpeed} onChange={(e) => setTtsSpeed(Number(e.target.value))} style={{ flex: 1, accentColor: '#111827', cursor: 'pointer' }} />
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827', width: '40px', textAlign: 'right' }}>{ttsSpeed.toFixed(1)}x</span>
              </div>
            </div>

            {/* Toggle Landmark Titik Jari */}
            <div style={{ display: 'grid', gridTemplateColumns: gridFormInput, gap: isMobile ? '8px' : '20px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Tampilkan Garis Koordinat Jari</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Gambar matriks skeleton jari di atas layar sensor video.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" checked={showLandmarks} onChange={(e) => setShowLandmarks(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#111827', cursor: 'pointer' }} />
              </div>
            </div>

          </div>

          <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Mempengaruhi performa rendering frame-rate per second (FPS) pada perangkat smartphone.</span>
            <button style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Terapkan</button>
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
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Kirim pemberitahuan berkala untuk menyelesaikan target Quest harian.</span>
              </div>
              <input type="checkbox" checked={notifyQuest} onChange={(e) => setNotifyQuest(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#111827', cursor: 'pointer', flexShrink: 0 }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '4px' }}>Laporan Modul Terpersonalisasi</label>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Kirim email instan saat pendidik mendistribusikan sesi materi khusus murid.</span>
              </div>
              <input type="checkbox" checked={notifyAssignment} onChange={(e) => setNotifyQuestAssignment(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#111827', cursor: 'pointer', flexShrink: 0 }} />
            </div>
          </div>

          <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Konfigurasi ini disinkronisasikan ke server pengiriman email internal.</span>
            <button style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Simpan Preferensi</button>
          </div>
        </div>

      </div>
    </main>
  );
}