import Axios from 'axios';

const axiosClient = Axios.create({
    baseURL: 'https://api-pets.fly.dev/api/'
});

export default axiosClient;