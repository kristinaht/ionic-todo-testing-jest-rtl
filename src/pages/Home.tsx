import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { trash, add, text } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

export interface Todo {
  id: number,
  text: string
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ text, setText ] = useState('');

  useEffect(() => {
    async function doFetch() {
      const result = await fetch('assets/todos.json');
      const data = await result.json();
      setTodos(data);
    }
    doFetch();
  }, []);

  const addTodo = () => {
    const nextId = todos.reduce((id, todo) => Math.max(id, todo.id!), 0) + 1;
    const todo: Todo = {
      id: nextId,
      text
    };
    setTodos([...todos, todo]);
    setShowModal(false);
    setText('');
  };

  const deleteTodo = (todo: Todo) => {
    const newTodos = todos.filter(t => t.id !== todo.id);
    setTodos(newTodos);
  }

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
            <IonList>
              {todos.map((todo, i) => (
                <IonItem key={i}>
                  <IonLabel>
                    <h2>{todo.text}</h2>
                  </IonLabel>
                  <IonIcon data-testid='trash'
                    onClick={() => deleteTodo(todo)}
                    data-icon='trash' icon={trash} color='danger' slot='end'/>
                </IonItem>
              ))}
            </IonList>
          )}
          <IonFab vertical='bottom' horizontal='end'>
            <IonFabButton title='Add Todo' onClick={() => setShowModal(true)}>
              <IonIcon data-icon='add' icon={add} />
            </IonFabButton>
          <IonModal 
            onDidDismiss={ () => setShowModal(false)}
            isOpen={showModal}>
              <IonToolbar>
                <IonTitle>Add Todo</IonTitle>
              </IonToolbar>
              <IonContent>
                <IonList>
                  <IonItem>
                    <IonLabel position='stacked'></IonLabel>
                    <IonInput id='todo' title='Todo Text' value={text} onIonChange={ e => setText(e.detail.value!)} />
                  </IonItem>
                </IonList>
                <IonButton expand='block' onClick={addTodo}>Save</IonButton>
              </IonContent>
          </IonModal>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
