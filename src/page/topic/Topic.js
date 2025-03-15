import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/header/Header';
import BottomModal from '../../components/modal/BottomModal';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import './Topic.css';
import api from '../../utils/api';
import Content from '../../components/content/Content';
import { Icon } from '@iconify/react/dist/iconify.js';

const Topic = () => {
    const [fineDust, setFineDust] = useState(null);
    const [news, setNews] = useState([]);
    const [ecoTips, setEcoTips] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    const modalRef = useRef();

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
    const getEcoTips = async () => {
        try {
            const response = await api.get('/topic/tips');
            setEcoTips(response.data);
        } catch (error) {
            console.error('환경 팁 가져오기 실패!', error);
        }
    };

    //컴포넌트 마운트 시 데이터 요청
    useEffect(() => {
        getFineDustInfo();
        getNews();
        getEcoTips();
    }, []);

    //모달 열기
    const openModal = (content) => {
        setModalContent(content);
        if (modalRef.current) {
            modalRef.current.openModal();
        }
    };

    // 오늘 날짜 
    const getFormattedDate = () => {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
    }

    return (
        <div>
            <Header title="토픽" back={false} />

            <Content>
                {fineDust && (
                    <div className={`fine-dust ${fineDust.pm10Status}`}>
                        <div className='d-flex justify-content-between row'>
                            <div className='col-8 ps-3'>
                                <div className='text-start'>
                                    <span className='dust-title'>현재 미세먼지 정보</span>
                                </div>
                                <div className='text-end pe-1 pt-0 mt-0 dust-date-div'>
                                    <span className='dust-date'>{getFormattedDate()}</span>
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <div className='text-start'>
                                        <span className='dust-subtitle'>미세먼지</span>
                                        <span className='dust-num'>{fineDust.pm10} µg/m³</span>
                                    </div>
                                    <div className='text-start ps-4'>
                                        <span className='dust-subtitle'>초미세먼지</span>
                                        <span className='dust-num'>{fineDust.pm25} µg/m³</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 p-1">
                                {fineDust.pm10Status === 'good'
                                    ? <Icon icon="icon-park-outline:grinning-face" width="100px" height="100px"  style={{color: '#fdfdfd'}} />
                                    : fineDust.pm10Status === 'moderate'
                                    ? <Icon icon="icon-park-outline:confused-face" width="100px" height="100px"  style={{color: '#fdfdfd'}} />
                                    : <Icon icon="akar-icons:face-very-sad" width="100px" height="100px"  style={{color: '#fdfdfd'}} />
                                }
                            </div>
                        </div>
                    </div>
                )}

                <div className="news-section">
                    <span className='news-main ps-1'>오늘의 녹색 뉴스</span>

                    <div className='mt-2'>
                        {news.map((news, index) => (
                            <div key={index} className="news-item" onClick={() => {window.location.href = news.url}}>
                                <div className='row d-flex'>
                                    <div className='col-3 align-content-center'>
                                        <div className='news-img'>
                                            <img src={news.urlToImage}/>
                                        </div>
                                    </div>
                                    <div className='col-9'>
                                        <span className='news-title'>
                                            {news.title}
                                        </span>
                                        <span className='news-date'>
                                            {news.date}
                                        </span>
                                        <p className='news-desc'>{news.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="eco-tips mt-3">
                    {ecoTips.map((tip, index) => (
                        <div key={index} className="eco-tip-item" onClick={() => openModal(tip)}>
                            <Icon icon="mdi:sprout" width="2em" height="2em"  style={{color: '#5DB075'}} />
                            <p className='ms-2 me-2'>TIP</p>
                            <span className='tip-title'>{tip.title}</span>
                        </div>
                    ))}
                </div>
            </Content>

            <BottomModal ref={modalRef}>
                {modalContent && (
                    <div className='p-3'>
                        <p className='pt-4 pb-5'>{modalContent.content}</p>
                        <Button text={'확인'} onClick={() => modalRef.current.closeModal()}>
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
