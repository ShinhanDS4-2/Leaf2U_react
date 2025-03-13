import Button from '../../../components/button/Button';
import mainImg from '../../../image/tree.png';
import { useNavigate,useLocation } from 'react-router-dom';
import './Start.css';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const Start = () => {

    const navigate = useNavigate();
    const location = useLocation(); // URL 파라미터를 가져오기 위해 추가

    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // 현재 시간 (초 단위)
            return decoded.exp > now;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        let token = localStorage.getItem('jwtToken'); // 로컬스토리지에서 토큰 가져오기

        // ✅ 자동 로그인 처리
        if (token) {
            if (isTokenValid(token)) {
                console.log("✅ 자동 로그인 성공, 홈으로 이동");
                navigate('/home'); // 🔥 토큰이 유효하면 홈으로 이동
                return;
            } else {
                console.log("⏳ 토큰 만료됨, 로그아웃 처리");
                localStorage.removeItem('jwtToken'); // 만료된 토큰 제거
            }
        }

        // ✅ 카카오 로그인 후 토큰 처리
        const searchParams = new URLSearchParams(location.search);
        token = searchParams.get('token');

        if (token) {
            localStorage.setItem('jwtToken', token); // 새 JWT 토큰 저장
            console.log("✅ 카카오 로그인 성공, 토큰 저장 완료");
            navigate('/home'); // 🔥 로그인 성공 후 홈으로 이동
        }
    }, [location, navigate]);

    return (
        <div className="h-100 start-field">
            <div className="top-container">
                <div className="TextBox">
                    <h2 className="leaf">Leaf2U</h2>
                    <h2 className="month">한달적금</h2>
                </div>
                <div className="start-container">
                    <div className="TextBox2">
                        <h2 className="text">최고금리</h2>
                        <h2 className="text2">연 9.00%</h2>
                        <h2 className="text3">기본 연 1.0%</h2>
                    </div>
                    <div className="TextBox3">
                        <h2 className="text">적금방식</h2>
                        <h2 className="text2">30일간 매일</h2>
                        <h2 className="text3">우대금리 +0.1%</h2>
                    </div>
                </div>
            </div>
            <div className="container2">
                <div className="image-section">
                    <img src={mainImg} alt="Login Icon" />
                </div>
                <div className="p-3">
                    <Button
                        text={'한달적금 시작하기'}
                        bgColor={'white'}
                        textColor={'#5DB075'}
                        onClick={() => navigate('/notice')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Start;
