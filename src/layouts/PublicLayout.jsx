import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

/* Komponen Tata Letak Induk Untuk Halaman Publik */
export default function PublicLayout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#FFFFFF";
    document.body.style.fontFamily = '"Geist Sans", apple system, BlinkMacSystemFont, "Segoe UI", Roboto, sans serif';
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Navbar isMobile={isMobile} />
      
      <main style={{ flex: 1, paddingTop: '70px' }}>
        {/* React Router akan menyuntikkan komponen Home atau FeaturesPage di sini */}
        <Outlet />
      </main>

      <Footer isMobile={isMobile} />
    </div>
  );
}