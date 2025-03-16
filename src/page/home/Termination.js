import FireworkConfetti from "../../components/effect/FireworkConfetti";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BottomModal from "../../components/modal/BottomModal";
import DoubleButton from "../../components/button/DoubleButton";

const Termination = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // FireworkConfetti();
        handleOpenBottomModal();
    });

    const bottomModalRef = useRef();
    
    const handleOpenBottomModal = () => {
        if (bottomModalRef.current) {
            bottomModalRef.current.openModal();
        }
    };

    const handleCloseBottomModal = () => {
        if (bottomModalRef.current) {
            bottomModalRef.current.closeModal();
        }
    };

    return (
        <div>
            {/* 하단 모달 */}
            <BottomModal ref={bottomModalRef}>
                <div>
                    <div className="mt-3 mb-3">
                        <span className="bottom-text">새로운 한달적금을<br/>다시 시작할까요?</span>
                    </div>
                    <DoubleButton confirmOnClick={() => {navigate("/start")}} cancelOnClick={handleCloseBottomModal}/>
                </div>
            </BottomModal>
        </div>
    );
};

export default Termination;
