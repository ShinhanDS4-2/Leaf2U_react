import { Icon } from "@iconify/react";

const HomeHeader = () => {
    return (
        <div className="home-header">
            <div className="home-div">
                <Icon icon="gravity-ui:list-ul" className="header-icon" />
            </div>
            <div className="home-div">
                <Icon icon="majesticons:calendar" className="header-icon" />
            </div>
            <div className="home-div">
                <Icon icon="f7:bell-fill" className="header-icon" />
            </div>
        </div>
    )
}

export default HomeHeader;