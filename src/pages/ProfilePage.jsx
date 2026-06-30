import { useState, useEffect } from 'react';

/* IKON MINIMALIS VERCEL STYLE */
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconBriefcase = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const IconMapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconCalendar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconTrophy = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>;

export default function ProfilePage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isMobile = windowWidth < 768;

  const userProfile = {
    name: "Bagus Setiawan",
    role: "Pengembang & Instruktur TKJ",
    institution: "UNPAB Medan",
    email: "bagus.setiawan@edusync.ai",
    location: "Medan, Sumatera Utara",
    joinDate: "September 2025",
    rank: 4,
    totalStars: 1240,
    tier: "Platinum Elite",
    nextTierStars: 1500
  };

  const progressToNextTier = (userProfile.totalStars / userProfile.nextTierStars) * 100;

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA', padding: isDesktop ? '40px 60px' : '24px 16px', boxSizing: 'border-box' }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* HEADER AREA */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>Pengaturan Akun</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Kelola informasi publik dan pantau pencapaian belajar Anda.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 340px' : '1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* KOLOM KIRI: PERSONAL INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* CARD 1: IDENTITY */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid #F3F4F6' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>Profil Publik</h3>
              </div>
              
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                  
                  {/* --- PERBAIKAN AVATAR MELAR DI SINI --- */}
                  <div style={{ 
                    flexShrink: 0, /* Kunci agar tidak menyusut/melar */
                    width: '80px', height: '80px', 
                    minWidth: '80px', minHeight: '80px',
                    borderRadius: '50%', backgroundColor: '#111827', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '24px', fontWeight: '800' 
                  }}>
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* -------------------------------------- */}

                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#111827' }}>{userProfile.name}</h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>Foto profil akan ditampilkan secara publik di Leaderboard.</p>
                    <button style={{ marginTop: '12px', background: 'none', border: '1px solid #EAEAEA', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }} onMouseOver={(e) => e.target.style.borderColor = '#000'}>Ganti Foto</button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '8px' : '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Nama Lengkap</label>
                    <input readOnly value={userProfile.name} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #EAEAEA', backgroundColor: '#F9FAFB', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '8px' : '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Peran Utama</label>
                    <input readOnly value={userProfile.role} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #EAEAEA', backgroundColor: '#F9FAFB', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '8px' : '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563' }}>Institusi</label>
                    <input readOnly value={userProfile.institution} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #EAEAEA', backgroundColor: '#F9FAFB', fontSize: '14px', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 32px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Pastikan data Anda sudah benar untuk keperluan sertifikat.</span>
                <button style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Simpan</button>
              </div>
            </div>

            {/* CARD 2: CONTACT DETAIL */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Informasi Tambahan</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9CA3AF' }}><IconMail /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Email</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{userProfile.email}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9CA3AF' }}><IconMapPin /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Lokasi</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{userProfile.location}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#9CA3AF' }}><IconCalendar /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Bergabung</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{userProfile.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: GAMIFICATION & RANKING */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* RANK CARD DENGAN EFEK GAUSSIAN BLUR (AMBIENT GLOW) */}
            <div style={{ backgroundColor: '#111827', borderRadius: '12px', padding: '32px', color: 'white', position: 'relative', overflow: 'hidden', zIndex: 1, border: '1px solid #1F2937' }}>
              
              {/* Efek Lingkaran Gaussian Blur (Glowing Orb) */}
              <div style={{ position: 'absolute', right: '-20%', top: '-20%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.4)', filter: 'blur(50px)', zIndex: -1 }}></div>
              <div style={{ position: 'absolute', right: '10%', bottom: '-20%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', filter: 'blur(40px)', zIndex: -1 }}></div>
              
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Ranking</span>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '16px 0' }}>
                <h2 style={{ margin: 0, fontSize: '56px', fontWeight: '800', letterSpacing: '-2px' }}>#{userProfile.rank}</h2>
                <span style={{ fontSize: '14px', color: '#34D399', fontWeight: '700' }}>↑ 2 Posisi</span>
              </div>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34D399' }}></div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#34D399' }}>Top 1% di Indonesia</span>
              </div>
            </div>

            {/* TIER CARD */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Current Tier</p>
                  <h4 style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconTrophy /> {userProfile.tier}
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Total Stars</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '800', color: '#F59E0B' }}>{userProfile.totalStars}</p>
                </div>
              </div>

              {/* Progress to Next Tier */}
              <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '10px' }}>
                  <span>Ke Diamond Elite</span>
                  <span style={{ color: '#111827' }}>{userProfile.nextTierStars - userProfile.totalStars} Stars lagi</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressToNextTier}%`, height: '100%', backgroundColor: '#111827', borderRadius: '10px', transition: 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)' }}></div>
                </div>
              </div>
            </div>

            {/* QUICK STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#111827' }}>12</p>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>Quest Menang</p>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#111827' }}>85%</p>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>Win Rate</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}