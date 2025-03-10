import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

const Aaa = () => {
    // 상태 관리(필요 시 커스텀)
    const [selectedCard, setSelectedCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [isDonationCard, setIsDonationCard] = useState(false);

    // 이벤트 핸들러
    const handleSelectChange = (event) => {
        setSelectedCard(event.target.value);
    };
    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
    };
    const handleCheckboxChange = (event) => {
        setIsDonationCard(event.target.checked);
    };

    return (
        <Box sx={{ paddingTop:5, backgroundColor: '#FAFAFA' }}>
            {/* 상단 제목 */}
            <Typography variant="body1" fontWeight="bold" sx={{ marginBottom: 1 }}>
                카드 연결
            </Typography>

            {/* 카드 선택 */}
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
                    선택
                </Typography>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>선택</InputLabel>
                    <Select value={selectedCard} onChange={handleSelectChange} label="선택">
                        <MenuItem value="">
                            <em>선택</em>
                        </MenuItem>
                        <MenuItem value="Leaf2U">신한 Leaf2U 카드</MenuItem>
                        <MenuItem value="DonationCard">후불 기부동행카드</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* 카드번호 입력 */}
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
                    카드번호 ( - 없이 숫자만 )
                </Typography>
                <TextField
                    fullWidth
                    placeholder="카드번호를 입력해주세요"
                    variant="outlined"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                />
            </Box>
            {/* 기부 동행 카드 체크박스 + 설명 */}
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isDonationCard}
                            onChange={handleCheckboxChange}
                            sx={{
                                color: '#5DB075',
                                '&.Mui-checked': {
                                    color: '#5DB075',
                                },
                            }}
                        />
                    }
                    label={
                        <Typography variant="body2" fontWeight="bold">
                            기후 동행 카드
                        </Typography>
                    }
                />
            </Box>
            <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                sx={{ color: '#388E3C' }}
            >
                * 기존 보유하고 계신 신한 Leaf2U 카드 등록 시 우대금리 연 +2.00% <br />* 후불
                기후동행카드 등록 시 우대금리 연 +1.00 %
            </Typography>

            {/* 카드 START */}
            <Card
                variant="outlined"
                sx={{ borderRadius: 2, marginBottom: 2, marginTop: 4, height: 'auto' }}
            >
                <CardContent>
                    {/* 내용 부분 */}
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                                marginTop: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                매일 납입 금액
                            </Typography>
                            <Typography variant="body2">10,000원</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                적금기간
                            </Typography>
                            <Typography variant="body2">30일</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                적금방식
                            </Typography>
                            <Typography variant="body2">1일 1회 직접입금</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                최고 적용 금리
                            </Typography>
                            <Typography variant="body2">연 8.00%</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 0,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                만기설정
                            </Typography>
                            <Typography variant="body2">만기 시 직접 해지</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            {/* 카드 END */}
            <Typography variant="caption" display="block" color="text.secondary">
                * 최고 적용금리 6.00% = 기본금리 1.00% + 30일 성공 시 3.00% + 연속 보너스 2.00% +
                최초 가입 2.00%
            </Typography>
        </Box>
    );
};

export default Aaa;
