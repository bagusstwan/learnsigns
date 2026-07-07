import PropTypes from 'prop-types';

const IconChevronLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconChevronRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #EAEAEA' }}>
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #EAEAEA', backgroundColor: currentPage === 1 ? '#FAFAFA' : '#FFFFFF', color: currentPage === 1 ? '#9CA3AF' : '#111827', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' }}
      >
        <IconChevronLeft /> Prev
      </button>
      
      <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>
        Halaman <span style={{ fontWeight: '700', color: '#111827' }}>{currentPage}</span> dari {totalPages}
      </span>
      
      <button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #EAEAEA', backgroundColor: currentPage === totalPages ? '#FAFAFA' : '#FFFFFF', color: currentPage === totalPages ? '#9CA3AF' : '#111827', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' }}
      >
        Next <IconChevronRight />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};