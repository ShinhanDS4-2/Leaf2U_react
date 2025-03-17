import React, { createContext, useState, useContext } from 'react';

// Context 생성
const RateContext = createContext();

// Context Provider 컴포넌트
export const RateProvider = ({ children }) => {
    const [prevCardYN, setPrevCardYN] = useState('N'); // 기존 전용 카드 가입 여부
    const [cardYN, setCardYN] = useState('N'); // 전용 카드 가입 여부
    const [firstYN, setFirstYN] = useState('N'); // 최초 가입 여부
    const [rate, setRate] = useState(6); // 적용 금리
    const [cardBankName, setCardBankName] = useState('');
    const [cardNum, setCardNum] = useState('');

    return (
        <RateContext.Provider
            value={{
                prevCardYN,
                setPrevCardYN,
                cardYN,
                setCardYN,
                firstYN,
                setFirstYN,
                rate,
                setRate,
                cardBankName,
                setCardBankName,
                cardNum,
                setCardNum,
            }}
        >
            {children}
        </RateContext.Provider>
    );
};

// Context 사용을 쉽게 하기 위한 커스텀 훅
export const useRate = () => useContext(RateContext);
