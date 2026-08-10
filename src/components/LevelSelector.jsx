import PropTypes from 'prop-types';

const IconLetter = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L12 4l4 16h4"></path><path d="M6.5 14h11"></path></svg>;
const IconWord = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>;
const IconSentence = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

export default function LevelSelector({ isDesktop, isTablet, setSelectedLevel }) {
  const levels = [
    { id: 'abjad', title: 'Level 1: Abjad', desc: 'Pelajari dasar pengenalan isyarat per huruf untuk membentuk fondasi yang kuat.', icon: <IconLetter /> },
    { id: 'kata', title: 'Level 2: Kosa Kata', desc: 'Gabungkan huruf menjadi kata umum yang sering digunakan sehari-hari.', icon: <IconWord /> },
    { id: 'kalimat', title: 'Level 3: Kalimat', desc: 'Praktik merangkai gestur secara berkesinambungan membentuk kalimat penuh.', icon: <IconSentence /> }
  ];

  return (
    <main style={{ flex: 1, padding: isDesktop ? '64px 80px' : isTablet ? '40px 48px' : '32px 20px', boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FAFAFA' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        <h1 style={{ margin: '0 0 12px 0', fontSize: isDesktop ? '28px' : '24px', fontWeight: '600', letterSpacing: '-0.5px', color: '#111827' }}>
          Pilih Tingkat Pembelajaran
        </h1>
        <p style={{ margin: '0 0 48px 0', fontSize: '15px', color: '#6B7280', maxWidth: '600px', lineHeight: '1.6' }}>
          Platform Viba.ai dirancang bertahap. Silakan pilih level modul yang ingin Anda praktikkan hari ini bersama AI Assistant kami.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr', gap: '20px' }}>
          {levels.map((lvl) => (
            <div 
              key={lvl.id} 
              onClick={() => setSelectedLevel(lvl.id)} 
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '28px 24px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }} 
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }} 
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#EAEAEA'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FAFAFA', border: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#111827' }}>
                {lvl.icon}
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '600', color: '#111827' }}>{lvl.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>{lvl.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

LevelSelector.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  setSelectedLevel: PropTypes.func.isRequired,
};