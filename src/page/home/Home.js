import Footer from '../../components/Footer';
import Content from '../../components/Content';
import React, { useRef } from 'react';
import BottomModal from '../../components/BottomModal';
import Typography from '@mui/material/Typography';
import Button from '../../components/Button';

function Home() {
    // 🟢 모달 참조용 ref 생성
    const modalRef = useRef();

    // 모달 open
    const handleOpenModal = () => {
        if (modalRef.current) {
            modalRef.current.openModal(); 
        }
    };

    // 모달 close
    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.closeModal(); 
        }
    };

    return (
        <div>
            <Content />
            <div className='border m-2 p-4' onClick={handleOpenModal}>클릭 시 이벤트 발생</div>
            <BottomModal ref={modalRef}>
                <div>
                    <Typography variant="h6" className="fw-bold mb-2" color="primary">
                        🎉 축하합니다! 출석 완료 🎉
                    </Typography>
                    <p style={{ color: 'gray', marginBottom: '16px' }}>지금까지 총 5일 연속 출석했어요!</p>
                    <Button 
                        text="확인"
                        onClick={(e) => {
                            handleCloseModal();
                        }} 
                    />
                </div>
            </BottomModal>
            <Footer />
        </div>
    );
}

export default Home;
