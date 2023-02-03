import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-final-task-backend.onrender.com/',
});

export default instance;
