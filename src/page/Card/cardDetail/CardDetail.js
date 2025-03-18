import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

import Button from '../../../components/button/Button';
import Header from '../../../components/header/Header';
import BottomModal from '../../../components/modal/BottomModal';
import './CardDetail.css';
import DoubleButton from '../../../components/button/DoubleButton';
import PwdModal from '../../../components/modal/PwdModal';
import AlertModal from '../../../components/modal/AlertModal';
import api from '../../../utils/api';
import { useRate } from '../../../context/RateContext';

const CardDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state || {};
    const cardRef = useRef();
    const pwdModalRef1 = useRef(null);
    const pwdModalRef2 = useRef(null);
    const successModalRef = useRef();
    const alertRef = useRef();

    const [firstPwd, setFirstPwd] = useState('');
    const { setPrevCardYN, setCardYN, setCardNum, rate, setRate } = useRate(); // context

    const handleNextClick = () => {
        cardRef.current.openModal();
    };

    const handleConfirmClick = () => {
        cardRef.current.closeModal();
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

            api.post('/card/new', {
                memberIdx: localStorage.getItem('memberIdx'),
                accountNumber: formData.accountNumber,
                cardPassword: pwd,
                cardName: formData.selectedBank,
            })
                .then((response) => {
                    setCardNum(response.data.cardNumber);
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

    const handleNextPage = () => {
        setCardYN('Y');
        setPrevCardYN('Y');
        setRate(rate + 2);
        navigate('/cardHome');
    };

    return (
        <div>
            <Header title={'카드 가입'} />

            <div className="card-detail-container">
                <h3 className="section-title">가입 정보 확인</h3>
                <Card
                    variant="outlined"
                    sx={{ borderRadius: 3, margin: 3, padding: 0, marginBottom: 2 }}
                >
                    <CardContent>
                        <Box sx={{ padding: 2, backgroundColor: '#F7F7F7', borderRadius: 3 }}>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    이름
                                </Typography>
                                <Typography variant="body">{formData.name}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    영문 성
                                </Typography>
                                <Typography variant="body">{formData.lastName}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    영문 이름
                                </Typography>
                                <Typography variant="body">{formData.firstName}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    연락처
                                </Typography>
                                <Typography variant="body" sx={{ fontWeight: 'bold' }}>
                                    {formData.phone}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    계좌번호
                                </Typography>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body">
                                        ({formData.selectedBank}) {formData.accountNumber}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {/* 삭제할 부분 */}
                {/* <div className="info-box">
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
                </div> */}
                {/* 삭제할 부분 */}

                <p className="notice">* 위 정보가 사실과 다름이 없음을 확인합니다.</p>
            </div>

            <div className="p-3">
                <Button text={'다음'} onClick={handleNextClick} />
            </div>

            <BottomModal ref={cardRef} maxHeight="50%">
                <div className="agree-item-modal p-3">
                    <p className="agree-item2 pb-4">카드를 발급하시겠습니까?</p>
                    <DoubleButton
                        cancelText="아니요"
                        confirmText="예"
                        cancelOnClick={() => cardRef.current.closeModal()}
                        confirmOnClick={handleConfirmClick}
                    />
                </div>
            </BottomModal>

            <PwdModal ref={pwdModalRef1} onSubmit={handleFirstPwdSubmit} />
            <PwdModal ref={pwdModalRef2} onSubmit={handleSecondPwdSubmit} />

            <BottomModal ref={successModalRef} maxHeight="70%">
                <div className="agree-item3">
                    <p>
                        카드 발급이 완료되었습니다! <br /> 적금 가입으로 이동합니다.
                    </p>
                    <div className="p-3">
                        <Button text="확인" onClick={handleNextPage} />
                    </div>
                </div>
            </BottomModal>

            <AlertModal ref={alertRef} text="비밀번호가 일치하지 않습니다. 다시 입력해주세요." />
        </div>
    );
};

export default CardDetail;
