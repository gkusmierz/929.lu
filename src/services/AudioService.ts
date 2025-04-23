/**
 * AudioService.ts
 * Universal audio service for playing MP3 & AAC streams on Web, Android & iOS
 */
import { Capacitor } from '@capacitor/core';

// Stream URLs
export const STREAM_URLS = {
  AAC: 'https://radio.929.lu/mobile-aacp',
  MP3: 'https://radio.929.lu/mobile-mp3'
};

// Define the interface for the AudioService
export interface AudioService {
  play(): void;
  pause(): void;
  stop(): void;
  isPlaying(): boolean;
  setStreamType(type: 'AAC' | 'MP3'): void;
  getStreamType(): 'AAC' | 'MP3';
  getCurrentStreamURL(): string;
  onPlay(callback: () => void): void;
  onPause(callback: () => void): void;
  onError(callback: (error: Error) => void): void;
  offPlay(callback: () => void): void;
  offPause(callback: () => void): void;
  offError(callback: (error: Error) => void): void;
  togglePlayback(): Promise<boolean>;
}

// Log platform info
const platform = Capacitor.getPlatform();
console.log(`Current platform detected: ${platform}`);

/**
 * Universal Audio Service Implementation using HTMLAudioElement
 * Works on Web, iOS, and Android
 */
class AudioServiceImpl implements AudioService {
  private audioElement: HTMLAudioElement | null = null;
  private isInitialized = false;
  private currentStreamType: 'AAC' | 'MP3' = 'AAC';
  private isPlayingState = false;
  
  private onPlayCallbacks: (() => void)[] = [];
  private onPauseCallbacks: (() => void)[] = [];
  private onErrorCallbacks: ((error: Error) => void)[] = [];
  
  constructor() {
    // Initialize only on client-side
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init(): void {
    if (this.isInitialized) return;
    
    try {
      this.audioElement = new Audio();
      
      // Add event listeners
      this.audioElement.addEventListener('play', () => {
        this.isPlayingState = true;
        this.onPlayCallbacks.forEach(callback => callback());
      });
      
      this.audioElement.addEventListener('pause', () => {
        this.isPlayingState = false;
        this.onPauseCallbacks.forEach(callback => callback());
      });
      
      this.audioElement.addEventListener('error', (event: Event) => {
        const error = new Error(`Audio playback error: ${event}`);
        this.onErrorCallbacks.forEach(callback => callback(error));
      });
      
      this.isInitialized = true;
      console.log('Audio service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AudioService', error);
    }
  }
  
  public play(): void {
    if (!this.audioElement) {
      this.init();
    }
    
    if (this.audioElement) {
      console.log('Starting stream...');
      console.log(`Creating new stream with format: ${this.currentStreamType.toLowerCase()}, URL: ${this.getCurrentStreamURL()}`);
      
      // Set the stream URL based on current type
      this.audioElement.src = this.getCurrentStreamURL();
      
      // Play the audio
      this.audioElement.play().then(() => {
        console.log('Stream loaded successfully');
        console.log('Stream started playing');
        console.log('Stream started successfully');
        this.isPlayingState = true;
      }).catch((error: Error) => {
        console.error('Error playing audio:', error);
        this.onErrorCallbacks.forEach(callback => callback(error));
      });
    }
  }
  
  public pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlayingState = false;
      console.log('Stream paused');
    }
  }
  
  public stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement.load(); // Reset audio to beginning
      this.isPlayingState = false;
      console.log('Stream stopped');
    }
  }
  
  public isPlaying(): boolean {
    return this.isPlayingState;
  }
  
  public setStreamType(type: 'AAC' | 'MP3'): void {
    const wasPlaying = this.isPlaying();
    this.currentStreamType = type;
    
    if (wasPlaying) {
      this.stop();
      this.play();
    }
  }
  
  public getStreamType(): 'AAC' | 'MP3' {
    return this.currentStreamType;
  }
  
  public getCurrentStreamURL(): string {
    return STREAM_URLS[this.currentStreamType];
  }
  
  public onPlay(callback: () => void): void {
    this.onPlayCallbacks.push(callback);
  }
  
  public onPause(callback: () => void): void {
    this.onPauseCallbacks.push(callback);
  }
  
  public onError(callback: (error: Error) => void): void {
    this.onErrorCallbacks.push(callback);
  }
  
  public offPlay(callback: () => void): void {
    this.onPlayCallbacks = this.onPlayCallbacks.filter(cb => cb !== callback);
  }
  
  public offPause(callback: () => void): void {
    this.onPauseCallbacks = this.onPauseCallbacks.filter(cb => cb !== callback);
  }
  
  public offError(callback: (error: Error) => void): void {
    this.onErrorCallbacks = this.onErrorCallbacks.filter(cb => cb !== callback);
  }
  
  public async togglePlayback(): Promise<boolean> {
    const currentlyPlaying = this.isPlaying();
    
    if (currentlyPlaying) {
      this.pause();
    } else {
      this.play();
    }
    
    return !currentlyPlaying;
  }
}

// Create singleton instance
const audioService = new AudioServiceImpl();

export default audioService;