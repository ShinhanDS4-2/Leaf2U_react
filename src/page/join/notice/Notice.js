import './Notice.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import BottomModal from '../../../components/modal/BottomModal';
import Header from '../../../components/header/Header';
import AlertModal from '../../../components/modal/AlertModal';
import { Icon } from '@iconify/react/dist/iconify.js';

const Notice = () => {
    const navigate = useNavigate();
    const modalRef = useRef();
    const alertRef = useRef();

    // 체크박스 상태 관리
    const [checkedItems, setCheckedItems] = useState({
        terms: false,
        preGuide: false,
        fraudWarning: false,
        depositProtection: false,
    });

    // 체크박스 토글 함수
    const toggleCheck = (key) => {
        setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // 모든 항목이 체크되었는지 확인
    const allChecked = Object.values(checkedItems).every(Boolean);

    // 버튼 클릭 이벤트 핸들러
    const handleNextClick = () => {
        if (allChecked) {
            if (modalRef.current) {
                modalRef.current.openModal();
            }
        } else {
            if (alertRef.current) {
                alertRef.current.openModal();
            }
        }
    };

    return (
        <div>
            <Header title={'한달적금 개설'} />

            <div className="notice-container">
                <div className="mb-3">
                    <p className="small text-center mt-3 notice-description">
                        한달적금 개설을 위해 <br />
                        약관 및 상품설명서를 꼭 확인해 주세요.
                    </p>
                </div>

                <div className="notice-item">
                    <div className="notice-header" onClick={() => toggleCheck('terms')}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div
                                    className={`check-box ${checkedItems.terms ? 'checked' : ''}`}
                                ></div>

                                <h3 className="ms-2">상품 이용 약관</h3>
                            </div>
                            <span className="arrow-icon" onClick={() => navigate('/terms-details')}>
                                <Icon
                                    icon="line-md:arrow-right"
                                    width="20px"
                                    height="20px"
                                    style={{ color: 'gray' }}
                                />
                            </span>
                        </div>
                        <div className="mt-3">
                            <ul className="notice-ul">
                                <li>예금거래기본약관</li>
                                <li>적립식예금약관</li>
                                <li>비과세종합저축특약</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="notice-item">
                    <div className="notice-header" onClick={() => toggleCheck('preGuide')}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div
                                    className={`check-box ${
                                        checkedItems.preGuide ? 'checked' : ''
                                    }`}
                                ></div>

                                <h3 className="ms-2">금융상품 가입 전 안내</h3>
                            </div>
                            <span
                                className="arrow-icon"
                                onClick={() => navigate('/pre-guide-details')}
                            >
                                <Icon
                                    icon="line-md:arrow-right"
                                    width="20px"
                                    height="20px"
                                    style={{ color: 'gray' }}
                                />
                            </span>
                        </div>
                        <div className="mt-3">
                            <ul className="notice-ul">
                                <li>중요사항 설명 안내</li>
                                <li>불이익사항 안내</li>
                                <li>금융소비자 권리사항 안내</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="notice-item">
                    <div className="notice-header" onClick={() => toggleCheck('fraudWarning')}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div
                                    className={`check-box ${
                                        checkedItems.fraudWarning ? 'checked' : ''
                                    }`}
                                ></div>

                                <h3 className="ms-2">불법·탈법 차명거래 금지 설명 확인</h3>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="notice-text">
                                「금융실명거래 및 비밀보장에 관한 법률」 제3조 제3항에 따라 누구든지
                                불법재산의 은닉, 자금세탁 행위, 공중협박자금 조달행위 및 강제집행의
                                면탈, 그 밖의 탈법행위를 목적으로 타인의 실명으로 금융거래를
                                하여서는 안되며, 이를 위반 시 5년 이하의 징역 또는 5천만 원의 벌금에
                                처해질 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="notice-item">
                    <div className="notice-header" onClick={() => toggleCheck('depositProtection')}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div
                                    className={`check-box ${
                                        checkedItems.depositProtection ? 'checked' : ''
                                    }`}
                                ></div>

                                <h3 className="ms-2">예금자보호법 설명 확인</h3>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="notice-text">
                                본인이 가입하는 금융상품은 예금자보호법에 따라 보호됨과 보호한도에
                                대하여 설명을 듣고 이해하였음을 확인합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <Button text={'다음'} onClick={handleNextClick} />
            </div>
            <BottomModal ref={modalRef} maxHeight="50%">
                <div className="agree-item-modal">
                    <p className="agree-item">
                        상품 중요사항을 충분히
                        <br /> 이해하고 확인하셨나요?
                    </p>
                    <Button text={'확인했습니다'} onClick={() => navigate('/payment')} />
                </div>
            </BottomModal>

            <AlertModal
                ref={alertRef}
                text={'모든 약관에 동의해야 다음 단계로 진행할 수 있습니다.'}
            />
        </div>
    );
};

export default Notice;
