import React, { useState, useRef } from 'react';
import './VoiceNoteRecorder.css';

/**
 * 7. Audio Voice Blessing in Guestbook
 * Allows guests to record a 15-30s spoken blessing using MediaRecorder API.
 */
export const VoiceNoteRecorder = ({ onRecordingComplete, onDiscard }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [recordTime, setRecordTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedUrl(url);
        if (onRecordingComplete) onRecordingComplete(audioBlob, url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordTime(0);

      timerRef.current = setInterval(() => {
        setRecordTime((prev) => {
          if (prev >= 30) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      alert("Microphone access is needed to record a voice blessing.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const discardRecording = () => {
    setRecordedUrl(null);
    setRecordTime(0);
    if (onDiscard) onDiscard();
  };

  return (
    <div className="voice-recorder-block">
      {!recordedUrl ? (
        <div className="recorder-controls-row">
          <button
            type="button"
            className={`mic-record-btn ${isRecording ? 'is-recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            aria-label={isRecording ? "Stop voice recording" : "Record voice blessing"}
          >
            <span className="mic-icon">{isRecording ? '⏹' : '🎙️'}</span>
            <span>{isRecording ? `Recording... (${30 - recordTime}s)` : 'Or Record a Voice Blessing'}</span>
          </button>
        </div>
      ) : (
        <div className="recording-preview-card">
          <span className="voice-note-label">🎙️ Your Voice Blessing Ready</span>
          <audio controls src={recordedUrl} className="voice-audio-element" />
          <button
            type="button"
            className="discard-voice-btn"
            onClick={discardRecording}
          >
            Remove / Re-record
          </button>
        </div>
      )}
    </div>
  );
};
