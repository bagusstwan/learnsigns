import { useState } from 'react';
import PropTypes from 'prop-types';
import ModalAlert from './ModalAlert'; 

/* IKON MENU UTAMA */
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconTrendingUp = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconTrophy = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>;
const IconUsers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

/* IKON AKSI BAWAH */
const IconLeaderboard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>;
const IconProfile = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconSettings = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const IconLogout = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

export default function Sidebar({ activeMenu, setActiveMenu, selectedLevel, setSelectedLevel, isMobile, isOpen, setIsOpen, userRole }) {
  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const handleMenuClick = (menuType) => {
    setActiveMenu(menuType);
    if (menuType !== 'modules') setSelectedLevel(null); 
    if (isMobile) setIsOpen(false); 
  };

  const handleSubMenuClick = (level) => {
    handleMenuClick('modules');
    setSelectedLevel(level);
    if (isMobile) setIsOpen(false); 
  };

  const executeLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <>
      {isMobile && isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.5)', zIndex: 45, backdropFilter: 'blur(2px)' }}></div>
      )}

      <aside style={{ 
        width: '260px', 
        backgroundColor: '#FAFAFA', 
        borderRight: '1px solid #EAEAEA', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box',
        zIndex: 50, 
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%', 
        position: isMobile ? 'fixed' : 'relative', 
        top: 0, 
        left: isMobile ? (isOpen ? 0 : '-260px') : 0,
        flexShrink: 0 
      }}>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: '#111827' }}>VIBA.AI</h1>
            </div>
            {isMobile && (
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '4px' }}><IconClose /></button>
            )}
          </div>

          <div style={{ padding: '0 16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', paddingLeft: '8px' }}>Navigasi</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px' }}>
            
            <div onClick={() => handleMenuClick('modules')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: activeMenu === 'modules' && !selectedLevel ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'modules' && !selectedLevel ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontWeight: activeMenu === 'modules' && !selectedLevel ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(activeMenu !== 'modules' || selectedLevel) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(activeMenu !== 'modules' || selectedLevel) e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <IconHome /> <span style={{ fontSize: '14px' }}>Modul Pembelajaran</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '21px', paddingLeft: '14px', borderLeft: '1px solid #EAEAEA', marginTop: '2px', marginBottom: '8px' }}>
              <div onClick={() => handleSubMenuClick('huruf')} style={{ padding: '8px 12px', borderRadius: '8px', color: activeMenu === 'modules' && selectedLevel === 'huruf' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'modules' && selectedLevel === 'huruf' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: activeMenu === 'modules' && selectedLevel === 'huruf' ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'huruf')) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'huruf')) e.currentTarget.style.backgroundColor = 'transparent'; }}>Level Abjad</div>
              <div onClick={() => handleSubMenuClick('kata')} style={{ padding: '8px 12px', borderRadius: '8px', color: activeMenu === 'modules' && selectedLevel === 'kata' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'modules' && selectedLevel === 'kata' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: activeMenu === 'modules' && selectedLevel === 'kata' ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kata')) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kata')) e.currentTarget.style.backgroundColor = 'transparent'; }}>Level Kosa Kata</div>
              <div onClick={() => handleSubMenuClick('kalimat')} style={{ padding: '8px 12px', borderRadius: '8px', color: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: activeMenu === 'modules' && selectedLevel === 'kalimat' ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kalimat')) e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(!(activeMenu === 'modules' && selectedLevel === 'kalimat')) e.currentTarget.style.backgroundColor = 'transparent'; }}>Level Kalimat</div>
            </div>

            <div onClick={() => handleMenuClick('quests')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: activeMenu === 'quests' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'quests' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontWeight: activeMenu === 'quests' ? '600' : '500', transition: 'all 0.2s', marginBottom: '4px' }} onMouseOver={(e) => { if(activeMenu !== 'quests') e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(activeMenu !== 'quests') e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <IconTrophy /> <span style={{ fontSize: '14px' }}>Tantangan (Quest)</span>
            </div>

            {userRole !== 'student' && (
              <div onClick={() => handleMenuClick('educator')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: activeMenu === 'educator' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'educator' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontWeight: activeMenu === 'educator' ? '600' : '500', transition: 'all 0.2s' }} onMouseOver={(e) => { if(activeMenu !== 'educator') e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(activeMenu !== 'educator') e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <IconUsers /> <span style={{ fontSize: '14px' }}>Ruang Pendidik</span>
              </div>
            )}

            <div onClick={() => handleMenuClick('progress')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: activeMenu === 'progress' ? '#111827' : '#6B7280', backgroundColor: activeMenu === 'progress' ? '#F3F4F6' : 'transparent', cursor: 'pointer', fontWeight: activeMenu === 'progress' ? '600' : '500', transition: 'all 0.2s', marginBottom: '8px' }} onMouseOver={(e) => { if(activeMenu !== 'progress') e.currentTarget.style.backgroundColor = '#F9FAFB'; }} onMouseOut={(e) => { if(activeMenu !== 'progress') e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <IconTrendingUp /> <span style={{ fontSize: '14px' }}>Monitoring Perkembangan</span>
            </div>

          </nav>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAEAEA', backgroundColor: '#FAFAFA', flexShrink: 0 }}>
          
          <button title="Leaderboard" onClick={() => handleMenuClick('leaderboard')} style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: activeMenu === 'leaderboard' ? '#E5E7EB' : 'transparent', border: 'none', cursor: 'pointer', color: activeMenu === 'leaderboard' ? '#111827' : '#6B7280', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E5E7EB'; e.currentTarget.style.color = '#111827'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = activeMenu === 'leaderboard' ? '#E5E7EB' : 'transparent'; e.currentTarget.style.color = activeMenu === 'leaderboard' ? '#111827' : '#6B7280'; }}>
            <IconLeaderboard />
          </button>
          
          <button title="Profile" onClick={() => handleMenuClick('profile')} style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: activeMenu === 'profile' ? '#E5E7EB' : 'transparent', border: 'none', cursor: 'pointer', color: activeMenu === 'profile' ? '#111827' : '#6B7280', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E5E7EB'; e.currentTarget.style.color = '#111827'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = activeMenu === 'profile' ? '#E5E7EB' : 'transparent'; e.currentTarget.style.color = activeMenu === 'profile' ? '#111827' : '#6B7280'; }}>
            <IconProfile />
          </button>
          
          <button title="Settings" onClick={() => handleMenuClick('settings')} style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: activeMenu === 'settings' ? '#E5E7EB' : 'transparent', border: 'none', cursor: 'pointer', color: activeMenu === 'settings' ? '#111827' : '#6B7280', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E5E7EB'; e.currentTarget.style.color = '#111827'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = activeMenu === 'settings' ? '#E5E7EB' : 'transparent'; e.currentTarget.style.color = activeMenu === 'settings' ? '#111827' : '#6B7280'; }}>
            <IconSettings />
          </button>
          
          <button 
            title="Logout" 
            onClick={() => setIsLogoutModalOpen(true)} 
            style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#EF4444', transition: 'all 0.2s ease' }} 
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'; }} 
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#EF4444'; }}
          >
            <IconLogout />
          </button>
        </div>
      </aside>

      <ModalAlert 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={executeLogout}
        title="Keluar Sistem EduSync"
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