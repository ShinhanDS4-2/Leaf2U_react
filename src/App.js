import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/home/Home';
import Notice from './page/join/Notice';
import Start from './page/join/Start';
import Payment from './page/join/Payment';
import CardHome from './page/Card/CardHome';

import OrganizationList from './page/donation/OrganizationList';
import HistoryList from './page/donation/HistoryList';
import OrganizationDetail from './page/donation/OrganizationDetail';
import HistoryDetail from './page/donation/HistoryDetail';
import ManageAccount from './page/account/ManageAccount';
import Termination from './page/account/Termination';
import Aaa from './page/account/Aaa';
import CardNotice from './page/Card/CardNotice';
import CardJoin from './page/Card/CardJoin';

import Example from './page/Example';

function App() {
    return (
        <div className="w-100 h-100">
            <Routes>

                <Route path="/home" element={<Home />} />

                {/* 현욱 페이지 START */}
                <Route path="/" element={<Login />} />
                <Route path="/start" element={<Start />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/payment" element={<Payment/>} />
                <Route path="/cardHome" element={<CardHome/>} />
                <Route path="/leaf" element={<CardNotice />} />
                <Route path="/cardjoin" element={<CardJoin />} />

                {/* 시온 페이지 START */}
                <Route path="/organizationList" element={<OrganizationList />} />
                <Route path="/organizationDetail" element={<OrganizationDetail />} />
                <Route path="/historyList" element={<HistoryList />} />
                <Route path="/historyDetail" element={<HistoryDetail />} />
                <Route path="/manageAccount" element={<ManageAccount />} />
                <Route path="/termination" element={<Termination />} />
                <Route path="/aaa" element={<Aaa />} />

                {/* 시온 페이지 END */}
                
                <Route path="/example" element={<Example />} />
            </Routes>
        </div>
    );
}

export default App;
