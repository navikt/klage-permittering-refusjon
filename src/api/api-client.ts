import axios from 'axios';

import { redirectTilLogin } from '../App/LogInn/LoggInn';

const api = axios.create({
    baseURL: '',
    withCredentials: true,
    timeout: 30000,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
});

api.interceptors.response.use(
    (response: any) => response,
    (error: { response: { status: number; }; }) => {
        if (error.response.status === 401) {
            redirectTilLogin();
        } else if (error.response.status === 403) {
            // redirectToIngenTilgang();
        } else {
            return Promise.reject(error);
        }
    }
);

export default api;
