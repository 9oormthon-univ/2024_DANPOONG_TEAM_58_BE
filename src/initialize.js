// src/initialize.js
import { Diary, Skin, SkinImage } from './models/index.js'; // Sequelize 모델 불러오기

async function initializeQuestions() {
  const questions = [
    { question: "오늘 하루 어땠나요?" },
    { question: "오늘 기분은 어땠나요?" },
    { question: "오늘 가장 기억에 남는 순간은 무엇인가요?" },
  ];

  for (const question of questions) {
    const existingQuestion = await Diary.findOne({
      where: { question: question.question },
    });

    if (!existingQuestion) {
      await Diary.create(question);
      console.log(`Inserted question: ${question.question}`);
    }
  }
}

async function initializeSkins() {
  const skins = [
    { name: "default", createdAt: new Date(), updatedAt: new Date() },
    { name: "golden", createdAt: new Date(), updatedAt: new Date() },
    { name: "silver", createdAt: new Date(), updatedAt: new Date() },
    { name: "platinum", createdAt: new Date(), updatedAt: new Date() },
  ];

  const skinImages = [
    { emotion: "happy", image: "https://example.com/happy.png", createdAt: new Date(), updatedAt: new Date() },
    { emotion: "sad", image: "https://example.com/sad.png", createdAt: new Date(), updatedAt: new Date() },
    { emotion: "angry", image: "https://example.com/angry.png", createdAt: new Date(), updatedAt: new Date() },
    { emotion: "neutral", image: "https://example.com/neutral.png", createdAt: new Date(), updatedAt: new Date() },
  ];

  for (const skin of skins) {
    const existingSkin = await Skin.findOne({
      where: { name: skin.name },
    });

    if (!existingSkin) {
      const createdSkin = await Skin.create(skin);
      console.log(`Inserted skin: ${skin.name}`);

      const imagesForSkin = skinImages.map(image => ({
        ...image,
        pk2: createdSkin.id, // 연결된 skin ID
      }));

      for (const image of imagesForSkin) {
        const existingImage = await SkinImage.findOne({
          where: { emotion: image.emotion, image: image.image },
        });

        if (!existingImage) {
          await SkinImage.create(image);
          console.log(`Inserted image for emotion: ${image.emotion}`);
        }
      }
    }
  }
}

async function initializeData() {
  try {
    await initializeQuestions(); // 질문 초기화
    await initializeSkins(); // 스킨 초기화
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

initializeData();