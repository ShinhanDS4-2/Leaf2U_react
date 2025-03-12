import React, { useEffect, useState, useRef } from 'react';
import { getFineDustInfo, getNewsList, getEcoTips } from '../api/topic';
import Header from '../../../components/Header';
import BottomModal from '../../../components/BottomModal';
import Footer from '../../../components/Footer';
import { Button } from '@mui/material';
import './Topic.css';

const Topic = () => {
    const [fineDust, setFineDust] = useState(null);
    const [newsList, setNewsList] = useState([]);
    const [ecoTips, setEcoTips] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    const modalRef = useRef();

    useEffect(() => {
        getFineDustInfo().then(setFineDust);
        getNewsList().then(setNewsList);
        getEcoTips().then(setEcoTips);
    }, []);

    // 모달 열기
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
                <div className={`fine-dust ${fineDust.status}`}>
                    <h2>현재 미세먼지 정보</h2>
                    <p>미세먼지: {fineDust.pm10} µg/m³</p>
                    <p>초미세먼지: {fineDust.pm2_5} µg/m³</p>
                    <div className="emoji">
                        {fineDust.status === 'good'
                            ? '😊'
                            : fineDust.status === 'moderate'
                            ? '😐'
                            : '😢'}
                    </div>
                </div>
            )}

            <section className="news-section">
                <h2>뉴스</h2>
                {newsList.map((news, index) => (
                    <div key={index} className="news-item" onClick={() => openModal(news)}>
                        <h3>{news.title}</h3>
                        <p>{news.summary}</p>
                    </div>
                ))}
            </section>

            <section className="eco-tips-section">
                <h2>환경 팁</h2>
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
