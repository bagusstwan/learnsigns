import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as tf from '@tensorflow/tfjs'; // <-- OTAK AI BAPAK MASUK DI SINI
import Mascot from '../components/Mascot';

import FilterTabs from '../components/FilterTabs';
import QuestCard from '../components/QuestCard';
import Pagination from '../components/Pagination';

const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconBack = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const IconAlert = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;

// LABEL DATASET ABJAD (Sesuai dengan Interactive Module Bapak)
const ALPHABET_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default function QuestPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isTablet = windowWidth <= 1024 && windowWidth >= 768;
  const isMobileScreen = windowWidth < 768;

  // STATE CORE UTAMA
  const [quests, setQuests] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [activeQuest, setActiveQuest] = useState(null); 
  const [signStatus, setSignStatus] = useState("Menunggu input...");
  const [aiMessage, setAiMessage] = useState("Arahkan tangan ke kamera untuk memulai misi.");
  const [isThinking, setIsThinking] = useState(false);
  
  // STATE TENSORFLOW MODEL
  const [tfModel, setTfModel] = useState(null);
  
  // STATE UI STATUS (Loading & Error)
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');

  // 1. FETCH DATA QUEST
  const fetchQuestsData = async () => {
    setIsLoading(true);
    setApiError("");
    try {
      const response = await fetch(`${API_BASE_URL}/quests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const resData = await response.json();
      
      if (response.ok) {
        if (!resData.data || resData.data.length === 0) {
          setApiError("Belum ada data misi yang tersedia. Pastikan Seeder di Laravel berhasil dijalankan.");
          setQuests([]);
        } else {
          const processedQuests = resData.data.map(q => {
            let cat = "Abjad"; 
            if (q.reward_stars >= 100 && q.reward_stars <= 150) cat = "Kosa Kata";
            if (q.reward_stars >= 200) cat = "Kalimat";
            return { ...q, category: cat };
          });
          setQuests(processedQuests);
          setTotalStars(resData.user_stars);
        }
      } else {
        setApiError(`Gagal menghubungi API (Status: ${response.status}).`);
      }
    } catch (err) {
      setApiError("Koneksi ke server terputus. Pastikan server Laravel sedang berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!activeQuest) fetchQuestsData();
  }, [activeQuest]);

  // 2. LOAD TENSORFLOW MODEL BERDASARKAN KATEGORI MISI AKTIF
  useEffect(() => {
    if (activeQuest) {
      let folderModel = 'abjad'; // Default
      if (activeQuest.category === 'Kosa Kata') folderModel = 'kosakata';
      if (activeQuest.category === 'Kalimat') folderModel = 'kalimat';

      setAiMessage(`Menyiapkan mesin AI untuk kategori ${folderModel}...`);

      const loadModel = async () => {
        if (tfModel) {
            tfModel.dispose(); 
        }
        try {
          // Menembak server lokal Bapak sesuai kategori quest
          const modelUrl = `http://127.0.0.1:8000/serve-ai/${folderModel}/model.json?v=${new Date().getTime()}`;
          const loadedModel = await tf.loadLayersModel(modelUrl);
          setTfModel(loadedModel);
          setAiMessage(`Sistem AI ${folderModel} aktif. Mulai peragakan gestur untuk misi ini!`);
        } catch (error) {
          console.error("Gagal memuat AI model:", error);
          setAiMessage(`Gagal memuat otak AI untuk ${folderModel}. Pastikan folder model tersedia.`);
        }
      };
      loadModel();
    }
  }, [activeQuest]);

  const handleQuestSuccess = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quests/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quest_id: activeQuest.id })
      });
      const resData = await response.json();
      if (response.ok) {
        setTotalStars(resData.new_total_stars);
        setAiMessage(`Misi Sukses! Data disimpan ke database. Anda mendapatkan +${activeQuest.reward_stars} Bintang!`);
      }
    } catch (err) {
      console.error("Gagal menyimpan progress misi:", err);
    } finally {
      setIsThinking(false);
    }
  };

  const categories = ["Semua", "Abjad", "Kosa Kata", "Kalimat"];
  const filteredQuests = quests.filter(q => activeFilter === "Semua" || q.category === activeFilter);
  const totalPages = Math.ceil(filteredQuests.length / itemsPerPage);
  const currentQuests = filteredQuests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [activeFilter]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const consecutiveFrameCount = useRef(0);
  const pendingStatusRef = useRef("");
  const latestConfidenceRef = useRef(0);

  useEffect(() => {
    if (activeQuest) {
      setSignStatus("System Standby");
      consecutiveFrameCount.current = 0;
      pendingStatusRef.current = "";
    }
  }, [activeQuest]);

  // 3. MEDIAPIPE + TENSORFLOW PREDICTION LOGIC
  useEffect(() => {
    if (!activeQuest || !tfModel) return;

    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.8, minTrackingConfidence: 0.85 });

    hands.onResults((results) => {
      if (!canvasRef.current || !webcamRef.current) return;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const canvasCtx = canvasRef.current.getContext("2d");
      
      // Mirroring canvas seperti di Interactive Module
      canvasCtx.save(); 
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-videoWidth, 0);

      let baseStatus = "No Detection";
      let displayPercentage = 0;
      
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        let flattened = [];

        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#F59E0B', lineWidth: 3 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1.5, radius: 2.5 });
          
          for (const point of landmarks) {
            flattened.push(point.x, point.y, point.z);
          }
        }
        
        while (flattened.length < 126) {
          flattened.push(0.0, 0.0, 0.0);
        }

        let detectedLabel = "-";
        
        tf.tidy(() => {
          const inputTensor = tf.tensor2d([flattened.slice(0, 126)]);
          const prediction = tfModel.predict(inputTensor);
          
          const maxIndex = prediction.argMax(-1).dataSync()[0];
          const maxConfidence = prediction.max().dataSync()[0];
          
          displayPercentage = Math.round(maxConfidence * 100);
          
          if (displayPercentage > 35) { 
             if (activeQuest.category === 'Abjad') {
                 detectedLabel = ALPHABET_LABELS[maxIndex];
             } 
             // TODO: Tambahkan mapping khusus Kosa Kata / Kalimat jika dataset-nya berbeda mapping indexnya
             else {
                 // Fallback sementara jika label Kosa Kata belum di-mapping array
                 detectedLabel = ALPHABET_LABELS[maxIndex] || "Terdeteksi"; 
             }
          }
        });

        latestConfidenceRef.current = displayPercentage;

        // Pencocokan target Quest (Case Insensitive)
        const isCorrect = (detectedLabel.toLowerCase() === activeQuest.target_gesture.toLowerCase());
        baseStatus = isCorrect ? `Valid: ${activeQuest.target_gesture}` : `Terdeteksi: ${detectedLabel}`;
      } else {
        latestConfidenceRef.current = 0;
      }

      canvasCtx.restore(); 

      // Stabilitas Frame Evaluasi
      if (baseStatus === pendingStatusRef.current) {
        consecutiveFrameCount.current += 1;
      } else {
        pendingStatusRef.current = baseStatus;
        consecutiveFrameCount.current = 1;
      }

      if (consecutiveFrameCount.current >= 5) {
        const finalUIStatus = displayPercentage > 0 
          ? `${baseStatus} (${displayPercentage}%)` 
          : baseStatus;
          
        setSignStatus(finalUIStatus);

        // Jika terdeteksi valid dan stabil, selesaikan Quest
        if (baseStatus.includes("Valid") && !isThinking && displayPercentage >= 80) {
          setIsThinking(true);
          setAiMessage(`Menganalisis stabilitas gestur... Akurasi: ${displayPercentage}%`);
          setTimeout(() => {
            handleQuestSuccess();
          }, 2000);
        }
      }
    });

    let cameraInstance = null;
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      cameraInstance = new Camera(webcamRef.current.video, {
        onFrame: async () => { await hands.send({ image: webcamRef.current.video }); },
        width: 640, height: 480
      });
      cameraInstance.start();
    }
    return () => { if (cameraInstance) cameraInstance.stop(); hands.close(); };
    
  }, [activeQuest, isThinking, tfModel]); 

  // VIEW RENDER INTERFACE
  if (!activeQuest) {
    return (
      <main style={{ flex: 1, padding: isDesktop ? '64px 80px' : isTablet ? '40px 48px' : '32px 20px', boxSizing: 'border-box', overflowY: 'auto', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ margin: '0 0 12px 0', fontSize: isDesktop ? '32px' : '28px', fontWeight: '700', color: '#111827', letterSpacing: '-1px' }}>Papan Misi Harian</h1>
              <p style={{ margin: 0, fontSize: '15px', color: '#6B7280', maxWidth: '500px', lineHeight: '1.6' }}>Selesaikan tantangan untuk mengumpulkan bintang riil di database EduSync.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', padding: '10px 20px', borderRadius: '50px' }}>
              <IconStar />
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#B45309' }}>{totalStars} Bintang</span>
            </div>
          </div>

          <FilterTabs categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          {isLoading ? (
            <div style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #111827', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
              <p style={{ fontWeight: '600' }}>Mengsinkronisasi data misi dari server...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : apiError ? (
            <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <IconAlert />
              <h3 style={{ margin: '0 0 8px 0', color: '#B91C1C', fontSize: '18px' }}>Terjadi Kendala Koneksi API</h3>
              <p style={{ margin: 0, color: '#DC2626', fontSize: '14px', maxWidth: '400px', lineHeight: '1.5' }}>{apiError}</p>
            </div>
          ) : currentQuests.length === 0 ? (
            <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #D1D5DB', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
               <p style={{ color: '#6B7280', fontWeight: '500' }}>Tidak ada misi aktif untuk kategori ini.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr', gap: '20px', minHeight: '400px', alignContent: 'start' }}>
              {currentQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} onClick={setActiveQuest} />
              ))}
            </div>
          )}

          {!isLoading && !apiError && (
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          )}

        </div>
      </main>
    );
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', backgroundColor: '#FAFAFA' }}>
      <div style={{ padding: isDesktop ? '40px 48px' : '24px 16px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <button onClick={() => setActiveQuest(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#6B7280', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: '0', marginBottom: '16px' }}><IconBack /> Kembali ke Papan Misi</button>
            <h2 style={{ margin: '0 0 8px 0', fontSize: isMobileScreen ? '22px' : '28px', fontWeight: '700', color: '#111827', letterSpacing: '-0.8px' }}>Eksekusi Misi: {activeQuest.title}</h2>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Selesaikan target gestur untuk menambah bintang permanen di profil Anda.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', padding: '10px 20px', borderRadius: '50px' }}>
            <IconStar />
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#B45309' }}>Total: {totalStars}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: '24px', alignItems: 'flex-start', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ flex: isDesktop ? '1.3' : 'none', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Vision Sensor</span>
              <span style={{ fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '4px', backgroundColor: signStatus.includes("Valid") ? '#E6F4EA' : '#F3F4F6', color: signStatus.includes("Valid") ? '#1E8E3E' : '#4B5563'}}>{signStatus}</span>
            </div>
            
            {/* PASTIKAN WEBCAM MIRRORED AGAR COCOK DENGAN LOGIKA TENSORFLOW */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000000' }}>
              <Webcam ref={webcamRef} mirrored={true} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} />
              <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 10 }} />
            </div>

            <div style={{ padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827' }}>Target: {activeQuest.target_gesture}</h3>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#F59E0B' }}>Hadiah: +{activeQuest.reward_stars}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>{activeQuest.description}</p>
            </div>
          </div>

          <div style={{ flex: isDesktop ? '1' : 'none', display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '32px 24px', minHeight: isDesktop ? '520px' : 'auto', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}><Mascot isThinking={isThinking} /></div>
            <div style={{ borderTop: '1px solid #EAEAEA', paddingTop: '24px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>Quest Log Evaluator</span>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#111827', backgroundColor: '#FAFAFA', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
                <span style={{ color: '#B45309', fontWeight: '700', display: 'block', marginBottom: '4px' }}>AI System:</span>{aiMessage}
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}