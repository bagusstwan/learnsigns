import React, { useState, useEffect } from 'react';

{/* Komponen Ikon SVG LinkedIn */}
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

{/* Komponen Ikon SVG Instagram */}
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

{/* Komponen Ikon SVG Facebook */}
const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

{/* Komponen Ikon SVG YouTube */}
const IconYouTube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

{/* Komponen Kaki Halaman Situs Publik Utama */}
export default function Footer({ isMobile }) {
  
  {/* Data Struktur Tautan Kaki Halaman Untuk Mempermudah Pengelolaan Konten */}
  const footerLinks = [
    {
      title: 'Produk',
      links: ['Deteksi AI', 'Modul Kurikulum', 'Dasbor Pendidik', 'Manajemen Kelas']
    },
    {
      title: 'Perusahaan',
      links: ['Tentang Viba', 'Karir', 'Blog Edukasi']
    },
    {
      title: 'Dukungan',
      links: ['Pusat Bantuan', 'Panduan Sistem', 'Syarat Ketentuan', 'Kebijakan Privasi']
    }
  ];

  {/* Data Struktur Tautan Sosial Media */}
  const socialMediaLinks = [
    { id: 'linkedin', icon: <IconLinkedIn />, url: '#' },
    { id: 'instagram', icon: <IconInstagram />, url: '#' },
    { id: 'facebook', icon: <IconFacebook />, url: '#' },
    { id: 'youtube', icon: <IconYouTube />, url: '#' }
  ];

  return (
    <footer style={{ 
      backgroundColor: '#FAFAFA', 
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: isMobile ? '60px 24px 40px 24px' : '80px 48px 40px 48px', 
      boxSizing: 'border-box'
    }}>
      
      {/* Pembungkus Utama Konten Kaki Halaman */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Bagian Atas Kaki Halaman Berisi Logo Dan Kolom Tautan */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: isMobile ? '48px' : '40px',
          marginBottom: isMobile ? '48px' : '80px'
        }}>
          
          {/* Kolom Kiri Identitas Perusahaan Dan Ikon Sosial Media */}
          <div style={{ maxWidth: '380px' }}>
            <h2 style={{ 
              fontFamily: '"Gilroy", sans-serif', 
              fontSize: '32px', 
              fontWeight: 'bold', 
              letterSpacing: '-0.5px', 
              color: '#000000',
              margin: '0 0 16px 0' 
            }}>
              Viba.ai
            </h2>
            <p style={{ 
              fontFamily: '"Manrope", sans-serif', 
              fontSize: '15px', 
              color: '#4B5563', 
              lineHeight: '1.6', 
              margin: '0 0 24px 0' 
            }}>
              Infrastruktur pendidikan bahasa isyarat modern. Mendorong inklusivitas melalui teknologi visual komputasi tingkat tinggi.
            </p>
            
            {/* Kumpulan Ikon Sosial Media Bentuk Lingkaran Dengan Pemetaan Data */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialMediaLinks.map((social) => (
                <button 
                  key={social.id}
                  onClick={() => window.open(social.url, '_blank')}
                  style={{
                    width: '36px', /* Sedikit diperbesar agar ikon SVG terlihat proporsional */
                    height: '36px',
                    backgroundColor: '#000000',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.2s ease, opacity 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '0.8'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
                  aria-label={`Tautan ke ${social.id}`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Kolom Kanan Kumpulan Grup Tautan Navigasi */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '40px' : '80px'
          }}>
            {footerLinks.map((group, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  fontFamily: '"Gilroy", sans-serif', 
                  fontSize: '20px', 
                  fontWeight: '500', 
                  color: '#000000', 
                  margin: '0 0 24px 0' 
                }}>
                  {group.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {group.links.map((link, linkIndex) => (
                    <span 
                      key={linkIndex}
                      style={{ 
                        fontFamily: '"Manrope", sans-serif', 
                        fontSize: '15px', 
                        color: '#4B5563', 
                        cursor: 'pointer',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#000000'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#4B5563'}
                    >
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bagian Bawah Kaki Halaman Berisi Garis Pemisah Dan Hak Cipta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* Garis Horizontal Pengisi Ruang Kosong */}
          <div style={{ 
            flex: 1, 
            height: '1px', 
            backgroundColor: '#E5E7EB' 
          }}></div>
          
          {/* Teks Hak Cipta Perusahaan */}
          <span style={{ 
            fontFamily: '"Manrope", sans-serif', 
            fontSize: isMobile ? '12px' : '13px', 
            color: '#9CA3AF', 
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}>
            {new Date().getFullYear()} Copyright Viba.ai all right reserved
          </span>
        </div>

      </div>
    </footer>
  );
}