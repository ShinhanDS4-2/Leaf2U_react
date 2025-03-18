import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import './AccountInfoPage.css';
import Keypad from '../../components/Keypad';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import PwdModal6 from '../../components/modal/PwdModal6';
import AlertModal from '../../components/modal/AlertModal';
import axios from 'axios';
// import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))

// 계좌 정보 페이지
const AccountInfoPage = ({ apiData }) => {
    // ㄴ apiData에는 accountDTO?  들어있음
    const accountDTO = apiData?.accountDTO;

    const navigate = useNavigate(); // useNavigate 훅 사용
    const [amount, setAmount] = useState(''); // 납입금액 변경 금액 저장

    // 🟢 모달 참조용 ref 생성
    const paymentAmountModalRef = useRef(); // 납입금액 변경 모달 ref
    const pwdInputModalRef = useRef(); // 비밀번호 입력 모달 ref
    const completeModalRef = useRef(); // 납입금액 변경 완료 모달 ref
    const pwdFailAlertRef = useRef(); // 비밀번호 불일치 모달 ref
    const failAlertRef2 = useRef(); // 적금해지 실패 모달 ref
    const rangeAlertRef = useRef(); // 납입금액 범위 제어 모달

    console.log('렌더링');
    console.log(
        paymentAmountModalRef,
        pwdInputModalRef,
        completeModalRef,
        pwdFailAlertRef,
        failAlertRef2,
        rangeAlertRef,
    );

    /* 클릭 이벤트 핸들러 START*/
    // 설정 > 이자조회 클릭 시
    const handleInterestClick = () => {
        navigate('/interestMainPage'); // 이자 조회 페이지로 이동
    };

    // 설정 > 해지 클릭 시
    const handleTerminationClick = () => {
        navigate('/termination'); // 중도 해지 페이지로 이동
    };
    /* 클릭 이벤트 핸들러 END */

    /* 모달 관리 START */
    // 납입금액 입력 모달 Open, Close
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
            completeModalRef.current.closeModal(); // 변경완료 모달 닫고
            navigate('/manageAccount'); // 새로운 경로로 이동 (어디로 이동하지)
        }
    };
    // 비번 불일치 알림 모달 Open, Close
    const OpenPwdFailAlert = () => {
        console.log('🚨 OpenPwdFailAlert 실행됨!');
        console.log(pwdFailAlertRef);
        if (pwdFailAlertRef.current) {
            pwdFailAlertRef.current.openModal();
        } else {
            console.error('pwdFailAlertRef가 아직 초기화되지 않았습니다.');
        }
    };
    const ClosePwdFailAlert = () => {
        if (pwdFailAlertRef.current) {
            pwdFailAlertRef.current.closeModal();
        }
    };
    // 기타 오류 알림 모달 Open, Close
    const OpenFailAlert = () => {
        if (failAlertRef2.current) {
            failAlertRef2.current.openModal();
        }
    };
    const CloseFailAlert = () => {
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
            console.log('🚨 result === 1 실행됨!!@!!@!@!@');
            OpenCompleteModal(); // 변경완료 모달 open  =>  🚨알림창 안뜸..
        } else if (result === 401) {
            console.log('🚨 OpenPwdFailAlertRef 실행됨!!@!!@!@!@');
            OpenPwdFailAlert(); // 비번 불일치 알림창 open  =>  🚨알림창 안뜸..
        } else {
            // 기타 오류
            OpenFailAlert(); // 실패 알림창 open
        }
    };

    // 3. 납입금액 변경 API 호출
    const updatePaymentAmountAPI = async (pwd) => {
        try {
            // const response = await api.patch(`/account/update/paymentAmount`, {
            //     paymentAmount: amount, // 사용자가 입력한 납입금액 변경할 값
            //     accountPassword: pwd, // 사용자가 입력한 간편비밀번호
            // });
            const token = localStorage.getItem('jwtToken'); // 🔥 토큰 동적으로 가져오기
            const response = await // GET 요청
            axios({
                method: 'patch',
                url: '/api/account/update/paymentAmount',
                data: {
                    paymentAmount: amount,
                    accountPassword: pwd,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    console.log(res.data);
                    return res;
                })
                .catch((err) => {
                    console.error(err);
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
    // 날짜형식 변환 YYYY-MM-DD
    const formatDate = (date) => {
        if (date != null) return date.substring(0, 10);
    };

    return (
        <>
            <Box sx={{ padding: 0, marginTop: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    리프적금
                </Typography>
                <Typography variant="body" color="text.secondary">
                    {accountDTO?.accountNumber}
                </Typography>
                <Card
                    variant="outlined"
                    sx={{ borderRadius: 3, margin: 1, padding: 0, marginBottom: 2 }}
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
                                    기본 금리
                                </Typography>
                                <Typography variant="body">{accountDTO?.interestRate} %</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    개설일
                                </Typography>
                                <Typography variant="body">
                                    {formatDate(accountDTO?.createDate)}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    만기일
                                </Typography>
                                <Typography variant="body">
                                    {formatDate(accountDTO?.endDate)}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    잔액
                                </Typography>
                                <Typography variant="body" sx={{ fontWeight: 'bold' }}>
                                    {accountDTO?.balance.toLocaleString()}원
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    적용금리
                                </Typography>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2">
                                        기본금리 {accountDTO?.interestRate}%
                                    </Typography>
                                    <Typography variant="body2">
                                        우대금리 {accountDTO?.primeRate}%
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary">
                                    과세구분
                                </Typography>
                                <Typography variant="body">
                                    {accountDTO?.taxationYn == 'Y' ? '일반과세' : '비과세'}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {/* 계좌 설정 START */}
                <Typography variant="body" color="text.secondary">
                    설정
                </Typography>
                <Card variant="outlined" sx={{ borderRadius: 3, margin: 1, padding: 0 }}>
                    <CardContent>
                        <Box
                            onClick={OpenPaymentAmountModalRef}
                            sx={{
                                marginBottom: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body" color="text.secondary">
                                납입금액
                            </Typography>
                            <Typography variant="body">
                                매일 {accountDTO?.paymentAmount.toLocaleString()}원 &gt;
                            </Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, border: 1 }} />
                        <Box
                            onClick={handleInterestClick}
                            sx={{
                                marginBottom: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body" color="text.secondary">
                                이자조회
                            </Typography>
                            <Typography variant="body">&gt;</Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, border: 1 }} />
                        <Box
                            onClick={handleTerminationClick}
                            sx={{
                                marginBottom: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body" color="text.secondary">
                                해지
                            </Typography>
                            <Typography variant="body">&gt;</Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, border: 1 }} />
                    </CardContent>
                </Card>
                {/* 계좌 설정 END */}
            </Box>
            <>
                {/* 모달모음 */}
                {/* 납입금액 변경모달 START */}
                <BottomModal ref={paymentAmountModalRef}>
                    <Typography variant="body1" className="fw-bold ps-4" sx={{ textAlign: 'left' }}>
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
                                        placeholder={accountDTO?.paymentAmount}
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
                {/* 변경금액 범위제한 알림 */}
                <AlertModal ref={rangeAlertRef} text="100원부터 30,000원까지 입력 가능합니다." />
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
                    <Typography variant="h6" className="fw-bold mt-3 m-4 ">
                        납입 금액이 변경되었습니다.
                    </Typography>
                    <div className="p-3">
                        <Button
                            text="확인"
                            onClick={(e) => {
                                CloseCompleteModal();
                            }}
                        />
                    </div>
                </BottomModal>
                {/* 납입금액 변경 완료 모달 END */}

                {/* 비밀번호 불일치 모달 START */}
                <AlertModal
                    ref={pwdFailAlertRef}
                    text={'<span>비밀번호가 일치하지 않습니다.<br/>다시 시도해주세요.</span> '}
                    onClick={ClosePwdFailAlert}
                />
                {/* 비밀번호 불일치 모달 END */}
                {/* 납입금액 변경 실패 모달 START */}
                <AlertModal
                    ref={failAlertRef2}
                    text={
                        '<span>납입금액 변경에 실패하였습니다.<br/>관리자에게 문의해주세요.</span>'
                    }
                    onClick={CloseFailAlert}
                />
                {/* 납입금액 변경 실패 모달 END */}
            </>
        </>
    );
};

export default AccountInfoPage;
