import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import HomeHeader from '../../components/header/HomeHeader';
import Footer from '../../components/footer/Footer';

function Home() {
    const [info, setInfo] = useState(null);
    const [accountStep, setAccountStep] = useState(1);

    // axios 인스턴스
    const api = axios.create({
        baseURL: '/api',
    });

    // 인터셉터
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    // 적금 계좌 현황 (단계, 만기상태)
    const getAccountInfo = () => {
        api.post('/account/current')
            .then((response) => {
                const data = response.data;

                // 단계
                setAccountStep(data.account_step);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 오늘 챌린지 알림
    const checkToday = () => {
        api.post('/notice/daily')
            .then((response) => {})
            .catch((error) => {
                console.error(error);
            });
    };

    // 나무 이미지
    const treeImage = require(`../../image/tree_${accountStep}.png`);

    useEffect(() => {
        getAccountInfo();
        checkToday();
    }, []);

    return (
        <div className="backgrung-img">
            <div className="cloud1"></div>
            <div className="cloud2"></div>
            <HomeHeader />
            <div className="tree-div">
                <img src={treeImage} className="tree-img" />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
