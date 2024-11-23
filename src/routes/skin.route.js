import express from 'express';
import * as skinController from '../controllers/skincontroller.js';

const router = express.Router();

// 구매 가능한 스킨 목록
router.get('/purchasable', skinController.getPurchasableSkins);

// 스킨 구매 - 유저 리워드 차감
router.post('/purchase', skinController.purchaseSkin);

// 유저별 구매한 스킨 목록
router.get('/purchased', skinController.getPurchasedSkins);

// 스킨 활성화 - 지워도됨
router.post('/activate', skinController.activateSkin);

export default router;
