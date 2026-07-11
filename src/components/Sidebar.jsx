import { useState } from 'react';
import PropTypes from 'prop-types';
import ModalAlert from './ModalAlert'; 

/* IKON MENU UTAMA */
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconTrendingUp = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconTrophy = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>;
const IconUsers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconUserManage = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconMoreDots = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>;

/* IKON FLOATING TOGGLE (PREMIUM CHEVRON) */
const IconChevronLeft = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

/* IKON AKSI BAWAH */
const IconLeaderboard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>;
const IconProfile = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconSettings = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const IconLogout = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

export default function Sidebar({ activeMenu, setActiveMenu, selectedLevel, setSelectedLevel, isMobile, isOpen, setIsOpen, userRole }) {
  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showModulePopup, setShowModulePopup] = useState(false);
  const [showBottomPopup, setShowBottomPopup] = useState(false);
  
  const handleMenuClick = (menuType) => {
    setActiveMenu(menuType);
    if (menuType !== 'modules') setSelectedLevel(null); 
    if (isMobile) setIsOpen(false); 
    closeAllPopups();
  };

  const handleSubMenuClick = (level) => {
    handleMenuClick('modules');
    setSelectedLevel(level);
    setShowModulePopup(false);
    if (isMobile) setIsOpen(false); 
  };

  const executeLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const closeAllPopups = () => {
    setShowModulePopup(false);
    setShowBottomPopup(false);
  };

  // Fungsi pembantu untuk gaya tombol agar lebih rapi
  const getMenuItemStyle = (isActive) => ({
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: isMinimized ? 'center' : 'flex-start', 
    gap: '12px', 
    padding: isMinimized ? '12px' : '10px 14px', 
    borderRadius: '8px', 
    color: isActive ? '#111827' : '#6B7280', 
    backgroundColor: isActive ? '#F3F4F6' : 'transparent', 
    cursor: 'pointer', 
    fontWeight: isActive ? '600' : '500', 
    transition: 'all 0.2s',
    position: 'relative'
  });

  return (
    <>
      {isMobile && isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', zIndex: 45, backdropFilter: 'blur(2px)' }}></div>
      )}

      {/* Overlay tak terlihat untuk auto-close popups */}
      {isMinimized && (showModulePopup || showBottomPopup) && (
        <div onClick={closeAllPopups} style={{ position: 'fixed', inset: 0, zIndex: 55 }}></div>
      )}

      <aside style={{ 
        width: isMobile ? '260px' : (isMinimized ? '80px' : '260px'), 
        backgroundColor: '#FFFFFF', // Menggunakan warna putih bersih ala Next.js
        borderRight: '1px solid #EAEAEA', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box',
        zIndex: 60, 
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%', 
        position: isMobile ? 'fixed' : 'relative', 
        top: 0, 
        left: isMobile ? (isOpen ? 0 : '-260px') : 0,
        flexShrink: 0 
      }}>
        
        {/* ========================================================================= */}
        {/* FLOATING MAXIMIZE/MINIMIZE BUTTON (STYLE GEMINI / VERCEL) */}
        {/* ========================================================================= */}
        {!isMobile && (
          <button 
            onClick={() => { setIsMinimized(!isMinimized); closeAllPopups(); }} 
            title={isMinimized ? "Perluas Sidebar" : "Ciutkan Sidebar"}
            style={{ 
              position: 'absolute', 
              right: '-14px', // Ditarik sedikit ke luar batas sidebar
              top: '32px', 
              width: '28px', 
              height: '28px', 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #EAEAEA', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)', 
              zIndex: 100, 
              color: '#6B7280',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#EAEAEA'; }}
          >
            {isMinimized ? <IconChevronRight /> : <IconChevronLeft />}
          </button>
        )}

        <div style={{ flex: 1, overflowY: 'visible', overflowX: 'visible', padding: '28px 0', display: 'flex', flexDirection: 'column' }}>
          
          {/* HEADER LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMinimized ? 'center' : 'space-between', marginBottom: '36px', padding: isMinimized ? '0' : '0 24px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
              <div style={{ minWidth: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              {!isMinimized && (
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: '#111827', whiteSpace: 'nowrap' }}>VIBA.AI</h1>
              )}
            </div>
            
            {isMobile && (
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '4px' }}><IconClose /></button>
            )}
          </div>

          {!isMinimized && (
            <div style={{ padding: '0 24px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Navigasi</span>
            </div>
          )}

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: isMinimized ? '0 12px' : '0 16px', alignItems: isMinimized ? 'center' : 'stretch' }}>
            
            {/* WRAPPER MODUL + POPUP */}
            <div style={{ position: 'relative', width: '100%' }}>
              <div 
                onClick={() => isMinimized ? setShowModulePopup(!showModulePopup) : handleMenuClick('modules')} 
                style={getMenuItemStyle(activeMenu === 'modules' && !selectedLevel)} 
                title={isMinimized ? "Modul Pembelajaran" : ""}
                onMouseOver={(e) => { if(activeMenu !== 'modules' || selectedLevel) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} 
                onMouseOut={(e) => { if(activeMenu !== 'modules' || selectedLevel) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {/* Active Indicator Bar */}
                {activeMenu === 'modules' && !selectedLevel && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', backgroundColor: '#111827', borderRadius: '0 4px 4px 0' }}></div>}
                
                <IconHome /> {!isMinimized && <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>Modul Pembelajaran</span>}
              </div>

              {/* POPUP MODUL JIKA MINIMIZED */}
              {isMinimized && showModulePopup && (
                <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: '16px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '8px', zIndex: 70, width: '180px' }}>
                  <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #F3F4F6', marginBottom: '4px' }}>Level Modul</div>
                  <div onClick={() => handleSubMenuClick('huruf')} style={{ padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#4B5563' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Level Abjad</div>
                  <div onClick={() => handleSubMenuClick('kata')} style={{ padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#4B5563' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Level Kosa Kata</div>
                  <div onClick={() => handleSubMenuClick('kalimat')} style={{ padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#4B5563' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Level Kalimat</div>
                </div>
              )}
            </div>
            
            {/* SUB-MODUL JIKA TIDAK MINIMIZED */}
            {!isMinimized && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '21px', paddingLeft: '14px', borderLeft: '1px solid #EAEAEA', marginTop: '-4px', marginBottom: '8px' }}>
                <div onClick={() => handleSubMenuClick('huruf')} style={{ padding: '8px 12px', borderRadius: '8px', color: activeMenu === 'modules' && selectedLevel === 'huruf' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'modules' && selectedLevel === 'huruf' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: activeMenu === 'modules' && selectedLevel === 'huruf' ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'huruf')) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'huruf')) e.currentTarget.style.backgroundColor = 'transparent'; }}>Level Abjad</div>
                <div onClick={() => handleSubMenuClick('kata')} style={{ padding: '8px 12px', borderRadius: '8px', color: activeMenu === 'modules' && selectedLevel === 'kata' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'modules' && selectedLevel === 'kata' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: activeMenu === 'modules' && selectedLevel === 'kata' ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kata')) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kata')) e.currentTarget.style.backgroundColor = 'transparent'; }}>Level Kosa Kata</div>
                <div onClick={() => handleSubMenuClick('kalimat')} style={{ padding: '8px 12px', borderRadius: '8px', color: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kalimat')) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kalimat')) e.currentTarget.style.backgroundColor = 'transparent'; }}>Level Kalimat</div>
              </div>
            )}

            <div 
              onClick={() => handleMenuClick('quests')} 
              title={isMinimized ? "Tantangan (Quest)" : ""}
              style={getMenuItemStyle(activeMenu === 'quests')}
              onMouseOver={(e) => { if(activeMenu !== 'quests') e.currentTarget.style.backgroundColor = '#F9FAFB'; }} 
              onMouseOut={(e) => { if(activeMenu !== 'quests') e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {activeMenu === 'quests' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', backgroundColor: '#111827', borderRadius: '0 4px 4px 0' }}></div>}
              <IconTrophy /> {!isMinimized && <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>Tantangan (Quest)</span>}
            </div>

            {/* AREA KHUSUS INSTANSI/PENDIDIK */}
            {userRole !== 'student' && (
              <>
                <div 
                  onClick={() => handleMenuClick('educator')} 
                  title={isMinimized ? "Ruang Pendidik" : ""}
                  style={getMenuItemStyle(activeMenu === 'educator')}
                  onMouseOver={(e) => { if(activeMenu !== 'educator') e.currentTarget.style.backgroundColor = '#F9FAFB'; }} 
                  onMouseOut={(e) => { if(activeMenu !== 'educator') e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {activeMenu === 'educator' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', backgroundColor: '#111827', borderRadius: '0 4px 4px 0' }}></div>}
                  <IconUsers /> {!isMinimized && <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>Ruang Pendidik</span>}
                </div>

                <div 
                  onClick={() => handleMenuClick('students')} 
                  title={isMinimized ? "Manajemen Murid" : ""}
                  style={getMenuItemStyle(activeMenu === 'students')}
                  onMouseOver={(e) => { if(activeMenu !== 'students') e.currentTarget.style.backgroundColor = '#F9FAFB'; }} 
                  onMouseOut={(e) => { if(activeMenu !== 'students') e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {activeMenu === 'students' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', backgroundColor: '#111827', borderRadius: '0 4px 4px 0' }}></div>}
                  <IconUserManage /> {!isMinimized && <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>Manajemen Murid</span>}
                </div>
              </>
            )}

            <div 
              onClick={() => handleMenuClick('progress')} 
              title={isMinimized ? "Monitoring Perkembangan" : ""}
              style={getMenuItemStyle(activeMenu === 'progress')}
              onMouseOver={(e) => { if(activeMenu !== 'progress') e.currentTarget.style.backgroundColor = '#F9FAFB'; }} 
              onMouseOut={(e) => { if(activeMenu !== 'progress') e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {activeMenu === 'progress' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', backgroundColor: '#111827', borderRadius: '0 4px 4px 0' }}></div>}
              <IconTrendingUp /> {!isMinimized && <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>Monitoring Perkembangan</span>}
            </div>

          </nav>
        </div>

        {/* ============================================== */}
        {/* BOTTOM ACTIONS AREA (DENGAN POPUP JIKA MINIMIZED) */}
        {/* ============================================== */}
        <div style={{ position: 'relative', padding: isMinimized ? '24px 0' : '20px 24px', display: 'flex', justifyContent: isMinimized ? 'center' : 'space-between', alignItems: 'center', borderTop: '1px solid #EAEAEA', backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          
          {!isMinimized ? (
            <>
              <button title="Leaderboard" onClick={() => handleMenuClick('leaderboard')} style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: activeMenu === 'leaderboard' ? '#F3F4F6' : 'transparent', border: 'none', cursor: 'pointer', color: activeMenu === 'leaderboard' ? '#111827' : '#6B7280', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = activeMenu === 'leaderboard' ? '#F3F4F6' : 'transparent'; e.currentTarget.style.color = activeMenu === 'leaderboard' ? '#111827' : '#6B7280'; }}>
                <IconLeaderboard />
              </button>
              
              <button title="Profile" onClick={() => handleMenuClick('profile')} style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: activeMenu === 'profile' ? '#F3F4F6' : 'transparent', border: 'none', cursor: 'pointer', color: activeMenu === 'profile' ? '#111827' : '#6B7280', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = activeMenu === 'profile' ? '#F3F4F6' : 'transparent'; e.currentTarget.style.color = activeMenu === 'profile' ? '#111827' : '#6B7280'; }}>
                <IconProfile />
              </button>
              
              <button title="Settings" onClick={() => handleMenuClick('settings')} style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: activeMenu === 'settings' ? '#F3F4F6' : 'transparent', border: 'none', cursor: 'pointer', color: activeMenu === 'settings' ? '#111827' : '#6B7280', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = activeMenu === 'settings' ? '#F3F4F6' : 'transparent'; e.currentTarget.style.color = activeMenu === 'settings' ? '#111827' : '#6B7280'; }}>
                <IconSettings />
              </button>
              
              <button title="Logout" onClick={() => setIsLogoutModalOpen(true)} style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#EF4444', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#EF4444'; }}>
                <IconLogout />
              </button>
            </>
          ) : (
            <>
              {/* TOMBOL MENU BAWAH SAAT MINIMIZED */}
              <button 
                onClick={() => setShowBottomPopup(!showBottomPopup)} 
                title="Aksi Lanjutan"
                style={{ width: '44px', height: '44px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: showBottomPopup ? '#F3F4F6' : 'transparent', border: 'none', cursor: 'pointer', color: showBottomPopup ? '#111827' : '#6B7280', transition: 'all 0.2s ease' }} 
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }} 
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = showBottomPopup ? '#F3F4F6' : 'transparent'; e.currentTarget.style.color = showBottomPopup ? '#111827' : '#6B7280'; }}
              >
                <IconMoreDots />
              </button>

              {/* POPUP MENU BAWAH */}
              {showBottomPopup && (
                <div style={{ position: 'absolute', left: '100%', bottom: '16px', marginLeft: '16px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '8px', zIndex: 70, width: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  
                  <div onClick={() => handleMenuClick('leaderboard')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: activeMenu === 'leaderboard' ? '#111827' : '#4B5563', backgroundColor: activeMenu === 'leaderboard' ? '#F9FAFB' : 'transparent' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseOut={e => e.currentTarget.style.backgroundColor = activeMenu === 'leaderboard' ? '#F9FAFB' : 'transparent'}>
                    <IconLeaderboard /> Peringkat Global
                  </div>
                  
                  <div onClick={() => handleMenuClick('profile')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: activeMenu === 'profile' ? '#111827' : '#4B5563', backgroundColor: activeMenu === 'profile' ? '#F9FAFB' : 'transparent' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseOut={e => e.currentTarget.style.backgroundColor = activeMenu === 'profile' ? '#F9FAFB' : 'transparent'}>
                    <IconProfile /> Profil Akun
                  </div>
                  
                  <div onClick={() => handleMenuClick('settings')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: activeMenu === 'settings' ? '#111827' : '#4B5563', backgroundColor: activeMenu === 'settings' ? '#F9FAFB' : 'transparent' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseOut={e => e.currentTarget.style.backgroundColor = activeMenu === 'settings' ? '#F9FAFB' : 'transparent'}>
                    <IconSettings /> Pengaturan Sistem
                  </div>
                  
                  <div style={{ borderTop: '1px solid #F3F4F6', margin: '4px 0' }}></div>
                  
                  <div onClick={() => { setShowBottomPopup(false); setIsLogoutModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#EF4444' }} onMouseOver={e => {e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'}} onMouseOut={e => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#EF4444'}}>
                    <IconLogout /> Keluar Sesi
                  </div>

                </div>
              )}
            </>
          )}

        </div>
      </aside>

      <ModalAlert 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={executeLogout}
        title="Keluar Sistem Viba.ai"
        message="Anda yakin ingin mengakhiri sesi saat ini? Anda perlu memasukkan kembali kredensial akses untuk masuk."
        confirmText="Keluar Sistem"
        cancelText="Batalkan"
        type="danger"
      />
    </>
  );
}

Sidebar.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  setActiveMenu: PropTypes.func.isRequired,
  selectedLevel: PropTypes.string,
  setSelectedLevel: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  userRole: PropTypes.string, 
};