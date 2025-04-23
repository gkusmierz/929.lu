/**
 * AudioContext.tsx
 * React Context for managing global audio state across application tabs
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import audioService from './AudioService';

// Define the type for the context value
interface AudioContextValue {
  isPlaying: boolean;
  streamType: 'AAC' | 'MP3';
  togglePlayback: () => Promise<boolean>;
  setStreamType: (type: 'aac' | 'mp3' | 'AAC' | 'MP3') => Promise<void>;
}

// Create the context with a default value
const AudioContext = createContext<AudioContextValue>({
  isPlaying: false,
  streamType: 'AAC',
  togglePlayback: async () => false,
  setStreamType: async () => {},
});

// Custom hook to use the audio context
export const useAudio = () => useContext(AudioContext);

interface AudioProviderProps {
  children: ReactNode;
}

// Provider component to wrap the app
export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [streamTypeState, setStreamTypeState] = useState<'AAC' | 'MP3'>('AAC');

  // Synchronize state with audio service on mount
  useEffect(() => {
    setIsPlayingState(audioService.isPlaying());
    setStreamTypeState(audioService.getStreamType());

    // Set up event listeners
    const handlePlay = () => setIsPlayingState(true);
    const handlePause = () => setIsPlayingState(false);
    const handleError = (error: Error) => console.error('Audio error:', error);

    audioService.onPlay(handlePlay);
    audioService.onPause(handlePause);
    audioService.onError(handleError);

    // Clean up event listeners on unmount
    return () => {
      audioService.offPlay(handlePlay);
      audioService.offPause(handlePause);
      audioService.offError(handleError);
    };
  }, []);

  // Toggle playback function
  const togglePlayback = async (): Promise<boolean> => {
    try {
      if (isPlayingState) {
        audioService.pause();
      } else {
        audioService.play();
      }
      return !isPlayingState;
    } catch (error) {
      console.error('Error toggling playback:', error);
      return isPlayingState;
    }
  };

  // Set stream type function that normalizes the input
  const setStreamType = async (type: 'aac' | 'mp3' | 'AAC' | 'MP3'): Promise<void> => {
    // Normalize type to uppercase
    const normalizedType = type.toUpperCase() as 'AAC' | 'MP3';
    
    try {
      audioService.setStreamType(normalizedType);
      setStreamTypeState(normalizedType);
    } catch (error) {
      console.error('Error setting stream type:', error);
    }
  };

  // Add a getter for streamType to make it compatible with existing code
  Object.defineProperty(audioService, 'streamType', {
    get: function() {
      return this.getStreamType();
    }
  });

  // Add togglePlayback method to the AudioService
  audioService.togglePlayback = togglePlayback;

  const contextValue: AudioContextValue = {
    isPlaying: isPlayingState,
    streamType: streamTypeState,
    togglePlayback,
    setStreamType,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;