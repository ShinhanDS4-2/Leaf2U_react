import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { Card, CardContent, Typography, Box, Divider, TextField } from '@mui/material';

import Button from '../../components/button/Button';

import './PaymentModal.css';

const PaymentModal = forwardRef(({ onSubmit = () => {} }, ref) => {
    const [amount, setAmount] = useState('25000'); // 값 입력받는 곳

    const [pin, setPin] = useState('');
    const maxLength = 4;
    const modalRef = useRef();

    useImperativeHandle(ref, () => ({
        openModal: () => {
            setPin('');
            modalRef.current?.openModal();
        },
        closeModal: () => {
            setPin('');
            modalRef.current?.closeModal();
        },
    }));

    const handleNumberClick = (num) => {
        if (pin.length < maxLength) {
            const newPin = pin + num;
            setPin(newPin);

            if (newPin.length === maxLength) {
                onSubmit(newPin);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    return (
        <div className="payment-modal" ref={modalRef}>
            {/* 납입금액 (왼쪽 정렬) */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ textAlign: 'left' }}>
                납입금액
            </Typography>
            {/* 금액 입력 필드 */}
            <div className="payment">
                <h3>
                    매일{' '}
                    <input
                        type="text"
                        // value={amount}
                        // onChange={handleChange}
                        placeholder="1,000"
                        className="payment-input"
                    />
                    원씩 납입
                </h3>
            </div>
            {/* 금액 범위 표시 */}
            <Typography variant="body2" color="text.secondary" className="text-center mt-2">
                100원 ~ 30,000원
            </Typography>
            <Button text={'변경'} />

            {/* 키패드 시작부분 */}
            <div className="payment-keypad">
                <div className="keypad-row">
                    {[1, 2, 3].map((num) => (
                        <button
                            key={num}
                            className="keypad-btn"
                            onClick={() => handleNumberClick(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div className="keypad-row">
                    {[4, 5, 6].map((num) => (
                        <button
                            key={num}
                            className="keypad-btn"
                            onClick={() => handleNumberClick(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div className="keypad-row">
                    {[7, 8, 9].map((num) => (
                        <button
                            key={num}
                            className="keypad-btn"
                            onClick={() => handleNumberClick(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div className="keypad-row">
                    <button className="keypad-btn" onClick={() => handleNumberClick(0)}>
                        0
                    </button>
                    <button className="keypad-btn delete" onClick={handleDelete}>
                        ⌫
                    </button>
                </div>
            </div>
        </div>
    );
});

export default PaymentModal;
