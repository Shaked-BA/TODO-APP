import { useEffect, useState } from 'react';

import { getTodosByEmail } from './services/todos'

import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Modal from './components/Modal';

function App() {
  const [modalProps, setModalProps] = useState({mode: '', data: {}});
  const [todos, setTodos] = useState(null);

  const authToken = false;

  const userEmail = "shaked@test.com";
  
  const setUsersTodos = () => {
    getTodosByEmail().then((usersTodos) => setTodos(usersTodos));
  }

  useEffect(setUsersTodos, []);

  const sortedTodosJSX = todos?.sort(
    (firstTask, secondTask) => new Date(firstTask.date) - new Date(secondTask.date)).map(
      (task) => <ListItem key={task.id} task={task} updateTodos={setUsersTodos} handleClick={setModalProps}/>);
  
  return (
    <div className="app">
      <ListHeader listName={"My TODOs"} handleClick={setModalProps}/>
      {sortedTodosJSX}
      {modalProps.mode !== '' && <Modal props={modalProps} userEmail={userEmail} updateTodos={setUsersTodos} handleClick={setModalProps}/>}
    </div>
  );
}
export default App;
