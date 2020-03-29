import axios from 'axios';

const api = axios.create({
    baseUrl:'http://IP:3333'
})

export default api;