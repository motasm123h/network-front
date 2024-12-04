import axios from 'axios';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

axios.defaults.withCredentials = true;

export const login = async (email, password) => {
    // await axios.get('/sanctum/csrf-cookie');  
    return axios.post('/login', { email, password });
};
export const logout = () => {
    return axios.post('/logout');
};
export const user = async () => {
    // await axios.get('/sanctum/csrf-cookie');
    return axios.get('/user');
};