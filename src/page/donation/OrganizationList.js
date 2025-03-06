import React, { useState } from 'react';
import { Tabs, Tab, Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const TabPanel = ({ value, index, children }) => {
    return (
        <div role="tabpanel" hidden={value !== index} style={{ padding: '20px' }}>
            {value === index && <>{children}</>}
        </div>
    );
};

const CardAccountPage = () => {
    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    신한카드 Leaf2U
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    110-123-456789
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    적금 입금 시, 연결카드에서 출금되며 해지할 경우 원금과 이자가 연결카드로
                    입금됩니다.
                </Typography>
            </CardContent>
        </Card>
    );
};

const DepositAccountPage = () => {
    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    리프적금
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    235-987-654321
                </Typography>
                <Box mt={2} sx={{ background: '#F8F9FA', borderRadius: 2, p: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                                상품명
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant="body2">한달 리프적금</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                                개설일
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant="body2">2025-02-01</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                                만기일
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant="body2">2025-03-02</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                                잔액
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant="body2">360,000원</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                                적용금리
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant="body2">
                                기본금리 1.00% <br />
                                우대금리 5.40%
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                                과세구분
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant="body2">일반과세</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={2} sx={{ background: '#FFFFFF', borderRadius: 2, boxShadow: 1 }}>
                    <Button
                        fullWidth
                        variant="text"
                        sx={{ justifyContent: 'space-between', px: 2 }}
                    >
                        납입금액 <Typography fontWeight="bold">매일 30,000원</Typography>
                    </Button>
                    <Button fullWidth variant="text" sx={{ justifyContent: 'flex-start', px: 2 }}>
                        이자조회
                    </Button>
                    <Button fullWidth variant="text" sx={{ justifyContent: 'flex-start', px: 2 }}>
                        해지
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

const OrganizationList = () => {
    const [tabIndex, setTabIndex] = useState(1);

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', textAlign: 'center' }}>
            <Box display="flex" justifyContent="center" gap={1} my={2}>
                <Button
                    variant={tabIndex === 0 ? 'contained' : 'outlined'}
                    color="success"
                    sx={{ width: 120, borderRadius: 5 }}
                    onClick={() => setTabIndex(0)}
                >
                    연결 카드
                </Button>
                <Button
                    variant={tabIndex === 1 ? 'contained' : 'outlined'}
                    color="success"
                    sx={{ width: 120, borderRadius: 5 }}
                    onClick={() => setTabIndex(1)}
                >
                    적금 계좌
                </Button>
            </Box>

            <TabPanel value={tabIndex} index={0}>
                <CardAccountPage />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <DepositAccountPage />
            </TabPanel>
        </Box>
    );
};

export default OrganizationList;
