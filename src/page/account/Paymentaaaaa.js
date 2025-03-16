/*삭제예정*/
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider, TextField } from '@mui/material';
import './Paymentaaaaa.css';
import Keypad from '../../components/Keypad';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Button from '../../components/button/Button';
import BottomModal from '../../components/modal/BottomModal';
import PwdModal6 from '../../components/modal/PwdModal6';
import AlertModal from '../../components/modal/AlertModal';
import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))

const Paymentaaaaa = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(''); // 납입금액 변경 금액 저장

    // 🟢 모달 참조용 ref
    const paymentAmountModalRef = useRef(); // 납입금액 변경 모달 ref
    const pwdInputModalRef = useRef(); // 비밀번호 입력 모달 ref
    const completeModalRef = useRef(); // 납입금액 변경 완료 모달 ref

    const pwdFailAlertRef = useRef(); // 비밀번호 불일치 모달 ref
    const failAlertRef2 = useRef(); // 납입금액 변경 실패 모달 ref
    const rangeAlertRef = useRef(); // 납입금액 범위 제어 모달

    /* 모달 관리 START */
    // 납입금액 변경 모달 Open, Close
    const OpenPaymentAmountModalRef = () => {
        if (paymentAmountModalRef.current) {
            paymentAmountModalRef.current.openModal();
        }
    };
    const ClosePaymentAmountModalRef = () => {
        if (paymentAmountModalRef.current) {
            paymentAmountModalRef.current.closeModal();
        }
    };
    // 비밀번호 입력 모달 Open, Close
    const OpenPwdInputModal = () => {
        if (pwdInputModalRef.current) {
            pwdInputModalRef.current.openModal();
        }
    };
    const ClosePwdInputModal = () => {
        if (pwdInputModalRef.current) {
            pwdInputModalRef.current.closeModal();
        }
    };
    // 납입금액 변경완료 모달 Open, Close
    const OpenCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.openModal();
        }
    };
    const CloseCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.closeModal(); // 해지 완료 모달 닫고
            navigate('/home'); // 새로운 경로로 이동 (어디로 이동하지)
        }
    };

    // 비번 불일치 알림 모달 Open, Close
    const OpenPwdFailAlertRef = () => {
        console.log('🚨 OpenPwdFailAlertRef 실행됨!');
        console.log(pwdFailAlertRef.current);

        if (pwdFailAlertRef.current) {
            pwdFailAlertRef.current.openModal();
        }
    };
    const ClosePwdFailAlertRef = () => {
        if (pwdFailAlertRef.current) {
            pwdFailAlertRef.current.closeModal();
        }
    };
    // 기타 오류 알림 모달 Open, Close
    const OpenFailAlertRef2 = () => {
        if (failAlertRef2.current) {
            failAlertRef2.current.openModal();
        }
    };
    const CloseFailAlertRef2 = () => {
        if (failAlertRef2.current) {
            failAlertRef2.current.closeModal();
        }
    };
    /* 모달관리 END */

    /* 납입금액 변경 모달 및 키패드 관련 START */
    // 페이지가 새로고침되거나 처음 접속할 때마다 amount를 빈 문자열로 초기화
    useEffect(() => {
        setAmount(''); // sessionStorage에서 값을 가져오지 않고, 항상 빈 문자열로 초기화
    }, []);

    // 납입금액 변경모달 변경이벤트
    const handleChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); //숫자만 허용
        setAmount(value); // 입력된 값을 저장
    };

    // 키패드 버튼 클릭 시 숫자 추가
    const handleKeypadClick = (num) => {
        setAmount((prev) => (prev + num).slice(0, 5)); // 최대 5자리까지만 입력
    };

    // 입력 지우기
    const handleKeypadDelete = () => {
        setAmount((prev) => prev.slice(0, -1));
    };
    /* 납입금액 변경 모달 및 키패드 관련 END */

    /*  납입금액 변경 프로세스 START */
    // 1. 납입금액 변경버튼 눌렀을 경우 이벤트
    const handleNextPage = async () => {
        const numAmount = Number(amount);

        if (numAmount < 100 || numAmount > 30000) {
            // 100미만 or 30000초과 입력 불가
            rangeAlertRef.current.openModal(); // 납입금액 숫자 범위 제한 경고창
            return;
        }
        // 범위에 맞게 입력했을 경우
        setAmount(numAmount);
        ClosePaymentAmountModalRef(); // 납입금액 변경모달 Close
        OpenPwdInputModal(); // 비밀번호 입력창 open
    };

    // 2. 간편 비밀번호 입력 후 프로세스
    const inputPwdProcess = async (pwd) => {
        ClosePwdInputModal(); // 비밀번호 입력창 close
        console.log('입력된 pwd값!!!!!!!!', pwd); // 🔥 확인용 로그
        const result = await updatePaymentAmountAPI(pwd); // 납입금액 변경 API 실행하고 await 결과 기다리기
        if (result === 1) {
            // 비밀번호 맞으면
            OpenCompleteModal(); // 변경완료 모달 open
        } else if (result === 401) {
            OpenPwdFailAlertRef(); // 비번 불일치 알림창 open
        } else {
            // 기타 오류
            OpenFailAlertRef2(); // 실패 알림창 open
        }
    };

    // 3. 납입금액 변경 API 호출
    const updatePaymentAmountAPI = async (pwd) => {
        try {
            const response = await api.patch(`/account/update/paymentAmount`, {
                paymentAmount: amount, // 사용자가 입력한 납입금액 변경할 값
                accountPassword: pwd, // 사용자가 입력한 간편비밀번호
            });
            const result = response.data; // 백엔드에서 반환된 값 (1:성공, 0:실패, 401:비밀번호 불일치)
            console.log('✅ 납입금액 변경 API 성공값은???:', result); // 🔥 확인용 로그
            return result;
        } catch (error) {
            console.error('❌ API 요청 실패:', error);
            return 0; // 실패 시 0반환
        }
    };
    /*  납입금액 변경 프로세스 END */
    return (
        <>
            <div>
                <Header title={'납입금액 변경'} />
                <Content>
                    <Button text={'모달test'} onClick={OpenPaymentAmountModalRef} />
                    {/* 납입금액 변경모달 START */}
                    <BottomModal ref={paymentAmountModalRef}>
                        <Typography
                            variant="body1"
                            className="fw-bold ps-4"
                            sx={{ textAlign: 'left' }}
                        >
                            납입금액
                        </Typography>
                        <Typography variant="h6" className="fw-bold m-3 ">
                            <div className="paddingBottom">
                                <div className="">
                                    <h3>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={handleChange}
                                            placeholder="원래 납입하던 금액이 나와야함"
                                            className="payment-input"
                                        />
                                        원
                                    </h3>
                                </div>
                                {/* 금액 범위 표시 */}
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="text-center mt-2 mb-5"
                                >
                                    100원 ~ 30,000원
                                </Typography>
                                <div className="pb-5">
                                    <Button text={'변경'} onClick={handleNextPage} />
                                </div>
                            </div>
                            <Keypad onKeyPress={handleKeypadClick} onDelete={handleKeypadDelete} />
                        </Typography>
                    </BottomModal>
                    {/* 납입금액 변경모달 END */}
                </Content>

                {/* 변경금액 범위제한 알림 */}
                <AlertModal ref={rangeAlertRef} text="100원부터 30,000원까지 입력 가능합니다." />
            </div>

            {/* 간편 비밀번호 입력 모달 START */}
            <PwdModal6
                ref={pwdInputModalRef}
                onSubmit={(pwd) => {
                    // onSubmit에서 매개변수로 입력된 pwd가 넘어옴
                    inputPwdProcess(pwd);
                }}
            ></PwdModal6>
            {/* 간편 비밀번호 입력 모달 END */}
            {/* 납입금액 변경 완료 모달 START */}
            <BottomModal ref={completeModalRef}>
                <Typography variant="h6" className="fw-bold m-4 ">
                    납입 금액이 변경되었습니다.
                </Typography>
                <Button
                    text="확인"
                    onClick={(e) => {
                        CloseCompleteModal();
                    }}
                />
            </BottomModal>
            {/* 납입금액 변경 완료 모달 END */}
            {/* 비밀번호 불일치 모달 START */}
            <AlertModal
                ref={pwdFailAlertRef}
                text={'<span>비밀번호가 일치하지 않습니다.<br/>다시 시도해주세요.</span>'}
                onClick={ClosePwdFailAlertRef}
            />
            {/* 비밀번호 불일치 모달 END */}
            {/* 납입금액 변경 실패 모달 START */}
            <AlertModal
                ref={failAlertRef2}
                text={'<span>납입금액 변경에 실패하였습니다.<br/>관리자에게 문의해주세요.</span>'}
                onClick={CloseFailAlertRef2}
            />
            {/* 납입금액 변경 실패 모달 END */}
        </>
    );
};

export default Paymentaaaaa;
