import { useState } from 'react';

import { postTaskData, editTaskData} from '../services/todos';


function Modal({ props, userEmail, updateTodos, handleClick}) {
  const {mode, data} = props;

  const [taskData, setTaskData] = useState({
    id: mode === 'edit' ? data.id : '',
    user_email: userEmail,
    title: mode === 'edit' ? data.title : 'New Task',
    progress: mode === 'edit' ? data.progress : '0',
    date: mode === 'edit' ? data.date : new Date()
  });

  const saveTaskData = async (action) => {
    action(taskData).then( () => {
      updateTodos();
      exitModal();
  })}

  const handleChange = ({target}) => {
    setTaskData(prevTaskData => ({...prevTaskData, [target.name]: target.value}));
  }

  const exitModal = () => handleClick({mode: '', data: {}})

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {props.mode} your task</h3>
          <button onClick={exitModal}>X</button>
        </div>
        <form>
          <input required maxLength={30} placeholder=" Your task goes here" name="title" value={taskData.title} onChange={handleChange}/>
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input required type="range" min="0" max="100" name="progress" value={taskData.progress} onChange={handleChange}/>
          <input className={props.mode} type="submit" onClick={() => mode === 'edit' ? saveTaskData(editTaskData) : saveTaskData(postTaskData)}/>
        </form>
      </div>
    </div>
  );
}
  
export default Modal; 