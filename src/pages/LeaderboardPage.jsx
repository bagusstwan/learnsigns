import { useState, useEffect } from 'react';

/* IKON MINIMALIS ENTERPRISE */
const IconCrown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconClose = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconTrophy = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>;

export default function LeaderboardPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isMobile = windowWidth < 768;

  /* --- DATA MOCK LEADERBOARD GLOBAL --- */
  const MOCK_LEADERBOARD = [
    { rank: 1, name: "Ahmad Rizky", initials: "AR", class: "XI TKJ - 1", stars: 1540, tier: "Diamond Elite", quests: 32, winRate: "94%" },
    { rank: 2, name: "Siti Aminah", initials: "SA", class: "XI TKJ - 1", stars: 1420, tier: "Platinum Elite", quests: 28, winRate: "89%" },
    { rank: 3, name: "Dina Pertiwi", initials: "DP", class: "XI TKJ - 2", stars: 1310, tier: "Platinum Elite", quests: 25, winRate: "87%" },
    { rank: 4, name: "Bagus Setiawan", initials: "BS", class: "XI TKJ - 2", stars: 1240, tier: "Platinum Elite", quests: 24, winRate: "85%", isMe: true },
    { rank: 5, name: "Roni Wijaya", initials: "RW", class: "XI TKJ - 1", stars: 1150, tier: "Gold Pro", quests: 19, winRate: "80%" },
    { rank: 6, name: "Hendra Saputra", initials: "HS", class: "XI TKJ - 3", stars: 980, tier: "Gold Pro", quests: 16, winRate: "76%" },
    { rank: 7, name: "Nadia Larasati", initials: "NL", class: "XI TKJ - 1", stars: 890, tier: "Gold", quests: 14, winRate: "72%" },
  ];

  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const remainingRanks = MOCK_LEADERBOARD.slice(3);

  /* --- STATE FOR SLIDE MODAL DRAWER --- */
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA', padding: isDesktop ? '40px 60px' : '24px 16px', boxSizing: 'border-box', position: 'relative' }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* HEADER AREA */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>Peringkat Global</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Kompetisi sehat EduSync. Raih posisi teratas dengan mengumpulkan bintang dari setiap modul dan Quest.</p>
        </div>

        {/* ========================================================================= */}
        {/* PODIUM SECTION (TOP 3) - GEOMETRI BERSIH TANPA ELEMEN MENGAMBANG */}
        {/* ========================================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px', alignItems: 'end' }}>
          
          {/* RANK 2 (RUNNER UP) */}
          <div 
            onClick={() => handleUserClick(topThree[1])}
            style={{ 
              backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '16px', padding: '28px 24px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', 
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', transition: 'all 0.2s ease' 
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#111827'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#EAEAEA'; }}
          >
            {/* Sub-header Internal Minimalis */}
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#9CA3AF', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
              PERINGKAT 02
            </span>

            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: '800', color: '#4B5563', marginBottom: '16px' }}>
              {topThree[1].initials}
            </div>
            
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>{topThree[1].name}</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#6B7280' }}>{topThree[1].class}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FAFAFA', border: '1px solid #F3F4F6', padding: '8px 16px', borderRadius: '8px', width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>{topThree[1].stars.toLocaleString()}</span> <IconStar />
            </div>
          </div>

          {/* RANK 1 (CHAMPION BLACK CARD) */}
          <div 
            onClick={() => handleUserClick(topThree[0])}
            style={{ 
              backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '16px', padding: '36px 24px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', 
              boxShadow: '0 12px 24px -6px rgba(0,0,0,0.15)', boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
              transition: 'all 0.2s ease', order: isMobile ? -1 : 0 
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#374151'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1F2937'; }}
          >
            <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '140px', height: '140px', background: 'rgba(245, 158, 11, 0.2)', filter: 'blur(45px)', zIndex: 0, pointerEvents: 'none' }}></div>
            
            {/* Sub-header Mahkota Internal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F59E0B', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
              <IconCrown /> PERINGKAT 01
            </div>

            <div style={{ position: 'relative', zIndex: 1, width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '16px', boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.25)' }}>
              {topThree[0].initials}
            </div>
            
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>{topThree[0].name}</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#9CA3AF', position: 'relative', zIndex: 1 }}>{topThree[0].class}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 20px', borderRadius: '8px', width: '100%', justifyContent: 'center', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#F59E0B' }}>{topThree[0].stars.toLocaleString()}</span> <IconStar />
            </div>
          </div>

          {/* RANK 3 (THIRD PLACE) */}
          <div 
            onClick={() => handleUserClick(topThree[2])}
            style={{ 
              backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '16px', padding: '28px 24px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', 
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box', transition: 'all 0.2s ease' 
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#111827'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#EAEAEA'; }}
          >
            {/* Sub-header Internal Minimalis */}
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#9CA3AF', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
              PERINGKAT 03
            </span>

            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FAFAFA', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: '800', color: '#C2410C', marginBottom: '16px' }}>
              {topThree[2].initials}
            </div>
            
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>{topThree[2].name}</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#6B7280' }}>{topThree[2].class}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FAFAFA', border: '1px solid #F3F4F6', padding: '8px 16px', borderRadius: '8px', width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>{topThree[2].stars.toLocaleString()}</span> <IconStar />
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* LIST SECTION (RANK 4+) - TABEL BERSIH */}
        {/* ========================================================================= */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '40px 1fr 80px' : '60px 1fr 140px', padding: '16px 24px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EAEAEA', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Pos</span>
            <span>Murid</span>
            <span style={{ textAlign: 'right' }}>Bintang</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {remainingRanks.map((user) => (
              <div
                key={user.rank}
                onClick={() => handleUserClick(user)}
                style={{ 
                  display: 'grid', gridTemplateColumns: isMobile ? '40px 1fr 80px' : '60px 1fr 140px', padding: '18px 24px', alignItems: 'center', borderBottom: '1px solid #F3F4F6', cursor: 'pointer', transition: 'all 0.2s ease',
                  backgroundColor: user.isMe ? '#F8FAFC' : '#FFFFFF', 
                  position: 'relative'
                }}
                onMouseOver={(e) => { if(!user.isMe) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                onMouseOut={(e) => { if(!user.isMe) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
              >
                {user.isMe && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#111827' }}></div>}

                <div style={{ fontSize: '14px', fontWeight: '600', color: '#9CA3AF' }}>{user.rank}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                  <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%', backgroundColor: user.isMe ? '#111827' : '#F3F4F6', color: user.isMe ? '#FFFFFF' : '#4B5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: '700' }}>
                    {user.initials}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</h4>
                      {!isMobile && (
                        <span style={{ fontSize: '10px', fontWeight: '600', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', color: '#4B5563', padding: '2px 8px', borderRadius: '12px' }}>
                          {user.tier}
                        </span>
                      )}
                      {user.isMe && <span style={{ fontSize: '10px', fontWeight: '700', backgroundColor: '#111827', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>ANDA</span>}
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{user.class}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>{user.stars.toLocaleString()}</span>
                  <IconStar />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER MODAL */}
      {/* ========================================================================= */}
      <div 
        onClick={handleCloseDrawer}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, transition: 'all 0.3s ease-in-out', opacity: isDrawerOpen ? 1 : 0, pointerEvents: isDrawerOpen ? 'auto' : 'none' }}
      />

      <div style={{ position: 'fixed', top: 0, bottom: 0, right: isDrawerOpen ? 0 : '-400px', width: isMobile ? '100%' : '400px', backgroundColor: '#FFFFFF', borderLeft: '1px solid #EAEAEA', boxShadow: '-8px 0 24px rgba(0,0,0,0.05)', zIndex: 105, transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        {selectedUser && (
          <>
            <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Detail Profil Murid</span>
              <button onClick={handleCloseDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', padding: '4px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#9CA3AF'}><IconClose /></button>
            </div>

            <div style={{ pading: '32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: selectedUser.isMe ? '#111827' : '#F3F4F6', color: selectedUser.isMe ? '#FFFFFF' : '#4B5563', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: '800', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  {selectedUser.initials}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedUser.name}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>{selectedUser.class}</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#111827', borderRadius: '12px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-10%', top: '-10%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.25)', filter: 'blur(30px)' }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Peringkat Saat Ini</span>
                    <h2 style={{ margin: '8px 0 0 0', fontSize: '36px', fontWeight: '800', letterSpacing: '-1px' }}>#{selectedUser.rank}</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <IconCrown />
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#F59E0B' }}>{selectedUser.tier}</span>
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>Statistik Aktivitas</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  
                  <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #EAEAEA', borderRadius: '8px', padding: '16px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Total Bintang</p>
                    <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>{selectedUser.stars.toLocaleString()} <IconStar /></p>
                  </div>

                  <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #EAEAEA', borderRadius: '8px', padding: '16px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>Win Rate AI</p>
                    <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#10B981' }}>{selectedUser.winRate}</p>
                  </div>

                  <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #EAEAEA', borderRadius: '8px', padding: '16px', gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ color: '#6B7280' }}><IconTrophy /></div>
                      <div>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827' }}>{selectedUser.quests} Quest Selesai</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>Telah menyelesaikan misi harian berturut-turut.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </>
        )}
      </div>

    </main>
  );
}