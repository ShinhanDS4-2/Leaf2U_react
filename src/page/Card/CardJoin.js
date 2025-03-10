import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';

const CardJoin = () => {
    const navigate = useNavigate();

    // 입력값 상태 관리
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        firstName: '',
        idNumber: '',
        phone: '',
        address: '',
        detailAddress: '',
        zipCode: '',
    });

    // 에러 메시지 상태
    const [errors, setErrors] = useState({
        name: false,
    });

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // 입력 시 에러 메시지 제거
        if (name === 'name' && value.trim() !== '') {
            setErrors((prev) => ({ ...prev, name: false }));
        }
    };

    // 다음 버튼 클릭 시 유효성 검사
    const handleNext = () => {
        if (!form.name.trim()) {
            setErrors((prev) => ({ ...prev, name: true }));
            return;
        }
        // 다음 페이지로 이동
        navigate('/next-step');
    };

    return (
        <div>
            <Header title={'카드 가입'} />

            <div className="join-container">
                <h3 className="section-title">가입 정보 입력</h3>

                {/* 이름 입력 */}
                <div className={'input-container'}>
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력해 주세요."
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                {/* 영문 성 */}
                <div className="input-container">
                    <label>영문 성</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="영문 성"
                        value={form.lastName}
                        onChange={handleChange}
                    />
                </div>

                {/* 영문 이름 */}
                <div className="input-container">
                    <label>영문 이름</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="여권 이름과 동일하게 작성해 주세요."
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>

                {/* 연락처 */}
                <div className="input-container">
                    <label>연락처</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="- 없이 숫자만"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                {/*계좌*/}
                <div className="input-container">
                    <label>계좌 입력</label>
                    <select className="card-select">
                        <option>선택</option>
                    </select>
                    <input type="text" placeholder="카드번호 (- 없이 숫자만)" />
                </div>
                <div className="explain-card">
                    <ul className="explain2">
                        <li>카드와 연결할 계좌를 입력해주세요.</li>
                    </ul>
                </div>
            </div>

            <Button text={'다음'} />
        </div>
    );
};

export default CardJoin;
