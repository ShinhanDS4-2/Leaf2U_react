import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

// 날짜형식 변환 YYYY-MM-DD
const formatDate = (date) => {
    if (date != null) return date.substring(0, 10);
};
// 금리 형식 변환 1인경우 1.0으로
const formatValue = (value) =>
    value != null ? (Number.isInteger(value) ? value.toFixed(1) : value) : '0.0';

// (3) 직접입력 탭 페이지
const CustomDatePage = ({ interestData }) => {
    // ㄴ interestData에는 accountDTO 들어있음
    const accountDTO = interestData?.accountDTO;
    return (
        <>
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
                            {formatDate(accountDTO?.createDate)} ~ {formatDate(accountDTO?.endDate)}
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
                        <Typography variant="body2">
                            {' '}
                            {formatValue(accountDTO?.interestRate)}%
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
                        <Typography variant="body2" fontWeight="bold">
                            {accountDTO?.balance.toLocaleString()}원
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
                            {accountDTO?.preTaxInterestAmount.toLocaleString()}원
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
                            {accountDTO?.taxAmount.toLocaleString()}원
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
                            {accountDTO?.taxationYn == 'Y' ? '일반과세' : '비과세'}
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
                            {accountDTO?.interestAmount.toLocaleString()}원
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
                            {/* 계좌원금balance + 세후이자interestAmount */}
                            {(accountDTO?.balance + accountDTO?.interestAmount).toLocaleString()}원
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {/* 하단 주의 문구들 */}
            <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                sx={{ marginLeft: 2, marginRight: 2, marginBottom: 1 }}
            >
                * 위 금액은 현재 납입한 총 원금을 기준으로 산출된 금액으로 향후 고객님의 거래내역
                변동에 따라 실제 해지금액과 달라질 수 있습니다.
            </Typography>
            <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                sx={{ marginLeft: 2, marginRight: 2, marginBottom: 1 }}
            >
                * 중도해지 시 우대금리가 적용되지 않습니다.
            </Typography>
        </>
    );
};

export default CustomDatePage;
