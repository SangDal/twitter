let tweets = [
    {
        id:'1', 
        text:'첫 트윗입니다!!',
        createAt: Date.now().toString(),
        name: 'apple',
        username: '김사과',
        url:''
    },
    {
        id:'2', 
        text:'안녕하세요.!!',
        createAt: Date.now().toString(),
        name: 'banana',
        username: '반하나',
        url:''
    }
];

export async function getAll(){
    return tweets;
}

export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username === username);
}

export async function getByID(id){
    return tweets.find((tweet)=> tweet.id === id)
}


export async function create(text, name, username){
    const tweet={
        id: Date.now().toString(),
        text,
        createAt: new Date(),
        name,
        username,
        url:''
    };

    tweets = [tweet, ...tweets];
    return tweets;
}
// 형진이 코드 
// export async function addTweet(tweet){
//     tweets = [tweet, ...tweets];
// }

export async function update(id, text){
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
