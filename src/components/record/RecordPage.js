import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import './RecordPage.css';

const RecordPage = () => {
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    console.log(date);
    const [yyyy, mm, dd] = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ];
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    navigate(`/record/${formattedDate}`);
  };

  return (
    <div className="record-page-container">
      <h1>나의 기록</h1>
      <Calendar
        onClickDay={handleDateClick}
        locale="en-US" // 영어로 설정
        formatDay={(locale, date) => date.getDate()} // '일'을 제거하고 숫자만 표시
      />
    </div>
  );
};

export default RecordPage;
