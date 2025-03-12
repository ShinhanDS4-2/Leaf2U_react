import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import AlertModal from '../../components/modal/AlertModal';
import OrganizationButton from '../../components/item/OrganizationButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MaturityList = () => {
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [select, setSelect] = useState(null);

    // alert
    const alertRef = useRef();
    const handleOpenAlert = () => {
        if (alertRef.current) {
            alertRef.current.openModal();
        }
    };

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

    // 선택한 단체 저장
    const handleSelect = (idx) => {
        setSelect(idx);
    };

    // 다음 버튼 클릭
    const handleClickNext = () => {
        if (select != null) {
            navigate('/home/maturityRate');
        } else {
            handleOpenAlert();
        }
    };

    useEffect(() => {
        getOrganizationList();
    }, []);

    return (
        <div>
            <Header title="만기해지" />
            <Content>
                <div>
                    <p className="small text-center mt-3">
                        후원할 단체를 선택해 주세요.
                        <br /> 아이콘을 클릭하면 상세 정보로 이동합니다.
                    </p>
                </div>
                <div>
                    {list.map((organization, index) => (
                        <OrganizationButton
                            key={organization.organizationIdx}
                            data={organization}
                            isSelected={select === organization.organizationIdx}
                            onClick={() => handleSelect(organization.organizationIdx)}
                        />
                    ))}
                </div>
            </Content>
            <div className="maturity-button-field">
                <Button text="다음" onClick={handleClickNext} />
            </div>
            <Footer />
            <div onClick={handleOpenAlert}>Alert 모달 이벤트</div>
            <AlertModal
                ref={alertRef}
                text={'<span>후원 단체를 선택해 주세요.</span>'}
                onClick={() => {
                    return;
                }}
            />
        </div>
    );
};

export default MaturityList;
