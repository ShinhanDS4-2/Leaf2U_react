import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Login from './page/join/login/Login';
import Home from './page/home/Home';
import HomeNotice from './page/home/Notice';

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
import Interest from './page/account/Interest';
import Aaa from './page/account/Aaa';
import Deposit from './page/deposit/Deposit';
import Image from './page/deposit/Image';

import Example from './page/Example';

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

                    {/* 해야할페이지 */}
                    <Route path="/interest" element={<Interest />} />
                    <Route path="/manageAccount" element={<ManageAccount />} />
                    <Route path="/aaa" element={<Aaa />} />

                    {/* 시온 페이지 END */}

                    {/* 동근 페이지 START */}
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/image" element={<Image />} />

                    <Route path="/example" element={<Example />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
