// 기본 질문 설정 - 시드

'use strict';

export async function up(queryInterface, Sequelize) {
  // 기본 데이터 삽입
  await queryInterface.bulkInsert('Diary', [
    {
      question: '오늘 하루 어땠나요?',
    },
    {
      question: '오늘 기분은 어땠나요?',
    },
    {
      question: '오늘 가장 기억에 남는 순간은 무엇인가요?',
    },
  ], {});
}
export async function down(queryInterface, Sequelize) {
  // 롤백 시 데이터 삭제
  await queryInterface.bulkDelete('Diary', null, {});
}