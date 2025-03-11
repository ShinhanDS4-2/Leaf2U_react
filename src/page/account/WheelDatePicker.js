// MyWheelDatePicker.jsx
import React, { useState } from 'react';
import MobilePicker from 'react-mobile-picker';

function MyWheelDatePicker() {
    // 각 스크롤에서 선택된 값을 state로 관리
    const [valueGroups, setValueGroups] = useState({
        year: '2025',
        month: '02',
        day: '27',
    });

    // 각 스크롤에 들어갈 옵션 목록
    const optionGroups = {
        year: ['2023', '2024', '2025', '2026', '2027'],
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        day: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
        ],
    };

    // 스크롤(휠)에서 값이 바뀔 때마다 호출되는 함수
    const handleChange = (name, value) => {
        setValueGroups({
            ...valueGroups,
            [name]: value,
        });
    };

    // 예: 실제로 날짜를 조합해 보기
    const handleConfirm = () => {
        const { year, month, day } = valueGroups;
        alert(`${year}년 ${month}월 ${day}일을 선택하셨습니다.`);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <MobilePicker
                optionGroups={optionGroups}
                valueGroups={valueGroups}
                onChange={handleChange}
            />
            <button onClick={handleConfirm} style={{ marginTop: '20px' }}>
                확인
            </button>
        </div>
    );
}

export default MyWheelDatePicker;
