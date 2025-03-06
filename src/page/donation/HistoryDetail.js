import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import PaymentAmount from '../join/PaymentAmount';

const HistoryDetail = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 프로그램적으로 페이지를 이동하거나 리디렉션할 때 사용
    // useNavigate는 리액트 앱에서 페이지 이동을 제어할 수 있게 도와주는 훅

    return (
        <div>
            <Header title={'HistoryDetail 페이지'} />
            <PaymentAmount />
        </div>
    );
};

export default HistoryDetail;
