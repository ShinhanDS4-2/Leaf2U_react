import React, { createContext, useState, useContext } from 'react';

// Context 생성
const MaturityContext = createContext();

// Context Provider 컴포넌트
export const MaturityProvider = ({ children }) => {
    const [accountInfo, setAccountInfo] = useState(null); // 원금, 금리, 이자
    const [card, setCard] = useState(null); // 카드 계좌좌
    const [point, setPoint] = useState(null); // 포인트
    const [organizationIdx, setOrganizationIdx] = useState(null); // 선택한 후원 단체
    const [donationInfo, setDonationInfo] = useState(null); // 후원 정보
    const [finalBalance, setFinalBalance] = useState(null);

    return (
        <MaturityContext.Provider
            value={{
                accountInfo,
                setAccountInfo,
                card,
                setCard,
                point,
                setPoint,
                organizationIdx,
                setOrganizationIdx,
                donationInfo,
                setDonationInfo,
                finalBalance, 
                setFinalBalance
            }}
        >
            {children}
        </MaturityContext.Provider>
    );
};

// Context 사용을 쉽게 하기 위한 커스텀 훅
export const useMaturity = () => useContext(MaturityContext);
