import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import axios from 'axios';
import Login from './page/Login';
import Home from './page/home/Home';
import Notice from './page/home/Notice';
import Start from './page/join/Start';

function App() {
    return (
        <div className="w-100 h-100">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/home" element={<Home />} />
                <Route path="/start" element={<Start />} />
            </Routes>
        </div>
    );
}

export default App;
