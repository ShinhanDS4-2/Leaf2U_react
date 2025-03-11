import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const MaturityResult = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="만기해지"/>
            <Content>
                <div>
                    <p className="small text-center mt-3">
                        최종 금액을 확인해 주세요.
                    </p>
                </div>
                <div className="maturity-content">
                    <p>후원금</p>
                </div>
            </Content>
            <div className="maturity-button-field">
                <Button text="해지하기" onClick={() => {
                    navigate("/home/termination");
                }}/>
            </div>
            <Footer />
        </div>
    )
}

export default MaturityResult;