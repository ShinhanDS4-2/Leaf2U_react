import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import Loading from './components/loading/Loading';
import { setupAxiosInterceptors } from './utils/api';
import { MaturityProvider } from './context/MaturityContext';

import Login from './page/join/login/Login';
import Home from './page/home/Home';
import HomeNotice from './page/home/Notice';
import Maturity from './page/home/Maturity';
import MaturityList from './page/home/MaturityList';
import MaturityRate from './page/home/MaturityRate';
import MaturityResult from './page/home/MaturityResult';
import HomeTermination from './page/home/Termination';

import Start from './page/join/start/Start';
import Notice from './page/join/notice/Notice';
import Payment from './page/join/payment/Payment';
import CardHome from './page/Card/cardHome/CardHome';
import CardNotice from './page/Card/cardNotice/CardNotice';
import CardJoin from './page/Card/cardJoin/CardJoin';
import CardDetail from './page/Card/cardDetail/CardDetail';

import OrganizationList from './page/donation/OrganizationList';
import HistoryList from './page/donation/HistoryList';
import HistoryDetail from './page/donation/HistoryDetail';
import ManageAccount from './page/account/ManageAccount';
import Termination from './page/account/Termination';
import InterestMainPage from './page/interest/InterestMainPage';
import Aaa from './page/account/Aaa';
import Paymentaaaaa from './page/account/Paymentaaaaa';
import Deposit from './page/deposit/Deposit';
import Image from './page/deposit/Image';

import Example from './page/Example';
import Topic from './page/topic/Topic';

const theme = createTheme({
    typography: {
        fontFamily: 'MapoPeacefull, sans-serif',
    },
});

function AppContent() {
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        setupAxiosInterceptors(startLoading, stopLoading);
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <div className="w-100 h-100">
                <MaturityProvider>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/home/notice" element={<HomeNotice />} />
                        <Route path="/home/maturity" element={<Maturity />} />
                        <Route path="/home/maturityList" element={<MaturityList />} />
                        <Route path="/home/maturityRate" element={<MaturityRate />} />
                        <Route path="/home/maturityResult" element={<MaturityResult />} />
                        <Route path="/home/termination" element={<HomeTermination />} />

                        {/* 현욱 페이지 START */}
                        <Route path="/" element={<Login />} />
                        <Route path="/start" element={<Start />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/notice" element={<Notice />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/cardHome" element={<CardHome />} />
                        <Route path="/leaf" element={<CardNotice />} />
                        <Route path="/cardjoin" element={<CardJoin />} />
                        <Route path="/cardDetail" element={<CardDetail />} />

                        {/* 시온 페이지 START */}
                        <Route path="/organizationList" element={<OrganizationList />} />
                        <Route path="/historyList" element={<HistoryList />} />
                        {/* 후원내역 상세 페이지 (동적 라우팅) */}
                        <Route path="/historyDetail/:idx" element={<HistoryDetail />} />
                        <Route path="/termination" element={<Termination />} />
                        <Route path="/interestMainPage" element={<InterestMainPage />} />

                        {/* 시온 해야함 */}
                        <Route path="/manageAccount" element={<ManageAccount />} />
                        <Route path="/aaa" element={<Aaa />} />
                        <Route path="/paymentaaaaa" element={<Paymentaaaaa />} />

                        {/* 시온 페이지 END */}

                        {/* 동근 페이지 START */}
                        <Route path="/deposit" element={<Deposit />} />
                        <Route path="/image" element={<Image />} />

                        <Route path="/topic" element={<Topic />} />

                        <Route path="/example" element={<Example />} />
                    </Routes>
                </MaturityProvider>
            </div>
        </>
    );
}

function App() {
    return (
        <LoadingProvider>
            <ThemeProvider theme={theme}>
                <AppContent />
            </ThemeProvider>
        </LoadingProvider>
    );
}

export default App;
