const STORAGE_KEY = "soundEnabled";
let ctx;

const getCtx = () => {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

export const isSoundEnabled = () => localStorage.getItem(STORAGE_KEY) === "true";

export const setSoundEnabled = (on) => {
  localStorage.setItem(STORAGE_KEY, on ? "true" : "false");
};

const beep = (freq, duration, type = "sine", gainPeak = 0.05) => {
  if (!isSoundEnabled()) return;
  try {
    const audio = getCtx();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, audio.currentTime);
    gain.gain.linearRampToValueAtTime(gainPeak, audio.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
    osc.connect(gain).connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + duration);
  } catch {
    // Web Audio unavailable — sound is a nice-to-have, fail silently
  }
};

export const playClick = () => beep(660, 0.08, "sine", 0.04);
export const playToggle = () => beep(440, 0.12, "triangle", 0.05);
export const playUnlock = () => {
  beep(523.25, 0.1, "sine", 0.06);
  setTimeout(() => beep(783.99, 0.16, "sine", 0.06), 90);
};
