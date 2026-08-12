import { useState } from 'react';
import PropTypes from 'prop-types';

/** Main Navigation Icons */
const IconHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconTrendingUp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconTrophy = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55.47.98.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>;
const IconUsers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconUserManage = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>;
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconLeaderboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>;

/** Floating Toggle Icons */
const IconChevronLeft = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

export default function Sidebar({ activeMenu, setActiveMenu, selectedLevel, setSelectedLevel, isMobile, isOpen, setIsOpen, userRole }) {
  
  const [isMinimized, setIsMinimized] = useState(true);
  const [showModulePopup, setShowModulePopup] = useState(false);
  
  const showAsMinimized = !isMobile && isMinimized;

  /**
   * Handles navigation routing and sidebar states upon general menu interaction
   */
  const handleMenuClick = (menuType) => {
    setActiveMenu(menuType);
    if (menuType !== 'modules') setSelectedLevel(null); 
    if (isMobile) setIsOpen(false); 
    setShowModulePopup(false);
  };

  /**
   * Special handler for the modules tab to ensure navigation triggers alongside the popup toggle
   */
  const handleModuleClick = () => {
    setActiveMenu('modules');
    setSelectedLevel(null);
    if (isMobile) setIsOpen(false);

    if (showAsMinimized) {
      setShowModulePopup(prev => !prev);
    } else {
      setShowModulePopup(false);
    }
  };

  /**
   * Handles specific sub level selection within the interactive module
   */
  const handleSubMenuClick = (level) => {
    setActiveMenu('modules');
    setSelectedLevel(level);
    setShowModulePopup(false);
    if (isMobile) setIsOpen(false); 
  };

  /**
   * Closes all active popups to reset the visual state
   */
  const closeAllPopups = () => {
    setShowModulePopup(false);
  };

  /**
   * Dynamically generates the style object for menu items based on their active state
   */
  const getMenuItemStyle = (isActive) => ({
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    gap: '16px', 
    padding: showAsMinimized ? '0 12px' : '10px 16px',
    width: showAsMinimized ? '44px' : '100%',
    height: '44px',
    boxSizing: 'border-box', 
    borderRadius: showAsMinimized ? '22px' : '12px', 
    color: isActive ? '#FFFFFF' : '#64748B', 
    backgroundColor: isActive ? '#000000' : 'transparent', 
    cursor: 'pointer', 
    fontWeight: isActive ? '700' : '500', 
    transition: 'all 0.3s ease', 
    margin: '0 auto',
    position: 'relative' 
  });

  /**
   * Dynamically generates the premium style object specifically for the highlighted Leaderboard button
   */
  const getLeaderboardStyle = (isActive) => ({
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    gap: '16px', 
    padding: showAsMinimized ? '0 12px' : '10px 16px',
    width: showAsMinimized ? '44px' : '100%',
    height: '44px',
    boxSizing: 'border-box', 
    borderRadius: showAsMinimized ? '22px' : '12px', 
    color: isActive ? '#FFFFFF' : '#4F46E5', 
    backgroundColor: isActive ? '#4F46E5' : '#EEF2FF', 
    border: isActive ? 'none' : '1px solid #C7D2FE',
    cursor: 'pointer', 
    fontWeight: isActive ? '800' : '700', 
    transition: 'all 0.3s ease', 
    margin: '0 auto',
    position: 'relative',
    boxShadow: isActive ? '0 4px 10px rgba(79, 70, 229, 0.3)' : '0 1px 2px rgba(0,0,0,0.02)'
  });

  return (
    <>
      <style>{`
        .menu-wrapper { position: relative; display: flex; align-items: center; }
        .custom-tooltip {
          visibility: hidden; opacity: 0; position: absolute; left: 100%; top: 50%;
          transform: translateY(-50%) translateX(10px);
          background-color: #111827; color: #ffffff; padding: 8px 14px;
          border-radius: 8px; font-size: 13px; font-weight: 600; white-space: nowrap;
          z-index: 1000; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); pointer-events: none;
        }
        .menu-wrapper:hover .custom-tooltip { visibility: visible; opacity: 1; transform: translateY(-50%) translateX(16px); }
        .custom-tooltip::before {
          content: ''; position: absolute; top: 50%; right: 100%; margin-top: -5px;
          border-width: 5px; border-style: solid; border-color: transparent #111827 transparent transparent;
        }
      `}</style>

      {isMobile && isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', zIndex: 45, backdropFilter: 'blur(2px)' }}></div>
      )}

      {showModulePopup && (
        <div onClick={closeAllPopups} style={{ position: 'fixed', inset: 0, zIndex: 55 }}></div>
      )}

      <aside style={{ 
        width: isMobile ? '280px' : (showAsMinimized ? '90px' : '280px'), 
        backgroundColor: '#F8FAFC',
        borderRight: '1px solid #E2E8F0', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box',
        zIndex: 60, 
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        height: '100vh', 
        position: isMobile ? 'fixed' : 'sticky', 
        top: 0, 
        left: isMobile ? (isOpen ? 0 : '-280px') : 0,
        flexShrink: 0,
        overflow: 'visible' 
      }}>
        
        {!isMobile && (
          <button 
            onClick={() => { setIsMinimized(!isMinimized); closeAllPopups(); }} 
            style={{ 
              position: 'absolute', right: '-14px', top: '40px', width: '28px', height: '28px', 
              backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', zIndex: 100, color: '#64748B', transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {showAsMinimized ? <IconChevronRight /> : <IconChevronLeft />}
          </button>
        )}

        <div style={{ flex: 1, padding: '32px 0', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: showAsMinimized ? 'center' : 'space-between', marginBottom: '48px', padding: showAsMinimized ? '0' : '0 24px', height: '40px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <h1 style={{ margin: 0, fontSize: '29px', fontWeight: '900', fontStyle: 'italic', color: '#0F172A', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }}>
                V
                <span style={{ 
                  fontSize: '29px', fontStyle: 'italic', fontWeight: '800',  
                  opacity: showAsMinimized ? 0 : 1, width: showAsMinimized ? '0px' : '70px', 
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', overflow: 'hidden'
                }}>iba.ai</span>
              </h1>
              {isMobile && (
                 <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', padding: '4px' }}><IconClose /></button>
              )}
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: showAsMinimized ? '0' : '0 20px', alignItems: 'stretch', width: '100%', boxSizing: 'border-box' }}>
            
            <div className="menu-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div 
                onClick={handleModuleClick} 
                style={getMenuItemStyle(activeMenu === 'modules' && !selectedLevel)} 
                onMouseOver={(e) => { if(activeMenu !== 'modules' || selectedLevel) e.currentTarget.style.color = '#0F172A'; }} 
                onMouseOut={(e) => { if(activeMenu !== 'modules' || selectedLevel) e.currentTarget.style.color = '#64748B'; }}
              >
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}><IconHome /></div>
                {!showAsMinimized && <span style={{ fontSize: '15px' }}>Modul Pembelajaran</span>}
              </div>

              {showAsMinimized && !showModulePopup && <div className="custom-tooltip">Modul Pembelajaran</div>}

              {(showAsMinimized && showModulePopup) && (
                <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: '20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px', zIndex: 70, width: '200px' }}>
                  <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Pilih Tingkatan</div>
                  <div onClick={() => handleSubMenuClick('huruf')} style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#0F172A', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Modul Abjad</div>
                  <div onClick={() => handleSubMenuClick('kata')} style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#0F172A', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Modul Kosa Kata</div>
                  <div onClick={() => handleSubMenuClick('kalimat')} style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#0F172A', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Modul Kalimat</div>
                </div>
              )}
            </div>
            
            {!showAsMinimized && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '26px', paddingLeft: '20px', borderLeft: '2px solid #E2E8F0', marginTop: '-4px', marginBottom: '8px', width: 'calc(100% - 26px)', boxSizing: 'border-box' }}>
                <div onClick={() => handleSubMenuClick('huruf')} style={{ padding: '10px 16px', borderRadius: '8px', boxSizing: 'border-box', color: activeMenu === 'modules' && selectedLevel === 'huruf' ? '#0F172A' : '#64748B', backgroundColor: activeMenu === 'modules' && selectedLevel === 'huruf' ? '#F1F5F9' : 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: activeMenu === 'modules' && selectedLevel === 'huruf' ? '700' : '600', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'huruf')) e.currentTarget.style.color = '#0F172A'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'huruf')) e.currentTarget.style.color = '#64748B'; }}>Level Abjad</div>
                <div onClick={() => handleSubMenuClick('kata')} style={{ padding: '10px 16px', borderRadius: '8px', boxSizing: 'border-box', color: activeMenu === 'modules' && selectedLevel === 'kata' ? '#0F172A' : '#64748B', backgroundColor: activeMenu === 'modules' && selectedLevel === 'kata' ? '#F1F5F9' : 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: activeMenu === 'modules' && selectedLevel === 'kata' ? '700' : '600', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kata')) e.currentTarget.style.color = '#0F172A'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kata')) e.currentTarget.style.color = '#64748B'; }}>Level Kosa Kata</div>
                <div onClick={() => handleSubMenuClick('kalimat')} style={{ padding: '10px 16px', borderRadius: '8px', boxSizing: 'border-box', color: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '#0F172A' : '#64748B', backgroundColor: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '#F1F5F9' : 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '700' : '600', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kalimat')) e.currentTarget.style.color = '#0F172A'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kalimat')) e.currentTarget.style.color = '#64748B'; }}>Level Kalimat</div>
              </div>
            )}

            <div className="menu-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div 
                onClick={() => handleMenuClick('quests')} 
                style={getMenuItemStyle(activeMenu === 'quests')}
                onMouseOver={(e) => { if(activeMenu !== 'quests') e.currentTarget.style.color = '#0F172A'; }} 
                onMouseOut={(e) => { if(activeMenu !== 'quests') e.currentTarget.style.color = '#64748B'; }}
              >
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}><IconTrophy /></div> 
                {!showAsMinimized && <span style={{ fontSize: '15px' }}>Tantangan Quest</span>}
              </div>
              {showAsMinimized && <div className="custom-tooltip">Tantangan Quest</div>}
            </div>

            {userRole !== 'student' && (
              <>
                <div className="menu-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div 
                    onClick={() => handleMenuClick('educator')} 
                    style={getMenuItemStyle(activeMenu === 'educator')}
                    onMouseOver={(e) => { if(activeMenu !== 'educator') e.currentTarget.style.color = '#0F172A'; }} 
                    onMouseOut={(e) => { if(activeMenu !== 'educator') e.currentTarget.style.color = '#64748B'; }}
                  >
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}><IconUsers /></div> 
                    {!showAsMinimized && <span style={{ fontSize: '15px' }}>Ruang Pendidik</span>}
                  </div>
                  {showAsMinimized && <div className="custom-tooltip">Ruang Pendidik</div>}
                </div>

                <div className="menu-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div 
                    onClick={() => handleMenuClick('students')} 
                    style={getMenuItemStyle(activeMenu === 'students')}
                    onMouseOver={(e) => { if(activeMenu !== 'students') e.currentTarget.style.color = '#0F172A'; }} 
                    onMouseOut={(e) => { if(activeMenu !== 'students') e.currentTarget.style.color = '#64748B'; }}
                  >
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}><IconUserManage /></div> 
                    {!showAsMinimized && <span style={{ fontSize: '15px' }}>Manajemen Murid</span>}
                  </div>
                  {showAsMinimized && <div className="custom-tooltip">Manajemen Murid</div>}
                </div>
              </>
            )}

            <div className="menu-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div 
                onClick={() => handleMenuClick('progress')} 
                style={getMenuItemStyle(activeMenu === 'progress')}
                onMouseOver={(e) => { if(activeMenu !== 'progress') e.currentTarget.style.color = '#0F172A'; }} 
                onMouseOut={(e) => { if(activeMenu !== 'progress') e.currentTarget.style.color = '#64748B'; }}
              >
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}><IconTrendingUp /></div> 
                {!showAsMinimized && <span style={{ fontSize: '15px' }}>Monitoring Siswa</span>}
              </div>
              {showAsMinimized && <div className="custom-tooltip">Monitoring Siswa</div>}
            </div>

          </nav>
        </div>

        <div className="menu-wrapper" style={{ padding: showAsMinimized ? '24px 0' : '24px 20px', display: 'flex', justifyContent: 'center', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
          <div 
            onClick={() => handleMenuClick('leaderboard')} 
            style={getLeaderboardStyle(activeMenu === 'leaderboard')} 
            onMouseOver={(e) => { 
              if(activeMenu !== 'leaderboard') { 
                e.currentTarget.style.backgroundColor = '#E0E7FF'; 
                e.currentTarget.style.transform = 'translateY(-1px)'; 
              } 
            }} 
            onMouseOut={(e) => { 
              if(activeMenu !== 'leaderboard') { 
                e.currentTarget.style.backgroundColor = '#EEF2FF'; 
                e.currentTarget.style.transform = 'translateY(0)'; 
              } 
            }}
          >
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}><IconLeaderboard /></div> 
            {!showAsMinimized && <span style={{ fontSize: '15px' }}>Peringkat Global</span>}
          </div>
          {showAsMinimized && <div className="custom-tooltip">Peringkat Global</div>}
        </div>

      </aside>
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