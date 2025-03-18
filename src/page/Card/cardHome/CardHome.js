import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Header from '../../../components/header/Header';
import BottomModal from '../../../components/modal/BottomModal';
import cardImg from '../../../image/leafcard.png';
import './CardHome.css';
import DoubleButton from '../../../components/button/DoubleButton';
import ShinhanImg from '../../../image/shinhan.png';
import KookminImg from '../../../image/kookmin.png';
import NonghyubImg from '../../../image/nonghyub.png';
import HanaImg from '../../../image/hana.png';
import WooriImg from '../../../image/woori.png';
import KakaoImg from '../../../image/kakao.png';
import PwdModal6 from '../../../components/modal/PwdModal6';
import AlertModal from '../../../components/modal/AlertModal';
import PwdModal from '../../../components/modal/PwdModal';
import { useRate } from '../../../context/RateContext';
import { formatCardNumber } from '../../../utils/util';
import api from '../../../utils/api';

const CardHome = () => {
    const navigate = useNavigate();
    const leafRef = useRef();
    const modalRef = useRef();
    const modalRef2 = useRef();
    const pwdModalRef1 = useRef(null);
    const pwdModalRef2 = useRef(null);
    const cardPwdModalRef1 = useRef(null);
    const cardPwdModalRef2 = useRef(null);
    const successModalRef = useRef();
    const alertRef = useRef();
    const cardRef = useRef();
    const cardSuccessModalRef = useRef();

    const amount = Number(localStorage.getItem('amount')); // 숫자로 변환


    const [maturityDate, setMaturityDate] = useState('');
    // const [accountNumber, setAccountNumber] = useState('');
    // const [bankName, setBankName] = useState('');
    const [cardType, setCardType] = useState('C');
    const {
        prevCardYN,
        setPrevCardYN,
        cardYN,
        setCardYN,
        firstYN,
        rate,
        setRate,
        cardBankName,
        setCardBankName,
        cardNum,
        setCardNum,
    } = useRate(); // context

    const handleChange = (e) => {
        const formattedNumber = formatCardNumber(e.target.value);
        setCardNum(formattedNumber);

        if (e.target.value.length >= 19) {
            api.post('/card/check/prev', {
                cardNum: formattedNumber,
            })
                .then((response) => {
                    if (response.data) {
                        setCardYN('Y');
                        setRate(rate + 2);
                    } else {
                        setCardYN('N');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleCheckboxChange = (e) => {
        setCardType(e.target.checked ? 'E' : 'C');
    };

    const handleBankSelect = (bank) => {
        setCardBankName(bank);
        modalRef.current.closeModal();
    };

    const banks = [
        { name: '신한', logo: ShinhanImg, className: 'shinhan-logo' },
        { name: '국민', logo: KookminImg, className: 'kookmin-logo' },
        { name: '농협', logo: NonghyubImg, className: 'nonghyub-logo' },
        { name: '하나', logo: HanaImg, className: 'hana-logo' },
        { name: '우리', logo: WooriImg, className: 'woori-logo' },
        { name: '카카오', logo: KakaoImg, className: 'kakao-logo' },
    ];

    // 숫자 포맷
    const formattedAmount = amount ? Number(amount).toLocaleString() : '';

    useEffect(() => {
        const fetchCardInfo = async () => {
            if (prevCardYN === 'N') {
                leafRef.current.openModal();
            }
        };

        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        const formattedDate = today.toISOString().split('T')[0];
        setMaturityDate(formattedDate);

        fetchCardInfo();
    }, [cardYN, prevCardYN]);

    const [firstPwd, setFirstPwd] = useState('');

    {
        /*카드 등록*/
    }
    const handleCardClick = () => {
        cardPwdModalRef1.current.openModal();
    };

    const handleCardFirstPwdSubmit = (pwd) => {
        setFirstPwd(pwd);
        cardPwdModalRef1.current.closeModal();
        cardPwdModalRef2.current.openModal();
    };

    const handleCardSecondPwdSubmit = async (pwd) => {
        if (pwd == firstPwd) {
            cardPwdModalRef2.current.closeModal();
            cardRef.current.closeModal();

            const token = localStorage.getItem('jwtToken');

            // 토큰이 없는 경우 처리
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }

            api.post('/card/exist', {
                memberIdx: localStorage.getItem('memberIdx'),
                accountNumber: cardNum,
                cardPassword: pwd,
                cardName: cardBankName,
                cardType: cardType,
            })
                .then((response) => {
                    cardSuccessModalRef.current.openModal();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alertRef.current.openModal();
            setFirstPwd('');

            cardPwdModalRef2.current.closeModal();
            cardPwdModalRef1.current.openModal();
        }
    };

    {
        /*적금 등록*/
    }
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

            const token = localStorage.getItem('jwtToken');

            // 토큰이 없는 경우 처리
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }

            api.post('/account/create', {
                memberIdx: localStorage.getItem('memberIdx'),
                accountPassword: pwd,
                paymentAmount: amount,
            })
                .then((response) => {
                    modalRef2.current.closeModal();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alertRef.current.openModal();
            setFirstPwd('');

            pwdModalRef2.current.closeModal();
            pwdModalRef1.current.openModal();
        }
    };

    const handleNextClick = () => {
        if (!cardNum.trim() || !cardBankName) {
            alertRef.current.openModal();
            return;
        }

        modalRef2.current.openModal();
        // cardRef.current.openModal();
    };

    const handleMakeLeafAccount = () => {
        cardSuccessModalRef.current.closeModal();
        modalRef2.current.openModal();
    };

    const handleNextPage = () => {
        navigate('/home');
    };

    return (
        <div className="card-container">
            <Header title={'한달적금 개설'} />
            <div className="card-field ps-0 pe-0">
                <div className="card-payment">
                    <h3>
                        매일
                        <input
                            type="text"
                            className="card-payment-input"
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
                        {cardBankName != '' ? cardBankName : '은행 선택'}
                    </div>

                    <input
                        type="text"
                        name="accountNumber"
                        placeholder="카드번호 (- 없이 숫자만)"
                        value={cardNum ? cardNum : ''}
                        onChange={handleChange}
                    />
                </div>

                {/* 기후 동행 카드 옵션 */}
                <div className="eco-card">
                    <div className="eco-card-in">
                        <input
                            type="checkbox"
                            id="donation"
                            className="checkbox"
                            onChange={handleCheckboxChange}
                            disabled={cardYN === 'Y'}
                        />
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
                            매일 납입 금액 <span>{amount.toLocaleString()}원</span>
                        </p>
                        <p>
                            적금기간 <span>30일</span>
                        </p>
                        <p>
                            적금방식 <span>1일 1회 입금</span>
                        </p>
                        <p>
                            최고 적용금리 <span>연 {rate}.00%</span>
                        </p>
                        <p>
                            만기설정 <span>만기 시 직접 해지</span>
                        </p>
                    </div>
                </div>
                <div className="explain-card">
                    <ul className="explain">
                        <li>
                            최고 적용금리 {rate}.00% = 기본금리 1.00% + 30일 성공 시 3.00% + 연속 보너스 2.00%
                            {firstYN === 'N' && (<span className="highlight2"> + 최초 가입 2.00%'</span>)}
                            {cardYN === 'Y' && prevCardYN === 'Y' && (
                                <span className="highlight2"> + Leaf 카드 2.00%</span>
                            )}
                            {cardType === 'E' && (
                                <span className="highlight2"> + 기후 동행 카드 1.00%</span>
                            )}
                        </li>
                    </ul>
                </div>

                <div className="p-3">
                    <Button text={'다음'} onClick={handleNextClick} />
                </div>
            </div>

            <BottomModal ref={modalRef} maxHeight="60%">
                <div className="bank-modal-content">
                    <div className="bank-select">
                        <h3>은행 선택</h3>
                    </div>

                    <div className="bank-list">
                        {banks.map((bank, index) => (
                            <button
                                key={index}
                                className="bank-button"
                                onClick={() => handleBankSelect(bank.name)}
                            >
                                <img src={bank.logo} alt={bank.name} className="bank-logo" />
                                <span className="bank-name">{bank.name}</span>
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

                    <div className="d-flex justify-content-center">
                        <div className="card-img-div mb-4 mt-2 w-50">
                            <img src={cardImg} alt="카드 이미지" />
                        </div>
                    </div>
                    <p className="modal-text">
                        <strong>Leaf2U 카드를 발급 받으시겠습니까?</strong>
                        <br />
                        이런 혜택이 있어요!
                    </p>
                    <p className="modal-benefits pb-3">
                        <span className="highlight-text">우대 금리 + 연 2.00%</span>
                        <br />
                        대중교통 5% 캐시백
                        <br />
                        스타벅스 5% 캐시백
                    </p>
                    <DoubleButton
                        confirmText="예"
                        cancelText="아니요"
                        cancelOnClick={() => leafRef.current.closeModal()}
                        confirmOnClick={() => {
                            navigate('/leaf');
                        }}
                    />
                </div>
            </BottomModal>

            <BottomModal ref={cardRef} maxHeight="50%">
                <div className="agree-item-modal">
                    <p className="agree-item2">카드를 등록하시겠습니까?</p>
                    <DoubleButton
                        cancelText="아니요"
                        confirmText="예"
                        cancelOnClick={() => cardRef.current.closeModal()}
                        confirmOnClick={handleCardClick}
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
                            <span className="summary-value">{amount.toLocaleString()}원</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">만기일자</span>
                            <span className="summary-value">{maturityDate}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">연결카드</span>
                            <span className="summary-value">
                                {cardBankName} {cardNum}
                            </span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">적용금리</span>
                            <span className="summary-value">연 {rate}.00%</span>
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

            <PwdModal ref={cardPwdModalRef1} onSubmit={handleCardFirstPwdSubmit} />
            <PwdModal ref={cardPwdModalRef2} onSubmit={handleCardSecondPwdSubmit} />

            <BottomModal ref={cardSuccessModalRef} maxHeight="70%">
                <div className="agree-item2">
                    <p>
                        카드 등록이 완료되었습니다! <br /> 적금 가입으로 이동합니다.
                    </p>
                    <Button text="확인" onClick={handleMakeLeafAccount} />
                </div>
            </BottomModal>

            <PwdModal6 ref={pwdModalRef1} onSubmit={handleFirstPwdSubmit} />
            <PwdModal6 ref={pwdModalRef2} onSubmit={handleSecondPwdSubmit} />

            <BottomModal ref={successModalRef} maxHeight="70%">
                <div className="agree-item2">
                    <p>한달적금이 개설되었습니다.</p>
                    <div className="p-3">
                        <Button text="확인" onClick={handleNextPage} />
                    </div>
                </div>
            </BottomModal>

            {/* <AlertModal ref={alertRef} text="비밀번호가 일치하지 않습니다. 다시 입력해주세요." /> */}
            <AlertModal ref={alertRef} text="입력되지 않은 값이 있습니다." />
        </div>
    );
};

export default CardHome;
