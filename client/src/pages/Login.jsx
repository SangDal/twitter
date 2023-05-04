import React, { useState } from 'react';
import Banner from '../components/Banner';

const Login = ({ onSignUp, onLogin }) => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setURL] = useState('');
  const [text, setText] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  // 로그인 창에서 체크박스에 선택 했을때 이벤트 발생 코드 
  const onSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      onSignUp(username, password, name, email, url).catch(setError);
    } else {
      onLogin(username, password).catch(setError);
    }
  };

  const setError = (error) => {
    setText(error.toString());
    setIsAlert(true);
  };
  // 회원가입 시 정보 불러오기 
  // https://wonyoung2257.tistory.com/4 참고하기

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'url':
        return setURL(value);
      case 'signup':
        return setSignup(checked);
      default:
    }
  };

  return (
    // {signup && ()}안에 넣으면 체크 박스 선택후  회원가입 Input창 내용 sign up눌렀을때 반응 
    //체크 박스 선택 하지 않고 로그인 Input창 Sign In버튼 
    <>
      <Banner text={text} isAlert={isAlert} />
      <form className='auth-form' onSubmit={onSubmit}>
        <input
          name='username'
          type='text'
          placeholder='Id' //창 안에 들어있는 글씨
          value={username}
          onChange={onChange}
          className='form-input'
          required
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          className='form-input'
          onChange={onChange}
        />
        
        {signup && (
          <input
            name='name'
            type='text'
            placeholder='Name'
            value={name}
            onChange={onChange}
            className='form-input'
            required
          />
        )}
        {signup && (
          <input
            name='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
            className='form-input'
            required
          />
        )}
        {signup && (
          <input
            name='url'
            type='url'
            placeholder='Profile Image URL'
            value={url}
            onChange={onChange}
            className='form-input'
          />
        )}
{/* 주석 */}
        {/*   체크 박스와 멘트 div */}
        <div className='form-signup'>
          <input
            name='signup'
            id='signup'
            type='checkbox'
            onChange={onChange}
            checked={signup}
          />
          <label htmlFor='signup'> Create a new account?</label>
        </div>
        {/*  Sign In 버튼과  Sign Up 버튼 생성 되는 소스 위에서 체크박스 선택시 Sign Up이 보이고 기본적으로는 Sign In이 보인다. */}
        <button className='form-btn auth-form-btn' type='submit'>
          {signup ? 'Sign Up' : 'Sign In'}
        </button>

      </form>
    </>
  );
};

export default Login;
