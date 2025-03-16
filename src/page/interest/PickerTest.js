// PickerTest.js
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, Divider, TextField } from '@mui/material';
import Button from '../../components/button/Button';
import BottomModal from '../../components/modal/BottomModal';
import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))
import React from 'react';
import CustomDatePicker from '../../components/calendar/CustomDatePicker';

const PickerTest = () => {
    // 🟢 모달 참조용 ref
    const datePickerModalRef = useRef(); // 날짜입력 모달 ref

    /* 모달 관리 START */
    // 날짜입력 모달 open, close
    const OpenDatePickerModal = () => {
        if (datePickerModalRef.current) {
            datePickerModalRef.current.openModal();
        }
    };
    const CloseDatePickerModal = () => {
        if (datePickerModalRef.current) {
            datePickerModalRef.current.closeModal();
        }
    };
    /* 모달 관리 END */

    const today = new Date();
    const initialDate = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };

    const [selectedDate, setSelectedDate] = useState(initialDate);

    return (
        <>
            <div>
                <Button text="날짜 테스트" onClick={OpenDatePickerModal} />
            </div>
            {/* 날짜 입력 모달 START */}
            <BottomModal ref={datePickerModalRef}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <CustomDatePicker
                        onChange={(newDate) => {
                            console.log('반환된 날짜 확인용!!! :', newDate); // ✅ 여기 추가
                            setSelectedDate(newDate);
                        }}
                    />
                </div>
                <div className="ms-3 me-3">
                    <Button
                        text="확인"
                        onClick={(e) => {
                            // 예상이자조회 API 실행 후 결과 반환
                            CloseDatePickerModal();
                        }}
                    />
                </div>
            </BottomModal>
            {/* 날짜 입력 모달 END */}

            <p>
                선택된 날짜: {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일
            </p>
            <p>선택된 날짜: {selectedDate.year}?</p>
        </>
    );
};

export default PickerTest;
