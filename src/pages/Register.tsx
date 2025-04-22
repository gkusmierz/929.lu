import { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/react';
import './Register.css';

const Register: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    // Store user registration info
    localStorage.setItem('929.lu_user', JSON.stringify({
      name,
      district,
      city,
      registered: true
    }));
    
    onRegister();
  };

  return (
    <IonPage>
      <IonContent className="register-content">
        <div className="register-container">
          <h1>Welcome to 929.lu</h1>
          <p>Please provide the following information:</p>
          
          <IonItem className="register-input">
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput 
              value={name} 
              onIonChange={e => setName(e.detail.value!)} 
              placeholder="Enter your name"
            ></IonInput>
          </IonItem>
          
          <IonItem className="register-input">
            <IonLabel position="stacked">District (Lublin only)</IonLabel>
            <IonInput 
              value={district} 
              onIonChange={e => setDistrict(e.detail.value!)} 
              placeholder="Enter your district"
            ></IonInput>
          </IonItem>
          
          <IonItem className="register-input">
            <IonLabel position="stacked">City (Outside Lublin)</IonLabel>
            <IonInput 
              value={city} 
              onIonChange={e => setCity(e.detail.value!)} 
              placeholder="Enter your city"
            ></IonInput>
          </IonItem>
          
          <IonButton 
            className="register-button" 
            expand="block" 
            onClick={handleSubmit}
          >
            Submit
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;