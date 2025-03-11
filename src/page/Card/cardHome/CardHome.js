import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Header from '../../../components/header/Header';
import BottomModal from '../../../components/modal/BottomModal';
import mainImg from '../../../image/leaf2u-card.png';
import './CardHome.css';
import DoubleButton from '../../../components/button/DoubleButton';

const CardHome = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const modalRef = useRef();
    const modalRef2 = useRef();

    const cardYn = location.state?.cardYn || 'Y';

    const [amount,setAmount]=useState(()=>{

        return localStorage.getItem("amount");
    })

    useEffect(() => {
        if (cardYn === 'N') {
            modalRef.current.openModal();
        }
        else if(cardYn=='Y'){
            modalRef2.current.openModal();
        }
    }, [cardYn]);

    return (
        <div className="card-container">
            <Header title={'한달적금 개설'} />

            <div className="payment">
                <h3>
                    매일
                    <input type="text" className="payment-input" value={amount} readOnly />
                    원씩 납입
                </h3>
                <p className="card-info">
                    <span>30일 후 {(amount * 30).toLocaleString()}원 저축</span>
                </p>
            </div>

            {/* 카드 연결 */}
            <div className="card-section">
                <label className="card-label">카드 연결</label>
                <select className="card-select">
                    <option>선택</option>
                </select>
                <input type="text" className="card-input" placeholder="카드번호 (- 없이 숫자만)" />
            </div>

            {/* 기후 동행 카드 옵션 */}
            <div className="eco-card">
                <div className="eco-card-in">
                    <input type="checkbox" className="checkbox" />
                    <label htmlFor="donation" className="checkbox-label">
                        기후 동행 카드
                    </label>
                    <ul className="eco-benefits">
                        <li>기존 보유하신 Leaf2U 카드 등록 시 우대금리 연 +2.00%</li>
                        <li>후불 기후동행카드 등록 시 우대금리 연 +1.00%</li>
                    </ul>
                </div>
            </div>

            {/* 적금 정보 요약 */}
            <div className="summary-card">
                <div className="summary">
                    <p>
                        매일 납입 금액 <span>{amount}원</span>
                    </p>
                    <p>
                        적금기간 <span>30일</span>
                    </p>
                    <p>
                        적금방식 <span>1일 1회 입금</span>
                    </p>
                    <p>
                        최고 적용금리 <span>연 9.00%</span>
                    </p>
                    <p>
                        만기설정 <span>만기 시 자동 해지</span>
                    </p>
                </div>
            </div>
            <div className="explain-card">
                <ul className="explain">
                    <li>
                        최고 적용금리 6.00% = 기본금리 1.00% + 30일 성공 시 3.00% + 연속 보너스
                        2.00% + 최초 가입 2.00
                    </li>
                </ul>
            </div>

            <Button text="다음" />

            <BottomModal ref={modalRef} maxHeight="70%">
                <div className="agree-item-modal">
                    <div className="modal-title-box">
                        <h2 className="modal-title">안내</h2>
                    </div>
                    
                    <img src={mainImg} alt="Leaf2U 카드" className="card-image" />
                    <p className="modal-text">
                        <strong>Leaf2U 카드를 발급 받으시겠습니까?</strong>
                        <br />
                        이런 혜택이 있어요!
                    </p>
                    <p className="modal-benefits">
                        <span className="highlight-text">우대 금리 + 연 2.00%</span>
                        <br />
                        대중교통 5% 캐시백
                        <br />
                        스타벅스 5% 캐시백
                    </p>
                    <DoubleButton
                        confirmText="예"
                        cancelText="아니요"
                        cancelOnClick={() => modalRef.current.closeModal()}
                        confirmOnClick={() => {

                            navigate('/leaf');
                        }}
                    />
                </div>
            </BottomModal>

            <BottomModal ref={modalRef2} maxHeight="70%">
                <div>
                    <p>
                        <span>Leaf2U 한달적금을 개설하시겠습니까?</span>
                    </p>

                    <DoubleButton
                        confirmText="예"
                        cancelText="아니요"
                        cancelOnClick={() => modalRef.current.closeModal()}
                    />
                </div>
            </BottomModal>
        </div>
    );
};

export default CardHome;
