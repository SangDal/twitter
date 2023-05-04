/**
 * 회원가입  ->  post, /signup으로 접근 했을때 
 * name: 빈문자 허용x (notEmpty())
 * email: 이메일 형식 체크하기, 모두 소문자 ()
 * url: URL체크 (isURL())
 * 
 * 로그인 -> post, /login
 * username: 빈문자,공백 허용x 
 * password: 공백x, 최소 4자이상
 * 
 */
// import * as tweetController from '../controller/tweet.js'

import express from 'express';
import { body } from 'express-validator';
import { validate } from '../md/validate.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../md/auth.js'

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .isLength({ min:4 })
        .withMessage('아이디는 최소 4자 이상 입력하세요. '),
    body('password')
        .trim()
        .isLength({ min:4 })
        .withMessage('비밀번호는 최소 4자 이상 입력하세요.'),
    validate //import { validate } from '../md/validate.js'; validate함수 재활용 !!!
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('이름은 꼭 입력하세요.'),
    body('email').isEmail().normalizeEmail().withMessage('이메일을 입력하세요.'),
    body('url').isURL().withMessage('URL 입력하세요.')
        .optional({ nullable:true, checkFalsy: true}), // nullable 빈값 가능, checkFalsy
    validate
]

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

export default router;

