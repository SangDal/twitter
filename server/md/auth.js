import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = {message: '인증 에러!'};

// 인증의 여부를 알려주는 함수
export const isAuth = async(req, res, next) => {

    const authHeader = req.get('Authorization');

    // 해더에 Bearer이 존재 하는지 확인 [안나오면 팅겨버리기]
    if (!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR);
    }
    // 해더에서 Bearer을 빼고 토큰값만 뺴온 소스 [Bearer이 존재한상태]
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        '10KUr*1eDAK7%rTS*NW&qQW&ZMGhm$Bp',
        async (error, decoded) => {
            if(error){
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next();
        }
    )
}