import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Register from './pages/Register';
import TabBar from './components/TabBar';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Component CSS */
import './components/TabBar.css';

setupIonicReact();

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(() => {
    // Check if user is already registered
    const userData = localStorage.getItem('929.lu_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.registered) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error('Error parsing user data', error);
        localStorage.removeItem('929.lu_user');
      }
    }
  }, []);
  
  const handleRegistration = () => {
    setIsRegistered(true);
  };
  
  return (
    <IonApp>
      <IonReactRouter>
        {!isRegistered ? (
          <Register onRegister={handleRegistration} />
        ) : (
          <IonRouterOutlet>
            <Route path="/tabs" render={() => <TabBar />} />
            <Route exact path="/">
              <Redirect to="/tabs" />
            </Route>
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
