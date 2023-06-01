import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()

const hotelApi = axios.create({
    baseURL: VITE_API_URL
})



hotelApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token') || "tokenTest"
    }
    return config
})


export default hotelApi;