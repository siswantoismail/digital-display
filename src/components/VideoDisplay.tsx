import React, { useRef, useEffect, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Maximize,
  Minimize,
} from "lucide-react";

export interface VideoItem {
  id: string;
  src: string;
  title: string;
  duration?: number;
}

interface VideoDisplayProps {
  item: VideoItem;
  isPaused: boolean;
  onTogglePause: () => void;
  onVideoEnded?: () => void;

  fitMode: "cover" | "contain";
  onFitModeChange: (mode: "cover" | "contain") => void;
}

export function VideoDisplay({
  item,
  isPaused,
  onTogglePause,
  onVideoEnded,
  fitMode,
  onFitModeChange,
}: VideoDisplayProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Audio aktif secara default (unmuted)
  const [videoMuted, setVideoMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [autoplayBlockedAudio, setAutoplayBlockedAudio] = useState(false);

  // Coba putar video dengan audio aktif langsung
  useEffect(() => {
    setHasError(false);
    if (videoRef.current) {
      const vid = videoRef.current;
      vid.defaultMuted = false;
      vid.muted = videoMuted;

      if (isPaused) {
        vid.pause();
        setIsPlaying(false);
      } else {
        // Coba putar dengan suara aktif
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlockedAudio(false);
            })
            .catch((err) => {
              console.warn(
                "Browser memblokir autoplay bersuara tanpa interaksi awal, memutar hening dahulu:",
                err,
              );
              // Jika kebijakan browser memblokir suara otomatis, putar hening dan siapkan aktifasi
              vid.muted = true;
              setVideoMuted(true);
              setAutoplayBlockedAudio(true);
              vid
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            });
        }
      }
    }
  }, [item.src, isPaused]);

  // Listener untuk langsung mengaktifkan audio pada klik / ketukan pertama di layar jika sempat tertahan browser
  useEffect(() => {
    const unlockAudio = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setVideoMuted(false);
        setAutoplayBlockedAudio(false);
      }
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const prog =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(prog);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setVideoMuted(nextMuted);
      if (!nextMuted) setAutoplayBlockedAudio(false);
    } else {
      setVideoMuted((m) => !m);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
    onTogglePause();
  };

  return (
    <div className="group relative w-full h-full min-h-0 p-0 m-0 overflow-hidden bg-black flex items-center justify-center select-none">
      <video
        ref={(el) => {
          videoRef.current = el;
          if (el) {
            el.defaultMuted = false;
            el.muted = videoMuted;
          }
        }}
        key={item.src}
        src={item.src}
        className={`w-full h-full bg-black ${fitMode === "cover" ? "object-cover" : "object-contain"}`}
        autoPlay
        playsInline
        preload="auto"
        onLoadedData={() => {
          if (videoRef.current && !isPaused) {
            videoRef.current.muted = videoMuted;
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  setVideoMuted(true);
                  videoRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch(() => {});
                }
              });
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          if (onVideoEnded) onVideoEnded();
        }}
        onError={() => setHasError(true)}
      />

      {/* Banner aktifkan suara jika browser membatasi autoplay bersuara sebelum klik */}
      {autoplayBlockedAudio && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-5 z-30 flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-2xl transition-all animate-bounce cursor-pointer"
          title="Klik untuk Mengaktifkan Suara Video"
        >
          <Volume2 className="w-4 h-4 text-slate-950" />
          <span>Klik untuk Nyalakan Suara Video</span>
        </button>
      )}

      {/* Fallback jika berkas video gagal diputar */}
      {hasError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">{item.title}</h3>
          <p className="text-xs text-slate-300 max-w-md">
            Video sedang dimuat dari berkas{" "}
            <code className="text-sky-300 font-mono">{item.src}</code>.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => {});
              }
            }}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Coba Putar Ulang</span>
          </button>
        </div>
      )}

      {/* Mode Proporsional / Layar Penuh Toggle */}
      <button
        onClick={() =>
          onFitModeChange(fitMode === "cover" ? "contain" : "cover")
        }
        className="absolute top-4 right-5 z-20 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs text-slate-200 hover:text-white flex items-center gap-1.5 shadow-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
        title={
          fitMode === "cover"
            ? "Tampilkan Proporsional (Fit)"
            : "Tampilkan Penuhi Layar (Cover)"
        }
      >
        {fitMode === "cover" ? (
          <Minimize className="w-3.5 h-3.5 text-sky-400" />
        ) : (
          <Maximize className="w-3.5 h-3.5 text-sky-400" />
        )}
        <span>{fitMode === "cover" ? "Mode Penuh" : "Mode Pas"}</span>
      </button>

      {/* Video Bar Kontrol Bawah */}
      <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between gap-4 p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-slate-200 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            title={isPlaying ? "Jeda" : "Putar"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className={`p-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-2.5 ${
              videoMuted
                ? "bg-amber-950/60 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60"
                : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60"
            }`}
            title={videoMuted ? "Nyalakan Audio" : "Senyapkan Audio"}
          >
            {videoMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-amber-400" />
                <span>Audio Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Audio Aktif</span>
              </>
            )}
          </button>

          <button
            onClick={() =>
              onFitModeChange(fitMode === "cover" ? "contain" : "cover")
            }
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            title={
              fitMode === "cover" ? "Mode Proporsional" : "Mode Layar Penuh"
            }
          >
            {fitMode === "cover" ? (
              <Minimize className="w-3.5 h-3.5" />
            ) : (
              <Maximize className="w-3.5 h-3.5" />
            )}
            <span>{fitMode === "cover" ? "Pas Layar" : "Penuh"}</span>
          </button>
        </div>

        {/* Progress Bar Video */}
        <div className="flex-1 max-w-sm mx-4">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-150"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        </div>

        <div className="text-[11px] font-mono hidden sm:block font-bold">
          {videoMuted ? (
            <span className="text-amber-400">🔇 Suara Hening</span>
          ) : (
            <span className="text-emerald-400">🔊 Audio ON</span>
          )}
        </div>
      </div>
    </div>
  );
}
