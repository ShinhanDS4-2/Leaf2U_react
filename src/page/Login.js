import { useState, useEffect } from 'react';
import { Button as MuiButton } from '@mui/material';
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mainImg from '../image/새싹-하양.png';

function Login() {
    const navigate = useNavigate();
    const [loginCode, setLoginCode] = useState(null);

    // 카카오 로그인 URL 가져오기
    const getKakaoLoginUrl = async () => {
        try {
            const response = await axios.get('http://localhost:8090/auth/kakao/login-url');
            window.location.href = response.data;
        } catch (error) {
            console.error("Kakao 로그인 URL 요청 실패:", error);
        }
    };

    // 로그인 후 kakao에서 리다이렉트 시 실행
    useEffect(() => {
        // 이미 로그인 상태이면 리다이렉트 방지
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/notice');
            return;
        }

        console.log("코드는 : ", loginCode);

        if (loginCode) {
            console.log("코드는 = ", loginCode);
            axios.get(`http://localhost:8090/auth/kakao/callback?code=${loginCode}`)
                .then((response) => {
                    console.log("카카오 로그인 성공:", response);

                    const jwtToken = response.data.accessToken;

                    if (jwtToken) {
                        // accessToken을 localStorage에 저장
                        localStorage.setItem('token', jwtToken);
                        navigate('/notice');
                    } else {
                        console.error("JWT 토큰이 응답에 없음");
                    }
                })
                .catch((error) => {
                    console.error("KaKao 로그인 실패:", error);
                });
        } else {
            console.log("없음...");
        }
    }, [loginCode, navigate]);  // loginCode가 변경되면 실행, navigate 추가

    // 페이지가 처음 로드될 때 URL에서 'code' 파라미터 확인 후 상태 업데이트
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            setLoginCode(code);  // code가 있으면 상태 변경
        }
    }, []);  // 최초 렌더링 시만 실행

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
                    카카오로 로그인
                </MuiButton>
            </div>
        </div>
    );
}

export default Login;
