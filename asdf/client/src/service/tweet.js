/**
 * 지금 현재는 데이터를 억지로 넣고 있는데 23.05.02 -> "네트워크를 통해 데이터 가져 오기"를 진행 해보겠습니다. 
 */

// 강사님이 주신 억지로 데이터 넣어주기 
// export default class TweetService {
//   tweets = [
//     {
//       id: 1,
//       text: '첫번째 트윗이예요!',
//       createdAt: '2022-05-09T04:20:57.000Z',
//       name: 'apple',
//       username: '김사과',
//       url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//     },
//   ];

export default class TweetService {
// 네트워크 통해서 데이터 가져오기 
  // network/http.js를 받으면 된다. 
  constructor(http){
    this.http = http;
  }

  async getTweets(username) {
    // get방식 *원소스* 
     // return username

    //   ? this.tweets.filter((tweet) => tweet.username === username)
    //   : this.tweets;

    // fetch를 통해 /tweets?username =: username
    // fetch로 다시 만들기
    
    const query = username ? `?username = ${username}`: '';

    return this.http.fetch(`/tweets${query}`,{
      method: 'GET'
    });

  }

  async postTweet(text) {
    
    // delete전송방식 *원소스*
    // const tweet = {
    //   id: Date.now(),
    //   createdAt: new Date(),
    //   name: 'apple',
    //   username: '김사과',
    //   text,
    // };
    // this.tweets.push(tweet);
    // return tweet;
    
    // fetch로 다시 만들기
    // fetch를 통해 /tweets post로 입력한 데이터 전송 하고 결과값 받기 
    
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({
        text,
        username:'김사과',
        name:'apple'        
      })
    });
  }

  async deleteTweet(tweetId) {
    // delete전송방식 *원소스*
    // this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);

    // fetch로 다시 만들기
    return this.http.fetch(`/tweets/${tweetId}`,{
      method: 'DELETE'
    })
  }

  async updateTweet(tweetId, text) {
    // update전송방식 *원소스*
    // const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    // if (!tweet) {
    //   throw new Error('tweet not found!');
    // }
    // tweet.text = text;
    // return tweet;

    // fetch로 다시 만들기
    return this.http.fetch(`/tweets/${tweetId}`,{
      method: 'PUT',
      body: JSON.stringify({text})
    });
  }
}
