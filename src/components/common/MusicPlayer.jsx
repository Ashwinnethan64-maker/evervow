import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

/**
 * 2. Minimalist Floating Audio Player (Vinyl / Instrumental)
 * Plays a soothing, romantic acoustic guitar & piano melody generated with Web Audio API.
 * Floating bottom-left luxury gold vinyl disc with play/pause and gentle sound waves.
 */
export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timeoutIdsRef = useRef([]);

  const stopAudio = () => {
    timeoutIdsRef.current.forEach(id => clearTimeout(id));
    timeoutIdsRef.current = [];
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (e) {
        // ignore
      }
      audioContextRef.current = null;
    }
    isPlayingRef.current = false;
  };

  const playWeddingMelody = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      isPlayingRef.current = true;

      // Romantic Acoustic Arpeggio Notes in D Major (D4, F#4, A4, D5, C#5, B4, A4, G4, F#4, E4)
      const notes = [
        { freq: 293.66, dur: 0.6, delay: 0 },    // D4
        { freq: 369.99, dur: 0.6, delay: 0.4 },  // F#4
        { freq: 440.00, dur: 0.6, delay: 0.8 },  // A4
        { freq: 587.33, dur: 0.9, delay: 1.2 },  // D5
        { freq: 554.37, dur: 0.7, delay: 1.9 },  // C#5
        { freq: 440.00, dur: 0.6, delay: 2.5 },  // A4
        { freq: 493.88, dur: 0.8, delay: 3.0 },  // B4
        { freq: 440.00, dur: 0.7, delay: 3.7 },  // A4
        { freq: 369.99, dur: 0.6, delay: 4.3 },  // F#4
        { freq: 329.63, dur: 0.9, delay: 4.8 },  // E4
        { freq: 293.66, dur: 1.4, delay: 5.6 }   // D4 root resolve
      ];

      const loopLength = 7000; // 7 seconds loop

      const scheduleLoop = () => {
        if (!isPlayingRef.current || !ctx || ctx.state === 'closed') return;

        const now = ctx.currentTime;

        notes.forEach(note => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          // Warm piano / soft acoustic timbre
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.freq, now + note.delay);

          // Warm low-pass filter
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1400, now + note.delay);

          // Soft bell-like envelope
          gain.gain.setValueAtTime(0.001, now + note.delay);
          gain.gain.linearRampToValueAtTime(0.08, now + note.delay + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + note.delay + note.dur + 0.5);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + note.delay);
          osc.stop(now + note.delay + note.dur + 0.6);
        });

        const nextId = setTimeout(() => {
          if (isPlayingRef.current) scheduleLoop();
        }, loopLength);
        timeoutIdsRef.current.push(nextId);
      };

      scheduleLoop();
    } catch (e) {
      console.warn("Audio synthesis unavailable:", e);
    }
  };

  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      playWeddingMelody();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="floating-music-player" aria-label="Wedding Soundtrack Player">
      <button
        type="button"
        className={`music-player-disc-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause background wedding music" : "Play background romantic wedding music"}
        title={isPlaying ? "Pause music" : "Play romantic soundtrack"}
      >
        {/* Vinyl Disc Body */}
        <div className="vinyl-disc">
          <div className="vinyl-groove" />
          <div className="vinyl-center-label">
            <span className="vinyl-center-dot" />
          </div>
        </div>

        {/* Soft Animated Wave Bars */}
        <div className={`audio-waves ${isPlaying ? 'waves-active' : ''}`} aria-hidden="true">
          <span className="wave-bar bar-1" />
          <span className="wave-bar bar-2" />
          <span className="wave-bar bar-3" />
        </div>
      </button>

      {/* Helper Tooltip on First Load */}
      {!hasInteracted && (
        <div className="music-player-tooltip" onClick={togglePlay}>
          <span>Play Soundtrack ♪</span>
        </div>
      )}
    </div>
  );
};
