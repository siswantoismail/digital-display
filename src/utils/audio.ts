/**
 * Audio Chime Utility using Web Audio API
 * Generates an elegant, crystal-clear 3-tone announcement chime
 * without requiring external sound files.
 */

let audioCtx: AudioContext | null = null;

export function playAnnouncementChime(volume = 0.6) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 3-Tone Gong/Chime: G4 (392Hz), B4 (493.88Hz), D5 (587.33Hz) -> High E5 (659.25Hz)
    const tones = [
      { freq: 523.25, time: 0.0, dur: 0.4 }, // C5
      { freq: 659.25, time: 0.18, dur: 0.4 }, // E5
      { freq: 783.99, time: 0.36, dur: 0.8 }, // G5
    ];

    tones.forEach(({ freq, time, dur }) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      // Smooth attack and natural acoustic exponential decay
      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.exponentialRampToValueAtTime(volume * 0.35, now + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });
  } catch (err) {
    console.warn('Web Audio playback failed or blocked by autoplay policy:', err);
  }
}
