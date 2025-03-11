import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import OrganizationButton from "../../components/item/OrganizationButton";
import { useNavigate } from "react-router-dom";

const MaturityList = () => {
    const navigate = useNavigate();
    const data = {'title': '생명의 숲', };

    return (
        <div>
            <Header title="만기해지"/>
            <Content>
                <div>
                    <p className="small text-center mt-3">
                        후원할 단체를 선택해 주세요.<br/>아이콘을 클릭하면 상세 정보로 이동합니다.
                    </p>
                </div>
                <div>
                    <OrganizationButton data={data}/>
                    <OrganizationButton data={data}/>
                    <OrganizationButton data={data}/>
                    <OrganizationButton data={data}/>
                </div>
            </Content>
            <div className="maturity-button-field">
                <Button text="다음" onClick={() => {
                    navigate("/home/maturityRate");
                }}/>
            </div>
            <Footer />
        </div>
    )
}

export default MaturityList;