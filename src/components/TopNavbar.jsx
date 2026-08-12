import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Premium Navigation Icons */
const IconCoinGeneric = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="none"></circle>
    <circle cx="12" cy="12" r="4"></circle>
  </svg>
);

const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconSettings = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const IconLogout = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

/** Extracts initials from the provided full name */
const generateInitials = (fullName) => {
  if (!fullName) return 'U';
  const words = fullName.trim().split(/\s+/);
  let initials = '';
  for (let i = 0; i < Math.min(2, words.length); i++) {
    if (words[i]) initials += words[i].charAt(0).toUpperCase();
  }
  return initials;
};

/** Formats the display name based on character word count rules */
const formatDisplayName = (fullName) => {
  if (!fullName) return 'Pengguna';
  const words = fullName.trim().split(/\s+/);
  
  if (words.length <= 2) {
    return fullName;
  }
  
  return `${words.slice(0, 2).join(' ')}...`;
};

export default function TopNavbar({ activeMenu, setActiveMenu, selectedLevel, user, isMobile }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  /** Dynamic State for User Points */
  const [currentPoints, setCurrentPoints] = useState(user?.stars || 0);

  const userInitials = generateInitials(user?.name);
  const userDisplayName = formatDisplayName(user?.name);

  /** Outside click detection handler */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Point Synchronization Logic */
  useEffect(() => {
    let isMounted = true;

    /** Fetch latest user profile data from server */
    const fetchLatestPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
        
        if (!token) return;

        const response = await fetch(`${API_BASE_URL}/user`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const userData = await response.json();
          if (isMounted && userData && userData.stars !== undefined) {
            setCurrentPoints(userData.stars);

            /** Update local storage cache silently */
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            storedUser.stars = userData.stars;
            localStorage.setItem('user', JSON.stringify(storedUser));
          }
        }
      } catch (error) {
        console.error('Point sync failed', error);
      }
    };

    fetchLatestPoints();

    /** Poll data every five seconds to ensure real time updates */
    const intervalId = setInterval(fetchLatestPoints, 5000);

    /** Refresh data when window regains focus */
    window.addEventListener('focus', fetchLatestPoints);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      window.removeEventListener('focus', fetchLatestPoints);
    };
  }, []);

  /** Breadcrumb subtitle mapping logic */
  const getPageSubtitle = () => {
    if (activeMenu === 'modules' && selectedLevel) return 'Modul Interaktif / Tinjau Progres';
    if (activeMenu === 'modules') return user?.role === 'student' ? 'Beranda Pembelajaran' : 'Pusat Kendali Pendidik';
    if (activeMenu === 'progress') return 'Monitoring Perkembangan Murid';
    if (activeMenu === 'quests') return 'Misi Harian (Quest)';
    if (activeMenu === 'educator') return 'Manajemen Penugasan';
    if (activeMenu === 'students') return 'Manajemen Hak Akses Murid';
    if (activeMenu === 'profile') return 'Profil Pengguna';
    if (activeMenu === 'settings') return 'Pengaturan Sistem';
    if (activeMenu === 'leaderboard') return 'Papan Peringkat Kelas';
    
    return 'Viba Dashboard';
  };

  /** Dropdown menu navigation trigger */
  const handleMenuClick = (menu) => {
    if (setActiveMenu) setActiveMenu(menu);
    setIsDropdownOpen(false);
  };

  /** System logout procedure */
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
      
      if (token) {
        await fetch(`${API_BASE_URL}/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error('Logout request failed', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: isMobile ? '10px 16px' : '12px 48px',
      backgroundColor: '#F8FAFC', 
      borderBottom: '1px solid #E2E8F0',
      width: '100%',
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      
      {/** Left Section Breadcrumb */}
      <div style={{ 
        fontSize: '13px',
        fontWeight: '500', 
        color: '#64748B',
        letterSpacing: '0.2px'
      }}>
        Dashboard <span style={{ margin: '0 6px', color: '#CBD5E1' }}>/</span> 
        <span style={{ color: '#0F172A', fontWeight: '600' }}>{getPageSubtitle()}</span>
      </div>

      {/** Right Section Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
        
        {/** Live Point Display */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          backgroundColor: '#FFFFFF', 
          color: '#0F172A', 
          border: '1px solid #E2E8F0', 
          borderRadius: '999px', 
          padding: '6px 14px', 
          fontSize: '13px', 
          fontWeight: '700',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <IconCoinGeneric />
          {currentPoints} Point
        </div>

        {/** Notification Button */}
        <button style={{ 
          width: '38px', 
          height: '38px', 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #E2E8F0', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          transition: 'all 0.2s',
          flexShrink: 0
        }}
        className="hover-bg-gray"
        >
          <IconBell />
        </button>

        {/** Profile Dropdown Area */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          
          {/** Profile Trigger Button */}
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              backgroundColor: isDropdownOpen ? '#F1F5F9' : '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '999px', 
              padding: '4px 12px 4px 4px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              width: '30px', 
              height: '30px', 
              borderRadius: '50%', 
              backgroundColor: '#0F172A', 
              color: '#FFFFFF', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              fontSize: '12px', 
              fontWeight: '800', 
              flexShrink: 0 
            }}>
              {userInitials}
            </div>

            {!isMobile && (
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '400', marginBottom: '2px' }}>
                  {user?.role === 'teacher' ? 'Pendidik' : 'Siswa'}
                </span>
                <span style={{ fontSize: '13px', color: '#0F172A', fontWeight: '500' }}>
                  {userDisplayName}
                </span>
              </div>
            )}
            
            <div style={{ 
              marginLeft: '4px', 
              display: isMobile ? 'none' : 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.2s' 
            }}>
              <IconChevronDown />
            </div>
          </button>

          {/** Floating Dropdown Menu */}
          {isDropdownOpen && (
            <div style={{ 
              position: 'absolute', 
              top: 'calc(100% + 8px)', 
              right: 0, 
              width: '220px', 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '16px', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', 
              padding: '8px', 
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              animation: 'slideDown 0.2s ease'
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
              </div>
              
              <button onClick={() => handleMenuClick('profile')} className="dropdown-item">
                <IconUser /> Profil Saya
              </button>
              <button onClick={() => handleMenuClick('settings')} className="dropdown-item">
                <IconSettings /> Pengaturan
              </button>
              
              <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }}></div>
              
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <IconLogout /> Keluar Akun
              </button>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes slideDown { 
          from { opacity: 0; transform: translateY(-10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .hover-bg-gray:hover {
          background-color: #F8FAFC !important;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          background-color: transparent;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          text-align: left;
          transition: background-color 0.2s, color 0.2s;
        }
        .dropdown-item:hover {
          background-color: #F1F5F9;
          color: #0F172A;
        }
        .dropdown-item.logout-btn {
          color: #EF4444;
        }
        .dropdown-item.logout-btn:hover {
          background-color: #FEF2F2;
          color: #DC2626;
        }
      `}</style>
    </nav>
  );
}