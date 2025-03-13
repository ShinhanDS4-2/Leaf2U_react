import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Login from './page/join/login/Login';
import Home from './page/home/Home';
import HomeNotice from './page/home/Notice';
import Maturity from './page/home/Maturity';
import MaturityList from './page/home/MaturityList';
import MaturityRate from './page/home/MaturityRate';
import MaturityResult from './page/home/MaturityResult';

import Start from './page/join/start/Start';
import Notice from './page/join/notice/Notice';
import Payment from './page/join/payment/Payment';
import CardHome from './page/Card/cardHome/CardHome';
import CardNotice from './page/Card/cardNotice/CardNotice';
import CardJoin from './page/Card/cardJoin/CardJoin';
import CardDetail from './page/Card/cardDetail/CardDetail';

import OrganizationList from './page/donation/OrganizationList';
import HistoryList from './page/donation/HistoryList';
import OrganizationDetail from './page/donation/OrganizationDetail';
import HistoryDetail from './page/donation/HistoryDetail';
import ManageAccount from './page/account/ManageAccount';
import Termination from './page/account/Termination';
import Interest from './page/account/Interest';
import Aaa from './page/account/Aaa';
import Deposit from './page/deposit/Deposit';
import Image from './page/deposit/Image';

import Example from './page/Example';
import Topic from './page/topic/Topic';
import Point from './page/point/Point';

const theme = createTheme({
    typography: {
        fontFamily: 'MapoPeacefull, sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="w-100 h-100">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/notice" element={<HomeNotice />} />
                    <Route path="/home/maturity" element={<Maturity />} />
                    <Route path="/home/maturityList" element={<MaturityList />} />
                    <Route path="/home/maturityRate" element={<MaturityRate />} />
                    <Route path="/home/maturityResult" element={<MaturityResult />} />

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
                    <Route path="/organizationDetail" element={<OrganizationDetail />} />
                    <Route path="/historyList" element={<HistoryList />} />
                    <Route path="/manageAccount" element={<ManageAccount />} />
                    <Route path="/termination" element={<Termination />} />
                    <Route path="/aaa" element={<Aaa />} />
                    {/* 후원내역 상세 페이지 (동적 라우팅) */}
                    <Route path="/historyDetail/:idx" element={<HistoryDetail />} />
                    <Route path="/interest" element={<Interest />} />

                    {/* 시온 페이지 END */}

                    {/* 동근 페이지 START */}
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/image" element={<Image />} />

                    <Route path="/example" element={<Example />} />
                    <Route path="/topic" element={<Topic />} />

                    {/*상욱 페이지 START */}
                    <Route path="/point" element={<Point />} />
                    {/* <Route path="/pedometer" element={<Pedometer />} />
                    <Route path="/quiz" element={<Quiz />} /> */}
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
