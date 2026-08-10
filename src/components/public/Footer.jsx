/* Komponen Kaki Halaman Situs Publik */
export default function Footer({ isMobile }) {
  return (
    <footer style={{ padding: isMobile ? '40px 24px' : '60px 48px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '24px' }}>
      
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: '#000000' }}>VIBA.AI</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', maxWidth: '300px' }}>
          Infrastruktur pendidikan bahasa isyarat modern. Mendorong inklusivitas melalui teknologi visual komputasi tingkat tinggi.
        </p>
      </div>

      <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '500' }}>
        Hak Cipta &copy; {new Date().getFullYear()} Viba.ai.
      </div>

    </footer>
  );
}