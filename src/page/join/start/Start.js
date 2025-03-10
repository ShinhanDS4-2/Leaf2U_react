import Button from '../../../components/button/Button';
import mainImg from '../../../image/새싹-하양.png';
import { useNavigate } from 'react-router-dom';
import './Start.css';

const Start = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="TextBox">
                <h2 className="leaf">Leaf2U</h2>
                <h2 className="month">한달적금</h2>
            </div>
            <div className="container">
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
            <div className="container2">
                <div className="image-section">
                    <img src={mainImg} alt="Login Icon" sizes="2" />
                </div>
                <div className="button-container w-100">
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
