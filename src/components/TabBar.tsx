import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { home, call, listOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import PlayerHome from '../pages/PlayerHome';
import Contact from '../pages/Contact';
import Playlist from '../pages/Playlist';
import './TabBar.css';

const TabBar: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <PlayerHome />
        </Route>
        <Route exact path="/tabs/contact">
          <Contact />
        </Route>
        <Route exact path="/tabs/playlist">
          <Playlist />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>
      
      <IonTabBar slot="bottom" className="main-tabs">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="contact" href="/tabs/contact">
          <IonIcon icon={call} />
          <IonLabel>Kontakt</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="playlist" href="/tabs/playlist">
          <IonIcon icon={listOutline} />
          <IonLabel>Playlista</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabBar;