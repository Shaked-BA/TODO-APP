import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import { deleteTask } from '../services/todos';

function ListItem({ task, updateTodos, handleClick }) {

  const deleteCurrentTask = async () => {
    deleteTask(task).then( () => {
      updateTodos();
  })}

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>
      <div className='button-container'>
        <button className="edit" onClick={() => handleClick({mode: 'edit', data: task})}>Edit</button>
        <button className="delete" onClick={deleteCurrentTask}>Delete</button>
      </div>
    </li>
  );
}
  
export default ListItem;