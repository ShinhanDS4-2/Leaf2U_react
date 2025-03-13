import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import BottomModal from './BottomModal';
import './PwdModal.css';

const PwdModal = forwardRef(({ onSubmit = () => {} }, ref) => {
    const [pin, setPin] = useState(''); // 사용자가 숫자 버튼을 클릭하면 pin 상태에 숫자가 추가되고
    // 4자리 입력이 완료되면 별도의 확인버튼 없이 자동으로 onSubmit(pin) 실행
    const maxLength = 4;
    const pwdRef = useRef();

    useImperativeHandle(ref, () => ({
        openModal: () => {
            setPin(''); // 모달 열릴 때 입력값 초기화
            pwdRef.current?.openModal();
        },
        closeModal: () => {
            setPin(''); // 모달 닫을 때도 초기화 가능
            pwdRef.current?.closeModal();
        },
    }));

    // 숫자 입력 처리
    const handleNumberClick = (num) => {
        if (pin.length < maxLength) {
            // 최대 4자리까지만 입력 가능
            const newPin = pin + num;
            setPin(newPin);

            if (newPin.length === maxLength) {
                onSubmit(newPin); // 4자리 입력되면 즉시 실행
                // ㄴ CardDetail.js 파일에서 handleFirstPwdSubmit(newPin) 실행됨
                // newPin는 onSubmit의 매개변수로 전달이되서 꺼내쓰면 됨
            }
        }
    };

    // 지우기 처리
    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    return (
        <BottomModal ref={pwdRef} maxHeight="70%">
            <div className="pin-modal">
                <p className="pin-title">카드 비밀번호 4자리</p>
                <div className="pin-display">
                    {[...Array(maxLength)].map((_, i) => (
                        <span key={i}>{i < pin.length ? '🌱' : '⚪'}</span>
                    ))}
                </div>

                <div className="pin-keypad">
                    {/* 첫 번째 줄 */}
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

                    {/* 두 번째 줄 */}
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

                    {/* 세 번째 줄 */}
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

                    {/* 네 번째 줄 */}
                    <div className="keypad-row">
                        <button className="keypad-btn" onClick={() => handleNumberClick('.')}>
                            .
                        </button>
                        <button className="keypad-btn" onClick={() => handleNumberClick(0)}>
                            0
                        </button>
                        <button className="keypad-btn" onClick={handleDelete}>
                            ⌫
                        </button>
                    </div>
                </div>
            </div>
        </BottomModal>
    );
});

export default PwdModal;
