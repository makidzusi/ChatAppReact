import axios, {type InternalAxiosRequestConfig} from 'axios'

const $axios = axios.create({
    baseURL: 'http://localhost:5262/api/'
})

$axios.interceptors.request.use(function (config: InternalAxiosRequestConfig<any>) {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] =  !!token ? `Bearer ${token}` : '';
    return config;
});

export default $axios