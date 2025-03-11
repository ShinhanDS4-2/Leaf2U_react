import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const CustomCalendar = ({ minDate, maxDate, stickerDates }) => {
    const [value, onChange] = useState(new Date());

    const formatDay = (locale, date) => date.getDate();

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const day = date.getDate();
            const month = date.getMonth() + 1;

            // 날짜를 'YYYY-MM-DD' 형식으로 변환
            const key = `2025-${month.toString().padStart(2, '0')}-${day
                .toString()
                .padStart(2, '0')}`;

            if (stickerDates[key]) {
                return (
                    <span className="calendar-sticker">
                        <Icon icon="fluent-emoji:coin" width="20" height="20" />
                    </span>
                );
            }
        }
        return null;
    };

    return (
        <div>
            <Calendar
                value={value}
                onChange={onChange}
                formatDay={formatDay}
                minDate={minDate}
                maxDate={maxDate}
                maxDetail="month"
                next2Label={null}
                prev2Label={null}
                tileContent={tileContent}
            />
        </div>
    );
};

export default CustomCalendar;
