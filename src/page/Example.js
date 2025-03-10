import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import Content from '../components/content/Content';
import Footer from '../components/footer/Footer';
import Button from '../components/button/Button';
import BottomModal from '../components/modal/BottomModal';
import AlertModal from '../components/modal/AlertModal';

function Home() {
    // 🟢 모달 참조용 ref 생성
    const modalRef = useRef();

    // Alert 참조용 ref 생성
    const alertRef = useRef();

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

    // alert open
    const handleOpenAlert = () => {
        if (alertRef.current) {
            alertRef.current.openModal();
        }
    };

    return (
        <div>
            <Content>
                <div>
                    <div className="border m-2 p-4" onClick={handleOpenModal}>
                        클릭 시 이벤트 발생
                    </div>
                    <div className="border m-2 p-4" onClick={handleOpenAlert}>
                        Alert 모달 이벤트
                    </div>
                </div>
            </Content>
            <BottomModal ref={modalRef}>
                <div>
                    <Typography variant="h6" className="fw-bold mb-2" color="primary">
                        🎉 축하합니다! 출석 완료 🎉
                    </Typography>
                    <p style={{ color: 'gray', marginBottom: '16px' }}>
                        지금까지 총 5일 연속 출석했어요!
                    </p>
                    <Button
                        text="확인"
                        onClick={(e) => {
                            handleCloseModal();
                        }}
                    />
                </div>
            </BottomModal>
            <AlertModal
                ref={alertRef}
                text={'<span>Alert 알림 내용 작성<br>Alert 알림 내용 작성</span>'}
                onClick={() => {}}
            />
            <Footer />
        </div>
    );
}

export default Home;
