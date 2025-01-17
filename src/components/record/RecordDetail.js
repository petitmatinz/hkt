// src/components/record/RecordDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecordDetail.css';
import backButton from '../../assets/images/back-button.png'; // 이미지 경로에 맞게 수정

const RecordDetail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState({
    bodyCondition: [],
    mood: [],
    sleepHours: '',
    sleepMinutes: '',
    sleepQuality: '',
    exerciseHours: '',
    exerciseMinutes: '',
    meditationHours: '',
    meditationMinutes: '',
    reflection: '',
    solution: '',
    achievement: '',
    otherBodyCondition: '',
    otherMood: ''
  });

  useEffect(() => {
    // 로컬 스토리지에서 기록 불러오기
    const savedRecord = localStorage.getItem(date);
    if (savedRecord) {
      setRecord(JSON.parse(savedRecord));
    }
  }, [date]);

  const handleButtonClick = (category, value) => {
    if (category === 'sleepQuality') {
      setRecord(prevRecord => ({ ...prevRecord, [category]: value }));
    } else {
      setRecord(prevRecord => {
        const updatedArray = prevRecord[category].includes(value)
          ? prevRecord[category].filter(item => item !== value)
          : [...prevRecord[category], value];
        return { ...prevRecord, [category]: updatedArray };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord(prevRecord => ({ ...prevRecord, [name]: value }));
  };

  const handleSave = () => {
    // 로컬 스토리지에 기록 저장
    localStorage.setItem(date, JSON.stringify(record));
    alert('기록이 저장되었습니다.');
  };

  const handleDelete = () => {
    // 로컬 스토리지에서 기록 삭제
    localStorage.removeItem(date);
    alert('기록이 삭제되었습니다.');
    navigate('/record');
  };

  const handleEdit = () => {
    // 수정 모드로 전환
    alert('수정 모드입니다.');
  };

  const handleBack = () => {
    navigate('/record');
  };

  return (
    <div className="record-detail-container">
      <span className="record-header">
        <img src={backButton} alt="뒤로가기" className="back-button" onClick={handleBack} />
        <h2 className="record-date">{date}</h2>
        <span className="form-buttons">
          <button className="edit-button" onClick={handleEdit}>수정</button>
          <button className="delete-button" onClick={handleDelete}>삭제</button>
          <button className="save-button" onClick={handleSave}>저장</button>
        </span>
      </span>
      <div className="record-form">
        <div className="form-group">
          <label>몸상태</label>
          <div className="button-group">
            {['두통', '복통', '변비', '식욕부진', '오한', '허리통증', '소화불량', '근육통', '피부트러블'].map(condition => (
              <button
                key={condition}
                className={`condition-button ${record.bodyCondition.includes(condition) ? 'selected' : ''}`}
                onClick={() => handleButtonClick('bodyCondition', condition)}
              >
                {condition}
              </button>
            ))}
            <textarea
              className="other-input"
              name="otherBodyCondition"
              placeholder="기타"
              value={record.otherBodyCondition}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>기분상태</label>
          <div className="button-group">
            {['행복', '불안', '예민', '우울', '걱정', '무기력감'].map(mood => (
              <button
                key={mood}
                className={`condition-button ${record.mood.includes(mood) ? 'selected' : ''}`}
                onClick={() => handleButtonClick('mood', mood)}
              >
                {mood}
              </button>
            ))}
            <textarea
              className="other-input"
              name="otherMood"
              placeholder="기타"
              value={record.otherMood}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>수면기록</label>
          <input type="number" name="sleepHours" placeholder="시간" value={record.sleepHours} onChange={handleChange} />
          <input type="number" name="sleepMinutes" placeholder="분" value={record.sleepMinutes} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>수면의 질</label>
          <div className="button-group">
            {['좋음', '보통', '나쁨'].map(quality => (
              <button
                key={quality}
                className={`condition-button ${record.sleepQuality === quality ? 'selected' : ''}`}
                onClick={() => handleButtonClick('sleepQuality', quality)}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>운동기록</label>
          <input type="number" name="exerciseHours" placeholder="시간" value={record.exerciseHours} onChange={handleChange} />
          <input type="number" name="exerciseMinutes" placeholder="분" value={record.exerciseMinutes} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>명상기록</label>
          <input type="number" name="meditationHours" placeholder="시간" value={record.meditationHours} onChange={handleChange} />
          <input type="number" name="meditationMinutes" placeholder="분" value={record.meditationMinutes} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>육아해결</label>
          <textarea name="reflection" placeholder="나의 반성" value={record.reflection} onChange={handleChange}></textarea>
          <textarea name="solution" placeholder="나의 해결방안" value={record.solution} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>나의 성취</label>
          <textarea name="achievement" value={record.achievement} onChange={handleChange}></textarea>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;
