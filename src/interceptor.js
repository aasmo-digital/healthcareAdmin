import axios from 'axios';
import {useHistory,useNavigate} from 'react-router-dom';
import {API_BASE_URL} from './API/authAPI' 
const axiosInstance = axios.create({
    baseURL:API_BASE_URL,
    
});
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
    return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.response.status==401){
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;