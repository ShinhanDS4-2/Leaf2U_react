import { useEffect } from 'react';
import { Button as MuiButton } from '@mui/material';
import { Icon } from "@iconify/react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import mainImg from '../image/새싹-하양.png';

function Login() {

    const navigate = useNavigate();
    const location = useLocation(); // URL 파라미터를 가져오기 위해 추가

    const getKakaoLoginUrl = async () => {
        try {
            const response = await axios.get('http://localhost:8090/auth/kakao/login-url');
            window.location.href = response.data;
        } catch (error) {
            console.error("Kakao 로그인 URL 요청 실패:", error);
        }
    };

    useEffect(()=>{

        const searchParams=new URLSearchParams(location.search);
        const token=searchParams.get('token');

        if(token){

            localStorage.setItem('jwtToken',token);         //로컬스토리지에 토큰 저장
            console.log("카카오 로그인 성공, jwt 토큰 저장");

            navigate('/start');
        }

    },[location,navigate]);

    return (
        <div className="w-100 h-100 container bg-green d-flex justify-content-center">
            <div className='position-absolute login-icon'>
                <img src={mainImg} alt="Login Icon" />
            </div>
            <div className='position-absolute login-btn mt-auto w-100 p-3'>
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
                        alignItems: 'center'
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
