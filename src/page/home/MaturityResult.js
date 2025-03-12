import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { Card, Box, CardContent, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MaturityResult = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="만기해지" />
            <Content>
                <div>
                    <p className="small text-center mt-3">최종 금액을 확인해 주세요.</p>
                </div>
                <div>
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
                                <Typography variant="body2">2025</Typography>
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
                                <Typography variant="body2"> 12 %</Typography>
                            </Box>

                            {/* [추가] START - 적용금리에 대한 세부 항목을 보여줄 작은 박스 */}
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    우대 금리
                                </Typography>
                                <Typography variant="body2"> 연 7.00 % 반영</Typography>
                            </Box>
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
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        카드 발급
                                    </Typography>
                                    <Typography variant="body2">ssssss %</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        최초 가입
                                    </Typography>
                                    <Typography variant="body2">ssssss %</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        매일 우대금리
                                    </Typography>
                                    <Typography variant="body2">ssssss %</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        연속 보너스 우대금리
                                    </Typography>
                                    <Typography variant="body2">ssssss %</Typography>
                                </Box>
                            </Box>
                            {/* [추가] END */}

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
                                    1000원
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
                                <Typography variant="body2"> 2000원</Typography>
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
                                <Typography variant="body2">2000원</Typography>
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
                                <Typography variant="body2">20202020</Typography>
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
                                    202020원
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
                                    202020원
                                    {/* 계좌원금balance + 세후이자interestAmount */}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="maturity-content">
                    <p>후원금</p>
                </div> */}
            </Content>
            <div className="maturity-button-field">
                <Button
                    text="해지하기"
                    onClick={() => {
                        navigate('/home/termination');
                    }}
                />
            </div>
            <Footer />
        </div>
    );
};

export default MaturityResult;
