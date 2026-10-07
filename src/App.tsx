/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { ImageDisplay, ImageItem } from "./components/ImageDisplay.tsx";
import { VideoDisplay, VideoItem } from "./components/VideoDisplay.tsx";
import { Footer, UrgentMessage } from "./components/Footer.tsx";
import { DisplayHeader } from "./components/DisplayHeader.tsx";
import { DisplaySetting } from "./types/index.ts";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  RefreshCw,
} from "lucide-react";

// ====================================================================
// DATA TERPASANG LANGSUNG DALAM KODE PROGRAM (TANPA DATABASE MYSQL)
// ====================================================================

// 1. Daftar Gambar (public/images/)
const DEFAULT_IMAGES: ImageItem[] = [
  {
    id: "img-1",
    src: "/images/berprestasi.jpeg",
    title: "Gambar Informasi Pelayanan KGTK 1",
    duration: 12,
  },
  {
    id: "img-2",
    src: "/images/apresiasi1.jpeg",
    title: "Gambar Dokumentasi Guru & Tenaga Kependidikan 2",
    duration: 12,
  },
  {
    id: "img-3",
    src: "/images/serbu-kasubi.jpeg",
    title: "Gambar Transformasi Pendidikan Gorontalo 3",
    duration: 12,
  },
  {
    id: "img-4",
    src: "/images/kamis-asri.jpeg",
    title: "Gambar Transformasi Pendidikan Gorontalo 3",
    duration: 12,
  },
  {
    id: "img-5",
    src: "/images/gambar4.jpeg",
    title: "Gambar Transformasi Pendidikan Gorontalo 3",
    duration: 12,
  },
  {
    id: "img-6",
    src: "/images/gambar3.jpeg",
    title: "Gambar Transformasi Pendidikan Gorontalo 3",
    duration: 12,
  },
  {
    id: "img-7",
    src: "/images/gambar6.jpeg",
    title: "Gambar Transformasi Pendidikan Gorontalo 3",
    duration: 12,
  },
  {
    id: "img-8",
    src: "/images/gambar8.jpeg",
    title: "Gambar Transformasi Pendidikan Gorontalo 3",
    duration: 12,
  },
  {
    id: "img-9",
    src: "/images/sosialmedia.jpeg",
    title: "Gambar Transformasi Pendidikan Gorontalo 3",
    duration: 12,
  },
];

// 2. Daftar Video (public/videos/)
const DEFAULT_VIDEOS: VideoItem[] = [
  // {
  //   id: "vid-1",
  //   src: "/videos/apresiasi.mp4",
  //   title: "Video Profil Pelayanan KGTK Gorontalo 1",
  //   duration: 15,
  // },
];

// 3. Pesan Footer: Teks Berjalan & Pesan Merah Berjalan
const DEFAULT_RUNNING_TEXT =
  "Selamat Datang di Kantor Guru dan Tenaga Kependidikan (KGTK) Provinsi Gorontalo • Bersama Mengabdi Membangun Karakter Guru Bangsa • Jam Pelayanan Kantor: Senin - Jumat Pukul 08.00 s/d 16.00 WITA • Mengabdi dengan Hati, Melayani dengan Integritas";

const DEFAULT_URGENT_MESSAGES: UrgentMessage[] = [
  {
    id: 1,
    title: "Penyaluran Tunjangan Profesi Guru (TPG) Triwulan III",
    content:
      "Dihimbau kepada seluruh tim verifikator KGTK Provinsi Gorontalo untuk menuntaskan validasi data penerima TPG paling lambat hari Jumat pukul 16.00 WITA agar penerbitan SKTP berjalan tepat waktu.",
    priority: "urgent",
  },
  {
    id: 2,
    title: "Bimbingan Teknis Fasilitator Literasi & Numerasi GTK",
    content:
      "Pembukaan resmi Bimtek Fasilitator Daerah diselenggarakan besok pukul 08.30 WITA di Aula Utama Dulohupa KGTK. Dihadiri 80 perwakilan guru dan pengawas sekolah.",
    priority: "important",
  },
];

type PlaylistItem =
  | { type: "image"; data: ImageItem }
  | { type: "video"; data: VideoItem };

