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
    const alertRef = useRef();
    const [amount, setAmount] = useState('');

    // 🟢 모달 참조용 ref 생성
    const pwdInputModalRef = useRef(); // 비밀번호 입력 모달 ref
    const completeModalRef = useRef(); // 해지 완료 모달 ref
    const failAlertRef1 = useRef(); // 비밀번호 불일치 모달 ref
    const failAlertRef2 = useRef(); // 적금해지 실패 모달 ref

    /* 모달 관리 START */

    // 비밀번호 입력 모달 open
    const OpenPwdInputModal = () => {
        if (pwdInputModalRef.current) {
            pwdInputModalRef.current.openModal();
        }
    };
    // 비밀번호 입력 모달 close
    const ClosePwdInputModal = () => {
        if (pwdInputModalRef.current) {
            pwdInputModalRef.current.closeModal();
        }
    };
    // 납입금액 변경완료 모달 open
    const OpenCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.openModal();
        }
    };
    // 납입금액 변경완료 모달 close
    const CloseCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.closeModal(); // 해지 완료 모달 닫고
            navigate('/home'); // 새로운 경로로 이동 (어디로 이동하지)
        }
    };

    // alert모달
    const OpenFailAlertRef1 = () => {
        if (failAlertRef1.current) {
            failAlertRef1.current.openModal();
        }
    };
    const CloseFailAlertRef1 = () => {
        if (failAlertRef1.current) {
            failAlertRef1.current.closeModal();
        }
    };
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

    // 변경버튼 눌렀을 경우 이벤트
    const handleNextPage = async () => {
        const numAmount = Number(amount);

        // 숫자 입력 경고창
        if (numAmount < 100 || numAmount > 30000) {
            alertRef.current.openModal();
            return;
        }
        OpenPwdInputModal(); // 비밀번호 입력창 open
    };

    // 간편 비밀번호 입력 후 프로세스
    const inputPwdProcess = async (pwd) => {
        ClosePwdInputModal();
        console.log('입력된 pwd값!!!!!!!!', pwd); // 🔥 확인용 로그
        const result = await termination(pwd); // 납입금액 변경 API 실행하고 await 결과 기다리기
        if (result === 1) {
            // 비밀번호 맞으면
            OpenCompleteModal(); // 변경완료 모달 open
        } else if (result === 401) {
            ClosePwdInputModal(); // 비밀번호 변경모달 닫고
            OpenFailAlertRef1(); // 실패 알림창 open
        } else {
            // 기타 오류
            ClosePwdInputModal(); // 비밀번호 변경모달 닫고
            OpenFailAlertRef2(); // 실패 알림창 open
        }
    };

    // 납입금액 변경 API 호출 -> 여기 변경해야함!!
    // 사용자가 입력한 pwd값을 넘겨줘야함@@@@@@@@
    const termination = async (pwd) => {
        try {
            const response = await api.patch(`/account/termination`, {
                accountPassword: pwd, // 사용자가 입력한 간편비밀번호 같이 넘겨줌
            });
            const result = response.data; // 백엔드에서 반환된 값 (1:성공, 0:실패, 401:비밀번호 불일치)
            console.log('✅ termination API 성공 result값은???:', result); // 🔥 확인용 로그
            return result;
        } catch (error) {
            console.error('❌ API 요청 실패:', error);
            return 0; // 실패 시 0반환
        }
    };

    // 페이지가 새로고침되거나 처음 접속할 때마다 amount를 빈 문자열로 초기화
    useEffect(() => {
        setAmount(''); // sessionStorage에서 값을 가져오지 않고, 항상 빈 문자열로 초기화
        sessionStorage.removeItem('paymentAmount'); // 필요하다면 sessionStorage도 초기화
    }, []);

    const handleChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); //숫자만 허용
        setAmount(value);
    };

    // 키패드 버튼 클릭 시 숫자 추가
    const handleKeypadClick = (num) => {
        setAmount((prev) => (prev + num).slice(0, 5)); // 최대 5자리까지만 입력
    };

    // 입력 지우기
    const handleDelete = () => {
        setAmount((prev) => prev.slice(0, -1));
    };

    return (
        <>
            <div>
                <Header title={'납입금액 변경'} />

                <Content>
                    <div className="payment">
                        <h3>
                            <input
                                type="number"
                                value={amount}
                                onChange={handleChange}
                                placeholder="1,000"
                                className="payment-input"
                            />{' '}
                            원
                        </h3>
                    </div>
                    {/* 금액 범위 표시 */}
                    <Typography variant="body2" color="text.secondary" className="text-center mt-2">
                        100원 ~ 30,000원
                    </Typography>
                    <div className="p-3">
                        <Button text={'변경'} onClick={handleNextPage} />
                    </div>
                </Content>

                <Keypad onKeyPress={handleKeypadClick} onDelete={handleDelete} />
                <AlertModal ref={alertRef} text="100원부터 30,000원까지 입력 가능합니다." />
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
            {/* 적금해지 완료 모달 END */}
            {/* 비밀번호 불일치 모달 START */}
            <AlertModal
                ref={failAlertRef1}
                text={'<span>비밀번호가 일치하지 않습니다.<br/>다시 시도해주세요.</span>'}
                onClick={CloseFailAlertRef1}
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
