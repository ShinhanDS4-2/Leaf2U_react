import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mainImg from '../../image/새싹-하양.png';
import { Icon } from '@iconify/react';
import { Button as MuiButton } from '@mui/material';

const OAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        console.log(code);

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

        const param = {
            code: code,
        };

        api.post('http://localhost:8090/auth/kakao/token', param)
            .then((response) => {
                localStorage.setItem('jwtToken', response.data.token);
                navigate('/start');
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                    onClick={() => {}}
                >
                    <Icon icon="ri:kakao-talk-fill" className="kakao-logo" />
                    카카오로 시작하기
                </MuiButton>
            </div>
        </div>
    );
};

export default OAuthRedirect;
