import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const HomeHeader = ({ listClick, calendarClick }) => {
    return (
        <div className="home-header">
            <div className="home-div" onClick={listClick}>
                <Icon icon="gravity-ui:list-ul" className="header-icon" />
            </div>
            <div className="home-div" onClick={calendarClick}>
                <Icon icon="majesticons:calendar" className="header-icon" />
            </div>
            <Link to="/home/notice">
                <div className="home-div">
                    <Icon icon="f7:bell-fill" className="header-icon" />
                </div>
            </Link>
        </div>
    );
};

export default HomeHeader;
