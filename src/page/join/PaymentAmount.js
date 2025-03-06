import {useState,useEffect} from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Keypad from '../../components/Keypad';

const PaymentAmount = () => {
    
    const navigate = useNavigate();
    const [amount,setAmount]=useState("");

    useEffect(()=>{

        const savedAmount=sessionStorage.getItem("paymentAmount");
        if(savedAmount){
            setAmount(savedAmount);
        }

    },[]);

    const handleChange=(e)=>{

        const value=e.target.value.replace(/[^0-9]/g,"");         //숫자만 허용
        setAmount(value);
    }


    const handleNextPage=()=>{

        const numAmount=Number(amount);
        
        if(numAmount<100 || numAmount>30000){
            alert("100원부터 30,0000원까지 입력 가능합니다.");
            return;
        }

        sessionStorage.setItem("paymentAmount",numAmount);
        
        navigate('/user-info');

    }

    // 키패드 버튼 클릭 시 숫자 추가
    const handleKeypadClick = (num) => {
        setAmount((prev) => (prev + num).slice(0, 5)); // 최대 5자리까지만 입력
    };

    // 입력 지우기
    const handleDelete = () => {
        setAmount((prev) => prev.slice(0, -1));
    };

    return (
        <div>

            <div className='payment'>
                <h3>매일 <input type="text" value={amount} onChange={handleChange} placeholder='1,000' className="payment-input"/>원씩 납입</h3>
            </div>
            <div className='payment-info'>
                <p>100원부터 30,000원까지 입력 가능</p>
            </div>
            <Button
                text={'개설정보 확인'}
                onClick={handleNextPage}
            />

             {/* Keypad 컴포넌트 추가 */}
            <Keypad onKeyPress={handleKeypadClick} onDelete={handleDelete} />
        </div>
    );
};

export default PaymentAmount;
