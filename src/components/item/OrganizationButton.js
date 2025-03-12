import './OrganizationButton.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';

const OrganizationButton = ({ data, isSelected, onClick }) => {
    const navigate = useNavigate();

    let imageSrc = '';
    if (data.icon) {
        imageSrc = require(`../../image/${data.icon}`);
    }

    return (
        <div className="organization-content" onClick={onClick}>
            <div className="organizatoin-list">
                <div className="d-flex justify-content-between">
                    <div
                        className="organization-img"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('/organizationList', {
                                state: { organizationIdx: data.organizationIdx },
                            });
                        }}
                    >
                        <img src={imageSrc} />
                    </div>
                    <div className="organization-title">{data.name}</div>
                    <div className="organization-icon">
                        {isSelected && (
                            <Icon
                                icon="icon-park-solid:check-one"
                                width="40"
                                height="40"
                                style={{ color: '#fff' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationButton;
