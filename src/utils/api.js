import axios from 'axios';

// axios 인스턴스
const api = axios.create({
    baseURL: '/api',
});

// 요청 인터셉터 설정 (모든 요청에 자동으로 토큰 추가)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 토큰 가져오기

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const setupAxiosInterceptors = (startLoading, stopLoading) => {
    api.interceptors.request.use(
        (config) => {
            startLoading();
            return config;
        },
        (error) => {
            stopLoading();
            return Promise.reject(error);
        },
    );

    api.interceptors.response.use(
        (response) => {
            stopLoading();
            return response;
        },
        (error) => {
            stopLoading();
            return Promise.reject(error);
        },
    );
};

export default api;
