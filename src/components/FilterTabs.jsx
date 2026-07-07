import PropTypes from 'prop-types';

export default function FilterTabs({ categories, activeFilter, setActiveFilter }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          style={{
            padding: '10px 20px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            border: '1px solid',
            transition: 'all 0.2s ease',
            backgroundColor: activeFilter === cat ? '#111827' : '#FFFFFF',
            color: activeFilter === cat ? '#FFFFFF' : '#4B5563',
            borderColor: activeFilter === cat ? '#111827' : '#E5E7EB',
            boxShadow: activeFilter === cat ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

FilterTabs.propTypes = {
  categories: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
};