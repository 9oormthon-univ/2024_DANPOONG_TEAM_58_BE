import * as skinService from "../services/skin.service.js";

// 구매 가능한 스킨 목록
export const getPurchasableSkins = async (req, res) => {
  try {
    const skins = await skinService.getPurchasableSkins();
    res.json(skins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스킨 구매
export const purchaseSkin = async (req, res) => {
  try {
    const { userId, skinId } = req.body;
    const skins = await skinService.purchaseSkin(userId, skinId);
    res.json({ message: "스킨 구매 완료", skins });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 구매한 스킨 목록
export const getPurchasedSkins = async (req, res) => {
  try {
    const { userId } = req.query;
    const skins = await skinService.getPurchasedSkins(userId);
    res.json(skins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스킨 활성화
export const activateSkin = async (req, res) => {
  try {
    const { userId, skinId } = req.body;
    const activeSkin = await skinService.activateSkin(userId, skinId);
    res.json({ message: "스킨이 활성화되었습니다.", activeSkin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
