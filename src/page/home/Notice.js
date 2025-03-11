import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import NoticeBox from '../../components/box/NoticeBox';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notice = () => {
    const [prevList, setPrevList] = useState([]);
    const [todayList, setTodayList] = useState([]);

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

    // 알림 리스트
    const getNoticeList = () => {
        api.post('/notice/list')
            .then((response) => {
                setPrevList(response.data.prev_list || []);
                setTodayList(response.data.today_list || []);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getNoticeList();
    }, []);

    return (
        <div>
            <Header title="알림" />
            <Content>
                <div className="p-3">
                    {todayList.length > 0 && (
                        <div className="notice-field">
                            <p className="ms-2">
                                <b>오늘</b>
                            </p>
                            {todayList.map((notice, index) => (
                                <NoticeBox
                                    key={`today-${index}`}
                                    title={notice.title}
                                    content={notice.content}
                                    time={notice.timeAgo}
                                />
                            ))}
                        </div>
                    )}

                    {prevList.length > 0 && (
                        <div className="notice-field">
                            <p className="ms-2">
                                <b>이전</b>
                            </p>
                            {prevList.map((notice, index) => (
                                <NoticeBox
                                    key={`prev-${index}`}
                                    title={notice.title}
                                    content={notice.content}
                                    time={notice.formatedDate}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Content>
            <Footer />
        </div>
    );
};

export default Notice;
