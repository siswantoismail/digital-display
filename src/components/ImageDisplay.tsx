import React from "react";
import { Maximize, Minimize } from "lucide-react";

export interface ImageItem {
  id: string;
  src: string;
  title: string;
  duration?: number;
}

interface ImageDisplayProps {
  item: ImageItem;
  fitMode: "cover" | "contain";
  onFitModeChange: (mode: "cover" | "contain") => void;
}

export function ImageDisplay({
  item,
  fitMode,
  onFitModeChange,
}: ImageDisplayProps) {
  return (
    <div className="group relative w-full h-full min-h-0 p-0 m-0 overflow-hidden bg-slate-950 flex items-center justify-center select-none">
      <img
        src={item.src}
        alt={item.title}
        className={`w-full h-full bg-slate-950 transition-all duration-700 ${
          fitMode === "cover" ? "object-cover" : "object-contain"
        }`}
        onError={() => {
          console.warn(`Gagal memuat gambar: ${item.src}`);
        }}
      />

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
    </div>
  );
}
