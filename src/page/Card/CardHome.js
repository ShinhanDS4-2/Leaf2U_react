import {useEffect,useState,useRef} from 'react';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomModal from '../../components/BottomModal';
import Header from '../../components/Header';


const CardHome = () => {
    
    /*
    const location=useLocation();
    const modalRef=useRef(null);
    const cardYn=location.state?.cardYn || 'Y';
    const [amount, setAmount] = useState("10,000"); // 기본값 설정

    useEffect(()=>{

        if(cardYn==='N'){
            modalRef.current?.openModal();
        }
    },[cardYn]);
    */
    return (
        <div className="card-home">

            <Header title={'한달적금 개설'}/>
            <div className='payment'>
                <h3>매일 <input type="text" className="payment-input"/>원씩 납입</h3>
            </div>
            <div className='card-info'>
                <p>2025년 3월 2일까지 300,000원 저축</p>
            </div>

            <div className='card-section'>
                <label>카드 연결</label>
                <select>
                    <option>선택</option>
                </select>
                <input type="text" placeholder="카드번호 (- 없이 숫자만)"></input>
            </div>

            <div className="eco-card">
                <input type="checkbox" id="eco"></input>
                <label>기후 동행 카드</label>
                <p>기존 보유하고 계신 신한 Leaf2U 카드 등록 시 우대금리 연 +2.00%</p>
                <p>후불 기후동행카드 등록 시 우대금리 연 +1.00%</p>
            </div>
                
            <div className="summary">
                <p>매일 납입 금액</p>
                <p>적금기간 <span>30일</span></p>
                <p>적금방식 <span>1일 1회 직접입금</span></p>
                <p>최고 적용금리</p>
                <p>만기설정 <span>만기 시 직접 해지</span></p>
            </div>
        
        </div>
    );
};

export default CardHome;
