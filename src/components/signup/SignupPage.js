import React, { useState } from 'react';
import './SignupPage.css';  
import Navbar from '../common/Navbar'; // Header 대신 Navbar를 불러오도록 경로 수정

const SignupPage = () => {
  const [errors, setErrors] = useState({});
  
  const validate = (event) => {
    event.preventDefault();
    const email = event.target.email.value + '@' + event.target.domain.value;
    const password = event.target.password.value;
    const confirmPassword = event.target['confirm-password'].value;
    const username = event.target.username.value;
    const phone = event.target.phone.value;
    const birthdate = event.target.birthdate.value;
    const terms = event.target.terms.checked;
    let newErrors = {};

    // 이메일 유효성 검사
    if (email === 'used@example.com') {
      newErrors.email = '이미 사용중인 이메일입니다.';
    }

    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = '8~16 자리 이내, 영문 대소문자 및 숫자를 포함해야 합니다.';
    }

    // 비밀번호 확인 일치 여부 검사
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 별명 유효성 검사
    if (username === '사용중인별명') {
      newErrors.username = '이미 사용중인 별명입니다.';
    }

    // 전화번호 유효성 검사
    const phoneRegex = /^01\d{8,9}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = '올바르지 않은 전화번호 양식입니다.';
    }

    // 생년월일 유효성 검사
    const birthdateRegex = /^\d{8}$/;
    if (!birthdateRegex.test(birthdate)) {
      newErrors.birthdate = '올바르지 않은 생년월일 양식입니다.';
    }

    // 약관 동의 체크 여부 검사
    if (!terms) {
      newErrors.terms = '약관 동의는 필수입니다.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 성공적으로 가입
      console.log('회원가입 성공');
    }
  };

  return (
    <div>
      <Navbar /> {/* Header 대신 Navbar를 사용 */}
      <div className="signup-container">
        <form className="signup-form" onSubmit={validate}>
          <h2>회원가입</h2>
          <label htmlFor="email">이메일*</label>
          <div className="email-group">
            <input type="text" id="email" name="email" placeholder="ex) myname" />
            <span>@</span>
            <input type="text" id="domain" name="domain" placeholder="example.com" />
            <select name="domain-select">
              <option value="">선택</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.net">hanmail.net</option>
            </select>
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
          
          <label htmlFor="password">비밀번호*</label>
          <input type="password" id="password" name="password" placeholder="8~16 자리 이내, 영문 대소문자 및 숫자 포함" />
          {errors.password && <p className="error">{errors.password}</p>}
          
          <label htmlFor="confirm-password">비밀번호 확인*</label>
          <input type="password" id="confirm-password" name="confirm-password" />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          
          <label htmlFor="username">별명*</label>
          <input type="text" id="username" name="username" />
          {errors.username && <p className="error">{errors.username}</p>}
          
          <label htmlFor="phone">전화번호*</label>
          <input type="text" id="phone" name="phone" placeholder="ex) 01012345678" />
          {errors.phone && <p className="error">{errors.phone}</p>}
          
          <label htmlFor="birthdate">생년월일*</label>
          <input type="text" id="birthdate" name="birthdate" placeholder="예: 20010101" />
          {errors.birthdate && <p className="error">{errors.birthdate}</p>}
          
          <label>성별*</label>
          <div className="gender-group">
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">남</label>
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">여</label>
          </div>
          
          <div className="checkbox-group">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">Jolly Journey 이용 약관 동의 (필수)</label>
            {errors.terms && <p className="error">{errors.terms}</p>}
            <input type="checkbox" id="privacy" name="privacy" />
            <label htmlFor="privacy">개인정보 수집 및 이용 동의 (필수)</label>
          </div>
          
          <button type="submit" className="signup-button">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
