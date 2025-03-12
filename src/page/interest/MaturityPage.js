import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

// 날짜형식 변환 YYYY-MM-DD
const formatDate = (date) => {
    if (date != null) return date.substring(0, 10);
};

// (1) 만기일 탭 페이지
const MaturityPage = ({ interestData }) => {
    // ㄴ interestData에는 accountDTO, rateSumMap 들어있음
    const accountDTO = interestData?.accountDTO;
    const rateSumMap = interestData?.rateSumMap;
    return (
        <>
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
                            {formatDate(accountDTO?.createDate)} ~{' '}
                            {formatDate(accountDTO?.maturityDate)}
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
                        <Typography variant="body2">{accountDTO?.interestRate} %</Typography>
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
                        <Typography variant="body2"> 연 {accountDTO?.primeRate}% 반영</Typography>
                    </Box>

                    {/* [우대금리에 대한 세부 항목을 보여줄 작은 박스 START */}
                    <Box
                        sx={{
                            backgroundColor: '#F5F5F5', // F5F5F5 연회색
                            borderRadius: 1,
                            border: '3px solid #F5F5F5', // 테두리 두께와 색상 지정
                            padding: 1,
                            marginBottom: 2,
                        }}
                    >
                        {/* 금리타입 별 우대금리가 있는 경우에만 조건부 렌더링 */}

                        {/* 카드발급 우대금리 택1 (C:전용카드/E:기후동행카드)*/}
                        {rateSumMap?.rateC != null && rateSumMap?.rateC !== 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    카드 발급
                                </Typography>
                                <Typography variant="body2">{rateSumMap?.rateC} %</Typography>
                            </Box>
                        )}
                        {rateSumMap?.rateE != null && rateSumMap?.rateE !== 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    카드 발급
                                </Typography>
                                <Typography variant="body2">{rateSumMap?.rateE} %</Typography>
                            </Box>
                        )}
                        {/* F:최초금리 */}
                        {rateSumMap?.rateF != null && rateSumMap?.rateF !== 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    최초 가입
                                </Typography>
                                <Typography variant="body2">{rateSumMap?.rateF} %</Typography>
                            </Box>
                        )}
                        {/* D: 매일금리 */}
                        {rateSumMap?.rateD != null && rateSumMap?.rateD !== 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    매일 우대금리
                                </Typography>
                                <Typography variant="body2">{rateSumMap?.rateD} %</Typography>
                            </Box>
                        )}
                        {/* W:연속금리 */}
                        {rateSumMap?.rateW != null && rateSumMap?.rateW !== 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    연속 보너스 우대금리
                                </Typography>
                                <Typography variant="body2">{rateSumMap?.rateW} %</Typography>
                            </Box>
                        )}
                    </Box>
                    {/* [우대금리에 대한 세부 항목을 보여줄 작은 박스 END */}

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
                sx={{ marginBottom: 1 }}
            >
                * 위 금리는 만기에 해지하는 경우 받을 수 있는 예상 금리이며, 중도해지 시 가입 시점
                기본 금리가 적용됩니다.
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
                * 위 금액은 현재 납입한 총 원금을 기준으로 산출된 금액으로 향후 고객님의 거래내역
                변동에 따라 실제 해지금액과 달라질 수 있습니다.
            </Typography>
        </>
    );
};

export default MaturityPage;
