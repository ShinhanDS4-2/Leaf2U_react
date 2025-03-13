import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Header from '../../../components/header/Header';
import BottomModal from '../../../components/modal/BottomModal';
import mainImg from '../../../image/leaf2u-card.png';
import './CardHome.css';
import DoubleButton from '../../../components/button/DoubleButton';
import ShinhanImg from '../../../image/shinhan.png';
import KookminImg from '../../../image/kookmin.png';
import NonghyubImg from '../../../image/nonghyub.png';
import HanaImg from '../../../image/hana.png';
import WooriImg from '../../../image/woori.png';
import KakaoImg from '../../../image/kakao.png';
import PwdModal6 from '../../../components/modal/PwdModal6';
import axios from 'axios';
import AlertModal from '../../../components/modal/AlertModal';

const CardHome = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const leafRef = useRef();
    const modalRef = useRef();
    const modalRef2 = useRef();
    const pwdModalRef1 = useRef(null);
    const pwdModalRef2 = useRef(null);
    const successModalRef = useRef();
    const alertRef = useRef();

    const cardYn = location.state?.cardYn || 'Y';

    const amount=localStorage.getItem('amount');
    const bankName=localStorage.getItem('bankName');

    const [maturityDate, setMaturityDate] = useState('');
    const [selectedBank,setSelectedBank]=useState('');
    const [accountNumber,setAccountNumber]=useState('');

    const banks=[
        { name: '신한', logo: ShinhanImg, className: "shinhan-logo" },
        { name: '국민', logo: KookminImg, className: "kookmin-logo" },
        { name: '농협', logo: NonghyubImg, className: "nonghyub-logo" },
        { name: '하나', logo: HanaImg, className: "hana-logo" },
        { name: '우리', logo: WooriImg, className: "woori-logo" },
        { name: '카카오', logo: KakaoImg, className: "kakao-logo" },
    ];

    // 숫자 포맷
    const formattedAmount = amount ? Number(amount).toLocaleString() : '';

    useEffect(() => {

        const fetchCardInfo=async()=>{

            if (cardYn === 'N') {
                leafRef.current.openModal();
            } else if (cardYn == 'Y') {
                
                modalRef2.current.openModal();
                getCardInfo();
            }
        }
        
        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        const formattedDate = today.toISOString().split('T')[0];
        setMaturityDate(formattedDate);

        fetchCardInfo();
    }, [cardYn]);

    const getCardInfo=async()=>{

        console.log("멤버 idx : ",localStorage.getItem('memberIdx'));

        try {
            const response = await axios.post(
                'http://localhost:8090/api/card/card-info',
                {
                    memberIdx: localStorage.getItem('memberIdx'),
                    
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            console.log('카드 발급 성공:', response.data);

            setSelectedBank(response.data.cardName);
            setAccountNumber(response.data.accountNumber);

        } catch (error) {
            console.error('카드 발급 실패:', error);
        }
    }

    const [firstPwd, setFirstPwd] = useState('');

    const handleConfirmClick = () => {
        modalRef.current.closeModal();
        pwdModalRef1.current.openModal();
    };

    const handleFirstPwdSubmit = (pwd) => {
        setFirstPwd(pwd);
        pwdModalRef1.current.closeModal();
        pwdModalRef2.current.openModal();
    };

    const handleSecondPwdSubmit = async (pwd) => {
        
        if (pwd == firstPwd) {
            pwdModalRef2.current.closeModal();
            successModalRef.current.openModal();

            console.log('멤버 idx 살아있니?', localStorage.getItem('memberIdx'));

            const token = localStorage.getItem('jwtToken');
            console.log('전송할 토큰:', token);

            // 토큰이 없는 경우 처리
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }

            try {
                const response = await axios.post(
                    'http://localhost:8090/api/account/create',
                    {
                        memberIdx: localStorage.getItem('memberIdx'),
                        accountPassword: pwd,
                        paymentAmount:amount,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                console.log('카드 발급 성공:', response.data);
                modalRef2.current.closeModal();

            } catch (error) {
                console.error('카드 발급 실패:', error);
            }
        } else {
            alertRef.current.openModal();
            setFirstPwd('');

            pwdModalRef2.current.closeModal();
            pwdModalRef1.current.openModal();
        }
    };

    const handleAccountOpen = ()=>{
        modalRef2.current.openModal();
    }

    const handleNextPage = () => {
        navigate('/home');
    };

    return (
        <div className="card-container">
            <Header title={'한달적금 개설'} />
            <div className="card-field ps-0 pe-0">
                <div className="payment">
                    <h3>
                        매일
                        <input
                            type="text"
                            className="payment-input"
                            value={formattedAmount}
                            readOnly
                        />
                        원씩 납입
                    </h3>
                    <p className="card-info">
                        <span>30일 후 {(amount * 30).toLocaleString()}원 저축</span>
                    </p>
                </div>

                {/*계좌*/}
                <div className="input-container">
                    <label className="card-label">카드 연결</label>
                    
                    {/* 은행 선택 */}
                    <div className="select-box" onClick={() => modalRef.current.openModal()}>
                        {selectedBank ? selectedBank : '은행 선택'}
                    </div>

                    <input type="text" name="accountNumber" placeholder="계좌번호 (- 없이 숫자만)" value={accountNumber} readOnly/>
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
                        <p>매일 납입 금액 <span>{amount}원</span></p>
                        <p>적금기간 <span>30일</span></p>
                        <p>적금방식 <span>1일 1회 입금</span></p>
                        <p>최고 적용금리 <span>연 9.00%</span></p>
                        <p>만기설정 <span>만기 시 자동 해지</span></p>
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

                <div className="p-3">
                    <Button text="다음" onClick={handleAccountOpen}/>
                </div>
            </div>

            <BottomModal ref={modalRef} maxHeight="40%">
                <div className="modal-content">
                    <div className="bank-select">
                        <h3>은행 선택</h3>
                    </div>
                    
                    <div className="bank-list pb-5 mb-5">
                        {banks.map((bank, index) => (
                            <button 
                                key={index} 
                                className="bank-button"
                                onClick={() => {
                                    setSelectedBank(bank.name);
                                    modalRef.current.closeModal();
                                }}
                            >
                                <img src={bank.logo} alt={bank.name} className={`bank-logo ${bank.className}`} /> 
                            </button>
                        ))}
                    </div>
                </div>
            </BottomModal>

            <BottomModal ref={leafRef} maxHeight="70%">
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
                <div className="agree-item-modal">
                    <div className="summary-title-container">
                        <h2 className="summary-title">
                            Leaf2U 한달적금을
                            <br /> 개설하시겠습니까?
                        </h2>
                    </div>

                    <div className="summary-table">
                        <div className="summary-row">
                            <span className="summary-label">매일 납입 금액</span>
                            <span className="summary-value">{amount}원</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">만기일자</span>
                            <span className="summary-value">{maturityDate}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">연결계좌</span>
                            <span className="summary-value">{bankName} {accountNumber}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">적용금리</span>
                            <span className="summary-value">연 9.00%</span>
                        </div>
                    </div>
                    <p className="modal-description">
                        * 개설일부터 매일 30회 납입 후 만기해지 시 최고 우대금리가 적용됩니다.
                        <br />* 입금 일정진 진행을 통해 직접 입금하는 상품으로, 위 계획에서
                        조정됩니다.
                    </p>

                    <DoubleButton
                        confirmText="예"
                        cancelText="아니요"
                        cancelOnClick={() => modalRef2.current.closeModal()}
                        confirmOnClick={handleConfirmClick}
                    />
                </div>
            </BottomModal>

            <PwdModal6 ref={pwdModalRef1} onSubmit={handleFirstPwdSubmit} />
            <PwdModal6 ref={pwdModalRef2} onSubmit={handleSecondPwdSubmit} />

            <BottomModal ref={successModalRef} maxHeight="70%">
                <div className="agree-item2">
                    <p>한달적금이 개설되었습니다.</p>
                    <Button text="확인" onClick={handleNextPage} />
                </div>
            </BottomModal>

            <AlertModal ref={alertRef} text="비밀번호가 일치하지 않습니다. 다시 입력해주세요." />
        </div>
    );
};

export default CardHome;