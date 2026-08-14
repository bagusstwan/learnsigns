import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import ContactForm from './ContactForm';

{/* Komponen Induk Halaman Kontak (Contact) */}
export default function Contact() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  {/* Logika Deteksi Ukuran Layar Untuk Responsivitas Tingkat Halaman */}
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Memanggil Komponen Hero Khusus Halaman Contact */}
      <Hero />

      {/* Memanggil Komponen Formulir Kontak */}
      <ContactForm />

    </div>
  );
}