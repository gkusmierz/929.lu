import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonToggle,
    IonLabel,
    IonItem,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import  audioService from '../services/AudioService';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [useAAC, setUseAAC] = useState<boolean>(true);
    
    useEffect(() => {
        const subscription = audioService.isPlaying$.subscribe((isPlaying) => {
          setIsPlaying(isPlaying);
        });
    
        return () => subscription.unsubscribe();
      }, []);

    const togglePlayback = () => {
        const streamUrl = useAAC ? 'https://radio.929.lu/mobile-aacp' : 'https://radio.929.lu/mobile-mp3';
        audioService.togglePlayPause(streamUrl);
    };

    const toggleStream = (event: CustomEvent) => {
        setUseAAC(event.detail.checked);
        audioService.changeStream(event.detail.checked);
    };
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
            <ExploreContainer name="Home page" />
        <IonButton expand="block" onClick={togglePlayback}>
            {isPlaying ? 'Stop' : 'Play'}
        </IonButton>
        <IonItem>
            <IonLabel>AAC</IonLabel>
            <IonToggle
                checked={useAAC}
                onIonChange={toggleStream}
            />
            <IonLabel>MP3</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
