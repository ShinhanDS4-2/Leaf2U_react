import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import axios from 'axios';
import Login from './page/Login';
import Home from './page/home/Home';
import Notice from './page/home/Notice';
import Start from './page/join/Start';
import Payment from './page/home/Payment';

import OrganizationList from './page/donation/OrganizationList';
import HistoryList from './page/donation/HistoryList';
import OrganizationDetail from './page/donation/OrganizationDetail';
import HistoryDetail from './page/donation/HistoryDetail';
import ManageAccount from './page/account/ManageAccount';
import Termination from './page/account/Termination';
import Aaa from './page/account/Aaa';

function App() {
    return (
        <div className="w-100 h-100">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/home" element={<Home />} />
                <Route path="/start" element={<Start />} />
                <Route path="/payment" element={<Payment />} />

                {/* 시온 페이지 START */}
                <Route path="/organizationList" element={<OrganizationList />} />
                <Route path="/organizationDetail" element={<OrganizationDetail />} />
                <Route path="/historyList" element={<HistoryList />} />
                <Route path="/historyDetail" element={<HistoryDetail />} />
                <Route path="/manageAccount" element={<ManageAccount />} />
                <Route path="/termination" element={<Termination />} />
                <Route path="/aaa" element={<Aaa />} />

                {/* 시온 페이지 END */}
            </Routes>
        </div>
    );
}

export default App;
