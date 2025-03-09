import { Icon } from "@iconify/react";

/**
 * 푸터 컴포넌트
 *
 * @component
 * @returns {JSX.Element} 푸터 컴포넌트
 */
const Footer = () => {
    return (
        <div className="footer">
            <div className="row">
                <div className="col">
                    <a href="/">
                        <Icon icon="majesticons:home" className="footerIcon" />
                    </a>
                </div>
                <div className="col">
                    <a href="/card">
                        <Icon icon="majesticons:creditcard" className="footerIcon" />
                    </a>
                </div>
                <div className="col">
                    <a href="/point">
                        <Icon icon="mingcute:parking-fill" className="footerIcon" />
                    </a>
                </div>
                <div className="col">
                    <a href="/topic">
                        <Icon icon="majesticons:textbox" className="footerIcon" />
                    </a>
                </div>
                <div className="col">
                    <a href="/leafboard">
                        <Icon icon="majesticons:leaf-3-angled" className="footerIcon" />
                    </a>
                </div>
            </div>
        </div>
    );
};


export default Footer;
