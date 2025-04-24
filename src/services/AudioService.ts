import { BehaviorSubject } from 'rxjs';


class AudioService {
  private static instance: AudioService;
  private audio: HTMLAudioElement;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  public isPlaying$ = this.isPlayingSubject.asObservable();
  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }
  private currentStreamUrl: string | null = null;
  private readonly aacStreamUrl = 'https://radio.929.lu/mobile-aacp';
  private readonly mp3StreamUrl = 'https://radio.929.lu/mobile-mp3';

  constructor() {
    this.audio = new Audio();
    this.audio.addEventListener('playing', () => {
      this.isPlayingSubject.next(true);
    });
    this.audio.addEventListener('pause', () => {
      this.isPlayingSubject.next(false);
    });
    this.audio.addEventListener('ended', () => {
        this.isPlayingSubject.next(false);
    });
    this.audio.addEventListener('error', () => {
        this.isPlayingSubject.next(false);
    });
  }

  public play(streamUrl: string): void {
    if (this.currentStreamUrl === streamUrl && !this.audio.paused) {
      return;
    }
    if (this.audio.src !== streamUrl) {
      this.audio.src = streamUrl;
      this.currentStreamUrl = streamUrl;
    }
    this.audio.play().catch(error => {
      console.error('Error playing audio:', error);
      this.isPlayingSubject.next(false);
    });
  }

  public pause(): void {
    this.audio.pause();
  }

  public togglePlayPause(streamUrl: string): void {
      if (this.audio.paused) {
        this.play(streamUrl);
      } else {
        this.pause();
      }
  }

  public changeStream(isAac: boolean): void {
    const newStreamUrl = isAac ? this.aacStreamUrl : this.mp3StreamUrl;
    if (this.currentStreamUrl === newStreamUrl) {
      return;
    }
    if(!this.audio.paused) {
        this.play(newStreamUrl);
    } else {
        this.currentStreamUrl = newStreamUrl;
        this.audio.src = newStreamUrl;
    }
  }

  public getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  public getCurrentStreamUrl(): string | null {
    return this.currentStreamUrl;
  }
}

export const audioService = AudioService.getInstance();