document.addEventListener('DOMContentLoaded', () => {
  let quizData = [];
  let currentQuestion = null;
  let totalCount = 0;
  let correctCount = 0;
  let isAnswered = false;

  const structureImage = document.getElementById('structure-image');
  const answerForm = document.getElementById('answer-form');
  const answerInput = document.getElementById('answer-input');
  const resultDiv = document.getElementById('result');
  const nextButton = document.getElementById('next-button');
  const finishButton = document.getElementById('finish-button');

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
    isAnswered = false;
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
    if (isAnswered) return;
    const userAnswer = answerInput.value.trim();
    if (!currentQuestion) return;

    totalCount++; // 回答した問題数をカウント

    // 大文字小文字を区別せずに比較
    if (userAnswer.toLowerCase() === currentQuestion.name.toLowerCase()) {
      correctCount++;
      resultDiv.textContent = '正解！';
    } else {
      resultDiv.textContent = `不正解。正解は ${currentQuestion.name} です。`;
    }
    isAnswered = true;
  });

  // 次の問題ボタンの処理
  nextButton.addEventListener('click', () => {
    showRandomQuestion();
  });

  // 終了ボタンの処理：これまでの正解数／問題数を表示し、入力を無効化
  finishButton.addEventListener('click', () => {
    resultDiv.textContent = `終了！ ${totalCount}問中 ${correctCount}問正解でした。`;
    answerInput.disabled = true;
    nextButton.disabled = true;
    finishButton.disabled = true;
  });

  loadQuizData();
});
