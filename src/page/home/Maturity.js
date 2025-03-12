import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Maturity = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="만기해지"/>
            <Content>
                <div>
                    <p className="small text-center mt-3">
                        받으실 원금과 이자를<br/>확인해주세요.
                    </p>
                </div>
                <div className="maturity-content">
                    <p>이자</p>
                </div>
                <div className="maturity-button-field">
                    <Button text="다음" onClick={() => {
                        navigate('/home/maturityList')
                    }}/>
                </div>
            </Content>
            <Footer />
        </div>
    )
}

export default Maturity;