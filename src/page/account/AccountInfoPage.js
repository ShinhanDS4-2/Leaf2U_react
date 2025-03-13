import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import PwdModal6 from '../../components/modal/PwdModal6';
import AlertModal from '../../components/modal/AlertModal';
// import Keypad from '../../../components/Keypad';

import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))

// 날짜형식 변환 YYYY-MM-DD
const formatDate = (date) => {
    if (date != null) return date.substring(0, 10);
};

// 계좌 정보 페이지
const AccountInfoPage = () => {
    // 가짜 데이터 API연결하고 삭제해야함
    const accountDTO = {
        accountNumber: '235-987-654321',
        createDate: '2025-02-01',
        endDate: '2025-03-02',
        balance: 360000,
        interestRate: 1.0,
        extraRate: 5.4,
        taxationYn: 'Y',
        dailyDeposit: 30000,
    };

    const navigate = useNavigate(); // useNavigate 훅 사용

    // 🟢 모달 참조용 ref 생성
    const paymentAmountInputModalRef = useRef(); // 납입금액 입력 모달 ref
    const pwdInputModalRef = useRef(); // 비밀번호 입력 모달 ref
    const completeModalRef = useRef(); // 납입금액 변경 완료 모달 ref
    const failAlertRef1 = useRef(); // 비밀번호 불일치 모달 ref
    const failAlertRef2 = useRef(); // 적금해지 실패 모달 ref

    const [data, setData] = useState({}); // API 성공 시 data 값

    /* 클릭 이벤트 핸들러 START*/
    // 납입금액 클릭 시
    const handlePaymentAmountClick = () => {
        // 임시로 이자조회 페이지 이동. Paymentaaaaa.js페이지를 모달로 구현해야함
        navigate('/paymentaaaaa'); // 이자 조회 페이지로 이동
        // OpenPaymentAmountInputModal(); // 납입금액 입력 모달 open
        // alert(
        //     `납입금액 모달 띄워서 입력받고, 비밀번호 입력모달 띄워서 입력받고 납입금액 변경 API 호출해야함`,
        // );
    };

    // 이자조회 클릭 시
    const handleInterestClick = () => {
        navigate('/interestMainPage'); // 이자 조회 페이지로 이동
    };

    // 해지 클릭 시
    const handleTerminationClick = () => {
        navigate('/termination'); // 중도 해지 페이지로 이동
    };
    /* 클릭 이벤트 핸들러 END */

    /* 모달 관리 START */
    // 납입금액 입력 모달 open
    const OpenPaymentAmountInputModal = () => {
        if (paymentAmountInputModalRef.current) {
            paymentAmountInputModalRef.current.openModal();
        }
    };
    // 납입금액 입력 모달 close
    const ClosePaymentAmountInputModal = () => {
        if (paymentAmountInputModalRef.current) {
            paymentAmountInputModalRef.current.closeModal();
        }
    };
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
    // 납입금액 변경 완료 모달 open
    const OpenCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.openModal();
        }
    };
    // 납입금액 변경 완료 모달 close
    const CloseCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.closeModal(); // 해지 완료 모달 닫고
            navigate('/manageAccount'); // 계좌관리 페이지로 다시이동
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

    // 간편 비밀번호 입력 후 프로세스
    const inputPwdProcess = async (pwd) => {
        //     ClosePwdInputModal();
        //     console.log('입력된 pwd값!!!!!!!!', pwd); // 🔥 확인용 로그
        //     const result = await termination(pwd); // 납입금액 변경 API 실행하고 await 결과 기다리기
        //     if (result === 1) {
        //         OpenCompleteModal(); // 해지 완료 모달 open
        //     } else if (result === 401) {
        //         ClosePwdInputModal();
        //         OpenFailAlertRef1();
        //     } else {
        //         // 기타 오류
        //         ClosePwdInputModal();
        //         OpenFailAlertRef2();
        //     }
    };

    // 계좌정보 조회 API 호출
    const accountInfoAPI = () => {
        api.get('/account/info')
            .then((response) => {
                const data = response.data; // API호출 응답값: accountDTO
                setData(data.accountDTO);
                console.log('✅ accountInfoAPI 성공:', data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 납입금액 변경 API 호출 ->"accountPassword", "paymentAmount" 넘겨야함
    // 사용자가 입력한 pwd값, 납입금액값 넘겨줘야함@@@@@@@@ 서버에서 (@RequestBody AccountDTO accountDTO)로 받음
    const updatePaymentAmountAPI = async (pwd, paymentAmount) => {
        try {
            const response = await api.patch(`/account/update/paymentAmount`, {
                accountPassword: pwd, // 사용자가 입력한 간편비밀번호
                paymentAmount: paymentAmount, // 사용자가 입력한 납입금액
            });
            const result = response.data; // API호출 응답값 (1:성공, 0:실패, 401:비밀번호 불일치)
            console.log('✅ updatePaymentAmountAPI 성공 result값은???:', result); // 🔥 확인용 로그
            return result;
        } catch (error) {
            console.error('❌ API 요청 실패:', error);
            return 0; // 실패 시 0반환
        }
    };

    useEffect(() => {
        accountInfoAPI(); // 첫 렌더링 시 계좌정보 조회 API 호출
    }, []);

    // 날짜형식 변환 YYYY-MM-DD
    const formatDate = (date) => {
        if (date != null) return date.substring(0, 10);
    };

    /* 키패드 관련 모음 START */

    // // 키패드 버튼 클릭 시 숫자 추가
    // const handleKeypadClick = (num) => {
    //     setAmount((prev) => (prev + num).slice(0, 5)); // 최대 5자리까지만 입력
    // };

    // // 입력 지우기
    // const handleDelete = () => {
    //     setAmount((prev) => prev.slice(0, -1));
    // };

    /* 키패드 관련 모음 END */
    return (
        <>
            <Box sx={{ padding: 0, marginTop: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    리프적금
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {accountDTO.accountNumber}
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
                                <Typography variant="body2" color="text.secondary">
                                    기본 금리
                                </Typography>
                                <Typography variant="body2">
                                    {' '}
                                    {accountDTO?.interestRate} %
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    개설일
                                </Typography>
                                <Typography variant="body2"> {accountDTO?.createDate}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    만기일
                                </Typography>
                                <Typography variant="body2"> {accountDTO?.endDate}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    잔액
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {`${accountDTO.balance.toLocaleString()}원`}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    적용금리
                                </Typography>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2">
                                        기본금리 {accountDTO.interestRate}%
                                    </Typography>
                                    <Typography variant="body2">
                                        우대금리 {accountDTO.extraRate}%
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    과세구분
                                </Typography>
                                <Typography variant="body2">
                                    {accountDTO?.taxationYn == 'Y' ? '일반과세' : '비과세'}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {/* 계좌 설정 START */}
                <Typography variant="body1" color="text.secondary">
                    설정
                </Typography>
                <Card variant="outlined" sx={{ borderRadius: 3, margin: 1, padding: 0 }}>
                    <CardContent>
                        <Box
                            sx={{
                                marginBottom: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                onClick={handlePaymentAmountClick}
                            >
                                납입금액
                            </Typography>
                            <Typography variant="body2" onClick={handlePaymentAmountClick}>
                                매일 30,000원 &gt;
                            </Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, border: 1 }} />
                        <Box
                            sx={{
                                marginBottom: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                onClick={handleInterestClick}
                            >
                                이자조회
                            </Typography>
                            <Typography variant="body2" onClick={handleInterestClick}>
                                &gt;
                            </Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, border: 1 }} />
                        <Box
                            sx={{
                                marginBottom: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                onClick={handleTerminationClick}
                            >
                                해지
                            </Typography>
                            <Typography variant="body2" onClick={handleTerminationClick}>
                                &gt;
                            </Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, border: 1 }} />
                    </CardContent>
                </Card>
                {/* 계좌 설정 END */}
            </Box>
            <>
                {/* 모달모음 */}

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
                    ref={failAlertRef1}
                    text={'<span>비밀번호가 일치하지 않습니다.<br/>다시 시도해주세요.</span>'}
                    onClick={CloseFailAlertRef1}
                />
                {/* 비밀번호 불일치 모달 END */}
                {/* 적금해지 실패 모달 START */}
                <AlertModal
                    ref={failAlertRef2}
                    text={'<span>적금해지 실패하였습니다.<br/>관리자에게 문의해주세요.</span>'}
                    onClick={CloseFailAlertRef2}
                />
                {/* 적금해지 실패 모달 END */}
            </>
        </>
    );
};

export default AccountInfoPage;
