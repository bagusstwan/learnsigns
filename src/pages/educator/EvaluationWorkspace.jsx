import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as tf from '@tensorflow/tfjs';

/**
 * Konfigurasi Label Klasifikasi
 */
const ALPHABET_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const DYNAMIC_LABELS = ['BANYAK PIKIRAN', 'CEMAS', 'KECEWA', 'KELELAHAN', 'LUPA', 'MALAS', 'MANDIRI', 'MARAH', 'PENOLAKAN', 'SEMANGAT', 'SENANG', 'TAKUT'];

/**
 * Aset Ikon SVG
 */
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const IconCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconAlert = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const IconRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>;
const IconCheckCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconAlertTriangle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;

export default function EvaluationWorkspace() {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  /** Sinkronisasi State dengan Aturan Validasi Backend */
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [evalStars, setEvalStars] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusModal, setStatusModal] = useState({ isOpen: false, title: "", message: "", type: "success" });

  const [tfModel, setTfModel] = useState(null);
  const [currentAccuracy, setCurrentAccuracy] = useState(0); 
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const sequenceBufferRef = useRef([]);
  const missingHandCount = useRef(0);
  
  const studentData = location.state?.studentData;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 1024;

  useEffect(() => {
    if (!studentData) {
      navigate('/dashboard', { replace: true });
    }
  }, [studentData, navigate]);

  useEffect(() => {
    if (!studentData) return;

    const activeModuleRaw = studentData.active_module || '';
    const isAbjad = activeModuleRaw.toLowerCase().includes('huruf');
    const folderModel = isAbjad ? 'abjad' : 'kosakata';

    const loadModel = async () => {
      if (tfModel) tfModel.dispose(); 
      try {
        const modelUrl = `http://127.0.0.1:8000/serve-ai/${folderModel}/model.json?v=${new Date().getTime()}`;
        const loadedModel = await tf.loadLayersModel(modelUrl);
        setTfModel(loadedModel);
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Kesalahan pemuatan model TensorFlow:", error);
      }
    };
    loadModel();

    return () => {
      if (tfModel) tfModel.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData]);

  useEffect(() => {
    if (!studentData || !isModelLoaded) return;
    
    let isRunning = true; 
    const activeModuleRaw = studentData.active_module || '';
    const isAbjad = activeModuleRaw.toLowerCase().includes('huruf');
    const isDynamicMode = !isAbjad;
    
    // Normalisasi teks target gestur yang robust
    const targetGesture = isAbjad 
      ? activeModuleRaw.replace(/gerakan|modul|huruf/gi, '').trim().toUpperCase() 
      : activeModuleRaw.toUpperCase();
    
    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.8, minTrackingConfidence: 0.85 });

    hands.onResults((results) => {
      if (!isRunning || !canvasRef.current || !webcamRef.current) return;

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const canvasCtx = canvasRef.current.getContext("2d");
      
      canvasCtx.save(); 
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-videoWidth, 0);

      let extractedFrame = new Array(126).fill(0.0);
      let isHandPresent = false;

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        isHandPresent = true;
        missingHandCount.current = 0; 
        
        let flattened = [];
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#0F172A', lineWidth: 2 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1, radius: 2 });
          for (const point of landmarks) {
            flattened.push(point.x, point.y, point.z);
          }
        }
        
        while (flattened.length < 126) {
          flattened.push(0.0, 0.0, 0.0);
        }
        extractedFrame = flattened.slice(0, 126);
      } else {
        missingHandCount.current += 1;
      }

      if (isDynamicMode) {
          if (isHandPresent) {
              sequenceBufferRef.current.push(extractedFrame);
          } else if (!isHandPresent && sequenceBufferRef.current.length > 0 && missingHandCount.current < 15) {
              const lastFrame = sequenceBufferRef.current[sequenceBufferRef.current.length - 1];
              sequenceBufferRef.current.push(lastFrame);
          } else if (missingHandCount.current >= 15) {
              sequenceBufferRef.current = [];
          }

          if (sequenceBufferRef.current.length > 60) {
              sequenceBufferRef.current.shift();
          }
      }

      let shouldPredictDynamic = isDynamicMode && sequenceBufferRef.current.length === 60 && missingHandCount.current <= 5;
      let shouldPredictStatic = !isDynamicMode && isHandPresent;

      if (tfModel && (shouldPredictStatic || shouldPredictDynamic)) {
           let displayPercentage = 0;
           let detectedLabel = "Blank";

           try {
             if (!isDynamicMode) {
                 tf.tidy(() => {
                   const inputTensor = tf.tensor2d([extractedFrame]);
                   const prediction = tfModel.predict(inputTensor);
                   const maxIndex = prediction.argMax(-1).dataSync()[0];
                   displayPercentage = Math.round(prediction.max().dataSync()[0] * 100);
                   detectedLabel = ALPHABET_LABELS[maxIndex];
                 });
             } else {
                 tf.tidy(() => {
                   const inputTensor = tf.tensor3d([sequenceBufferRef.current]);
                   const prediction = tfModel.predict(inputTensor);
                   const maxIndex = prediction.argMax(-1).dataSync()[0];
                   displayPercentage = Math.round(prediction.max().dataSync()[0] * 100);
                   detectedLabel = DYNAMIC_LABELS[maxIndex];
                 });
             }
           } catch (e) { 
             console.error("Kesalahan Mutasi Tensor:", e); 
           }
           
           if (detectedLabel === targetGesture) {
               setCurrentAccuracy(prev => Math.max(prev, displayPercentage));
           }
      } 
      
      canvasCtx.restore(); 
    });

    let cameraInstance = null;
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      cameraInstance = new Camera(webcamRef.current.video, {
        onFrame: async () => { 
            if (isRunning && webcamRef.current && webcamRef.current.video) {
                try {
                    await hands.send({ image: webcamRef.current.video }); 
                } catch (err) {}
            }
        },
        width: 640, height: 480
      });
      cameraInstance.start();
    }
    
    return () => { 
        isRunning = false; 
        if (cameraInstance) cameraInstance.stop(); 
        try { hands.close(); } catch(e) {}
    };
    
  }, [studentData, isModelLoaded, tfModel]); 

  if (!studentData) return null;

  /** 
   * Eksekusi Cerdas Pengiriman Data Ke Backend
   * Rute API telah diselaraskan dengan routes/api.php
   */
  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

      // PERBAIKAN: Penyesuaian Endpoint URL ke /educator/assignments/{id}/evaluate
      const response = await fetch(`${API_BASE_URL}/educator/assignments/${studentData.id}/evaluate`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          stars_earned: parseInt(evalStars), 
          feedback: feedbackNotes
        })
      });

      const responseData = await response.json();

      if (response.ok && responseData.status === 'success') {
        setStatusModal({
          isOpen: true,
          title: "Evaluasi Berhasil Direkam",
          message: responseData.message || `Hasil penilaian untuk ${studentData.name} telah dienkripsi dan sinkron dengan basis data utama.`,
          type: "success"
        });
      } else {
        setStatusModal({
          isOpen: true,
          title: "Gagal Menyimpan Data",
          message: responseData.message || "Peladen merespons dengan kesalahan saat memvalidasi input.",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Kesalahan Jaringan:", error);
      setStatusModal({
        isOpen: true,
        title: "Koneksi Terputus",
        message: "Tidak dapat menjangkau peladen utama. Pastikan koneksi internet Anda stabil.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModalAndReturn = () => {
    setStatusModal({ ...statusModal, isOpen: false });
    
    if (statusModal.type === 'success') {
       const studentIdentifier = studentData.id || studentData.name; 
       navigate('/dashboard', { state: { evaluatedStudentIdentifier: studentIdentifier } });
    }
  };

  const handleResetAccuracy = () => {
    setCurrentAccuracy(0);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', fontFamily: '"Geist Sans", "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', cursor: 'pointer', color: '#0F172A', transition: 'all 0.2s' }}>
          <IconArrowLeft />
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.3px' }}>Ruang Evaluasi Sistem</h1>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>{studentData.active_module || 'Penugasan Tidak Diketahui'}</span>
        </div>
      </header>

      <main style={{ flex: 1, padding: isMobile ? '24px 16px' : '32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', boxSizing: 'border-box' }}>
        
        <div style={{ flex: isMobile ? 'none' : '0 0 60%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#0F172A', borderRadius: '24px', overflow: 'hidden', height: isMobile ? '300px' : '560px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 20, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '8px', color: currentAccuracy >= 80 ? '#10B981' : '#F59E0B', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: currentAccuracy >= 80 ? '#10B981' : '#F59E0B' }}></div> 
              {currentAccuracy >= 80 ? 'Rekaman Valid' : 'Menganalisis Gestur'}
            </div>

            <Webcam ref={webcamRef} mirrored={true} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 10 }} />
            
            {!isModelLoaded && (
              <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '500', zIndex: 15, backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '8px' }}>
                Memuat Parameter Kecerdasan Buatan...
              </span>
            )}
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #F1F5F9' }}>
            <img src={studentData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name || 'Student')}&background=F1F5F9&color=0F172A`} alt={studentData.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{studentData.name}</h3>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '400' }}>Target Akurasi: {studentData.target || '90%'}</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '20px', marginBottom: '32px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tingkat Akurasi AI Saat Ini</span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                 {currentAccuracy > 0 && (
                    <button type="button" onClick={handleResetAccuracy} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: '600' }} title="Mulai Ulang Deteksi">
                      <IconRefresh /> Ulangi
                    </button>
                 )}
                 <IconAlert />
              </div>
            </div>
            <span style={{ fontSize: '32px', fontWeight: '800', color: currentAccuracy >= 80 ? '#10B981' : '#F59E0B' }}>
              {currentAccuracy}%
            </span>
          </div>

          <form onSubmit={handleSubmitEvaluation} style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Alokasi Poin Bintang (Maksimal 50)</label>
              <input 
                type="number" 
                min="1" 
                max="50" 
                required
                disabled={isSubmitting}
                value={evalStars}
                onChange={(e) => setEvalStars(e.target.value)}
                placeholder="Beri nilai bintang"
                style={{ padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '15px', color: '#0F172A', outline: 'none', fontFamily: 'inherit', opacity: isSubmitting ? 0.7 : 1 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Catatan Perbaikan Pendidik</label>
              <textarea 
                required
                disabled={isSubmitting}
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                placeholder="Tuliskan umpan balik evaluasi gestur untuk siswa ini..."
                style={{ flex: 1, minHeight: '120px', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '14px', color: '#0F172A', outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: '1.6', opacity: isSubmitting ? 0.7 : 1 }}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ marginTop: 'auto', padding: '16px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: isSubmitting ? 'wait' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontFamily: 'inherit', transition: 'background-color 0.2s', opacity: isSubmitting ? 0.8 : 1 }} 
              onMouseOver={e => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#1E293B'; }} 
              onMouseOut={e => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#0F172A'; }}
            >
              {isSubmitting ? (
                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="loader-btn"></span> Mengamankan ke Peladen...
                 </span>
              ) : (
                 <><IconCheck /> Simpan & Selesaikan Evaluasi</>
              )}
            </button>

          </form>
        </div>
      </main>

      {/* Modal Eksekusi Cerdas */}
      {statusModal.isOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s' }} onClick={handleCloseModalAndReturn}>
            <div style={{ backgroundColor: '#FFFFFF', width: isMobile ? '90%' : '400px', borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', position: 'relative', animation: 'scaleUp 0.2s', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                
                <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: statusModal.type === 'success' ? '#ECFDF5' : '#FEF2F2', marginBottom: '20px' }}>
                    {statusModal.type === 'success' ? <IconCheckCircle /> : <IconAlertTriangle />}
                </div>
                
                <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>{statusModal.title}</h3>
                <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>{statusModal.message}</p>
                
                <button onClick={handleCloseModalAndReturn} style={{ width: '100%', padding: '14px', backgroundColor: statusModal.type === 'success' ? '#0F172A' : '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: '0.2s', fontFamily: 'inherit' }}>
                    {statusModal.type === 'success' ? 'Tutup & Kembali ke Dasbor' : 'Coba Lagi'}
                </button>
            </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .loader-btn { width: 16px; height: 16px; border: 2px solid #FFFFFF; border-bottom-color: transparent; border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; }
        @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}