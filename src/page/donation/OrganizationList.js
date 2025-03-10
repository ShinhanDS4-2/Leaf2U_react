import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import React, { useState } from 'react';
import { Tabs, Tab, Box, Card, CardContent, Typography, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const TabPanel = ({ value, index, children }) => {
    return (
        <div role="tabpanel" hidden={value !== index} style={{ padding: '20px' }}>
            {value === index && <>{children}</>}
        </div>
    );
};

const CardInfoPage = () => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    신한카드 Leaf2U
                </Typography>
                <Typography variant="body2">카드 번호: 110-123-456789</Typography>
                <Typography variant="body2" color="text.secondary">
                    적금 입금 시, 연결카드에서 출금되며 해지할 경우 원금과 이자가 연결카드로
                    입금됩니다.
                </Typography>
            </CardContent>
        </Card>
    );
};

const AccountInfoPage = () => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    리프적금
                </Typography>
                <Typography variant="body2">계좌번호: 235-987-654321</Typography>
                <Typography variant="body2">잔액: 360,000원</Typography>
                <Typography variant="body2">기본금리: 1.00% / 우대금리: 5.40%</Typography>
                <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth>
                        납입금액 설정 (매일 30,000원)
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

const OrganizationList = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs
                value={tabIndex}
                onChange={(e, newIndex) => setTabIndex(newIndex)}
                centered
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="연결 카드" />
                <Tab label="적금 계좌" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <CardInfoPage />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <AccountInfoPage />
            </TabPanel>
        </Box>
    );
};

export default OrganizationList;
