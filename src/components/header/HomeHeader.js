import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
    return (
        <div className="home-header">
            <div className="home-div">
                <Icon icon="gravity-ui:list-ul" className="header-icon" />
            </div>
            <div className="home-div">
                <Icon icon="majesticons:calendar" className="header-icon" />
            </div>
            <Link to="/notice">
                <div className="home-div">
                    <Icon icon="f7:bell-fill" className="header-icon" />
                </div>
            </Link>
        </div>
    );
};

export default HomeHeader;
