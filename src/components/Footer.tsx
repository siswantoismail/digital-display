import React, { useState } from "react";
import { Megaphone, BellRing, Sparkles, X, AlertCircle } from "lucide-react";

export interface UrgentMessage {
  id: number;
  title: string;
  content: string;
  priority: "urgent" | "important";
}

interface FooterProps {
  runningText: string;
  urgentMessages?: UrgentMessage[];
}

export function Footer({ runningText, urgentMessages = [] }: FooterProps) {
  const [selectedUrgent, setSelectedUrgent] = useState<UrgentMessage | null>(
    null,
  );

  return (
    <>
      {/* Tampilan Footer Persis Seperti Semula di Awal */}
      <footer className="shrink-0 relative z-20 bg-slate-900 border-t border-slate-800 text-slate-200 py-2.5 px-4 flex items-center shadow-2xl overflow-hidden select-none">
        {/* Fixed Kicker Badge di Sisi Kiri */}
        <div className="flex items-center gap-2 shrink-0 z-10 pr-4 bg-slate-900 shadow-r border-r border-slate-800">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold tracking-wide uppercase">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Informasi Terkini</span>
          </span>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative whitespace-nowrap pl-4">
          <div className="animate-marquee inline-flex text-sm font-medium text-slate-200">
            {/* ==============================
        BLOK PESAN PERTAMA
        ============================== */}
            <div className="inline-flex items-center gap-8 shrink-0">
              {/* Pesan Merah Urgent / Penting */}
              {urgentMessages.map((ann, idx) => (
                <button
                  key={`urgent-1-${ann.id}-${idx}`}
                  onClick={() => setSelectedUrgent(ann)}
                  className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200 transition-colors text-left cursor-pointer"
                  title="Klik untuk membuka detail pengumuman"
                >
                  <BellRing className="w-4 h-4 text-rose-400 animate-bounce inline shrink-0" />

                  <span className="font-bold underline underline-offset-4 decoration-rose-500/60">
                    PENGUMUMAN: {ann.title}
                  </span>

                  <span className="text-slate-400 font-normal">
                    — {ann.content}
                  </span>

                  <span className="text-slate-600 px-2">✦</span>
                </button>
              ))}

              {/* Pesan Footer Utama */}
              <span className="inline-flex items-center gap-2 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />

                <span>{runningText}</span>

                <span className="text-slate-600 px-2">✦</span>
              </span>
              {/* Identitas KGTK */}
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>
                  Kantor Guru dan Tenaga Kependidikan Provinsi Gorontalo
                  {" • "}
                  Bersama Mengabdi Membangun Karakter Guru Bangsa
                </span>
                <span className="text-slate-600 px-2">✦</span>
              </span>

              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>
                  Pelatihan Matematika Gembira di Ruang Rapat dan Ruang Kelas
                  Kantor KGTK Provinsi Gorontalo
                </span>
                <span className="text-slate-600 px-2">✦</span>
              </span>
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>
                  Pelatihan PM KKA di Ruang Aula Huyula Ambu Kantor KGTK
                  Provinsi Gorontalo
                </span>
                <span className="text-slate-600 px-2">✦</span>
              </span>
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>Pelaksanaan Tes Tertulis (SJT dan Studi Kasus)</span>

                <span className="text-slate-600 px-2">✦</span>
              </span>
            </div>

            {/* ==============================
        BLOK PESAN KEDUA
        DUPLIKAT UNTUK LOOPING TANPA JEDA
        ============================== */}
            <div
              className="inline-flex items-center gap-8 shrink-0"
              aria-hidden="true"
            >
              {/* Pesan Merah Urgent / Penting */}
              {urgentMessages.map((ann, idx) => (
                <span
                  key={`urgent-2-${ann.id}-${idx}`}
                  className="inline-flex items-center gap-2 text-rose-300"
                >
                  <BellRing className="w-4 h-4 text-rose-400 shrink-0" />

                  <span className="font-bold underline underline-offset-4 decoration-rose-500/60">
                    [PENGUMUMAN {ann.priority.toUpperCase()}]: {ann.title}
                  </span>

                  <span className="text-slate-400 font-normal">
                    — {ann.content}
                  </span>

                  <span className="text-slate-600 px-2">✦</span>
                </span>
              ))}

              {/* Pesan Footer Utama */}
              <span className="inline-flex items-center gap-2 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />

                <span>{runningText}</span>

                <span className="text-slate-600 px-2">✦</span>
              </span>

              {/* Identitas KGTK */}
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>
                  Kantor Guru dan Tenaga Kependidikan Provinsi Gorontalo
                  {" • "}
                  Bersama Mengabdi Membangun Karakter Guru Bangsa
                </span>

                <span className="text-slate-600 px-2">✦</span>
              </span>

              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>
                  Pelatihan Matematika Gembira di Ruang Rapat dan Ruang Kelas
                  Kantor KGTK Provinsi Gorontalo
                </span>

                <span className="text-slate-600 px-2">✦</span>
              </span>
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>
                  Pelatihan PM KKA di Aula Huyula Ambu Kantor KGTK Provinsi
                  Gorontalo
                </span>

                <span className="text-slate-600 px-2">✦</span>
              </span>
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span>Pelaksanaan Tes Tertulis (SJT dan Studi Kasus)</span>

                <span className="text-slate-600 px-2">✦</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Detail Pop-up Saat Pesan Merah Diklik */}
      {selectedUrgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-2 ${
              selectedUrgent.priority === "urgent"
                ? "bg-slate-900 border-rose-500 shadow-rose-950/50"
                : "bg-slate-900 border-amber-500 shadow-amber-950/50"
            }`}
          >
            {/* Top Pulse Bar */}
            <div
              className={`h-2.5 w-full ${
                selectedUrgent.priority === "urgent"
                  ? "bg-rose-600 animate-pulse"
                  : "bg-amber-500"
              }`}
            />

            <div className="p-6 sm:p-8 space-y-4 text-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl border ${
                      selectedUrgent.priority === "urgent"
                        ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    }`}
                  >
                    <BellRing className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        selectedUrgent.priority === "urgent"
                          ? "bg-rose-500/30 text-rose-300 border border-rose-500/40"
                          : "bg-amber-500/30 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      PENGUMUMAN {selectedUrgent.priority.toUpperCase()}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {selectedUrgent.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUrgent(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {selectedUrgent.content}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span>
                  Kantor Guru dan Tenaga Kependidikan Provinsi Gorontalo
                </span>
                <button
                  onClick={() => setSelectedUrgent(null)}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Tutup Pengumuman
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
