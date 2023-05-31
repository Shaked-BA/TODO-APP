import axios from 'axios';

const api = axios.create({baseURL: process.env.REACT_APP_SERVERURL});

const userEmail = "shaked@test.com";
export const getTodosByEmail = async () => {
  try {
    const response = await api.get(`todos/${userEmail}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const postTaskData = async (taskData) => {
    try {
      const response = await api.post("todos/create", taskData);
      return response.status === 200;
    } catch(err) {
      console.error(err);
    }
}

export const editTaskData = async (taskData) => {
    try {
        const response = await api.put("todos/edit", taskData);
        return response.status === 200;
    } catch(err) {
        console.error(err);
    }
}

export const deleteTask = async (task) => {
  const { id } = task;
  try {
      const response = await api.delete(`todos/delete/${id}`, task);
      return response.status === 200;
  } catch(err) {
      console.error(err);
  }
}