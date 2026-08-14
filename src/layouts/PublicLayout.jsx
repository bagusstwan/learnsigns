import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis'; {/* Impor Library Lenis Untuk Momentum Scroll */}
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import CallToAction from '../components/public/CallToAction';

{/* Komponen Tata Letak Induk Untuk Halaman Publik */}
export default function PublicLayout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  {/* Logika Inisialisasi Gaya Global Sistem */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    {/* Menyuntikkan Gaya CSS Global Ke Tingkat Body */}
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#FFFFFF";
    document.body.style.fontFamily = '"Geist Sans", apple system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothTouch: false }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        
        {/* Komponen Navigasi Utama Aplikasi */}
        <Navbar isMobile={isMobile} />
        
        {/* Area Konten Dinamis Yang Disuntikkan Oleh React Router */}
        <main style={{ flex: 1, paddingTop: '70px' }}>
          <Outlet />
        </main>

        {/* Komponen Panggilan Aksi (Call To Action) Global */}
        <CallToAction />

        {/* Komponen Kaki Halaman (Footer) */}
        <Footer isMobile={isMobile} />
        
      </div>
    </ReactLenis>
  );
}