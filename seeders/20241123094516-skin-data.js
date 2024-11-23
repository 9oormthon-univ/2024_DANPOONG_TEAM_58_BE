// 기본 스킨 설정

export async function up(queryInterface, Sequelize) {
  const skins = [
    { name: 'default', createdAt: new Date(), updatedAt: new Date() },
    { name: 'golden', createdAt: new Date(), updatedAt: new Date() },
    { name: 'silver', createdAt: new Date(), updatedAt: new Date() },
    { name: 'platinum', createdAt: new Date(), updatedAt: new Date() }
  ];

  const skinImages = [
    { emotion: 'happy', image: 'https://example.com/happy.png', createdAt: new Date(), updatedAt: new Date() },
    { emotion: 'sad', image: 'https://example.com/sad.png', createdAt: new Date(), updatedAt: new Date() },
    { emotion: 'angry', image: 'https://example.com/angry.png', createdAt: new Date(), updatedAt: new Date() },
    { emotion: 'neutral', image: 'https://example.com/neutral.png', createdAt: new Date(), updatedAt: new Date() }
  ];

  // 기본 스킨 데이터 삽입
  const createdSkins = await queryInterface.bulkInsert('Skin', skins, { returning: true });

  // 각 스킨에 연결될 이미지 삽입
  const skinImagesWithSkinId = skinImages.map((image, index) => ({
    ...image,
    pk2: createdSkins[index].pk, // 연결된 skin ID
  }));

  // 기본 이미지 데이터 삽입
  await queryInterface.bulkInsert('SkinImage', skinImagesWithSkinId);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Skin', null, {});
  await queryInterface.bulkDelete('SkinImage', null, {});
}