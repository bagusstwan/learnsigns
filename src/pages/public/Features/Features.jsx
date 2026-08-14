import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import DetailFeatures from './DetailFeatures';
import ControlPanel from './ControlPanel';

{/* Komponen Induk Halaman Fitur (Features) */}
export default function Features() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas Tingkat Halaman */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Memanggil Komponen Hero Khusus Halaman Features */}
      <Hero />

      {/* Memanggil Komponen Fitur Mendetail dengan Tab Kapsul dan Galeri */}
      <DetailFeatures />

      {/* Memanggil Komponen Panel Kendali Ekosistem (Bento Grid) */}
      <ControlPanel />

    </div>
  );
}