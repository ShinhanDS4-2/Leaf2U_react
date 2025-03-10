import React, { useRef } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid2 as Grid,
    Button,
    Menu,
    MenuItem,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Content from '../../components/Content';
import BottomModal from '../../components/BottomModal';
import Button2 from '../../components/Button';

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
            <Box sx={{ padding: 2, backgroundColor: '#FAFAFA' }}>
                {/* 기부처 카드 END */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 1,
                    }}
                >
                    <Typography variant="body1" fontWeight="bold">
                        이자
                    </Typography>
                </Box>

                {/* 기부내역 카드 START */}

                <Card variant="outlined" sx={{ borderRadius: 2, marginBottom: 3, height: 'auto' }}>
                    <CardContent>
                        {/* 내용 부분 */}
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    계좌
                                </Typography>
                                <Typography variant="body2">1002-352-212121</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    적용 금리
                                </Typography>
                                <Typography variant="body2">
                                    8.5% (기본 금리 2.0%, 우대 금리 2.0%)
                                </Typography>
                            </Box>

                            {/* [추가] 적용금리에 대한 세부 항목을 보여줄 작은 박스 */}
                            <Box
                                sx={{
                                    backgroundColor: '#F5F5F5', // F5F5F5 연회색
                                    borderRadius: 1,
                                    border: '3px solid #F5F5F5', // 테두리 두께와 색상 지정
                                    padding: 1,
                                    marginBottom: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 1,
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        기본 금리
                                    </Typography>
                                    <Typography variant="body2">2.0 %</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        우대 금리
                                    </Typography>
                                    <Typography variant="body2">2.0 %</Typography>
                                </Box>
                            </Box>
                            {/* [추가] END */}

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
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
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    이자
                                </Typography>
                                <Typography variant="body2">35,000원</Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    포인트
                                </Typography>
                                <Typography variant="body2">35,000원</Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 2,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    후원금액
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    35,000원
                                </Typography>
                            </Box>
                            <Divider sx={{ marginY: 1, borderColor: 'black' }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 2,
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">
                                    계좌
                                </Typography>
                                <Typography variant="h5" color="#5DB075" fontWeight="bold">
                                    35,000원
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {/* 기부내역 카드 END */}
            </Box>
            <Box sx={{ padding: 2, backgroundColor: '#FAFAFA' }}>
                {/* 안내 문구 */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2, textAlign: 'center' }}
                >
                    중도해지 시 아래와 같이 <br />
                    오늘까지 발생한 이자와 원금이 입금됩니다.
                </Typography>

                {/* 이자/원금 정보 카드 */}
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        marginBottom: 3,
                        height: 'auto',
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

                        <Divider sx={{ marginY: 1, borderColor: 'black' }} />

                        {/* 실제 이자 및 최종 수령액 */}
                        <Box
                            sx={{
                                marginBottom: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                이자
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                295원
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
                                받으실금액
                            </Typography>
                            <Typography variant="h5" color="#5DB075" fontWeight="bold">
                                360,295원
                            </Typography>
                        </Box>

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
                    </CardContent>
                </Card>
            </Box>
            <div>
                <Content />
                <div className="border m-2 p-4" onClick={handleOpenModal}>
                    클릭 시 이벤트 발생
                </div>
                <BottomModal ref={modalRef}>
                    <div>
                        <Typography variant="h6" className="fw-bold mb-2" color="primary">
                            🎉 축하합니다! 출석 완료 🎉
                        </Typography>
                        <p style={{ color: 'gray', marginBottom: '16px' }}>
                            지금까지 총 5일 연속 출석했어요!
                        </p>
                        <Button2
                            text="확인"
                            onClick={(e) => {
                                handleCloseModal();
                            }}
                        />
                    </div>
                </BottomModal>
            </div>
        </>
    );
};

export default Termination;
