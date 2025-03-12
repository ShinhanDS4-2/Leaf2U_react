import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Header from '../../../components/header/Header';
import BottomModal from '../../../components/modal/BottomModal';
import './CardDetail.css';
import DoubleButton from '../../../components/button/DoubleButton';
import PwdModal from '../../../components/modal/PwdModal';
import AlertModal from '../../../components/modal/AlertModal';
import axios from 'axios';

const CardDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state || {};
    const modalRef = useRef();
    const pwdModalRef1 = useRef(null);
    const pwdModalRef2 = useRef(null);
    const successModalRef = useRef();
    const alertRef = useRef();

    const [firstPwd, setFirstPwd] = useState('');

    const handleNextClick = () => {
        modalRef.current.openModal();
    };

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
            console.log('계좌번호는?', formData.accountNumber);

            const token = localStorage.getItem('jwtToken');
            console.log('전송할 토큰:', token);

            // 토큰이 없는 경우 처리
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }

            try {
                const response = await axios.post(
                    'http://localhost:8090/api/card/new',
                    {
                        memberIdx: localStorage.getItem('memberIdx'),
                        accountNumber: formData.accountNumber,
                        cardPassword: pwd,
                        cardName: formData.selectedBank,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                console.log('카드 발급 성공:', response.data);
            } catch (error) {
                console.error('카드 발급 실패:', error);
            }
        } else {
            alertRef.current.openModal();
            setFirstPwd('');

            pwdModalRef2.current.closeModal();
            pwdModalRef1.current.openModal();

            //여기서 axios로
        }
    };

    const handleNextPage = () => {
        navigate('/cardHome', { state: { cardYn: 'Y', cardType: 'L' } });
    };

    return (
        <div>
            <Header title={'카드 가입'} />

            <div className="card-detail-container">
                <h3>가입 정보 확인</h3>

                <div className="info-box">
                    <p>
                        <strong>이름</strong> <span>{formData.name}</span>
                    </p>
                    <p>
                        <strong>영문 성</strong> <span>{formData.lastName}</span>
                    </p>
                    <p>
                        <strong>영문 이름</strong> <span>{formData.firstName}</span>
                    </p>
                    <p>
                        <strong>연락처</strong> <span>{formData.phone}</span>
                    </p>
                    <p>
                        <strong>계좌번호</strong>{' '}
                        <span>
                            ({formData.selectedBank}) {formData.accountNumber}
                        </span>
                    </p>
                </div>

                <p className="notice">* 위 정보가 사실과 다름이 없음을 확인합니다.</p>
                <Button text="확인" onClick={handleNextClick} />
                <div className="p-3">
                    <Button text="확인" onClick={handleNextClick} />
                </div>
            </div>

            <BottomModal ref={modalRef} maxHeight="50%">
                <div className="agree-item-modal">
                    <p className="agree-item2">카드를 발급하시겠습니까?</p>
                    <DoubleButton
                        cancelText="아니요"
                        confirmText="예"
                        cancelOnClick={() => modalRef.current.closeModal()}
                        confirmOnClick={handleConfirmClick}
                    />
                </div>
            </BottomModal>

            <PwdModal ref={pwdModalRef1} onSubmit={handleFirstPwdSubmit} />
            <PwdModal ref={pwdModalRef2} onSubmit={handleSecondPwdSubmit} />

            <BottomModal ref={successModalRef} maxHeight="70%">
                <div className="agree-item2">
                    <p>
                        카드 발급이 완료되었습니다! <br /> 적금 가입으로 이동합니다.
                    </p>
                    <Button text="확인" onClick={handleNextPage} />
                </div>
            </BottomModal>

            <AlertModal ref={alertRef} text="비밀번호가 일치하지 않습니다. 다시 입력해주세요." />
        </div>
    );
};

export default CardDetail;
