import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as tf from '@tensorflow/tfjs';

import FilterTabs from '../components/FilterTabs';
import QuestCard from '../components/QuestCard';
import Pagination from '../components/Pagination';

const IconStar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconCameraPlaceholder = () => <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;

const ALPHABET_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default function QuestPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;
  const isMobileScreen = windowWidth < 768;

  const [quests, setQuests] = useState([]);
  const [activeQuest, setActiveQuest] = useState(null); 
  const [signStatus, setSignStatus] = useState("");
  const [aiMessage, setAiMessage] = useState("Mesin visi komputer aktif. Sedang memindai dan mengekstraksi titik koordinat tangan siswa secara aktual...");
  const [isThinking, setIsThinking] = useState(false);
  
  const [tfModel, setTfModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
  const token = localStorage.getItem('token');

  const fetchQuestsData = async () => {
    setIsLoading(true); setApiError("");
    try {
      const response = await fetch(`${API_BASE_URL}/quests`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      if (response.ok) {
        if (!resData.data || resData.data.length === 0) {
          setApiError("Belum ada data misi yang tersedia."); setQuests([]);
        } else {
          // PERBAIKAN: Logika asli pembagian kategori berdasarkan reward_stars dikembalikan!
          const processedQuests = resData.data.map(q => {
            let cat = "Abjad"; 
            if (q.reward_stars >= 100 && q.reward_stars <= 150) cat = "Kosa Kata";
            if (q.reward_stars >= 200) cat = "Kalimat";
            return { ...q, category: cat };
          });
          setQuests(processedQuests);
        }
      } else { setApiError(`Gagal menghubungi API.`); }
    } catch (err) { setApiError("Koneksi ke server terputus."); } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchQuestsData(); }, []);

  useEffect(() => {
    if (activeQuest) {
      setAiMessage(`Menyiapkan AI untuk misi: ${activeQuest.title}...`);
      const loadModel = async () => {
        if (tfModel) tfModel.dispose(); 
        try {
          // Tetap gunakan model abjad dulu untuk menghindari crash model kosa kata
          const modelUrl = `http://127.0.0.1:8000/serve-ai/abjad/model.json?v=${new Date().getTime()}`;
          const loadedModel = await tf.loadLayersModel(modelUrl);
          setTfModel(loadedModel);
          setAiMessage(`Model AI aktif. Tahan gestur huruf ${activeQuest.target_gesture} di depan kamera tanpa ragu.`);
        } catch (error) {
          setAiMessage(`Gagal memuat otak AI untuk misi ini.`);
        }
      };
      loadModel();
    } else {
      setAiMessage("Mesin visi komputer aktif. Sedang memindai dan mengekstraksi titik koordinat tangan siswa secara aktual...");
      setSignStatus("");
    }
  }, [activeQuest]);

  const handleQuestSuccess = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quests/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ quest_id: activeQuest.id })
      });
      if (response.ok) {
        setAiMessage(`Misi Sukses! Bintang berhasil ditambahkan.`);
        fetchQuestsData();
        setActiveQuest(null);
      }
    } catch (err) {
      console.error("Gagal menyimpan progress misi.");
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
  const successFrameCount = useRef(0);
  const pendingStatusRef = useRef("");

  useEffect(() => {
    if (activeQuest) {
      setSignStatus("");
      consecutiveFrameCount.current = 0;
      successFrameCount.current = 0;
      pendingStatusRef.current = "";
    }
  }, [activeQuest]);

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
      
      canvasCtx.save(); 
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-videoWidth, 0);

      let baseStatus = "";
      let displayPercentage = 0;
      let detectedLabel = "-";
      
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        let flattened = [];
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#0F172A', lineWidth: 3 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1.5, radius: 2.5 });
          for (const point of landmarks) { flattened.push(point.x, point.y, point.z); }
        }
        
        while (flattened.length < 126) { flattened.push(0.0, 0.0, 0.0); }

        tf.tidy(() => {
          const inputTensor = tf.tensor2d([flattened.slice(0, 126)]);
          const prediction = tfModel.predict(inputTensor);
          const maxIndex = prediction.argMax(-1).dataSync()[0];
          const maxConfidence = prediction.max().dataSync()[0];
          displayPercentage = Math.round(maxConfidence * 100);
          
          if (displayPercentage > 35) { 
             detectedLabel = ALPHABET_LABELS[maxIndex];
          }
        });

        const isCorrect = (detectedLabel && detectedLabel.toLowerCase() === activeQuest.target_gesture.toLowerCase());
        baseStatus = isCorrect ? `Valid` : `Terdeteksi: ${detectedLabel}`;

        if (isCorrect && displayPercentage >= 90) {
            successFrameCount.current += 1;
            if (successFrameCount.current >= 15 && !isThinking) {
               setIsThinking(true);
               setAiMessage(`Validasi selesai! Menyimpan hasil misi ke server...`);
               setSignStatus(`Selesai!`);
               handleQuestSuccess();
            } else {
               setSignStatus(`Tahan Posisi... ${Math.round((successFrameCount.current/15)*100)}%`);
            }
        } else {
            successFrameCount.current = 0;
            if (baseStatus === pendingStatusRef.current) { consecutiveFrameCount.current += 1; } 
            else { pendingStatusRef.current = baseStatus; consecutiveFrameCount.current = 1; }

            if (consecutiveFrameCount.current >= 5) {
               setSignStatus(displayPercentage > 0 ? `${baseStatus} (${displayPercentage}%)` : baseStatus);
            }
        }
      } else {
        successFrameCount.current = 0;
        setSignStatus("");
      }
      canvasCtx.restore(); 
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

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
      
      <div style={{ padding: isDesktop ? '40px 48px' : '24px 16px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 12px 0', fontSize: isMobileScreen ? '28px' : '36px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>Papan Misi Harian</h1>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '400', color: '#475569', maxWidth: '500px', lineHeight: '1.6' }}>Selesaikan tantangan untuk mengumpulkan bintang dan jadilah pemenang.</p>
        </div>

        {/* LAYOUT TERBAGI DUA */}
        <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: '32px', width: '100%', boxSizing: 'border-box' }}>
          
          {/* KOLOM KIRI: DAFTAR MISI */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minWidth: 0, backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
             
             {/* Header Kolom Kiri */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
               <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Katalog Tantangan Tersedia</h2>
               <FilterTabs categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
             </div>

             {isLoading ? (
                <div style={{ display: 'flex', padding: '40px 0', justifyContent: 'center', color: '#64748B' }}>Memuat data misi...</div>
             ) : apiError ? (
                <div style={{ padding: '24px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '16px', color: '#DC2626' }}>{apiError}</div>
             ) : currentQuests.length === 0 ? (
                /* PERBAIKAN: Tampilan Empty State jika data filter kosong */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', border: '1px dashed #CBD5E1', borderRadius: '16px', textAlign: 'center' }}>
                   <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#64748B' }}>
                     Tidak ada misi yang tersedia untuk kategori <strong>{activeFilter}</strong> saat ini.
                   </p>
                </div>
             ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   {currentQuests.map((quest, index) => (
                     <QuestCard 
                        key={quest.id} 
                        quest={quest} 
                        index={(currentPage - 1) * itemsPerPage + index}
                        isActive={activeQuest?.id === quest.id}
                        onClick={setActiveQuest} 
                     />
                   ))}
                </div>
             )}
             
             {!isLoading && !apiError && currentQuests.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
          </div>

          {/* KOLOM KANAN: KAMERA & EVALUASI */}
          <div style={{ flex: isDesktop ? '1.2' : 'none', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
             
             {/* Box Kamera 1 */}
             <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
                   
                   <Webcam ref={webcamRef} mirrored={true} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} />
                   <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 10 }} />
                   
                   {signStatus.includes("Tahan") && (
                     <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 15, backgroundColor: '#0F172A', padding: '12px 24px', borderRadius: '99px', color: '#FFFFFF', fontSize: '15px', fontWeight: '700', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        {signStatus}
                     </div>
                   )}

                   {!activeQuest && (
                      <div style={{ position: 'absolute', inset: 0, zIndex: 15, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#0F172A' }}>
                         <IconCameraPlaceholder />
                         <span style={{ marginTop: '16px', fontSize: '24px', fontWeight: '800' }}>Camera</span>
                      </div>
                   )}
                </div>
             </div>

             {/* Log Analisis Box 2 */}
             <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Log Analisis AI</span>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#0F172A', lineHeight: '1.6' }}>{aiMessage}</p>
             </div>

             {/* Referensi Quest Aktif Box 3 */}
             {activeQuest && (
               <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0', display: 'flex', gap: '20px', alignItems: 'center' }}>
                 <div style={{ width: '80px', height: '80px', backgroundColor: '#F1F5F9', borderRadius: '12px', flexShrink: 0, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A' }}>{activeQuest.target_gesture}</span>
                 </div>
                 <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{activeQuest.title}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFBEB', padding: '6px 12px', borderRadius: '99px' }}>
                         <IconStar /> <span style={{ fontSize: '14px', fontWeight: '800', color: '#B45309' }}>+{activeQuest.reward_stars}</span>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>{activeQuest.description}</p>
                 </div>
               </div>
             )}

          </div>

        </div>
      </div>
    </main>
  );
}