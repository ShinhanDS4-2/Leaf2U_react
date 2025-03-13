import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

// 날짜형식 변환 YYYY-MM-DD
const formatDate = (date) => {
    if (date != null) return date.substring(0, 10);
};

// 카드 정보 페이지
const CardInfoPage = ({ interestData }) => {
    // ㄴ interestData에는 accountDTO 들어있음
    const accountDTO = interestData?.accountDTO;
    return (
        <>
            <Box sx={{ padding: 2 }}>
                {/* 제목 */}
                <Typography variant="subtitle1" fontWeight="bold">
                    연결 카드/계좌
                </Typography>

                {/* 카드 이미지 */}
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        width: 320,
                        height: 180,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f0f0f0',
                        marginTop: 1,
                    }}
                >
                    이미지
                    {/* <img
                           src={cardImage}
                           alt="카드 이미지"
                           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                       /> */}
                </Card>

                {/* 카드 정보 */}
                <CardContent sx={{ padding: 0, marginTop: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        카드이름
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        카드넘버
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ marginTop: 3, textAlign: 'center' }}
                    >
                        적금 입금 시, 연결카드에서 출금되며 <br />
                        해지할 경우 원금과 이자가 연결카드로 입금됩니다.
                    </Typography>
                </CardContent>
            </Box>
        </>
    );
};

export default CardInfoPage;
