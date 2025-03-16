import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { Card, Box, CardContent, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMaturity } from '../../context/MaturityContext';
import api from '../../utils/api';

const MaturityResult = () => {
    const navigate = useNavigate();
    const { accountInfo = {}, donationInfo = {}, organizationIdx, setFinalBalance } = useMaturity(); // context

    const interestAmount = accountInfo?.interestAmount ?? 0;
    const balance = accountInfo?.balance ?? 0;
    const donationRate = donationInfo?.donationRate ?? 0;
    const interestDonation = donationInfo?.interestDonation ?? 0;
    const additionalDonation = donationInfo?.additionalDonation ?? 0;
    const point = donationInfo?.pointDonation ?? 0;

    // 최종 수령 금액 계산 (원금 + 이자 - 후원금)
    const donationAmount = interestDonation + additionalDonation + point;
    const finalAmount = balance + interestAmount - donationAmount;
    setFinalBalance(finalAmount);

    // 해지하기 클릭
    const handleClickTermination = () => {
        const param = {
            afterTaxInterest: interestAmount,
            organisationIdx: organizationIdx,
            interest: interestDonation,
            principal: additionalDonation,
            point: point,
            finalAmount: finalAmount
        };

        api.post('/account/maturity', param, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                if (response.data) {
                    navigate('/home/termination');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
                                    후원금
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
                                    이자(세후)
                                </Typography>
                                <Typography variant="body2">
                                    {interestAmount.toLocaleString()}원
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
                                    후원율
                                </Typography>
                                <Typography variant="body2">{donationRate}%</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    후원율 반영 후원금
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {interestDonation.toLocaleString()}원
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
                                    원금
                                </Typography>
                                <Typography variant="body2">
                                    {balance.toLocaleString()}원
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
                                    개별 후원금
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {additionalDonation.toLocaleString()}원
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
                                    후원 포인트
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {point.toLocaleString()}P
                                </Typography>
                            </Box>

                            <Divider
                                sx={{
                                    marginY: 1,
                                    borderColor: 'black',
                                    marginBottom: 2,
                                    marginTop: 3,
                                }}
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="h6" color="text.secondary" fontWeight="bold">
                                    총 후원금
                                </Typography>
                                <Typography variant="h5" color="#5DB075" fontWeight="bold">
                                    {donationAmount.toLocaleString()}원
                                </Typography>
                            </Box>

                            <Divider
                                sx={{
                                    marginY: 1,
                                    borderColor: 'black',
                                    marginBottom: 2,
                                    marginTop: 3,
                                }}
                            />

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
                                    {finalAmount.toLocaleString()}원
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
                        handleClickTermination();
                    }}
                />
            </div>
            <Footer />
        </div>
    );
};

export default MaturityResult;
