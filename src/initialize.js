// src/initialize.js
import { Diary, Skin, SkinImage, Question } from './models/index.js'; // Sequelize 모델 불러오기

async function initializeQuestions() {
  const questions = [
    {
      content: "오늘 하루 어땠나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 2)), // 내일
    },
    {
      content: "오늘 기분은 어땠나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 1)), // 오늘
    },
    {
      content: "오늘 가장 기억에 남는 순간은 무엇인가요?",
      answerAt: new Date(new Date().setDate(new Date().getDate())), // 어제
    },
  ];

  // 각 질문에 대해 answerAt 값을 하루 단위로 설정
  for (const item of questions) {
    item.answerAt.setHours(0, 0, 0, 0);

    const existingQuestion = await Question.findOne({
      where: { content: item.content },
    });

    if (!existingQuestion) {
      await Question.create(item);
      console.log(`Inserted question: ${item.content}`);
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