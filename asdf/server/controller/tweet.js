import * as tweetRepository from "../data/tweet.js"

export async function getTweets(req, res, next){
    const username = req.query.username;
    const data = await((username)
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getTweet(req, res, next){
    const id = req.params.id;
    const tweet = await tweetRepository.getByID(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({ message: `Tweet id(${id}) not found!! ` });
    }
}

export async function createTweet(req, res, next){
    const {text, name, username} = req.body;
    // await붙는건 다 함수가?
    const tweet = await(tweetRepository.create(text, name, username));//함수로 만들어줘야한다.!!
    res.status(201).json(tweet);

    // 형진이 코드 
    // const { text, name, username} = req.body;
    // const tweet = {
    //     id: Date.now().toString(),
    //     text,
    //     createdAt: new Date(),
    //     name,
    //     username
    // };
    // await(tweetRepository.addTweet(tweet));
    // res.status(201).json(tweet);
}

export async function updateTweet(req, res, next){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);

    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({ message: `Tweet id(${id}) not found!! ` });
    }

}

export async function deleteTweet(req, res, next){
    const id = req.params.id;
    await (tweetRepository.remove(id));
    res.sendStatus(204);
}