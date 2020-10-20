import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

export interface Todo {
  id: number,
  text: string
}

const Home: React.FC = () => {
   const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        { todos.length === 0 ? (
          <div>No todos, add some!</div>
        ) : (
            <div>Todos will go here</div>
          )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
