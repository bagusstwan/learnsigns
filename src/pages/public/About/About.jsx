import React, { useState, useEffect } from 'react';
import Hero from './Hero'; 
import Values from './Values';
import Approach from './Approach';

{/* Komponen Induk Halaman Tentang Kami (About) */}
export default function About() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas Tingkat Halaman */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Memanggil Komponen Hero Khusus Halaman About */}
      <Hero />

        {/* Memanggil Komponen Values Khusus Halaman About */}
        <Values />

        {/* Memanggil Komponen Pendekatan Sistematis */}
        <Approach />

    </div>
  );
}