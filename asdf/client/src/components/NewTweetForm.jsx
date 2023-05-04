// 글 남기기 페이지 (메인페이지)

import React, { useState } from 'react';

const NewTweetForm = ({ tweetService, onError, onCreated }) => {
  const [tweet, setTweet] = useState('');
  //onSubmit 발생시 들어오는 소스 
  const onSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then((created) => {
        setTweet('');
        onCreated(created);
      })
      .catch(onError);
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <form className='tweet-form' onSubmit={onSubmit}>
      {/* text입력창 */}
      <input
        type='text' // 타입 설정
        placeholder='Edit your tweet' // 입력창에 투명글씨 
        value={tweet} // 전달할 메세지의 값 
        required
        autoFocus
        onChange={onChange}
        className='form-input tweet-input'
      />
      {/* 메인화면에서 파랑색 Post버튼 */}
      <button type='submit' className='form-btn'>
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;
