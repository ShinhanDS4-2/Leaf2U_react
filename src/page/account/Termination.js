import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import DoubleButton from '../../components/button/DoubleButton';

const Termination = () => {
    // 🟢 모달 참조용 ref 생성
    const terminateModalRef = useRef(); // 해지하기 모달 ref
    const pwdInputModalRef = useRef(); // 비밀번호 입력 모달 ref
    const completeModalRef = useRef(); // 해지 완료 모달 ref

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
    const CloseCompleteModal = () => {
        if (completeModalRef.current) {
            completeModalRef.current.closeModal();
        }
    };

    const [data, setData] = useState({}); // api호출 성공 시 data 값 관리

    // axios 인스턴스
    const api = axios.create({
        baseURL: '/api', // API 기본 URL
    });
    // 요청 인터셉터 설정 (모든 요청에 자동으로 토큰 추가)
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 토큰 가져오기
            console.log('현재 저장된 토큰:', token); // 🔥 확인용 로그

            if (token) {
                console.log('보내는 토큰:', token); // 🔥 확인용 로그
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    // 예상이자조회(오늘해지) API 호출 -> 오늘 중도해지 시 예상이자 먼저 보여줘야함
    const interestToday = () => {
        api.get('/account/interest/today')
            .then((response) => {
                const data = response.data; //
                setData(data.accountDTO);
                console.log('api 성공 data', data); // 🔥 확인용 로그
                console.log('api 성공 data.accountDTO', data.accountDTO); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 날짜형식 변환 YYYY-MM-DD
    const formatDate = (date) => {
        if (date != null) return date.substring(0, 10);
    };

    // 계좌 해지 API 호출 -> 최종적으로 해지하는 경우
    const termination = () => {
        api.patch(`/account/termination`)
            .then((response) => {
                const data = response.data; //
                setData(data);
                console.log('api 성공 data', data); // 🔥 확인용 로그
                console.log('api 성공 data.accountDTO', data.accountDTO); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        interestToday();
    }, []);

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
                                {data.balance}원
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
                            <Typography variant="body2"> {data.preTaxInterestAmount}원</Typography>
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
                            <Typography variant="body2">{data.taxAmount}원</Typography>
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
                                {data.interestAmount}원
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
                                {data.balance + data.interestAmount}원
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

                    <BottomModal ref={terminateModalRef}>
                        <div>
                            <Typography variant="h5" className="fw-bold mb-2">
                                정말 적금 해지를 <br /> 신청하시겠습니까?
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                                만기일까지 18일 남았습니다.
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                color="error"
                                className="mb-4"
                            >
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
                    <BottomModal ref={pwdInputModalRef}>
                        <Typography
                            variant="caption"
                            display="block"
                            color="error"
                            className="mb-2"
                        >
                            비밀번호 입력모달
                            <Button
                                text="비밀번호 맞으면"
                                onClick={(e) => {
                                    ClosePwdInputModal();
                                    OpenCompleteModal();
                                }}
                            />
                        </Typography>
                    </BottomModal>
                    <BottomModal ref={completeModalRef}>
                        <Typography variant="h6" className="fw-bold m-5">
                            적금 해지가 완료되었습니다.
                        </Typography>
                        <Button
                            text="확인 버튼 누르면 ? 페이지로 이동해야함"
                            onClick={(e) => {
                                CloseCompleteModal();
                            }}
                        />
                    </BottomModal>
                </div>
            </Content>
            <Footer />
        </>
    );
};

export default Termination;
