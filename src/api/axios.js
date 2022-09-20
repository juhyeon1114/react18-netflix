import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '262ce047ce6313898626e9c5a218bda5',
        language: 'ko-KR'
    }
})