import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import MaturityPage from './MaturityPage'; // 만기일 이자조회 Page
import TodayPage from './TodayPage'; // 오늘 이자조회 Page
import CustomDatePage from './CustomDatePage'; // 직접입력 이자조회 Page
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
                    color: 'white',
                },
                marginBottom: 2,
            }}
        >
            <Tab label="만기일" /> {/* 0 */}
            <Tab label="오늘" /> {/* 1 */}
            <Tab label="직접입력" /> {/* 2 */}
        </Tabs>
    );
};

// 메인 함수
const InterestMainPage = () => {
    const [tabIndex, setTabIndex] = useState(0); // 선택된 탭의 인덱스를 관리
    const [interestData, setInterestData] = useState(null); // API에서 가져온 데이터

    // 현재 선택된 탭의 index와 비교하여 렌더링
    const TabPanel = ({ children, value, index }) => {
        return value === index ? <div>{children}</div> : null;
    }; // value와 index 값이 같으면 children(탭에 들어올 페이지 지정) 반환

    // (3-1) 예상이자조회(만기일 해지) API
    const getMaturityInterest = () => {
        api.get('/account/interest/maturity')
            .then((response) => {
                const data = response.data; // API 호출 응답값: rateSumMap, accountDTO
                setInterestData(data);
                console.log('(3-1) 예상이자조회(만기일 해지) API 응답값: ', data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // (3-2) 예상이자조회(오늘 해지) API
    const getTodayInterest = () => {
        api.get('/account/interest/today')
            .then((response) => {
                const data = response.data; // API 호출 응답값: accountDTO
                setInterestData(data);

                console.log('(3-2) 예상이자조회(오늘 해지) API 응답값: ', data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 클라이언트로부터 입력받은 종료일 예시
    const endDate = '2025-03-15'; // 지워야함

    // API에서 @RequestParam을 사용하여 endDate 값을 받고있기 때문에 URL 쿼리 파라미터로 endDate를 전달해야함
    // 예시 => /api/account/interest/customDate?endDate=2025-03-05
    // (3-3) 예상이자조회(선택일자 해지) API
    const getCustomDateInterest = (customDate) => {
        api.get('/account/interest/customDate', {
            params: {
                endDate: customDate, // 쿼리 파라미터로 사용자로부터 입력받은 customDate 전달
            },
        })
            .then((response) => {
                const data = response.data; // API 호출 응답값: accountDTO
                setInterestData(data);

                console.log('(3-3) 예상이자조회(선택일자 해지) API 응답값: ', data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (tabIndex === 0) {
            getMaturityInterest(); // (3-1) 예상이자조회(만기일 해지) API
        } else if (tabIndex === 1) {
            getTodayInterest(); // (3-2) 예상이자조회(오늘 해지) API
        } else if (tabIndex === 2) {
            getCustomDateInterest(endDate); // (3-3) 예상이자조회(선택일자 해지) API
        }
    }, [tabIndex]); // tabIndex가 변경될 때마다 호출됨

    return (
        <>
            {/* 뒤로가기 아이콘 없는 헤더 */}
            <Header title="이자조회" />
            <Content>
                {/* ✅ CustomTabs에 상태와 변경 함수 전달 */}
                <CustomTabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                />
                {/* TabPanel은 value와 index를 props로 받아, value와 index가 같을 때 해당 내용을 보여줌 */}
                <TabPanel value={tabIndex} index={0}>
                    {/* 각 api 호출하고 나온 결과 값 interestData 넘겨줌 */}
                    <MaturityPage interestData={interestData} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <TodayPage interestData={interestData} />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <CustomDatePage interestData={interestData} />
                </TabPanel>
            </Content>
            <Footer />
        </>
    );
};

export default InterestMainPage;
