import { useState, useEffect, useRef } from 'react';

const IconPlus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const IconOptions = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>;
const IconChevronLeftCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline></svg>;
const IconChevronRightCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline></svg>;
const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const IconWarning = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const IconInfo = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;

export default function StudentManagementPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isMobile = windowWidth < 768;
  const paddingMain = isDesktop ? '40px 64px' : '24px 16px';

  // State Management
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Bulk Selection States
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  // Custom Alert / Confirm Modal State
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'confirm',
    onConfirm: null
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/educator/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      if (response.ok && resData.status === 'success') {
        setStudents(resData.data.students || []);
      }
    } catch (err) {
      console.error("Failed to fetch students data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, [API_BASE_URL, token]);

  const showAlertDialog = (title, message) => {
    setDialogConfig({ isOpen: true, title, message, type: 'alert', onConfirm: null });
  };

  const confirmDeleteStudent = (studentId) => {
    setActiveMenuId(null);
    setDialogConfig({
      isOpen: true,
      title: 'Hapus Akses Murid',
      message: 'Apakah Anda yakin ingin menghapus hak akses akun murid ini? Tindakan ini tidak dapat dibatalkan.',
      type: 'confirm',
      onConfirm: async () => {
        setDialogConfig({ ...dialogConfig, isOpen: false });
        try {
          const response = await fetch(`${API_BASE_URL}/educator/students/${studentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            fetchStudents();
          } else { 
            setTimeout(() => showAlertDialog('Gagal', 'Gagal menghapus data murid.'), 300);
          }
        } catch (err) { 
          setTimeout(() => showAlertDialog('Koneksi Error', 'Terjadi kesalahan koneksi server.'), 300);
        }
      }
    });
  };

  const confirmBulkDelete = () => {
    setDialogConfig({
      isOpen: true,
      title: 'Hapus Akses Murid',
      message: `Apakah Anda yakin ingin menghapus hak akses ${selectedUserIds.length} akun murid terpilih? Tindakan ini tidak dapat dibatalkan.`,
      type: 'confirm',
      onConfirm: async () => {
        setDialogConfig({ ...dialogConfig, isOpen: false });
        try {
          const response = await fetch(`${API_BASE_URL}/educator/students/bulk-delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ ids: selectedUserIds })
          });
          if (response.ok) {
            setSelectedUserIds([]);
            setIsBulkMode(false);
            fetchStudents();
          } else { 
            setTimeout(() => showAlertDialog('Gagal', 'Gagal mengeksekusi penghapusan massal.'), 300);
          }
        } catch (err) { 
          setTimeout(() => showAlertDialog('Koneksi Error', 'Terjadi kesalahan sistem server.'), 300);
        }
      }
    });
  };

  const handleSelectCheckbox = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(item => item !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUserIds.length === currentStudents.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(currentStudents.map(s => s.id));
    }
  };

  const handleAddOrUpdateStudent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const endpoint = editingStudent ? `${API_BASE_URL}/educator/students/${editingStudent.id}` : `${API_BASE_URL}/educator/students`;
    const method = editingStudent ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '' });
        setEditingStudent(null);
        fetchStudents();
      } else { 
        showAlertDialog("Gagal Memproses", "Gagal memproses kredensial murid. Periksa kembali email yang digunakan.");
      }
    } catch (err) { 
      showAlertDialog("Kesalahan Sistem", "Kesalahan koneksi peladen."); 
    } finally { setIsSubmitting(false); }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData({ name: student.name || '', email: student.email || '', password: '' });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const currentStudents = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const inputStyle = { width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '14px', color: '#0F172A', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease', backgroundColor: '#F8FAFC' };
  const inputFocus = (e) => { e.target.style.borderColor = '#0F172A'; e.target.style.backgroundColor = '#FFFFFF'; };
  const inputBlur = (e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; };

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
         <div style={{ width: '40px', height: '40px', border: '3px solid #E2E8F0', borderTop: '3px solid #0F172A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: paddingMain, boxSizing: 'border-box', backgroundColor: '#F8FAFC' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '32px' : '42px', fontWeight: '800', letterSpacing: '-1px', color: '#0F172A' }}>
              Manajemen Hak Akses Murid
            </h1>
            <p style={{ margin: 0, color: '#475569', fontSize: '15px', maxWidth: '600px', lineHeight: '1.6' }}>
              Kelola kredensial institusi, modifikasi detail profil, serta atur pembatasan keamanan akun digital siswa Viba.ai.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => { setEditingStudent(null); setFormData({ name: '', email: '', password: '' }); setIsModalOpen(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
            >
              <IconPlus /> Tambah akses murid
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
             <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>List Murid</h2>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {selectedUserIds.length > 0 && (
                  <button 
                    onClick={confirmBulkDelete}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)', animation: 'fadeIn 0.2s ease' }}
                  >
                    <IconTrash /> Delete Selected ({selectedUserIds.length})
                  </button>
                )}
                
                <button 
                  onClick={() => { setIsBulkMode(!isBulkMode); setSelectedUserIds([]); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: isBulkMode ? '#0F172A' : '#64748B', padding: '8px', borderRadius: '50%', backgroundColor: isBulkMode ? '#F1F5F9' : 'transparent' }}
                >
                  <IconSettings />
                </button>
             </div>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F5F9' }}>
                  {isBulkMode && (
                    <th style={{ padding: '16px 24px', width: '40px', borderBottom: '1px solid #E2E8F0' }}>
                      <input 
                        type="checkbox" 
                        className="custom-checkbox"
                        checked={selectedUserIds.length === currentStudents.length && currentStudents.length > 0} 
                        onChange={handleSelectAll} 
                      />
                    </th>
                  )}
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A', borderBottom: '1px solid #E2E8F0' }}>Profil murid</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A', borderBottom: '1px solid #E2E8F0' }}>Institusi / Kelas</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A', borderBottom: '1px solid #E2E8F0' }}>Status Akses</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#0F172A', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: selectedUserIds.includes(student.id) ? '#F8FAFC' : 'transparent' }}>
                    {isBulkMode && (
                      <td style={{ padding: '16px 24px' }}>
                        <input 
                          type="checkbox" 
                          className="custom-checkbox"
                          checked={selectedUserIds.includes(student.id)} 
                          onChange={() => handleSelectCheckbox(student.id)} 
                        />
                      </td>
                    )}
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: '800' }}>
                          {student.initials || student.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginBottom: '2px' }}>{student.name}</div>
                          <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '400' }}>ID Sistem: #{student.id.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#0F172A', fontWeight: '500' }}>
                      {student.class || 'Universitas Pembangunan Panca Budi'}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#10B981', backgroundColor: '#ECFDF5', padding: '6px 12px', borderRadius: '99px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                        Akses Aktif
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', position: 'relative' }}>
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}
                        style={{ padding: '8px 16px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '99px', fontSize: '13px', fontWeight: '600', color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <IconOptions /> Options
                      </button>

                      {activeMenuId === student.id && (
                        <div ref={actionMenuRef} style={{ position: 'absolute', right: '24px', top: '80%', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '6px', zIndex: 40, width: '130px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                           <div onClick={() => openEditModal(student)} style={{ padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', cursor: 'pointer' }} className="drop-item">Edit Murid</div>
                           <div onClick={() => confirmDeleteStudent(student.id)} style={{ padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#EF4444', cursor: 'pointer' }} className="drop-item">Hapus Murid</div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {students.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600', color: currentPage === 1 ? '#94A3B8' : '#0F172A' }}
              >
                <IconChevronLeftCircle /> Back
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600', color: currentPage === totalPages ? '#94A3B8' : '#0F172A' }}
              >
                Next <IconChevronRightCircle />
              </button>
            </div>
          )}

        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#F8FAFC' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #A7F3D0' }}>
                  <IconShield />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                    {editingStudent ? 'Modifikasi Akses Murid' : 'Buat Akses Murid'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                    Konfigurasi parameter kredensial resmi. Akun akan terikat langsung di bawah bimbingan Anda.
                  </p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}><IconClose /></button>
            </div>

            <form onSubmit={handleAddOrUpdateStudent} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>NAMA LENGKAP MURID</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '16px', zIndex: 2 }}><IconUser /></div>
                    <input type="text" required placeholder="Masukkan nama lengkap" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>EMAIL KREDENSIAL</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '16px', zIndex: 2 }}><IconMail /></div>
                    <input type="email" required={!editingStudent} placeholder="contoh@email.com" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {editingStudent ? 'KATA SANDI BARU (OPSIONAL)' : 'KATA SANDI AKSES'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '16px', zIndex: 2 }}><IconLock /></div>
                    <input type="text" required={!editingStudent} minLength="6" placeholder={editingStudent ? "Kosongkan jika tidak ingin diubah" : "Masukkan sandi akun baru siswa"} value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '24px', borderTop: '1px solid #F1F5F9' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '14px 20px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', fontSize: '14px', fontWeight: '700', color: '#475569', cursor: 'pointer' }}>Batal</button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '14px 24px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: isSubmitting ? 'wait' : 'pointer' }}>
                  {isSubmitting ? 'Menyimpan...' : (editingStudent ? 'Perbarui Akses' : 'Simpan Akses')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {dialogConfig.isOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '400px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', padding: '32px', textAlign: 'center' }}>
            
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: dialogConfig.type === 'confirm' ? '#FEF2F2' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              {dialogConfig.type === 'confirm' ? <IconWarning /> : <IconInfo />}
            </div>
            
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>
              {dialogConfig.title}
            </h3>
            <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
              {dialogConfig.message}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              {dialogConfig.type === 'confirm' && (
                <button 
                  onClick={() => setDialogConfig({ ...dialogConfig, isOpen: false })} 
                  style={{ flex: 1, padding: '14px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '14px', fontSize: '14px', fontWeight: '700', color: '#475569', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Batal
                </button>
              )}
              <button 
                onClick={dialogConfig.type === 'confirm' ? dialogConfig.onConfirm : () => setDialogConfig({ ...dialogConfig, isOpen: false })} 
                style={{ flex: 1, padding: '14px', backgroundColor: dialogConfig.type === 'confirm' ? '#EF4444' : '#0F172A', color: 'white', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: dialogConfig.type === 'confirm' ? '0 4px 6px rgba(239, 68, 68, 0.2)' : '0 4px 6px rgba(15, 23, 42, 0.2)' }}
              >
                {dialogConfig.type === 'confirm' ? 'Ya, Hapus' : 'Oke, Mengerti'}
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .drop-item:hover { background-color: #F1F5F9; color: #0F172A !important; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        .custom-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid #CBD5E1;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          display: inline-grid;
          place-content: center;
          transition: all 0.15s ease-in-out;
          background-color: #FFFFFF;
        }
        .custom-checkbox:checked {
          background-color: #0F172A;
          border-color: #0F172A;
        }
        .custom-checkbox:checked::before {
          content: "";
          width: 9px;
          height: 4px;
          border-left: 2px solid white;
          border-bottom: 2px solid white;
          transform: rotate(-45deg) translate(1px, -2px);
        }
      `}</style>
    </main>
  );
}