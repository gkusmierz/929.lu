import { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonTextarea,
  IonInput,
  IonButton,
  IonLabel
} from '@ionic/react';
import './Contact.css';

const Contact: React.FC = () => {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');

  const handleSendMessage = () => {
    // In a real app, this would send data to a server
    console.log('Message sent:', { message, signature });
    
    // Reset form
    setMessage('');
    setSignature('');
    
    // Show success (would use a proper toast/alert in a real app)
    alert('Message sent!');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="contact-content">
        <div className="contact-container">
          <h1 className="contact-title">Contact Us</h1>
          
          <div className="form-group">
            <IonLabel className="contact-label">Message</IonLabel>
            <IonTextarea
              className="message-textarea"
              value={message}
              onIonChange={e => setMessage(e.detail.value!)}
              placeholder="Type your message here..."
              rows={8}
            ></IonTextarea>
          </div>
          
          <div className="form-group">
            <IonLabel className="contact-label">Signature</IonLabel>
            <IonInput
              className="signature-input"
              value={signature}
              onIonChange={e => setSignature(e.detail.value!)}
              placeholder="Your name"
            ></IonInput>
          </div>
          
          <IonButton 
            className="send-button" 
            expand="block"
            onClick={handleSendMessage}
            disabled={!message.trim() || !signature.trim()}
          >
            Send Message
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;