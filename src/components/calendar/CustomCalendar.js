import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import dayjs from 'dayjs';

const CustomCalendar = ({ minDate, maxDate, stickerDates }) => {
    const [value, onChange] = useState(new Date());
    const [displayedDates, setDisplayedDates] = useState({});

    useEffect(() => {
        if (!stickerDates || Object.keys(stickerDates).length === 0) return;

        setDisplayedDates({}); // 기존 데이터 초기화
        const datesArray = Object.keys(stickerDates);

        const addStickers = async () => {
            for (let i = 0; i < datesArray.length; i++) {
                setDisplayedDates((prev) => ({
                    ...prev,
                    [datesArray[i]]: true, // 새로운 날짜 추가
                }));

                await new Promise((resolve) => setTimeout(resolve, 200)); // 0.1초 대기 후 다음 실행
            }
        };

        addStickers();
    }, [stickerDates]);

    const formatDay = (locale, date) => date.getDate();

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = dayjs(date).format('YYYY-MM-DD');

            if (displayedDates[formattedDate]) {
                // 변경된 상태 사용
                return (
                    <span className="calendar-sticker animate-fade-in">
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
                formatDay={formatDay}
                minDate={minDate}
                maxDate={maxDate}
                maxDetail="month"
                next2Label={null}
                prev2Label={null}
                tileContent={tileContent}
                onClickDay={(date, event) => event.preventDefault()}
            />
        </div>
    );
};

export default CustomCalendar;
