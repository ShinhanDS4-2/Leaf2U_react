import { useEffect } from 'react';
import { Button as MuiButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import mainImg from '../../../image/새싹-하양.png';

function Login() {
    const navigate = useNavigate();
    const location = useLocation(); // URL 파라미터를 가져오기 위해 추가

    const getKakaoLoginUrl = async () => {
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

        try {
            const response = await api.get('/auth/kakao/login-url');
            window.location.replace(response.data);
        } catch (error) {
            console.error('Kakao 로그인 URL 요청 실패:', error);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('jwtToken', token); //로컬스토리지에 토큰 저장
            //console.log("카카오 로그인 성공, jwt 토큰 저장");

            navigate('/start');
        }
    }, [location, navigate]);

    return (
        <div className="w-100 h-100 container bg-green d-flex justify-content-center">
            <div className="position-absolute login-icon">
                <img src={mainImg} alt="Login Icon" />
            </div>
            <div className="position-absolute login-btn mt-auto w-100 p-3">
                <MuiButton
                    variant="contained"
                    disableElevation
                    sx={{
                        backgroundColor: '#fee500',
                        color: '#3c1e1e',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        height: '50px',
                        boxShadow: 'none',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onClick={getKakaoLoginUrl}
                >
                    <Icon icon="ri:kakao-talk-fill" className="kakao-logo" />
                    카카오로 시작하기
                </MuiButton>
            </div>
        </div>
    );
}

export default Login;
