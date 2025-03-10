import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import './Footer.css';

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
                    <Link to="/">
                        <Icon icon="majesticons:home" className="footer-icon" />
                    </Link>
                </div>
                <div className="col">
                    <Link to="/card">
                        <Icon icon="majesticons:creditcard" className="footer-icon" />
                    </Link>
                </div>
                <div className="col">
                    <Link to="/point">
                        <Icon icon="mingcute:parking-fill" className="footer-icon" />
                    </Link>
                </div>
                <div className="col">
                    <Link to="/topic">
                        <Icon icon="majesticons:textbox" className="footer-icon" />
                    </Link>
                </div>
                <div className="col">
                    <Link to="/leafboard">
                        <Icon icon="majesticons:leaf-3-angled" className="footer-icon" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
