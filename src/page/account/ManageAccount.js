import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import CardInfoPage from '../../page/account/CardInfoPage'; // 카드정보 Page
import AccountInfoPage from '../../page/account/AccountInfoPage'; // 계좌정보 Page
import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))

// axios 인스턴스(api) 및 인터셉터 자동추가됨 -> api이름으로 사용

// 커스텀 탭
const CustomTabs = ({ value, onChange }) => {
    return (
        <Tabs
            value={value} // 탭 인덱스 값
            onChange={onChange} // 부모에서 받은 onChange 사용
            variant="fullWidth"
            sx={{
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTab-root': {
                    borderRadius: '10px',
                    fontWeight: 'bold',
                },
                '& .Mui-selected': {
                    backgroundColor: '#4CAF50',
                    color: 'white !important', // 왜인지 모르겠는데 글자색상 하얀색으로 적용안됨. . // !important를 추가해 우선순위 높였음
                },
                marginBottom: 2,
            }}
        >
            <Tab label="연결 카드" /> {/* 0 */}
            <Tab label="적금 계좌" /> {/* 1 */}
        </Tabs>
    );
};

// 메인 함수
const ManageAccount = () => {
    const [tabIndex, setTabIndex] = useState(0); // 선택된 탭의 인덱스를 관리
    const [apiData, setApiData] = useState(null); // API에서 가져온 데이터

    // 현재 선택된 탭의 index와 비교하여 렌더링
    const TabPanel = ({ children, value, index }) => {
        return value === index ? <div>{children}</div> : null;
    }; // value와 index 값이 같으면 children(탭에 들어올 페이지 지정) 반환

    // (1) 카드 기본정보 조회 API
    // @param 없음
    // @return cardDTO
    const getCardInfo = () => {
        api.get('/card/info')
            .then((response) => {
                const data = response.data; // API 호출 응답값: cardDTO
                setApiData(data);

                console.log('✅ getCardInfo API 응답 성공: ', data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // (2) 계좌 기본정보 조회 API
    // @param 없음
    // @return accountDTO
    const getAccountInfo = () => {
        api.get('/account/info')
            .then((response) => {
                const data = response.data; // API 호출 응답값: accountDTO
                setApiData(data);

                console.log('✅ accountInfo API 응답 성공: ', data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (tabIndex === 0) {
            getCardInfo(); // (1) 카드 기본정보 조회 API
        } else if (tabIndex === 1) {
            getAccountInfo(); // (2) 계좌 기본정보 조회 API
        }
    }, [tabIndex]); // tabIndex가 변경될 때마다 호출됨

    return (
        <>
            {/* 뒤로가기 아이콘 없는 헤더 */}
            <Header title="카드 / 계좌" />
            <Content>
                {/* ✅ CustomTabs에 상태와 변경 함수 전달 */}
                <CustomTabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                />
                {/* TabPanel은 value와 index를 props로 받아, value와 index가 같을 때 해당 내용을 보여줌 */}
                <TabPanel value={tabIndex} index={0}>
                    {/* 각 api 호출하고 나온 결과 값 interestData 넘겨줌 */}
                    <CardInfoPage apiData={apiData} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <AccountInfoPage apiData={apiData} />
                </TabPanel>
            </Content>
            <Footer />
        </>
    );
};

export default ManageAccount;
