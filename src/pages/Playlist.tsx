import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import './Playlist.css';

// Mock data for the playlist
const recentSongs = [
  {
    id: 1,
    title: 'Moonlit floor',
    artist: 'Lisa',
    time: '14:52',
    cover: 'https://picsum.photos/id/100/100/100'
  },
  {
    id: 2,
    title: 'Feel good too',
    artist: 'Jason Mraz',
    time: '14:48',
    cover: 'https://picsum.photos/id/101/100/100'
  },
  {
    id: 3,
    title: 'Wishing I was there',
    artist: 'Natalie Imbruglia',
    time: '14:44',
    cover: 'https://picsum.photos/id/102/100/100'
  },
  {
    id: 4,
    title: 'If I ever lose my faith in you',
    artist: 'Sting',
    time: '14:40',
    cover: 'https://picsum.photos/id/103/100/100'
  },
  {
    id: 5,
    title: 'Motyle i ćmy',
    artist: 'Sarsa',
    time: '14:35',
    cover: 'https://picsum.photos/id/104/100/100'
  },
  {
    id: 6,
    title: 'Chillin\'',
    artist: 'Modjo',
    time: '14:28',
    cover: 'https://picsum.photos/id/105/100/100'
  },
  {
    id: 7,
    title: 'The boys of summer',
    artist: 'Don Henley',
    time: '14:23',
    cover: 'https://picsum.photos/id/106/100/100'
  }
];

const Playlist: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ostatnio Grane</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="playlist-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ostatnio Grane</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonList className="playlist-list">
          {recentSongs.map((song) => (
            <IonItem key={song.id} className="playlist-item">
              <IonThumbnail slot="start" className="song-thumbnail">
                <img src={song.cover} alt={`${song.title} by ${song.artist}`} />
              </IonThumbnail>
              <IonLabel>
                <div className="song-time">{song.time}</div>
                <h2 className="song-title">{song.title}</h2>
                <p className="song-artist">{song.artist}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Playlist;