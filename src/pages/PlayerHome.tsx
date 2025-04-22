import { IonContent, IonPage, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { play, pauseCircle, thumbsUpOutline, thumbsDownOutline } from 'ionicons/icons';
import { useState } from 'react';
import './PlayerHome.css';

const PlayerHome: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong] = useState({
    title: "Girl, you'll be a woman soon",
    artist: "Urge Overkill",
    album: "Pulp Fiction (Music From The Motion Picture) (1994)",
    cover: "https://picsum.photos/id/237/300/300"
  });
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Here we would actually trigger audio playback, but it's just a mock
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
              onClick={togglePlayback}
            >
              <IonIcon icon={isPlaying ? pauseCircle : play} />
              {isPlaying ? 'Pause' : 'Start'}
            </IonButton>
          </div>
          
          <div className="audio-format">
            <span className="format-aac active">AAC+</span>
            <span className="format-mp3">MP3</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PlayerHome;