import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import DoubleButton from '../../components/button/DoubleButton';
import PwdModal6 from '../../components/modal/PwdModal6';
import AlertModal from '../../components/modal/AlertModal';
import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))
// axios 인스턴스(api) 및 인터셉터 자동추가됨 -> api이름으로 사용

const Termination = () => {
    const navigate = useNavigate(); // useNavigate 훅으로 navigate 함수 얻기

    // 🟢 모달 참조용 ref 생성
    const terminateModalRef = useRef(); // 해지하기 모달 ref
    const pwdInputModalRef = useRef(); // 비밀번호 입력 모달 ref
    const completeModalRef = useRef(); // 해지 완료 모달 ref
    const failAlertRef1 = useRef(); // 비밀번호 불일치 모달 ref
    const failAlertRef2 = useRef(); // 적금해지 실패 모달 ref

    const [data, setData] = useState({}); // 예상이자조회(오늘해지) API 성공 시 data 값

    /* 모달 관리 START */
    // 해지모달 open
    const OpenterminateModal = () => {
        if (terminateModalRef.current) {
            terminateModalRef.current.openModal();
        }
    };
    // 해지모달 close
    const CloseterminateModal = () => {
        if (terminateModalRef.current) {
            terminateModalRef.current.closeModal();
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
    // 해지 완료 모달 open
    const OpenCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.openModal();
        }
    };
    // 해지 완료 모달 close
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

    // 간편 비밀번호 입력 후 프로세스
    const inputPwdProcess = async (pwd) => {
        ClosePwdInputModal();
        console.log('입력된 pwd값!!!!!!!!', pwd); // 🔥 확인용 로그
        const result = await termination(pwd); // 적금 해지 API 실행하고 await 결과 기다리기
        if (result === 1) {
            OpenCompleteModal(); // 해지 완료 모달 open
        } else if (result === 401) {
            ClosePwdInputModal();
            OpenFailAlertRef1();
        } else {
            // 기타 오류
            ClosePwdInputModal();
            OpenFailAlertRef2();
        }
    };

    // 예상이자조회(오늘해지) API 호출 -> 오늘 중도해지 시 예상이자 먼저 보여줘야함
    const interestToday = () => {
        api.get('/account/interest/today')
            .then((response) => {
                const data = response.data;
                setData(data.accountDTO);
                console.log('✅ interestToday API 성공:', data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 계좌 해지 API 호출 -> 최종적으로 해지하는 경우
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

    useEffect(() => {
        interestToday();
    }, []);

    // 날짜형식 변환 YYYY-MM-DD
    const formatDate = (date) => {
        if (date != null) return date.substring(0, 10);
    };

    // 날짜 차이 계산
    const dayDifference = (date1, date2) => {
        const diff = Math.abs(date2 - date1); // 밀리초 차이 계산
        return Math.floor(diff / (1000 * 3600 * 24)); // 일 단위로 차이 계산
    };

    return (
        <>
            <Header title="계좌 해지" />
            <Content>
                {/* 안내 문구 */}
                <Typography variant="body2" color="text.secondary" className="mb-3 text-center">
                    중도해지 시 아래와 같이 <br />
                    오늘까지 발생한 이자와 원금이 입금됩니다.
                </Typography>
                {/* 이자내역 카드 START */}
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        margin: 1,
                        height: 'auto',
                        padding: 0,
                    }}
                >
                    <CardContent>
                        {/* 상단 제목 */}
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6" fontWeight="bold">
                                이자
                            </Typography>
                        </Box>

                        {/* 이자 상세 항목들 */}
                        <Box
                            sx={{
                                marginBottom: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                이자 계산 기간
                            </Typography>
                            <Typography variant="body2">
                                {formatDate(data.createDate)}~ {formatDate(data.endDate)}
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
                                기본 금리
                            </Typography>
                            <Typography variant="body2"> {data.interestRate} %</Typography>
                        </Box>
                        <Box
                            sx={{
                                marginBottom: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                원금
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {data?.balance?.toLocaleString()}원
                                {/* data나 balance가 undefined일 경우에도 오류 없이 처리됨 */}
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
                                이자(세전)
                            </Typography>
                            <Typography variant="body2">
                                {' '}
                                {data?.preTaxInterestAmount?.toLocaleString()}원
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
                                세금
                            </Typography>
                            <Typography variant="body2">
                                {data?.taxAmount?.toLocaleString()}원
                            </Typography>
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
                                {data.taxationYn == 'Y' ? '일반과세' : '비과세'}
                            </Typography>
                        </Box>

                        {/* 실제 이자 및 최종 수령액 */}
                        <Box
                            sx={{
                                marginBottom: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body" color="text.secondary" fontWeight="bold">
                                이자
                            </Typography>
                            <Typography variant="body" fontWeight="bold">
                                {data?.interestAmount?.toLocaleString()}원
                            </Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, borderColor: 'black', marginBottom: 2 }} />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="h6" color="text.secondary" fontWeight="bold">
                                받으실금액
                            </Typography>
                            <Typography variant="h5" color="#5DB075" fontWeight="bold">
                                {(data.balance + data.interestAmount)?.toLocaleString()}원
                                {/* 계좌원금balance + 세후이자interestAmount */}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                {/* 하단 주의 문구들 */}
                <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                    sx={{ marginBottom: 0.5 }}
                >
                    * 중도해지 시 우대금리가 적용되지 않습니다.
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                    * 적금 해지 시, 원금과 이자가 연계카드로 입금됩니다.
                </Typography>
                <div>
                    <Button
                        text="해지하기"
                        onClick={() => {
                            OpenterminateModal();
                        }}
                    />
                </div>
            </Content>
            <Footer />
            {/* 해지하시겠습니까? 모달 START */}
            <BottomModal ref={terminateModalRef}>
                <div>
                    <Typography variant="h5" className="fw-bold mb-2">
                        정말 적금 해지를 <br /> 신청하시겠습니까?
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                        만기일까지{' '}
                        {Math.floor(
                            (new Date('2025-03-24T00:15:20') -
                                new Date('2025-03-11T20:48:04.6781052')) /
                                (1000 * 3600 * 24),
                        )}
                        일 남았습니다.
                    </Typography>
                    <Typography variant="caption" display="block" color="error" className="mb-4">
                        중도해지 시 우대금리가 적용되지 않습니다.
                    </Typography>
                    <DoubleButton
                        cancelText="아니요"
                        confirmText="예"
                        cancelOnClick={() => {
                            CloseterminateModal();
                        }}
                        confirmOnClick={() => {
                            CloseterminateModal();
                            OpenPwdInputModal();
                        }}
                    />
                </div>
            </BottomModal>
            {/* 해지하시겠습니까? 모달 END */}
            {/* 간편 비밀번호 입력 모달 START */}
            <PwdModal6
                ref={pwdInputModalRef}
                onSubmit={(pwd) => {
                    // onSubmit에서 매개변수로 입력된 pwd가 넘어옴
                    inputPwdProcess(pwd);
                }}
            ></PwdModal6>
            {/* 간편 비밀번호 입력 모달 END */}
            {/* 적금해지 완료 모달 START */}
            <BottomModal ref={completeModalRef}>
                <Typography variant="h6" className="fw-bold m-4 ">
                    적금 해지가 완료되었습니다.
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
            {/* 적금해지 실패 모달 START */}
            <AlertModal
                ref={failAlertRef2}
                text={'<span>적금해지 실패하였습니다.<br/>관리자에게 문의해주세요.</span>'}
                onClick={CloseFailAlertRef2}
            />
            {/* 적금해지 실패 모달 END */}
        </>
    );
};

export default Termination;
