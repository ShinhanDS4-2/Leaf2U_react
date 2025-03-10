import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import mainImg from '../../image/leaf2u-card.png';

const CardNotice = () => {

    const navigate = useNavigate();
    const modalRef = useRef();
    
    // 체크박스 상태 관리
    const [checkedItems, setCheckedItems] = useState({
        terms: false,
        preGuide: false,
        fraudWarning: false,
    });

    // 체크박스 토글 함수
    const toggleCheck = (key) => {
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // 모든 항목이 체크되었는지 확인
    const allChecked = Object.values(checkedItems).every(Boolean);

    // '모두 동의' 기능
    const toggleAll = () => {
        const newState = !allChecked;
        setCheckedItems({
            terms: newState,
            preGuide: newState,
            fraudWarning: newState,
        });
    };

    // 버튼 클릭 이벤트 핸들러
    const handleNextClick = () => {
        
        if (allChecked) {
            navigate('/cardjoin');
        } 
        else {
            alert("모든 약관에 동의해야 다음 단계로 진행할 수 있습니다.");
        }
    };

    return (
        <div>
            <Header title={'카드 가입'}/>

            <div className="card-image-container">
                <img src={mainImg} alt="카드 이미지" className="card-image" />
            </div>
            
            <div className="notice-container2">

                <div className="all-agree-container" onClick={toggleAll}>
                    <div className={`check-box ${allChecked ? "checked" : ""}`}></div>
                    <span className="all-agree-text">모두 동의</span>
                </div>
                

                <div className="notice-item">
                    <div className="notice-header" onClick={() => toggleCheck("terms")}>
                        <div className={`check-box ${checkedItems.terms ? "checked" : ""}`}></div>
                        <div className="notice-text">
                            <h3>개인 (신용) 정보 필수 동의</h3><br/>
                            <ul>
                                <li>개인 (신용) 정보 필수 수집 이용에 관한 동의</li>
                                <li>개인 (신용) 정보 필수 조회에 관한 동의</li>
                                <li>개인 (신용) 정보 필수 제공에 관한 동의</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="notice-item">
                    <div className="notice-header" onClick={() => toggleCheck("preGuide")}>
                        <div className={`check-box ${checkedItems.preGuide ? "checked" : ""}`}></div>
                        <div>
                            <h3>회원가입 및 발급신청에 관한 필수 동의</h3><br/>
                            <ul>
                                <li>본인은 카드 실제 소유자와 동일하며, 기재하는 사실과 다름이 없음을 확인하고 카드발급을 신청합니다.</li>                            
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="notice-item">
                    <div className="notice-header" onClick={() => toggleCheck("fraudWarning")}>
                        <div className={`check-box ${checkedItems.fraudWarning ? "checked" : ""}`}></div>
                        <div className="notice-content">
                            <h3>실명 및 회원여부 확인 동의</h3><br/>
                            <ul>
                                <li>고유식별정보 수집 이용 동의</li>      
                                <li>개인 (신용) 정보 수집 이용 동의</li>                      
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Button 
                text={'다음'} 
                onClick={handleNextClick}
            />
        </div>
    );
};

export default CardNotice;
