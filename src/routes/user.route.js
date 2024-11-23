import express from "express";
import * as userControllers from "../controllers/user.controller.js";

import dotenv from 'dotenv';
dotenv.config();  // .env 파일을 로드

const router = express.Router();

// 카카오 로그인 페이지로 리디렉션 (로그인 버튼 클릭 시 호출)
router.get('/login', userControllers.kakaoLogin);

// 카카오 인증 후 리디렉션된 콜백을 처리하는 라우트 (인증 후 서버에서 토큰을 받음)
router.get('/kakao/callback', userControllers.kakaoCallback);

export default router;