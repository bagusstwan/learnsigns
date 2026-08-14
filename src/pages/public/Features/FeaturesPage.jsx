import { useState, useEffect } from 'react';

/* Komponen Konfigurasi Ikon */
const IconBox = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const IconEye = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const IconData = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;

/* Halaman Penjelasan Rincian Fitur Aplikasi */
export default function FeaturesPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    { title: 'Mesin Pemrosesan Visual', desc: 'Validasi akurasi gerakan tangan menggunakan ekstraksi matriks koordinat secara mutakhir.', icon: <IconEye /> },
    { title: 'Kurikulum Terpadu', desc: 'Ketersediaan modul pembelajaran dari abjad dasar hingga penyusunan kosa kata linguistik.', icon: <IconBox /> },
    { title: 'Pemantauan Analitik', desc: 'Sistem pencatatan log bagi pendidik untuk mengawasi perkembangan dan mendistribusikan tugas.', icon: <IconData /> }
  ];

  return (
    <div style={{ padding: isMobile ? '60px 24px' : '100px 48px', backgroundColor: '#FFFFFF', minHeight: '80vh' }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 16px 0', fontSize: isMobile ? '32px' : '48px', fontWeight: '800', color: '#000000', letterSpacing: '-0.04em' }}>
          Ekosistem Fungsionalitas
        </h1>
        <p style={{ margin: '0 0 60px 0', fontSize: '18px', color: '#6B7280', maxWidth: '600px', lineHeight: '1.6' }}>
          Dirancang dengan ketelitian teknis untuk memastikan pengalaman belajar yang lancar dan pemantauan data yang akurat.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
          {features.map((item, idx) => (
            <div key={idx} style={{ padding: '32px', border: '1px solid #EAEAEA', borderRadius: '12px', backgroundColor: '#FAFAFA' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                {item.icon}
              </div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '700', color: '#000000' }}>{item.title}</h3>
              <p style={{ margin: 0, color: '#6B7280', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}