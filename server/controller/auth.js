
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';


//https://www.lastpass.com/features/password-generator 32자리 시크릿키 생성해서 넣어주기 
const jwtSecretKey = '10KUr*1eDAK7%rTS*NW&qQW&ZMGhm$Bp';
// 토큰 유효 시간
const jwtExpiresInDays = '2d';
// bcrypt 몇번 돌릴건지 
const bcryptSaltRounds = 10;

export async function signup(req, res){
    // req.body로 데이터를 받아 회원가입 시키는 함수를 만들어 봅시다. 
    // 해당 아이가 존재 한다면 "409"를 리턴  status 409
    // userRepository에 데이터를 저장한다. (비밀번호는 bcrypt를 사용하여 저장)
    // JWT를 이용하여 사용자에게 json으로 전달하기 

    const {username, password, name, email, url} = req.body;
    const found = await userRepository.findByUsername(username)
    if (found){
        return res.status(409).json({ message: `${username}은 이미 가입 되었습니다. `});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({
        username, 
        password: hashed, 
        name, 
        email, 
        url
    });

    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
}

export async function login(req, res){
    /**
     *  req.body로 데이터를 받아 해당 아이디로 로그인 여부를 판단 한다. 
     *  해당 아이디가 존재 하지 않는다면, "401"을 리턴 status 401
     *  bcrypt를 이용하여 비밀번호까지 모두 맞다면, 해당 정보를 JWT를 이용하여 사용자에게 json으로 전달
     */
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({ message: '요청한 아이디가 존재하지 않습니다' });
    }
    const isValidpassword = await bcrypt.compare(password, user.password);
    if (!isValidpassword) {
        return res.status(401).json({ message: '아이디 또는 비밀번호를 확인하세요' });
    }
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });
}


// 토큰 인증방식 
export async function me (req, res, next){
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({ message:'사용자가 존재하지 않음'});
    }
    res.status(200).json({ token: req.token, username: user.username});
}

function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
}

