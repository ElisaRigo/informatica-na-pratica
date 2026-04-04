import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import logoImage from "@/assets/logo-blue.png";

const AudioWhatsApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Generate waveform bars (static visual)
  const bars = Array.from({ length: 40 }, (_, i) => {
    const h = 8 + Math.sin(i * 0.7) * 12 + Math.random() * 8;
    return Math.max(4, Math.min(28, h));
  });

  return (
    <div className="min-h-screen bg-[#0b141a] flex items-center justify-center p-4">
      <audio
        ref={audioRef}
        src="/audio/automacao-whatsapp.ogg"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* WhatsApp-style bubble */}
      <div className="flex items-end gap-2 max-w-[360px] w-full">
        {/* Profile avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-300">
          <img src={logoImage} alt="Informática na Prática" className="w-full h-full object-contain p-0.5" />
        </div>

        {/* Audio bubble */}
        <div className="bg-[#025d4b] rounded-2xl rounded-bl-md px-3 py-2 flex-1 shadow-lg relative">
          {/* Tail */}
          <div className="absolute -left-1.5 bottom-0 w-3 h-3 bg-[#025d4b]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />

          <div className="flex items-center gap-2.5">
            {/* Play button */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white fill-white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              )}
            </button>

            {/* Waveform + time */}
            <div className="flex-1 min-w-0">
              <div
                className="flex items-center gap-[1.5px] h-8 cursor-pointer"
                onClick={handleSeek}
              >
                {bars.map((h, i) => {
                  const barProgress = (i / bars.length) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-full transition-colors duration-75"
                      style={{
                        height: `${h}px`,
                        backgroundColor: barProgress <= progress ? "#7dd3fc" : "rgba(255,255,255,0.35)",
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[10px] text-white/60">
                  {isPlaying || currentTime > 0 ? formatTime(currentTime) : formatTime(duration || 0)}
                </span>
                <span className="text-[10px] text-white/60">
                  {formatTime(duration || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct audio link (hidden, for automation) */}
      <div className="fixed bottom-4 left-0 right-0 text-center">
        <p className="text-white/30 text-[10px]">
          Link direto: {window.location.origin}/audio/automacao-whatsapp.ogg
        </p>
      </div>
    </div>
  );
};

export default AudioWhatsApp;
