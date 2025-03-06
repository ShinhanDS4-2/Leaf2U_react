import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import PaymentAmount from '../join/PaymentAmount';

const Payment = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Header title={'한달적금 개설'}/>
            <PaymentAmount />
        </div>
    );
};

export default Payment;
