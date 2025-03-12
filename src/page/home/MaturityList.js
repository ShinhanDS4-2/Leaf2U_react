import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import OrganizationButton from '../../components/item/OrganizationButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MaturityList = () => {
    const navigate = useNavigate();

    const data = { title: '생명의 숲' };
    const [list, setList] = useState([]);

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
    const getOrganizationList = () => {
        api.get('/donation/organizationList')
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getOrganizationList();
    }, []);

    return (
        <div>
            <Header title="만기해지" />
            <Content>
                <div>
                    <p className="small text-center mt-3">후원할 단체를 선택해 주세요.</p>
                </div>
                <div>
                    <OrganizationButton data={data} />
                    <OrganizationButton data={data} />
                    <OrganizationButton data={data} />
                    <OrganizationButton data={data} />
                </div>
            </Content>
            <div className="maturity-button-field">
                <Button
                    text="다음"
                    onClick={() => {
                        navigate('/home/maturityRate');
                    }}
                />
            </div>
            <Footer />
        </div>
    );
};

export default MaturityList;
