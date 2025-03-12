import React, { useEffect, useState, useRef } from 'react';
//import { getFineDustInfo, getNewsList, getEcoTips } from '../api/topic';
import Header from '../../components/header/Header';
import BottomModal from '../../components/modal/BottomModal';
import Footer from '../../components/footer/Footer';
import { Button } from '@mui/material';
import './Topic.css';
import axios from 'axios';

const Topic = () => {
    const [fineDust, setFineDust] = useState(null);
    const [news, setNews] = useState([]);
    const [ecoTips, setEcoTips] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    const modalRef = useRef();

    //axios
    const api = axios.create({
        baseURL: '/api', // 백엔드 API 주소
        headers: {
            'Content-Type': 'application/json',
        },
    });
    //요청 인터셉터
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

    //미세먼지 정보 가져오기
    const getFineDustInfo = async () => {
        try {
            const response = await api.get('/topic/finedust');
            setFineDust(response.data);
        } catch (error) {
            console.error('미세먼지 정보 가져오기 실패:', error);
        }
    };

    //뉴스 목록 가져오기
    const getNews = async () => {
        try {
            const response = await api.get('/topic/news');
            setNews(response.data);
        } catch (error) {
            console.error('뉴스 목록 가져오기 실패:', error);
        }
    };

    //환경 팁 가져오기
    const getEcoTips = async (category) => {
        try {
            const response = await axios.get(`/api/topic/tips?category=${category}`);
            const allTips = response.data;

            // 무작위로 3개 선택하는 로직
            const shuffled = allTips.sort(() => 0.5 - Math.random());
            const selectedTips = shuffled.slice(0, 3);

            setEcoTips(selectedTips);
        } catch (error) {
            console.error('환경 팁 가져오기 실패!', error);
        }
    };

    //컴포넌트 마운트 시 데이터 요청
    useEffect(() => {
        getFineDustInfo();
        getNews();
        getEcoTips('h&c&s&r');
    }, []);

    //모달 열기
    const openModal = (content) => {
        setModalContent(content);
        if (modalRef.current) {
            modalRef.current.openModal();
        }
    };

    return (
        <div className="topic-container">
            <Header title="토픽" back={false} />

            {fineDust && (
                <div className={`fine-dust ${fineDust.pm10Status}`}>
                    <h2>현재 미세먼지 정보</h2>
                    <p>미세먼지: {fineDust.pm10} µg/m³</p>
                    <p>초미세먼지: {fineDust.pm25} µg/m³</p>
                    <div className="emoji">
                        {fineDust.pm10Status === 'good'
                            ? '😊'
                            : fineDust.pm10Status === 'moderate'
                            ? '😐'
                            : '😢'}
                    </div>
                </div>
            )}

            <div className="news-section">
                <h2>🌱 뉴스</h2>
                {news.map((news, index) => (
                    <div key={index} className="news-item">
                        <h3>
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                {news.title}
                            </a>
                        </h3>
                        <p>{news.summary}</p>
                    </div>
                ))}
            </div>

            <section className="eco-tips-section">
                <h3>🌱 환경 팁</h3>
                {ecoTips.map((tip, index) => (
                    <div key={index} className="eco-tip-item" onClick={() => openModal(tip)}>
                        <h3>{tip.title}</h3>
                        <p>{tip.content}</p>
                    </div>
                ))}
            </section>

            <BottomModal ref={modalRef}>
                {modalContent && (
                    <div>
                        <h2>{modalContent.title}</h2>
                        <p>{modalContent.content}</p>
                        <Button variant="contained" onClick={() => modalRef.current.closeModal()}>
                            닫기
                        </Button>
                    </div>
                )}
            </BottomModal>

            <Footer />
        </div>
    );
};

export default Topic;
