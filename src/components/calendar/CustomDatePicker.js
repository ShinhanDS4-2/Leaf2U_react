/** 스크롤 휠 형태의 날짜 선택 달력 */

import React, { useState, useEffect } from 'react';
import Picker from 'react-mobile-picker';
import '../../components/calendar/CustomDatePicker.css';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

// 윤년을 확인하는 함수
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// 각 달의 최대 일수 계산 함수
const getMaxDays = (year, month) => {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

// 오늘 이후의 날짜만 선택 가능하도록 체크
const isFutureOrToday = (year, month, day) => {
    const today = new Date();
    const selectedDate = new Date(year, month - 1, day);
    return selectedDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

const CustomDatePicker = ({ onChange }) => {
    const [value, setValue] = useState({ year, month, day }); // 현재 날짜를 초기값으로 설정
    const [dayOptions, setDayOptions] = useState(Array.from({ length: 31 }, (v, i) => i + 1));

    // 날짜 포맷 변환 함수 (YYYY-MM-DD)
    const formatDate = ({ year, month, day }) => {
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    // year 또는 month가 변경되면 해당 달에 맞는 day 배열 업데이트
    useEffect(() => {
        const maxDays = getMaxDays(value.year, value.month);
        const updatedDays = Array.from({ length: maxDays }, (_, i) => i + 1).filter((d) =>
            isFutureOrToday(value.year, value.month, d),
        );

        setDayOptions(updatedDays);

        // 현재 선택한 day가 선택 가능한 날짜 범위를 벗어나면 조정
        if (!updatedDays.includes(value.day)) {
            // 이전 선택한 날짜 (value.day) 가 새로운 달에 존재하지 않으면,
            const newDay = updatedDays[updatedDays.length - 1]; // 마지막 날짜 선택
            const updatedValue = { ...value, day: newDay };
            setValue(updatedValue);
            if (onChange) onChange(formatDate(updatedValue));
        }
    }, [value.year, value.month, value.day]);

    // Picker에 넘겨 줄 년/월/일 배열 생성
    const selections = {
        year: Array.from({ length: 2 }, (_, i) => year + i), // 미래 2년까지 선택 가능

        month: Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => {
            if (value.year === year) {
                return m >= month; // 현재 연도일 경우 오늘의 달 포함하여 이후 달만 선택 가능
            }
            return true; // 미래 연도라면 모든 월 선택 가능
        }),

        day: dayOptions.filter((d) => {
            if (value.year === year && value.month === month) {
                return isFutureOrToday(year, month, d); // 현재 연도 & 월이라면 오늘 이전의 날짜 제거
            }
            return true; // 미래 연도 또는 미래 월이라면 모든 날짜 선택 가능
        }),
    };

    return (
        <div style={{ width: '300px' }}>
            <Picker
                value={value} // 현재 선택된 값
                onChange={(newValue) => {
                    // 사용자가 선택을 바꿀 때마다 호출됨
                    setValue(newValue); // 상태 업데이트
                    if (onChange) onChange(formatDate(newValue)); // 선택 즉시 부모에 전달
                }}
                wheelMode="normal"
                className="custom-picker"
            >
                {Object.keys(selections).map((date) => (
                    <Picker.Column key={date} name={date}>
                        {selections[date].map((option) => (
                            <Picker.Item key={option} value={option}>
                                {({ selected }) => (
                                    <div
                                        style={{
                                            color: selected ? 'white' : 'black',
                                            backgroundColor: selected ? '#d9d9d9' : 'white',
                                            padding: '5px 20px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        {date === 'year'
                                            ? `${option}년`
                                            : date === 'month'
                                            ? `${option}월`
                                            : `${option}일`}
                                    </div>
                                )}
                            </Picker.Item>
                        ))}
                    </Picker.Column>
                ))}
            </Picker>
        </div>
    );
};

export default CustomDatePicker;
