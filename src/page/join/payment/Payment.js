import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import Button from '../../../components/button/Button';
import Keypad from '../../../components/Keypad';
import Header from '../../../components/header/Header';
import AlertModal from '../../../components/modal/AlertModal';

const Payment = () => {
    const navigate = useNavigate();
    const alertRef = useRef();
    const [amount, setAmount] = useState('');

    // 페이지가 새로고침되거나 처음 접속할 때마다 amount를 빈 문자열로 초기화
    useEffect(() => {
        setAmount(''); // sessionStorage에서 값을 가져오지 않고, 항상 빈 문자열로 초기화
        sessionStorage.removeItem('paymentAmount'); // 필요하다면 sessionStorage도 초기화
    }, []);

    const handleChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); //숫자만 허용
        setAmount(value);
    };

    const handleNextPage = async () => {
        const numAmount = Number(amount);

        if (numAmount < 100 || numAmount > 30000) {
            alertRef.current.openModal();
            return;
        }

        sessionStorage.setItem('paymentAmount', numAmount);

        try {
            const token = localStorage.getItem('jwtToken');
            console.log('전송할 토큰:', token);

            // 토큰이 없는 경우 처리
            if (!token) {
                alert('로그인이 필요합니다.');
                navigate('/');
                return;
            }

            const response = await fetch('http://localhost:8090/api/member-info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`서버 오류: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('서버 응답:', data);

            localStorage.setItem('amount', amount);
            localStorage.setItem('memberIdx', data.memberIdx); //멤버 Idx 저장

            navigate('/cardHome', { state: { cardYn: data.cardYn } });
        } catch (error) {
            console.error('API 요청 실패: ', error);
        }
    };

    // 키패드 버튼 클릭 시 숫자 추가
    const handleKeypadClick = (num) => {
        setAmount((prev) => {
            const newAmount = (prev + num).replace(/[^0-9]/g, '').slice(0, 5); // 최대 5자리까지만 입력
            return newAmount;
        });
    };

    // 숫자 포맷
    const formattedAmount = amount ? Number(amount).toLocaleString() : '';

    // 입력 지우기
    const handleDelete = () => {
        setAmount((prev) => prev.slice(0, -1));
    };

    return (
        <div>
            <Header title={'한달적금 개설'} />

            <div className="payment">
                <h3>
                    매일{' '}
                    <input
                        type="text"
                        value={formattedAmount}
                        onChange={handleChange}
                        placeholder="1,000"
                        className="payment-input"
                    />
                    원씩 납입
                </h3>
            </div>
            <div className="payment-info">
                <p>100원부터 30,000원까지 입력 가능</p>
            </div>
            <div className="p-3">
                <Button text={'개설정보 확인'} onClick={handleNextPage} />
            </div>
            <Keypad onKeyPress={handleKeypadClick} onDelete={handleDelete} />
            <AlertModal ref={alertRef} text="100원부터 30,000원까지 입력 가능합니다." />
        </div>
    );
};

export default Payment;
