document.addEventListener('DOMContentLoaded', () => {
  let quizData = [];
  let currentQuestion = null;

  const structureImage = document.getElementById('structure-image');
  const answerForm = document.getElementById('answer-form');
  const answerInput = document.getElementById('answer-input');
  const resultDiv = document.getElementById('result');
  const nextButton = document.getElementById('next-button');

  // JSONファイルからクイズデータを読み込む
  function loadQuizData() {
    fetch('answers.json')
      .then(response => response.json())
      .then(data => {
        quizData = data;
        showRandomQuestion();
      })
      .catch(error => {
        console.error('クイズデータの読み込みエラー:', error);
        resultDiv.textContent = 'クイズデータの読み込みに失敗しました。';
      });
  }

  // ランダムな問題を表示
  function showRandomQuestion() {
    resultDiv.textContent = '';
    answerInput.value = '';
    if (quizData.length === 0) {
      structureImage.src = '';
      resultDiv.textContent = 'クイズデータがありません。';
      return;
    }
    const randomIndex = Math.floor(Math.random() * quizData.length);
    currentQuestion = quizData[randomIndex];
    structureImage.src = currentQuestion.image;
  }

  // 回答フォーム送信時の処理
  answerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userAnswer = answerInput.value.trim();
    if (!currentQuestion) return;

    // 大文字小文字を区別せずに比較
    if (userAnswer.toLowerCase() === currentQuestion.name.toLowerCase()) {
      resultDiv.textContent = '正解！';
    } else {
      resultDiv.textContent = '不正解。もう一度試してください。';
    }
  });

  // 次の問題ボタンの処理
  nextButton.addEventListener('click', () => {
    showRandomQuestion();
  });

  loadQuizData();
});
