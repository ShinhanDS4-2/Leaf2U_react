import './CardJoin.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Header from '../../../components/header/Header';
import BottomModal from '../../../components/modal/BottomModal';
import AlertModal from '../../../components/modal/AlertModal';
import ShinhanImg from '../../../image/shinhan.png';
import KookminImg from '../../../image/kookmin.png';
import NonghyubImg from '../../../image/nonghyub.png';
import HanaImg from '../../../image/hana.png';
import WooriImg from '../../../image/woori.png';
import KakaoImg from '../../../image/kakao.png';
import { useRate } from '../../../context/RateContext';
import { koreanToRomanization, formatPhoneNumber } from '../../../utils/util';

const CardJoin = () => {
    const navigate = useNavigate();
    const modalRef = useRef();
    const alertRef = useRef();
    const alertRef2 = useRef();

    // 입력값 상태 관리
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        firstName: '',
        phone: '',
        accountNumber: '',
    });

    const [selectedBank, setSelectedBank] = useState('');
    const [memberName, setMemberName] = useState('');
    const { setCardBankName } = useRate(); // context

    const banks = [
        { name: '신한', logo: ShinhanImg, className: 'shinhan-logo' },
        { name: '국민', logo: KookminImg, className: 'kookmin-logo' },
        { name: '농협', logo: NonghyubImg, className: 'nonghyub-logo' },
        { name: '하나', logo: HanaImg, className: 'hana-logo' },
        { name: '우리', logo: WooriImg, className: 'woori-logo' },
        { name: '카카오', logo: KakaoImg, className: 'kakao-logo' },
    ];

    // 이름 영문 변환
    const convertToRoman = () => {
        const { name } = form;

        // 성(첫 글자)과 이름(나머지 2글자) 분리
        const lastNameKor = name.charAt(0);
        const firstNameKor = name.substring(1, 3);

        // 한글을 로마자로 변환하는 함수 호출
        const lastNameEng = koreanToRomanization(lastNameKor);
        const firstNameEng = koreanToRomanization(firstNameKor);

        // 상태 업데이트
        setForm((prev) => ({
            ...prev,
            lastName: lastNameEng.charAt(0).toUpperCase() + lastNameEng.slice(1), // 첫 글자 대문자
            firstName: firstNameEng.charAt(0).toUpperCase() + firstNameEng.slice(1), // 첫 글자 대문자
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        // 전화번호 필드라면 포맷
        if (name === 'phone') {
            newValue = formatPhoneNumber(value);
        }

        setForm((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleNext = () => {
        for (const key in form) {
            if (!form[key].trim() && alertRef.current) {
                alertRef.current.openModal();
                return;
            }
        }

        if (!selectedBank || selectedBank.trim() === '') {
            alertRef2.current.openModal();
            return;
        }

        setCardBankName('신한');
        navigate('/cardDetail', { state: { ...form, selectedBank } });
    };

    return (
        <div>
            <Header title={'카드 가입'} />

            <div className="join-container">
                <h3 className="section-title">가입 정보 입력</h3>

                {/* 이름 입력 */}
                <div className={'input-container'}>
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력해 주세요."
                        value={form.name}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        onClick={convertToRoman}
                        style={{
                            position: 'relative',
                            right: '5px',
                            padding: '5px 10px',
                            fontSize: '12px',
                            background: '#e8e8e8',
                            color: 'black',
                            border: 'none',
                            borderRadius: '15px',
                            width: '80px',
                            top: '-36px',
                            left: '230px',
                        }}
                    >
                        영문 변환
                    </button>
                </div>

                {/* 영문 성 */}
                <div className="input-container">
                    <label>영문 성</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="영문 성"
                        value={form.lastName}
                        onChange={handleChange}
                    />
                </div>

                {/* 영문 이름 */}
                <div className="input-container">
                    <label>영문 이름</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="여권 이름과 동일하게 작성해 주세요."
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>

                {/* 연락처 */}
                <div className="input-container">
                    <label>연락처</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="숫자만 입력해 주세요."
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                {/*계좌*/}
                <div className="input-container">
                    <label className="card-label">계좌 연결</label>

                    {/* 은행 선택 */}
                    <div className="select-box" onClick={() => modalRef.current.openModal()}>
                        {selectedBank ? selectedBank : '은행 선택'}
                    </div>

                    <input
                        type="text"
                        name="accountNumber"
                        placeholder="계좌번호"
                        value={form.accountNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="explain-card">
                    <ul className="explain2">
                        <li>카드와 연결할 계좌를 입력해주세요.</li>
                    </ul>
                </div>
            </div>

            <div className="p-3">
                <Button text={'다음'} onClick={handleNext} />
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
                                onClick={() => {
                                    setSelectedBank(bank.name);
                                    modalRef.current.closeModal();
                                }}
                            >
                                <img src={bank.logo} alt={bank.name} className="bank-logo" />
                                <span className="bank-name">{bank.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </BottomModal>
            <AlertModal ref={alertRef} text="모든 항목을 입력해 주세요." />
            <AlertModal ref={alertRef2} text="은행을 선택해 주세요." />
        </div>
    );
};

export default CardJoin;
