import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import CustomSlider from "../../components/slider/CustomSlider";

const MaturityRate = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="만기해지"/>
            <Content>
                <div>
                    <p className="small text-center mt-3">
                        후원 금액을 지정해 주세요.
                    </p>
                </div>
                <div>
                    <CustomSlider min={10} max={100} minText={'10%'} maxText={'100%'} defalut={50} step={1} title={'이만큼 후원할게요'} subTitle={'선택한 비율만큼 이자에서 산정됩니다'}/>
                    <CustomSlider min={0} max={900000} minText={'0원'} maxText={'900,000원'} defalut={0} step={1000} title={'더 후원할게요'} subTitle={'최대 후원금은 원금을 초과할 수 없습니다'}/>
                    <CustomSlider min={0} max={500} minText={'0P'} maxText={'500P'} defalut={0} step={50} title={'포인트를 이만큼 모았어요'} subTitle={'사용하지 않은 포인트는 다음 적금 개설 시 이월됩니다'}/>
                </div>
                <div className="mt-2 ms-3 me-3 d-flex justify-content-between">
                    <div>
                        <div className="rate-title">이자</div>
                        <div className="rate-cnt">2,000</div>
                    </div>
                    <div className="rate-operator">
                        +
                    </div>
                    <div>
                        <div className="rate-title">개별후원</div>
                        <div className="rate-cnt">20,000</div>
                    </div>
                    <div className="rate-operator">
                        +
                    </div>
                    <div>
                        <div className="rate-title">포인트</div>
                        <div className="rate-cnt">400</div>
                    </div>
                    <div className="rate-operator">
                        =
                    </div>
                    <div>
                        <div className="rate-title">총 후원금</div>
                        <div className="rate-cnt">22,400</div>
                    </div>
                </div>
            </Content>
            <div className="maturity-button-field">
                <Button text="다음" onClick={() => {
                    navigate("/home/maturityResult");
                }}/>
            </div>
            <Footer />
        </div>
    )
}

export default MaturityRate;