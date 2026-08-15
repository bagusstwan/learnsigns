import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

/* Impor Komponen Dasbor Pribadi */
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './components/Dashboard'; 
import InteractiveModule from './pages/InteractiveModule';
import QuestPage from './pages/QuestPage';
import EducatorPage from './pages/EducatorPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import StudentManagementPage from './pages/StudentManagementPage';
import EvaluationWorkspace from './pages/educator/EvaluationWorkspace';

/* Impor Komponen Situs Publik Terpadu */
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/public/Home/Home';
import About from './pages/public/About/About';
import Features from './pages/public/Features/Features';
import Contact from './pages/public/Contact/Contact';

/* Impor Modul Autentikasi */
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import '@fontsource/geist-sans';

const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

/* Komponen Pelindung Rute Restriksi Akses */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* Tata Letak Dasbor Utama Aplikasi */
const DashboardLayout = () => {
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
    document.body.style.backgroundColor = "#FAFAFA"; 
    document.body.style.color = "#0F172A"; 
    document.body.style.fontFamily = '"Geist Sans", apple system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if ((activeMenu === 'educator' || activeMenu === 'students') && user?.role === 'student') {
        setActiveMenu('modules');
    }
  }, [activeMenu, user]);

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      
      {isMobile && (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', flexShrink: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: '#0F172A' }}>
              <IconMenu />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', fontStyle: 'normal', color: '#0F172A', letterSpacing: '-1px' }}>
                V<span style={{ fontStyle: 'normal', fontWeight: '800' }}>IBA.AI</span>
              </h1>
            </div>
          </div>
        </header>
      )}

      <Sidebar 
        activeMenu={activeMenu} setActiveMenu={setActiveMenu}
        selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} 
        isMobile={isMobile} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}
        userRole={user?.role} 
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
        
        {/* Pemanggilan Top Navbar Khusus Modul Dasbor */}
        <TopNavbar 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu}
          selectedLevel={selectedLevel} 
          user={user} 
          isMobile={isMobile} 
        />

        {/* Logika Pemanggilan Komponen Halaman Dasbor */}
        {activeMenu === 'modules' && !selectedLevel && (
          <Dashboard 
            setSelectedLevel={setSelectedLevel} 
            isMobile={isMobile} 
            isDesktop={!isMobile} 
          />
        )}
        {activeMenu === 'modules' && selectedLevel && (
          <InteractiveModule 
            selectedLevel={selectedLevel} 
            setSelectedLevel={setSelectedLevel} 
          />
        )}

        {/* Routing Komponen Sub Menu Lainnya */}
        {activeMenu === 'progress' && <ProgressPage />}
        {activeMenu === 'quests' && <QuestPage />}
        {activeMenu === 'educator' && user?.role !== 'student' && <EducatorPage />}
        {activeMenu === 'students' && user?.role !== 'student' && <StudentManagementPage />}
        {activeMenu === 'profile' && <ProfilePage />}
        {activeMenu === 'settings' && <SettingsPage />}
        {activeMenu === 'leaderboard' && <LeaderboardPage />}
      </div>

    </div>
  );
};

/* Komponen Pengatur Rute Aplikasi Utama */
export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* Rute Multi Halaman Publik dengan Konfigurasi Tata Letak Bersarang */}
        <Route element={<PublicLayout />}>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rute Terproteksi Khusus Pengguna Terautentikasi */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student', 'teacher', 'corporate']}>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        />

        <Route path="/educator/evaluation" element={
          <ProtectedRoute allowedRoles={['teacher', 'corporate']}>
             <EvaluationWorkspace />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}