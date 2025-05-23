"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './audio-widget.module.css';

// Define the structure for a song in the playlist (moved from waveform.tsx)
interface Song {
  title: string;
  artist: string;
  url: string; // Path relative to the public directory
  waveform: string; // Path to the preprocessed waveform JSON
}

// Updated playlist (moved from waveform.tsx)
const playlist: Song[] = [
  {
    title: "Do You Do",
    artist: "FA-5",
    url: "/cdmx/sounds/do_you_do.mp3",
    waveform: "/cdmx/sounds/waveforms/do_you_do.json",
  },
  {
    title: "Mad World",
    artist: "I Gemini",
    url: "/cdmx/sounds/mad_world.mp3",
    waveform: "/cdmx/sounds/waveforms/mad_world.json",
  },
  {
    title: "Afrodisiaaa",
    artist: "HoldTight",
    url: "/cdmx/sounds/afrodisiaaa.mp3",
    waveform: "/cdmx/sounds/waveforms/afrodisiaaa.json",
  },
  {
    title: "Girl It\'s True, Yes I\'ll Always Love You",
    artist: "Barry White",
    url: "/cdmx/sounds/barry_white.mp3",
    waveform: "/cdmx/sounds/waveforms/barry_white.json",
  },
  {
    title: "Venezia",
    artist: "Hombres G",
    url: "/cdmx/sounds/venezia.mp3",
    waveform: "/cdmx/sounds/waveforms/venezia.json",
  },
  {
    title: "Amor Regresa",
    artist: "Los Askis",
    url: "/cdmx/sounds/amor_regresa.mp3",
    waveform: "/cdmx/sounds/waveforms/do_you_do.json", 
  },
  {
    title: "Cumbia de los Ferrocarriles Et Trencitos",
    artist: "Los Askis",
    url: "/cdmx/sounds/cumbia_de_los_ferrocarriles.mp3",
    waveform: "/cdmx/sounds/waveforms/cumbia_de_los_ferrocarriles.json",
  },
  {
    title: "El Diablo",
    artist: "Compay Quinto",
    url: "/cdmx/sounds/el_diablo.mp3",
    waveform: "/cdmx/sounds/waveforms/el_diablo.json",
  },
  {
    title: "Fuego En El 23",
    artist: "Sonora Ponceña",
    url: "/cdmx/sounds/fuego_en_23.mp3",
    waveform: "/cdmx/sounds/waveforms/fuego_en_23.json",
  },
];

