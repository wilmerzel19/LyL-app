const quizData = [
    {
      question: '¿Cuál es el lugar de nacimiento de Rubén Darío?',
      options: ['Managua', 'Granada', 'León', 'Masaya'],
      answer: 'Metapa (Ahora conocida como Ciudad Darío)',
    },
    {
      question: '¿En qué movimiento literario se considera a Rubén Darío una figura importante?',
      options: ['Romanticismo', 'Realismo', 'Modernismo', 'Naturalismo'],
      answer: 'Modernismo',
    },
    {
      question: '¿Cuál es el famoso libro de Rubén Darío que a menudo se considera una piedra angular del Modernismo?',
      options: ['Azul', 'Cantos de vida y esperanza', 'Prosas Profanas', 'Los Raros'],
      answer: 'Azul',
    },
    {
      question: '¿Cuál es el nombre completo de Rubén Darío?',
      options: ['Rubén Darío López', 'Rubén Darío Sarmiento', 'Félix Rubén García Sarmiento', 'Rubén Darío Hernández'],
      answer: 'Félix Rubén García Sarmiento',
    },
    {
      question: '¿Cuál famoso poema de Rubén Darío comienza con el verso "Canción de la vida profunda"?',
      options: ['Azul', 'Cantos de vida y esperanza', 'Prosas Profanas', 'Los Raros'],
      answer: 'Cantos de vida y esperanza',
    },
  ];
  
  // El resto de tu código existente permanece sin cambios.
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Tu Puntuacion ${score} de ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Pregunta:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Tu Respuesta:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Respuesta Correcta:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Tu Puntuacion ${score} de ${quizData.length}!</p>
      <p>Respuestas Incorrectas:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();