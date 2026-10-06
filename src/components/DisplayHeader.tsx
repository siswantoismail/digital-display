import React, { useState, useEffect } from "react";
import {
  Maximize2,
  Minimize2,
  Settings,
  Volume2,
  VolumeX,
  CloudSun,
  Clock,
  Pause,
  Play,
} from "lucide-react";
import { DisplaySetting } from "../types/index.ts";

interface DisplayHeaderProps {
  settings: DisplaySetting;
  onOpenAdmin: () => void;
  audioMuted: boolean;
  onToggleMute: () => void;
  activeSlideIndex: number;
  totalSlides: number;
  slideProgress: number; // 0 to 100
  isPaused: boolean;
  onTogglePause: () => void;
}

export function DisplayHeader({
  settings,
  onOpenAdmin,
  audioMuted,
  onToggleMute,
  activeSlideIndex,
  totalSlides,
  slideProgress,
  isPaused,
  onTogglePause,
}: DisplayHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen error:", err);
    }
  };

  // Format date in Indonesian: "Rabu, 7 Oktober 2026"
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(currentTime);

  // Format time with seconds: "08:45:12 WITA"
  const formattedTime = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(currentTime);

  const timeZoneLabel =
    new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Makassar",
      timeZoneName: "short",
    })
      .formatToParts(currentTime)
      .find((part) => part.type === "timeZoneName")?.value || "WITA";

  return (
    <header className="shrink-0 relative z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Slide Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r  via-sky-500 to-amber-400 transition-all duration-300 ease-linear"
          style={{ width: `${slideProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand & Logo Zone */}
        <div className="flex items-center min-w-0">
          <img
            src="/images/logo-kgtk.png"
            alt="Kementerian Pendidikan Dasar dan Menengah - KGTK Gorontalo"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />
        </div>

        {/* Right Zone: Gorontalo Live Clock & Weather & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live Date & Clock */}
          <div className="flex flex-col items-end text-right">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {formattedDate}
            </span>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold font-mono tabular-nums text-slate-100">
              <Clock className="w-3.5 h-3.5 text-sky-400 inline" />
              <span>{formattedTime}</span>
              <span className="text-xs text-sky-400 font-semibold tracking-wider">
                {timeZoneLabel}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
            {/* Center / Slide Tracker */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <button
                onClick={onTogglePause}
                className="text-slate-300 hover:text-white transition-colors"
                title={
                  isPaused ? "Lanjutkan Rotasi Slide" : "Jeda Rotasi Slide"
                }
              >
                {isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* <button
              onClick={onToggleMute}
              className={`p-2 rounded-lg border transition-colors ${
                audioMuted
                  ? "bg-slate-800 text-slate-400 border-slate-700"
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              }`}
              title={
                audioMuted
                  ? "Aktifkan Suara Notifikasi"
                  : "Senyapkan Suara Notifikasi"
              }
              aria-label="Suara"
            >
              {audioMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button> */}

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title={
                isFullscreen
                  ? "Keluar Mode Layar Penuh"
                  : "Mode Layar Penuh (TV Monitor)"
              }
              aria-label="Layar Penuh"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
