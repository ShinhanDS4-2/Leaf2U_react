import './Box.css';

const NoticeBox = ({ title, content, time }) => {
    return (
        <div>
            <div className="notice-box">
                <span className="notice-title">
                    <b>{title}</b>
                </span>
                <p className="notice-content">{content}</p>
                <span className="notice-time">{time}</span>
            </div>
        </div>
    );
};

export default NoticeBox;
