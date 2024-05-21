const questions = [
  {
    question: 'Section tag for content?',
    option1: '<div>',
    option2: '<header>',
    option3: '<section>',
    option4: '<span>',
    answer: 3,
  },
  {
    question: 'Responsive layout with CSS?',
    option1: '% width/height',
    option2: 'Media queries',
    option3: 'Fixed pixels',
    option4: 'Inline styles',
    answer: 2,
  },
  {
    question: '`var`, `let`, `const` difference?',
    option1: 'All same',
    option2: 'Scope (var-global, let/const-block)',
    option3: 'Reassignment (const-no, others-yes)',
    option4: 'All of above',
    answer: 4,
  },
  {
    question: 'Form submission `preventDefault`?',
    option1: 'Validate data',
    option2: 'Stop default behavior',
    option3: 'Redirect form',
    option4: 'Serialize data',
    answer: 2,
  },
  {
    question: 'Nested list in HTML?',
    option1: '<ul><li>...</li><ul>...</ul></li></ul>',
    option2: '<ul><li>...</li><li>...</li></ul>',
    option3: '<li><ul>...</ul></li>',
    option4: 'Not possible',
    answer: 1,
  },
  {
    question: 'CSS `box-sizing` property?',
    option1: 'Font size',
    option2: 'Width/height calculation',
    option3: 'Background color',
    option4: 'Margin',
    answer: 2,
  },
  {
    question: 'GET vs POST (HTTP requests)?',
    option1: 'GET-retrieve, POST-send data',
    option2: 'Speed (GET-faster)',
    option3: 'Data size limit (GET-limited)',
    option4: 'No difference',
    answer: 1,
  },
  {
    question: 'Add event listener (JS)?',
    option1: 'addEventListener',
    option2: 'attachEvent',
    option3: 'onclick',
    option4: 'All of above',
    answer: 4,
  },
  {
    question: 'React/Angular purpose?',
    option1: 'Single-page apps',
    option2: 'Animations/interactivity',
    option3: 'Efficient styling',
    option4: 'Form validation',
    answer: 1,
  },
  {
    question: 'Compiled vs Interpreted languages?',
    option1: 'Compiled-machine code, Interpreted-line by line',
    option2: 'Compiled-slower',
    option3: 'Interpreted-more secure',
    option4: 'Only JS interpreted',
    answer: 1,
  },
];

  
  


const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    options.forEach((option, index) => {
        option.innerText = currentQuestion['option' + (index + 1)];
        option.dataset.answer = index + 1;
        option.classList.remove('correct', 'incorrect');
    });

    progressText.innerText = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    progressBarFull.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function checkAnswer(selectedoption) {
    const selectedAnswer = parseInt(selectedoption.dataset.answer);
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        selectedoption.classList.add('correct');
        score += 10;
        scoreText.innerText = score;
    } else {
        const correctoption = document.querySelector(`.option[data-answer="${currentQuestion.answer}"]`);
        correctoption.classList.add('correct');
        selectedoption.classList.add('incorrect');
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(showQuestion, 1000);
    } else {
        localStorage.setItem('mostRecentScore', score);
        window.location.href = 'score.html';
    }
}

options.forEach(option => {
    option.addEventListener('click', () => {
        if (!option.classList.contains('correct') && !option.classList.contains('incorrect')) {
            checkAnswer(option);
        }
    });
});
startGame();