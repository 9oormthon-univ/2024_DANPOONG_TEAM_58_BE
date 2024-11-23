// src/initialize.js
import { Diary, Skin, SkinImage, Question } from './models/index.js'; // Sequelize 모델 불러오기

async function initializeQuestions() {
  const questions = [
    {
      content: "만약 지금 당장 나 자신을 위해 해줄 수 있는 일이 있다면, 그것은 무엇일까요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    },
    {
      content: "내가 스스로를 돌보기 위해 하는 일은 무엇인가요? 요즘 그런 활동을 충분히 하고 있나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      content: "내 몸은 요즘 어떻게 느껴지나요? (피곤함, 긴장, 무기력 등) 이런 신호들을 어떻게 다루고 있나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      content: "내가 현재 겪고 있는 어려움에 대해 다른 사람에게 솔직히 말할 수 있나요? 만약 그렇지 않다면, 왜 그렇게 느끼나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      content: "최근 나를 특히 힘들게 만든 사건이나 상황이 있나요? 그 상황에서 내가 느꼈던 감정은 무엇인가요?",
      answerAt: new Date(new Date().setDate(new Date().getDate())), // 어제
    },
    {
      content: "내가 가장 자주 스스로에게 하는 말은 무엇인가요? 그 말은 나를 어떻게 느끼게 하나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 1)), // 오늘
    },
    {
      content: "내가 행복했던 마지막 순간은 언제였나요? 그때 어떤 상황이었고, 무엇이 나를 행복하게 했나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 2)), // 내일
    },
    {
      content: "하루 중 가장 우울감이 심해지는 시간대는 언제인가요? 그때 무슨 생각을 주로 하나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
    {
      content: "내가 스스로에게 부여하는 기대나 압박이 있나요? 그렇다면, 그것이 나를 어떻게 영향을 미치나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 4)),
    },
    {
      content: "내 인생에서 가장 중요하다고 생각하는 것은 무엇인가요? 요즘 그것을 충족시키고 있나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 5)),
    },
    {
      content: "현재 내가 가장 두려워하거나 걱정하는 것은 무엇인가요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 6)),
    },
    {
      content: "내가 요즘 자주 느끼는 감정은 무엇인가요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      content: "내가 주로 만나는 사람들과의 관계에서 어떤 감정을 느끼나요? 그 관계들이 나를 지지해주고 있나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 8)),
    },
    {
      content: "최근에 누구와의 대화가 나를 가장 위로했나요? 그 대화에서 어떤 부분이 나를 안심하게 했나요?",
      answerAt: new Date(new Date().setDate(new Date().getDate() + 9)),
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