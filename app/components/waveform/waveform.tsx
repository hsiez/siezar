import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './waveform.module.css';

// Define the structure for a song in the playlist
interface Song {
  title: string;
  artist: string;
  url: string; // Path relative to the public directory
  waveform: string; // Path to the preprocessed waveform JSON
}

// Updated playlist from user context
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
    title: "Girl It's True, Yes I'll Always Love You",
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
    // NOTE: This seems to point to do_you_do.json, might be intentional or a typo?
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


interface MediaPlayerProps { // Renamed props slightly for clarity
  width?: number;
  height?: number;
  barWidth?: number;
  barPadding?: number;
  barColor?: string;
}

const PLACEHOLDER_COLOR = '#d3d3d3'; // Light grey for placeholder bars

// Function to generate simple placeholder data
const generatePlaceholderData = (numberOfBars: number): number[] => {
  const data = [];
  // Simple alternating pattern for the placeholder
  for (let i = 0; i < numberOfBars; i++) {
    data.push(Math.abs(Math.sin(i * 0.2)) * 0.5 + 0.1); // Some visual variation
  }
  return data;
};

export default function Waveform({
  width = 800,
  height = 100,
  barWidth = 1,
  barPadding = 3,
  barColor = '#2d2d2d',
}: MediaPlayerProps) { // Use updated props interface
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // AudioContext is no longer needed for waveform generation
  // const audioContextRef = useRef<AudioContext | null>(null);
  const normalizedDataRef = useRef<number[]>([]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  // Get the current song based on the index
  const currentSong = playlist[currentTrackIndex];
  const audioUrl = currentSong.url;
  const waveformUrl = currentSong.waveform; // Get waveform JSON URL

  // Updated drawWaveform to handle loading state
  const drawWaveform = useCallback((data: number[], time: number, audioDuration: number, isLoading: boolean) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const drawWidth = canvas.width;
    const drawHeight = canvas.height;
    const totalBarWidth = barWidth + barPadding;
    const numberOfBars = Math.floor(drawWidth / totalBarWidth);
    const centerY = drawHeight / 2;

    context.clearRect(0, 0, drawWidth, drawHeight);

    const displayData = isLoading ? generatePlaceholderData(numberOfBars) : data;
    const color = isLoading ? PLACEHOLDER_COLOR : barColor;

    // Draw waveform bars
    context.fillStyle = color;
    for (let i = 0; i < numberOfBars; i++) {
        // Use index modulo data length for placeholder if its length differs
        const dataIndex = isLoading
            ? i % displayData.length
            : Math.min(i, displayData.length - 1);

        let barHeight = (displayData[dataIndex] || 0) * drawHeight * 0.9; // Use || 0 as fallback
        if (barHeight < 1 && barHeight > 0) barHeight = 1;
        barHeight = Math.min(barHeight, drawHeight);

        const x = i * totalBarWidth;
        const y = centerY - barHeight / 2;
        context.fillRect(x, y, barWidth, barHeight);
    }

    // Draw progress marker only if not loading and duration is available
    if (!isLoading && audioDuration > 0 && data.length > 0) {
      const progressPercent = time / audioDuration;
      const markerX = progressPercent * drawWidth;
      context.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Red marker color
      context.fillRect(markerX, 0, 2, drawHeight); // Draw a 2px wide line
    }
  }, [barWidth, barPadding, barColor]); // Dependencies include barColor now

  // Remove AudioContext initialization useEffect
  // useEffect(() => { ... }, []);

  // Effect for loading waveform JSON and setting audio source
  useEffect(() => {
    const loadWaveformAndAudio = async () => {
        if (!waveformUrl || !audioUrl) {
            setError("Missing waveform or audio URL in playlist data.");
            setLoading(false);
            return;
        }

        // Reset state for the new track
        setLoading(true);
        setError(null);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        normalizedDataRef.current = [];
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            // Set audio source immediately while JSON loads
            audioRef.current.src = audioUrl;
            audioRef.current.load();
        }

        // --- Draw Placeholder Immediately ---
        drawWaveform([], 0, 0, true);

        try {
            // Fetch the preprocessed waveform data
            const response = await fetch(waveformUrl);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Waveform data not found at ${waveformUrl}`);
                } else {
                    throw new Error(`HTTP error fetching waveform data! status: ${response.status}`);
                }
            }
            const fetchedNormalizedData = await response.json();

            // Basic validation
            if (!Array.isArray(fetchedNormalizedData) || fetchedNormalizedData.some(isNaN)) {
                throw new Error("Invalid waveform data received.");
            }

            // Check if track changed while fetching JSON
            if (waveformUrl !== playlist[currentTrackIndex].waveform) {
                console.log("Track changed during waveform fetch, aborting render.");
                return;
            }

            normalizedDataRef.current = fetchedNormalizedData;

            // Draw the actual waveform using fetched data (duration still 0)
            drawWaveform(fetchedNormalizedData, 0, 0, false);

            setLoading(false);
        } catch (err) {
            console.error("Error loading waveform data:", err);
            setError(`Failed loading waveform: ${err instanceof Error ? err.message : String(err)}`);
            setLoading(false);
            normalizedDataRef.current = [];
            drawWaveform([], 0, 0, false); // Draw empty on error
        }
    };

    loadWaveformAndAudio();

  // Depend only on URLs derived from currentTrackIndex and the draw callback
  }, [waveformUrl, audioUrl, currentTrackIndex, drawWaveform]);

  // Effect for redrawing waveform on time update
  useEffect(() => {
    // Only draw progress if not loading and data exists
    if (!loading && normalizedDataRef.current.length > 0) {
       drawWaveform(normalizedDataRef.current, currentTime, duration, false);
    }
    // If loading, the placeholder is already drawn by the other effect
  }, [currentTime, duration, drawWaveform, loading]); // Add loading dependency

  // --- Audio Element Event Handlers --- 
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
        const audioDuration = audioRef.current.duration;
        setDuration(audioDuration);
        // Redraw waveform with correct duration aspect for the marker
        // Ensure data is loaded before redrawing
        if (normalizedDataRef.current.length > 0 && !loading) {
            drawWaveform(normalizedDataRef.current, currentTime, audioDuration, false);
        }
    }
  };

  const handleAudioEnded = () => {
    // Go to the next song automatically
    handleNext();
  };

  // --- Control Handlers --- 
  const togglePlayPause = () => {
    if (!audioRef.current || loading || error) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Attempt to play
      audioRef.current.play().catch(playError => {
        console.error("Error playing audio:", playError);
        setError(`Playback failed: ${playError.message}`);
        setIsPlaying(false); // Ensure state is correct if play fails
      });
    }
    setIsPlaying(!isPlaying);
  };

  // --- Playlist Navigation Handlers ---
  const handlePrevious = () => {
      setCurrentTrackIndex((prevIndex) => {
          // Already at the first track, do nothing (button should be disabled)
          if (prevIndex === 0) return 0;
          return prevIndex - 1;
      });
  };

  const handleNext = () => {
      setCurrentTrackIndex((prevIndex) => {
          // If at the last track, loop back to the start
          if (prevIndex === playlist.length - 1) return 0;
          return prevIndex + 1;
      });
  };

  // --- Scrubbing Handler ---
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
        setCurrentTime(newTime);
        // Redraw immediately after seeking
        if (normalizedDataRef.current.length > 0 && !loading) {
            drawWaveform(normalizedDataRef.current, newTime, duration, false);
        }
    }
  };

  // filterData and normalizeData are no longer needed

  return (
    <div className={styles.waveformContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <p style={{ fontSize: '1rem' }}>
            <b>{currentSong.title || "Unknown Title"}</b>
          </p>
          <p style={{ fontSize: '0.8rem' }}>{currentSong.artist || "Unknown Artist"}</p>
        </div>
        <div className={styles.controls}>
           {/* Playlist Navigation Buttons */} 
           <button 
                onClick={handlePrevious} 
                disabled={loading || currentTrackIndex === 0} 
                className={`${styles.navButton} ${styles.prevButton}`} 
                aria-label="Previous track"
            >
                {/* Previous Icon (SVG) - Increased size */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6H8V18H6V6ZM9.5 12L18 18V6L9.5 12Z"/>
                </svg>
            </button>
           <button 
                onClick={togglePlayPause} 
                disabled={loading || !!error} 
                className={styles.playButton}
                aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                // Pause Icon (SVG) - Increased size
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z"/>
                </svg>
              ) : (
                // Play Icon (SVG) - Increased size
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path d="M8 5V19L19 12L8 5Z"/>
                </svg>
              )}
           </button>
            <button 
                onClick={handleNext} 
                disabled={loading} 
                className={`${styles.navButton} ${styles.nextButton}`}
                aria-label="Next track"
            >
                 {/* Next Icon (SVG) - Increased size */}
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6H18V18H16V6ZM6 18L14.5 12L6 6V18Z"/>
                 </svg>
            </button>
          <span className={styles.timeDisplay}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      {loading && <div className={styles.loading}>Loading waveform...</div>}
      {/* Display more specific error */} 
      {error && <div className={styles.error}>{error}</div>}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.waveformCanvas}
        style={{ cursor: duration > 0 && !loading ? 'pointer' : 'default' }}
        onClick={handleCanvasClick}
      />
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded} // Go to next song when current one finishes
        // src is now set dynamically in useEffect
        style={{ display: 'none' }}
        onError={(e) => {
            console.error("Audio Element Error:", e);
            // Extract a more specific error if possible
            const errorEvent = e.nativeEvent as ErrorEvent;
            const mediaError = (e.target as HTMLAudioElement).error;
            let message = "Audio playback error";
            if (mediaError) {
                switch(mediaError.code) {
                    case mediaError.MEDIA_ERR_ABORTED: message = 'Playback aborted.'; break;
                    case mediaError.MEDIA_ERR_NETWORK: message = 'Network error caused playback failure.'; break;
                    case mediaError.MEDIA_ERR_DECODE: message = 'Audio decoding error.'; break;
                    case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: message = 'Audio format not supported.'; break;
                    default: message = `Unknown playback error (code ${mediaError.code}).`;
                }
            } else if (errorEvent && errorEvent.message) {
                message = errorEvent.message;
            }
            setError(message);
            setIsPlaying(false); // Ensure play state is correct
        }}
      />
    </div>
  );
}

// Helper to format time (e.g., 0:00)
const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