// Helper to format time (moved from waveform.tsx)
const formatTime = (seconds: number): string => {
  if (!isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const PLACEHOLDER_COLOR = '#d3d3d3'; // Light grey for placeholder bars
const INITIAL_CANVAS_WIDTH = 360; // Renamed from CANVAS_WIDTH
const MOBILE_CANVAS_WIDTH = 280; // Width for mobile
const CANVAS_HEIGHT = 24;
const BAR_WIDTH = 1;
const BAR_PADDING = 1;
const BAR_COLOR = '#fcf7ed'; // For waveform bars
// const CANVAS_BG_COLOR = '#fcf7ed'; // Background for canvas, can be set in CSS

// Function to generate simple placeholder data (moved from waveform.tsx)
const generatePlaceholderData = (numberOfBars: number): number[] => {
  const data = [];
  for (let i = 0; i < numberOfBars; i++) {
    data.push(Math.abs(Math.sin(i * 0.2)) * 0.5 + 0.1);
  }
  return data;
};


const AudioWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // State from waveform.tsx
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const normalizedDataRef = useRef<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [canvasWidth, setCanvasWidth] = useState<number>(INITIAL_CANVAS_WIDTH);

  const currentSong = playlist[currentTrackIndex];
  const audioUrl = currentSong?.url;
  const waveformUrl = currentSong?.waveform;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    // If expanding, and not playing, and audio is loaded, perhaps we should play?
    // Or if collapsing and playing, perhaps pause? For now, just expansion.
  };

  // DrawWaveform (adapted from waveform.tsx)
  const drawWaveform = useCallback((data: number[], time: number, audioDuration: number, isLoadingWaveform: boolean) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const drawWidth = canvas.width;
    const drawHeight = canvas.height;
    const totalBarWidth = BAR_WIDTH + BAR_PADDING;
    const numberOfBars = Math.floor(drawWidth / totalBarWidth);
    const centerY = drawHeight / 2;

    context.clearRect(0, 0, drawWidth, drawHeight);
    // context.fillStyle = CANVAS_BG_COLOR; // Set background if not done by CSS
    // context.fillRect(0, 0, drawWidth, drawHeight);


    const displayData = isLoadingWaveform ? generatePlaceholderData(numberOfBars) : data;
    const color = isLoadingWaveform ? PLACEHOLDER_COLOR : BAR_COLOR;

    context.fillStyle = color;
    for (let i = 0; i < numberOfBars; i++) {
        const dataIndex = isLoadingWaveform
            ? i % displayData.length
            : Math.min(i, displayData.length - 1);

        let barHeightValue = (displayData[dataIndex] || 0) * drawHeight * 0.9;
        if (barHeightValue < 1 && barHeightValue > 0) barHeightValue = 1;
        barHeightValue = Math.min(barHeightValue, drawHeight);

        const x = i * totalBarWidth;
        const y = centerY - barHeightValue / 2;
        context.fillRect(x, y, BAR_WIDTH, barHeightValue);
    }

    if (!isLoadingWaveform && audioDuration > 0 && data.length > 0) {
      const progressPercent = time / audioDuration;
      const markerX = progressPercent * drawWidth;
      context.fillStyle = 'rgba(255, 0, 0, 0.7)';
      context.fillRect(markerX, 0, 2, drawHeight);
    }
  }, []); // BAR_WIDTH, BAR_PADDING, BAR_COLOR are constants now


  // Effect to adjust canvas width based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setCanvasWidth(MOBILE_CANVAS_WIDTH);
      } else {
        setCanvasWidth(INITIAL_CANVAS_WIDTH);
      }
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  // Effect for loading waveform JSON and setting audio source (adapted from waveform.tsx)
  useEffect(() => {
    if (!audioUrl || !waveformUrl) {
        // This might happen if playlist is empty or currentTrackIndex is out of bounds initially
        setError("No song loaded.");
        setLoading(false);
        return;
    }

    const loadWaveformAndAudio = async () => {
        setLoading(true);
        setError(null);
        // Don't reset isPlaying here, allow it to persist if user was playing
        // setIsPlaying(false); 
        setCurrentTime(0);
        setDuration(0);
        normalizedDataRef.current = [];

        if (audioRef.current) {
            // audioRef.current.pause(); // Don't pause if we want continuous play on track change
            audioRef.current.currentTime = 0;
            audioRef.current.src = audioUrl;
            audioRef.current.load(); // Important to load the new source
        }
        
        drawWaveform([], 0, 0, true); // Draw placeholder

        try {
            const response = await fetch(waveformUrl);
            if (!response.ok) throw new Error(`Waveform data not found (HTTP ${response.status})`);
            const fetchedNormalizedData = await response.json();
            if (!Array.isArray(fetchedNormalizedData) || fetchedNormalizedData.some(isNaN)) {
                throw new Error("Invalid waveform data.");
            }
            
            // Check if track changed while fetching (important for quick skips)
            if (waveformUrl !== playlist[currentTrackIndex]?.waveform) {
                return; 
            }

            normalizedDataRef.current = fetchedNormalizedData;
            drawWaveform(fetchedNormalizedData, 0, 0, false); // Draw actual waveform
            setLoading(false);

            // If it was playing, and audio is ready, try to play new track
            if (isPlaying && audioRef.current) {
                audioRef.current.play().catch(e => {
                    console.error("Error auto-playing next track:", e);
                    // setIsPlaying(false); // Update state if autoplay fails
                });
            }

        } catch (err) {
            console.error("Error loading waveform data:", err);
            setError(err instanceof Error ? err.message : String(err));
            setLoading(false);
            normalizedDataRef.current = [];
            drawWaveform([], 0, 0, false);
        }
    };

    loadWaveformAndAudio();
  }, [audioUrl, waveformUrl, currentTrackIndex, drawWaveform]); // Removed isPlaying

  // Effect for redrawing waveform on time update (adapted from waveform.tsx)
  useEffect(() => {
    // Only draw if expanded, not loading, and data is available.
    if (isExpanded && !loading && normalizedDataRef.current.length > 0) {
       drawWaveform(normalizedDataRef.current, currentTime, duration, false);
    }
  }, [isExpanded, currentTime, duration, loading, drawWaveform]);

  // Audio Element Event Handlers (from waveform.tsx)
  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
        const audioDuration = audioRef.current.duration;
        setDuration(audioDuration);
        if (normalizedDataRef.current.length > 0 && !loading) {
            drawWaveform(normalizedDataRef.current, currentTime, audioDuration, false);
        }
    }
  };
  
  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error("Audio Element Error:", e);
    const mediaError = (e.target as HTMLAudioElement).error;
    let message = "Audio playback error";
    if (mediaError) {
        switch(mediaError.code) {
            case mediaError.MEDIA_ERR_ABORTED: message = 'Playback aborted.'; break;
            case mediaError.MEDIA_ERR_NETWORK: message = 'Network error.'; break;
            case mediaError.MEDIA_ERR_DECODE: message = 'Audio decoding error.'; break;
            case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: message = 'Audio format not supported.'; break;
            default: message = `Unknown error (code ${mediaError.code}).`;
        }
    }
    setError(message);
    setIsPlaying(false);
  };

  // Control Handlers
  const togglePlayPause = () => {
    if (!audioRef.current || loading || error) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e);
        setError(`Playback failed: ${e.message}`);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
      if (loading) return; // Prevent changing track while current one is loading
      setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? playlist.length - 1 : prevIndex - 1));
      // If it was playing, new track should start playing due to useEffect dependency on isPlaying
  };

  const handleNext = () => {
      if (loading) return;
      setCurrentTrackIndex((prevIndex) => (prevIndex === playlist.length - 1 ? 0 : prevIndex + 1));
      // If it was playing, new track should start playing
  };
  
  const handleAudioEnded = () => {
    handleNext(); // Simple go to next, useEffect will handle play if isPlaying was true
  };

  // Scrubbing Handler (from waveform.tsx)
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!audioRef.current || duration <= 0 || loading || error) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickedPercent = x / canvas.width;
    const newTime = clickedPercent * duration;

    if (isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime); // Manually update for immediate visual feedback
        if (normalizedDataRef.current.length > 0 && !loading) {
            drawWaveform(normalizedDataRef.current, newTime, duration, false);
        }
    }
  };

  // Determine which icon to show for the main play/pause button
  const playPauseIconClass = isPlaying ? styles.pauseIcon : styles.playIcon;

  return (
    <div
      className={`${styles.container} ${isExpanded ? styles.containerExpanded : ''}`}
      onClick={!isExpanded ? toggleExpansion : undefined}
    >
      <div
        className={`${styles.playButton} ${isExpanded ? styles.playButtonHidden : ''}`}
      >
        {/* This is the initial play button icon for the collapsed state */}
        <span className={styles.playIcon}></span> 
      </div>

      <div
        className={`${styles.widgetContent} ${isExpanded ? styles.widgetContentVisible : ''}`}
      >
        {isExpanded && (
          <>
            <div className={styles.topContainer}>
              <div className={styles.noteTitle}>
                <span className={styles.noteTitleText}>Sounds Collected in CDMX</span>
              </div>

              <button 
              className={styles.closeButton}
              onClick={toggleExpansion}
              aria-label="Close widget">
              </button>
            </div>
            
            <div className={styles.songInfo}>
              <div className={styles.songTitle}>{currentSong?.title || "No Title"}</div>
              <div className={styles.artistName}>{currentSong?.artist || "Unknown Artist"}</div>
            </div>
            
            <div className={styles.waveformDisplay}>
              {/* Display loading/error messages related to waveform/audio loading */}
              {loading && <div className={styles.statusMessage}>Loading track...</div>}
              {error && !loading && <div className={`${styles.statusMessage} ${styles.errorMessage}`}>{error}</div>}
              
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={CANVAS_HEIGHT}
                onClick={handleCanvasClick}
                className={styles.waveformCanvas} // Add class for styling
                style={{ 
                  cursor: duration > 0 && !loading && !error ? 'pointer' : 'default',
                  display: (loading || error) ? 'none' : 'block' // Hide canvas if loading/error shown above it
                }}
              />
              <div className={styles.timeContainer}>
                <span className={styles.currentTime}>{formatTime(currentTime)}</span>
                <span className={styles.duration}>{formatTime(duration)}</span>
              </div>
            </div>

            <div className={styles.bottomContainer}>
              <div className={styles.controls}>
                <button 
                  className={`${styles.controlButton} ${styles.backIcon}`} 
                  onClick={handlePrevious}
                  disabled={loading}
                  aria-label="Previous song"
                />
                <button 
                  className={`${styles.controlButton} ${playPauseIconClass}`} 
                  onClick={togglePlayPause}
                  disabled={loading || !!error || !currentSong} // Disable if no song or error
                  aria-label={isPlaying ? "Pause" : "Play"}
                />
                <button 
                  className={`${styles.controlButton} ${styles.nextIcon}`} 
                  onClick={handleNext}
                  disabled={loading}
                  aria-label="Next song"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        style={{ display: 'none' }}
        // src is set in useEffect
      />
    </div>
  );
};

export default AudioWidget;
