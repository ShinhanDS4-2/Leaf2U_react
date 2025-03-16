import FireworkConfetti from "../../components/effect/FireworkConfetti";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BottomModal from "../../components/modal/BottomModal";
import DoubleButton from "../../components/button/DoubleButton";
import Lottie from "lottie-react";
import Check from "../../image/check.json";
import Plant from "../../image/plant.json";
import Button from "../../components/button/Button";
import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import { useMaturity } from '../../context/MaturityContext';

const Termination = () => {

    const navigate = useNavigate();
    const { card, finalBalance } = useMaturity();

    useEffect(() => {
        FireworkConfetti();
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
        <div className="termication-home">
            <div className="check-div">
                <div className="d-flex justify-content-center">
                    <Lottie animationData={Check} loop={true} className="temination-check"/>
                </div>
                <p className="mb-4">해지 완료</p>
                <div>
                    <Card
                        variant="outlined"
                        sx={{
                            margin: 1,
                            height: 'auto',
                            padding: 1,
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    marginTop: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body3" color="text.secondary">
                                    입금 계좌
                                </Typography>
                                <Typography variant="body3">
                                    {card}
                                </Typography>
                            </Box>
                            <Divider/>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: 1
                                }}
                            >
                                <Typography variant="body3" color="text.secondary">
                                    입금 금액
                                </Typography>
                                <Typography variant="body3">
                                    {finalBalance.toLocaleString()}원
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="p-3 termination-button-field">
                <Button text="확인" onClick={handleOpenBottomModal}/>
            </div>
            {/* 하단 모달 */}
            <BottomModal ref={bottomModalRef}>
                <div>
                    <div className="mt-3 mb-5">
                        <div className="d-flex justify-content-center">
                            <Lottie animationData={Plant} loop={true} className="temination-check"/>
                        </div>
                        <span className="bottom-text">새로운 한달적금을<br/>다시 시작할까요?</span>
                    </div>
                    <DoubleButton confirmOnClick={() => {navigate("/start")}} cancelOnClick={handleCloseBottomModal}/>
                </div>
            </BottomModal>
        </div>
    );
};

export default Termination;