export default function App() {
  // Pemutar backsound yang tetap berjalan saat slide berganti
  const backsoundRef = useRef<HTMLAudioElement | null>(null);
  // State data utama (diinisialisasi langsung dari data konstan dalam program)
  const [images] = useState<ImageItem[]>(DEFAULT_IMAGES);
  const [videos] = useState<VideoItem[]>(DEFAULT_VIDEOS);
  const [runningText, setRunningText] = useState<string>(DEFAULT_RUNNING_TEXT);
  const [urgentMessages, setUrgentMessages] = useState<UrgentMessage[]>(
    DEFAULT_URGENT_MESSAGES,
  );

  // Pengaturan display header
  const [settings] = useState<DisplaySetting>({
    office_name: "Kantor Guru dan Tenaga Kependidikan",
    office_subname: "Provinsi Gorontalo",
    office_address:
      "Jl. Achmad Nadjamuddin No. 12, Kota Gorontalo, Gorontalo 96115",
    slide_interval_seconds: 12,
    enable_audio_chime: true,
    running_text: runningText,
    theme_color: "#0284c7",
    media_view_mode: "cinematic",
    auto_play_video: true,
    video_sound_muted: false,
  });

  // Susun urutan rotasi slide: Gambar dan Video berselang-seling atau berurutan
  const playlist: PlaylistItem[] = [
    ...images.map((img) => ({ type: "image" as const, data: img })),
    ...videos.map((vid) => ({ type: "video" as const, data: vid })),
  ];

  // State navigasi slide
  const [currentIndex, setCurrentIndex] = useState(0);
  // Menyimpan mode tampilan masing-masing media berdasarkan ID.
  // Default setiap media adalah "cover" / Mode Penuh.
  const [mediaFitModes, setMediaFitModes] = useState<
    Record<string, "cover" | "contain">
  >({});
  const [isPaused, setIsPaused] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Edit Footer Form State
  const [editRunningText, setEditRunningText] = useState(runningText);
  const [newUrgentTitle, setNewUrgentTitle] = useState("");
  const [newUrgentContent, setNewUrgentContent] = useState("");
  const [newUrgentPriority, setNewUrgentPriority] = useState<
    "urgent" | "important"
  >("urgent");

  const totalSlides = playlist.length;
  const currentSlide = playlist[currentIndex % (totalSlides || 1)];

  // Timer otomatis untuk GAMBAR saja.
  // Video berpindah berdasarkan event onEnded.
  useEffect(() => {
    if (
      isPaused ||
      isAdminModalOpen ||
      totalSlides <= 1 ||
      currentSlide?.type === "video"
    ) {
      return;
    }

    const durationSec =
      currentSlide?.data.duration || settings.slide_interval_seconds || 12;

    const intervalMs = durationSec * 1000;
    const tickRate = 100;
    const increment = (tickRate / intervalMs) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % totalSlides);
          return 0;
        }

        return prev + increment;
      });
    }, tickRate);

    return () => clearInterval(timer);
  }, [
    isPaused,
    isAdminModalOpen,
    totalSlides,
    currentSlide,
    settings.slide_interval_seconds,
  ]);

  // Navigasi keyboard (Panah Kiri/Kanan, Spasi pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAdminModalOpen) return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setSlideProgress(0);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setSlideProgress(0);
      } else if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdminModalOpen, totalSlides]);

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setSlideProgress(0);
  };

  // Kontrol hidup/mati backsound
  const handleToggleBacksound = async () => {
    const audio = backsoundRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setAudioMuted(false);
      } catch (error) {
        console.error("Backsound gagal diputar:", error);
      }
    } else {
      audio.pause();
      setAudioMuted(true);
    }
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setSlideProgress(0);
  };

  // Simpan perubahan pesan footer langsung dalam state
  const handleSaveFooterSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setRunningText(editRunningText);
    setIsAdminModalOpen(false);
  };

  const handleAddUrgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrgentTitle.trim()) return;
    const newMsg: UrgentMessage = {
      id: Date.now(),
      title: newUrgentTitle.trim(),
      content: newUrgentContent.trim() || "...",
      priority: newUrgentPriority,
    };
    setUrgentMessages((prev) => [newMsg, ...prev]);
    setNewUrgentTitle("");
    setNewUrgentContent("");
  };

  const handleDeleteUrgent = (id: number) => {
    setUrgentMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Pemutar musik latar */}
      <audio
        ref={backsoundRef}
        src="/audio/audio2.mpeg"
        autoPlay
        loop
        preload="auto"
      />
      {/* 1. HEADER (Identitas Kantor, Jam & Cuaca Gorontalo, Kontrol) */}
      <DisplayHeader
        settings={settings}
        onOpenAdmin={() => {
          setEditRunningText(runningText);
          setIsAdminModalOpen(true);
        }}
        audioMuted={audioMuted}
        onToggleMute={handleToggleBacksound}
        activeSlideIndex={currentIndex % (totalSlides || 1)}
        totalSlides={totalSlides}
        slideProgress={slideProgress}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((p) => !p)}
      />

      {/* 2. MAIN DISPLAY STAGE (Panggung Penayang Gambar & Video) */}
      <main className="relative flex-1 min-h-0 w-full p-0 m-0 overflow-hidden bg-black flex items-center justify-center">
        {totalSlides === 0 ? (
          <div className="text-center p-8 text-slate-400">
            <p className="text-base font-semibold">
              Tidak ada media yang terpasang.
            </p>
          </div>
        ) : currentSlide.type === "image" ? (
          <ImageDisplay
            key={currentSlide.data.id}
            item={currentSlide.data}
            fitMode={mediaFitModes[currentSlide.data.id] ?? "contain"} // Default mode setiap media adalah "cover" / "contain" Mode Penuh.
            onFitModeChange={(mode) => {
              setMediaFitModes((prev) => ({
                ...prev,
                [currentSlide.data.id]: mode,
              }));
            }}
          />
        ) : (
          <VideoDisplay
            key={currentSlide.data.id}
            item={currentSlide.data}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((p) => !p)}
            onVideoEnded={handleNextSlide}
            fitMode={mediaFitModes[currentSlide.data.id] ?? "contain"}
            onFitModeChange={(mode) => {
              setMediaFitModes((prev) => ({
                ...prev,
                [currentSlide.data.id]: mode,
              }));
            }}
          />
        )}

        {/* Tombol Panah Navigasi Layar (Transparan, Muncul saat Hover) */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white/40 hover:text-white backdrop-blur-sm border border-slate-700/30 transition-all opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer z-20"
              title="Media Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white/40 hover:text-white backdrop-blur-sm border border-slate-700/30 transition-all opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer z-20"
              title="Media Berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Indikator Dot di Pojok Kanan Bawah Layar */}
        <div className="absolute bottom-4 right-6 z-20 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-800/80">
          {playlist.map((item, idx) => (
            <button
              key={item.data.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSlideProgress(0);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex % totalSlides === idx
                  ? "w-6 bg-sky-400"
                  : "w-2 bg-slate-600 hover:bg-slate-400"
              }`}
              title={`${item.type === "video" ? "Video" : "Gambar"}: ${item.data.title}`}
            />
          ))}
        </div>
      </main>

      {/* 3. FOOTER (Teks Berjalan & Pesan Merah di Bagian Bawah Layar) */}
      <Footer runningText={runningText} urgentMessages={urgentMessages} />

      {/* 4. MODAL PENGATURAN PESAN FOOTER (Kelola Langsung Tanpa MySQL) */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/95">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Pengaturan Pesan Footer Layar
                  </h3>
                  <p className="text-xs text-slate-400">
                    Data dipasang langsung dalam kode program tanpa database
                    MySQL.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Form Teks Berjalan Utama */}
              <form
                onSubmit={handleSaveFooterSettings}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <label className="text-xs font-bold text-slate-200 block">
                  Teks Berjalan Utama di Footer:
                </label>
                <textarea
                  value={editRunningText}
                  onChange={(e) => setEditRunningText(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:border-sky-500"
                  placeholder="Masukkan kalimat yang akan berjalan di footer..."
                  required
                />
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setEditRunningText(
                        "Selamat Datang di Kantor Guru dan Tenaga Kependidikan (KGTK) Provinsi Gorontalo • Jam Pelayanan: Senin - Jumat 08.00 s/d 16.00 WITA • Mengabdi dengan Hati, Melayani dengan Integritas",
                      )
                    }
                    className="text-[11px] text-sky-400 hover:underline cursor-pointer"
                  >
                    Gunakan Teks Standar KGTK
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Terapkan ke Layar</span>
                  </button>
                </div>
              </form>

              {/* Form Tambah Pesan Merah */}
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-3">
                <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span>Kelola Pesan Merah Berjalan (Urgent / Penting):</span>
                </h4>

                <form onSubmit={handleAddUrgent} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={newUrgentTitle}
                      onChange={(e) => setNewUrgentTitle(e.target.value)}
                      placeholder="Judul pesan merah..."
                      className="sm:col-span-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500"
                      required
                    />
                    <select
                      value={newUrgentPriority}
                      onChange={(e) =>
                        setNewUrgentPriority(e.target.value as any)
                      }
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-rose-300 text-xs font-bold focus:outline-none focus:border-rose-500"
                    >
                      <option value="urgent">[URGENT]</option>
                      <option value="important">[PENTING]</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    value={newUrgentContent}
                    onChange={(e) => setNewUrgentContent(e.target.value)}
                    placeholder="Isi pesan yang berjalan..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500"
                    required
                  />

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer shadow ml-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Pesan Merah</span>
                  </button>
                </form>

                {/* List Pesan Merah */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block">
                    Daftar Pesan Merah Aktif ({urgentMessages.length}):
                  </span>
                  {urgentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-2.5 rounded-lg bg-slate-900 border border-rose-500/30 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="truncate">
                        <strong className="text-rose-300 mr-1.5">
                          [{msg.priority.toUpperCase()}]: {msg.title}
                        </strong>
                        <span className="text-slate-400">— {msg.content}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteUrgent(msg.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Berkas Media Langsung */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <strong className="text-slate-200 block">
                  Struktur Berkas Media Langsung:
                </strong>
                <p>
                  • Gambar dibaca dari direktori:{" "}
                  <code className="text-sky-300 font-mono">public/images/</code>{" "}
                  (gambar1.jpg, gambar2.jpg, gambar3.jpg)
                </p>
                <p>
                  • Video dibaca dari direktori:{" "}
                  <code className="text-sky-300 font-mono">public/videos/</code>{" "}
                  (video1.mp4, video2.mp4)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
