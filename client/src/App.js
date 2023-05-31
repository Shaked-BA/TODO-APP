import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { getTodosByEmail } from './services/todos'

import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import Auth from './components/Auth';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [todos, setTodos] = useState(null);
  const [modalProps, setModalProps] = useState({mode: '', data: {}});
  const token = cookie.Token;
  const email = cookie.Email;
  
  const setUsersTodos = () => {
    getTodosByEmail(email).then((usersTodos) => setTodos(usersTodos));
  }

  useEffect(() => {
    if (token) {
      setUsersTodos();
    }}, []);

  const sortedTodosJSX = todos?.sort(
    (firstTask, secondTask) => new Date(firstTask.date) - new Date(secondTask.date)).map(
      (task) => <ListItem key={task.id} task={task} updateTodos={setUsersTodos} handleClick={setModalProps}/>);
  
  return (
    <div className="app">
      {!token && <Auth updateCookie={setCookie} />}
      {token && <>
        <ListHeader listName={"My TODOs"} handleClick={setModalProps} removeFromCookie={removeCookie} />
        <p className="user-email">Welcome back {email}</p>
        {sortedTodosJSX}
        {modalProps.mode !== '' && <Modal modalProps={modalProps} cookieEmail={email} updateTodos={setUsersTodos} handleClick={setModalProps} />}
      </>}
    </div>
  );
}
export default App;
