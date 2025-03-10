import React, { useRef } from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Content from '../../components/content/Content';
import BottomModal from '../../components/modal/BottomModal';
import Button2 from '../../components/button/Button';

const Termination = () => {
    const navigate = useNavigate(); // useNavigate훅: React Router에서 제공하는 훅으로, 페이지 이동을 위한 함수
    //
    const [anchorEl, setAnchorEl] = React.useState(null); // useState 훅을 사용하여 anchorEl이라는 상태 변수를 선언하고 초기값을 null로 설정
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // 🟢 모달 참조용 ref 생성
    const modalRef = useRef();

    // 모달 open
    const handleOpenModal = () => {
        if (modalRef.current) {
            modalRef.current.openModal();
        }
    };

    // 모달 close
    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.closeModal();
        }
    };

    //
    return (
        <>
            <Header title="계좌 해지" />
            <Content>
                {/* 안내 문구 */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ margin: 3, textAlign: 'center' }}
                >
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
                            <Typography variant="body2">2025-02-01 ~ 2025-03-13</Typography>
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
                            <Typography variant="body2">1.0 %</Typography>
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
                                360,000원
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
                            <Typography variant="body2">295원</Typography>
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
                            <Typography variant="body2">0원</Typography>
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
                            <Typography variant="body2">일반과세</Typography>
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
                                295원
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
                                360,295원
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
                        onClick={(e) => {
                            handleOpenModal();
                        }}
                    />

                    <BottomModal ref={modalRef}>
                        <div>
                            <h5 className="fw-bold mb-2">
                                정말 적금 해지를 <br /> 신청하시겠습니까?
                            </h5>
                            <Typography variant="caption" display="block" color="text.secondary">
                                만기일까지 18일 남았습니다.
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                color="error"
                                className="mb-2"
                            >
                                중도해지 시 우대금리가 적용되지 않습니다.
                            </Typography>

                            <div className="d-flex justify-content-between">
                                <Button
                                    text="아니요"
                                    bgColor="#A2A5A7"
                                    onClick={(e) => {
                                        handleCloseModal();
                                    }}
                                />
                                <Button
                                    text="확인"
                                    onClick={(e) => {
                                        handleCloseModal();
                                    }}
                                />
                            </div>
                        </div>
                    </BottomModal>
                </div>
            </Content>
            <Footer />
        </>
    );
};

export default Termination;
