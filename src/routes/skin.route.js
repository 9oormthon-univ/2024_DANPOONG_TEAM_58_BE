import express from 'express';
import * as skinController from '../controllers/skincontroller.js';

const router = express.Router();

// 구매 가능한 스킨 목록
router.get('/skins/purchasable', skinController.getPurchasableSkins);

// 스킨 구매
router.post('/skins/purchase', skinController.purchaseSkin);

// 구매한 스킨 목록
router.get('/skins/purchased', skinController.getPurchasedSkins);

// 스킨 활성화
router.post('/skins/activate', skinController.activateSkin);

export default router;
