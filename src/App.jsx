import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import InteractiveModule from './pages/InteractiveModule';
import QuestPage from './pages/QuestPage';
import EducatorPage from './pages/EducatorPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import StudentManagementPage from './pages/StudentManagementPage';

// Impor Halaman Auth yang akan kita buat
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import '@fontsource/geist-sans';

const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

// 1. KOMPONEN PELINDUNG RUTE (PROTECTED ROUTE)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  // Jika belum login, tendang kembali ke halaman login
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);

  // Jika role tidak diizinkan, tendang ke dashboard default
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// 2. LAYOUT DASHBOARD UTAMA
const DashboardLayout = () => {
  // Default menu diset ke modules agar siswa langsung belajar saat login
  const [activeMenu, setActiveMenu] = useState('modules'); 
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

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

  // KEAMANAN TAMBAHAN: Jika user (murid) nge-hack state untuk buka menu educator atau manajemen murid
  useEffect(() => {
    if ((activeMenu === 'educator' || activeMenu === 'students') && user?.role === 'student') {
        setActiveMenu('modules');
    }
  }, [activeMenu, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      
      {/* HEADER MOBILE */}
      {isMobile && (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #EAEAEA', flexShrink: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: '#111827' }}>
              <IconMenu />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '4px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px', color: '#111827' }}>VIBA.AI</h1>
            </div>
          </div>
        </header>
      )}

      {/* SIDEBAR DENGAN DATA USER */}
      <Sidebar 
        activeMenu={activeMenu} setActiveMenu={setActiveMenu}
        selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} 
        isMobile={isMobile} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}
        userRole={user?.role} // Kirim data role ke sidebar agar menu Educator bisa disembunyikan
      />

      {/* AREA KONTEN UTAMA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>

        {/* RENDER KONTEN BERDASARKAN MENU */}
        {activeMenu === 'modules' && <InteractiveModule selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />}
        {activeMenu === 'progress' && <ProgressPage />}
        {activeMenu === 'quests' && <QuestPage />}
        
        {/* HANYA PENDIDIK / INSTANSI YANG BISA RENDER EDUCATOR & STUDENT MANAGEMENT PAGE */}
        {activeMenu === 'educator' && user?.role !== 'student' && <EducatorPage />}
        {activeMenu === 'students' && user?.role !== 'student' && <StudentManagementPage />}
        
        {activeMenu === 'profile' && <ProfilePage />}
        {activeMenu === 'settings' && <SettingsPage />}
        {activeMenu === 'leaderboard' && <LeaderboardPage />}
      </div>

    </div>
  );
};

// 3. KOMPONEN APP UTAMA (ROUTER)
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root ke dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Rute Publik */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rute Terproteksi */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student', 'teacher', 'corporate']}>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}