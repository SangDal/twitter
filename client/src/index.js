import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import HttpClient from './network/http';

const baseURL = process.env.REACT_APP_BASE_URL; // .env파일에서 읽어옴 REACT_APP_BASE_URL=http://localhost:8080
const httpClient = new HttpClient(baseURL); // http.js에 클래스를 만들어 줬으니깐 객체를 하나 만들어 넣어둔다.(확장성을 위해서)
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService();
const tweetService = new TweetService(httpClient); // 위에 만든 클래스를 사용하기 위해서 

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
