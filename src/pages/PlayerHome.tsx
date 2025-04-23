import { IonContent, IonPage, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonToggle } from '@ionic/react';
import { play, pause, thumbsUpOutline, thumbsDownOutline } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../services/AudioContext';
import './PlayerHome.css';

const PlayerHome: React.FC = () => {
  // Use our audio context
  const { isPlaying, streamType, togglePlayback, setStreamType } = useAudio();
  const [useHighQuality, setUseHighQuality] = useState(streamType === 'MP3');
  const playPauseButtonRef = useRef<HTMLIonButtonElement>(null);
  
  // Double-click handler for stopping the stream completely
  const handleDoubleClick = () => {
    if (isPlaying) {
      // Access the audioService directly for stop operation
      import('../services/AudioService').then(module => {
        const audioService = module.default;
        audioService.stop();
        console.log('Audio completely stopped via double-click');
      });
    }
  };

  useEffect(() => {
    const button = playPauseButtonRef.current;
    if (button) {
      button.addEventListener('dblclick', handleDoubleClick);
      return () => {
        button.removeEventListener('dblclick', handleDoubleClick);
      };
    }
  }, [isPlaying]);
  
  // Current song info - this would come from an API in a real app
  const [currentSong] = useState({
    title: "Girl, you'll be a woman soon",
    artist: "Urge Overkill",
    album: "Pulp Fiction (Music From The Motion Picture) (1994)",
    cover: "https://picsum.photos/id/237/300/300"
  });
  
  // Handle stream type changes when the switch changes
  useEffect(() => {
    setStreamType(useHighQuality ? 'MP3' : 'AAC');
  }, [useHighQuality, setStreamType]);
  
  // Handle playback toggle
  const handlePlayback = async () => {
    await togglePlayback();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Radio Player</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="player-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Radio Player</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="player-container">
          <div className="album-cover">
            <img src={currentSong.cover} alt={`${currentSong.album} cover`} />
          </div>
          
          <div className="song-info">
            <h1 className="song-title">{currentSong.title}</h1>
            <p className="song-artist">{currentSong.artist}</p>
            <p className="song-album">{currentSong.album}</p>
          </div>
          
          <div className="player-controls">
            <div className="like-controls">
              <IonButton fill="clear" className="like-button">
                <IonIcon icon={thumbsUpOutline} />
              </IonButton>
              <IonButton fill="clear" className="dislike-button">
                <IonIcon icon={thumbsDownOutline} />
              </IonButton>
            </div>
            
            <IonButton
              className="play-button"
              fill="clear"
              onClick={handlePlayback}
              ref={playPauseButtonRef}
            >
              <IonIcon icon={isPlaying ? pause : play} />
              {isPlaying ? 'Pause' : 'Start'}
            </IonButton>
          </div>
          
          <div className="audio-format">
            <div className="format-switch">
              <span className={`format-aac ${!useHighQuality ? 'active' : ''}`}>AAC+</span>
              <IonToggle
                checked={useHighQuality}
                onIonChange={(e) => setUseHighQuality(e.detail.checked)}
              />
              <span className={`format-mp3 ${useHighQuality ? 'active' : ''}`}>MP3</span>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PlayerHome;