import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import InteractiveModule from './pages/InteractiveModule';
import QuestPage from './pages/QuestPage';
import EducatorPage from './pages/EducatorPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import '@fontsource/geist-sans';

const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

export default function App() {
  const [activeMenu, setActiveMenu] = useState('educator'); 
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsSidebarOpen(false); 
    };
    window.addEventListener('resize', handleResize);
    
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#FFFFFF"; 
    document.body.style.color = "#111827"; 
    document.body.style.fontFamily = '"Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    /* KUNCI FIX: Menggunakan height '100vh' mutlak dan overflow 'hidden' pada container terluar */
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      
      {/* HEADER MOBILE */}
      {isMobile && (
        <header style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #EAEAEA', flexShrink: 0, zIndex: 40 }}>
          <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: '#111827' }}>
            <IconMenu />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '4px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px', color: '#111827' }}>EduSync</h1>
          </div>
        </header>
      )}

      {/* SIDEBAR */}
      <Sidebar 
        activeMenu={activeMenu} setActiveMenu={setActiveMenu}
        selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} 
        isMobile={isMobile} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}
      />

      {/* AREA KONTEN UTAMA: Diberi overflowY auto agar bebas di-scroll terpisah dari sidebar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}>
        {activeMenu === 'modules' && <InteractiveModule selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />}
        {activeMenu === 'progress' && <ProgressPage />}
        {activeMenu === 'quests' && <QuestPage />}
        {activeMenu === 'educator' && <EducatorPage />}
        {activeMenu === 'profile' && <ProfilePage />}
        {activeMenu === 'settings' && <SettingsPage />}
        {activeMenu === 'leaderboard' && <LeaderboardPage />}
      </div>

    </div>
  );
}