import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const IconFilter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const IconCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

export default function FilterTabs({ categories, activeFilter, setActiveFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown jika user mengklik area luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      
      {/* Tombol Utama Filter */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', 
          backgroundColor: isOpen ? '#F8FAFC' : '#FFFFFF', 
          border: '1px solid #CBD5E1', borderRadius: '999px', 
          fontSize: '13px', fontWeight: '600', color: '#475569', 
          cursor: 'pointer', transition: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }} 
        onMouseOver={e => { if(!isOpen) e.currentTarget.style.backgroundColor = '#F8FAFC' }} 
        onMouseOut={e => { if(!isOpen) e.currentTarget.style.backgroundColor = '#FFFFFF' }}
      >
        <IconFilter /> 
        {activeFilter === 'Semua' ? 'Filter Quest' : `Misi: ${activeFilter}`}
      </button>

      {/* Menu Popup Dropdown */}
      {isOpen && (
        <div style={{ 
            position: 'absolute', top: '100%', right: 0, marginTop: '8px', 
            backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', 
            borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
            padding: '8px', zIndex: 50, width: '160px', 
            display: 'flex', flexDirection: 'column', gap: '4px' 
        }}>
          <div style={{ padding: '4px 8px', fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Kategori Misi</div>
          
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setIsOpen(false);
              }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.2s',
                backgroundColor: activeFilter === cat ? '#F1F5F9' : 'transparent',
                color: activeFilter === cat ? '#0F172A' : '#475569',
              }}
              onMouseOver={e => { if(activeFilter !== cat) e.currentTarget.style.backgroundColor = '#F8FAFC' }}
              onMouseOut={e => { if(activeFilter !== cat) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {cat}
              {activeFilter === cat && <IconCheck />}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

FilterTabs.propTypes = {
  categories: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
};