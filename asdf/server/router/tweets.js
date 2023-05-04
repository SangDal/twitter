import express from 'express';
import * as tweetController from '../controller/tweet.js'
// 내가 import한거
// import { body, param, validationResult } from 'express-validator';
// 강사님 import
import { body } from 'express-validator';
import { isAuth } from '../md/auth.js';
import { validate } from '../md/validate.js';


/*
// 내가 작성한 코드 (강사님은 md/validate.js로 따로 파일을 빼서 만듬 !)
const validate = (req, res, next) => {
    // 아래 코드(app.post)에서 에러가 발생된다면 validationResult()가 찾아서 errors변수에 담아준다!
    const errors = validationResult(req); 
    if(errors.isEmpty()){
        //만약 "errors변수에 아무것도 없다면 그냥 다음으로 넘어가" 
        return next();
    }
    return res.status(400).json({message: errors.array()});
}
*/
const validateTweet = [
    body('text')
        .trim()
        .isLength({min:4})
        .withMessage('강사님이 한거야 ! 4자이상 입력해'),
    validate
]

//사실상 DB가 들어올 부분(우리는 DB가 존재 하지 않기때문에 배열로 저장)
/* ./data/tweet.js로 이동했음 
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
*/

// 라우터를 이용하기위해 router 변수에 담는다.
const router = express.Router();

// GET
//  key값   value값
//  _____   _________
// 입력 받는법 : /tweets?username =: username


// router.get('/', (req, res, next)=>{
//     const username = req.query.username;
//     // 위에 있는 tweets를 필터 해서 받은것과 같으면 data함수에 이름을 저정하겠다.
//     const data = username
//         ? tweets.filter((tweet) => tweet.username === username)
//         : tweets;
//     // status를 200으로 주고 json형태로 변경 하여 전달 한다!
//     res.status(200).json(data);
// });

/*위소스를 라우터랑 데이터 구분으로 나눠 축약처리  */
router.get('/', isAuth, tweetController.getTweets);

/*******************************************************/
// GET : id값으로 찾아오기
// /tweets/:id
/*
router.get('/:id', (req, res, next)=>{

    const id = req.params.id;
    // tweets배열에서 입력받은 id과 같은지 찾은후 tweet에 저장  
    const tweet = tweets.find((tweet)=> tweet.id === id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({ message: `Tweet id(${id}) not found!! ` });
    }
});
*/
/*위소스를 라우터랑 데이터 구분으로 나눠 축약처리  */
router.get('/:id', isAuth, tweetController.getTweets);

/*******************************************************/
// POST (데이터 추가 )
// id값에는 : Date.now().toString()을 넣어주세요.
/*
router.post('/', (req, res, next) =>{

    // 보낼 변수 생성 json에 보는 키와 이름이 같아야합니다 !!

    const {text, name, username} = req.body;
    const tweet={
        id: Date.now().toString(),
        text,
        createAt: new Date(),
        name,
        username, //req.body.username 객체의 이름과 같다면 생략 가능하다.
        url:''
    };
    // 데이터를 추가 해줄때 원본을 가지고 있는것이 좋다 !!
    // 현재 데이터를 복사(...tweets) 하고 tweet를 추가해서 tweets에 담는다.
    tweets = [tweet, ...tweets];
    //값을 클라이언트한테 보여주기 위한 소스 
    res.status(200).json(tweet);

});
*/

/*위소스를 라우터랑 데이터 구분으로 나눠 축약처리  */
// router.post('/', tweetController.createTweet);

// 위 router.post코드 text가 최소 4자 이하인 경우 에러처리 하기 (내가 한거)
// router.post('/', 
//     [
//         body('text').trim().isLength({min:4}).withMessage('텍스트가 짧아요'),
//         validate,
//         tweetController.createTweet
//     ],

//     (req, res)=>{
//         console.log(req.body);
//         res.sendStatus(201);
//     }
// );

// 위코드 강사님꺼 validateTweet함수를 위에 만들고 깔끔하게 만들수 있다.
router.post('/', isAuth, validateTweet, tweetController.createTweet);

/*******************************************************/
// PUT (데이터 수정)
// Text만 수정하게 만들기
/*
router.put('/:id', (req, res, next) =>{
    // 입력받은 id를(req.params.id) 불러와서 id변수에 저장 
    const id = req.params.id;
    const text = req.body.text; // json형태로 body에 입력받은 text내용을 text변수에 담아둔다.
    const tweet = tweets.find((tweet)=> tweet.id === id);
    if(tweet){
        tweet.text = text;
        res.status(200).json(tweet);

    }else{
        res.status(404).json({ message: `Tweet id(${id}) not found!! ` });
    }
    
});*/

/*위소스를 라우터랑 데이터 구분으로 나눠 축약처리  */

//router.put('/:id', tweetController.updateTweet);

// 위 router.put코드 text가 최소 4자 이하인 경우 에러처리 하기 (내가 한거)
// router.put('/:id', 
//     [
//         body('text').trim().isLength({min:4}).withMessage('텍스트가 짧아요'),
//         validate,
//         tweetController.createTweet
//     ],

//     (req, res)=>{
//         console.log(req.body);
//         res.sendStatus(201);
//     }
// );

// 위코드 강사님꺼 validateTweet함수를 위에 만들고 깔끔하게 만들수 있다.
router.put('/:id', isAuth, validateTweet, tweetController.createTweet);

/*******************************************************/
// DELETE (데이터 삭제)
// id값을 입력받아 해당 id를 삭제 해주는것 !
/*
router.delete('/:id', (req, res, next) =>{
    // 삭제하려는 id를(req.params.id)입력받아 불러와서 id변수에 저장 
    const id = req.params.id;
    // id가 같은애는 빼고나머지 id를 다 tweets변수에 담아주세요 !
    tweets = tweets.filter((tweet) => tweet.id !== id);
    res.sendStatus(204);
});
*/
/*위소스를 라우터랑 데이터 구분으로 나눠 축약처리  */
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;