import './OrganizationButton.css';
import { Icon } from "@iconify/react/dist/iconify.js";

const OrganizationButton = ({data}) => {
    return (
        <div className="organization-content">
            <div className="organizatoin-list">
                <div className="d-flex justify-content-between">
                    <div className="organization-img">
                        {data.img}
                    </div>
                    <div className="organization-title">
                        {data.title}
                    </div>
                    <div className="organization-icon">
                        <Icon icon="gg:search" width="40px" height="40px"  style={{color: '#fafafa'}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationButton;