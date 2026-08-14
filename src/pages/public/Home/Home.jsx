import React, { useState, useEffect } from 'react';
import Hero from './Hero'; 
import Features from './Features';
import Ecosystem from './Ecosystem';


/* Komponen Induk Halaman Beranda */
export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: '#F4F4F5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Memanggil Komponen Hero */}
      <Hero />

      {/* Bagian Fitur dan Statistik Aplikasi */}
      <Features />

      {/* Bagian Ekosistem Pembelajaran Dengan Korsel Kartu */}
      <Ecosystem />

    </div>
  );
}