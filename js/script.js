const quizData = {
    general: {
        easy: [
            { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2 },
            { question: "How many days in a year?", options: ["365", "366", "360", "364"], answer: 0 },
            { question: "Which animal is known as the King of the Jungle?", options: ["Tiger", "Lion", "Elephant", "Bear"], answer: 1 }
        ],
        medium: [
            { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], answer: 2 },
            { question: "What is the currency of Japan?", options: ["Yen", "Won", "Dollar", "Yuan"], answer: 0 }
        ],
        hard: [
            { question: "In which year did the Titanic sink?", options: ["1910", "1912", "1914", "1916"], answer: 1 },
            { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: 1 }
        ]
    },
    science: {
        easy: [
            { question: "H2O is the chemical formula for?", options: ["Oxygen", "Water", "Hydrogen", "Gold"], answer: 1 },
            { question: "What planet is closest to the sun?", options: ["Venus", "Mars", "Mercury", "Earth"], answer: 2 }
        ],
        medium: [
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], answer: 2 },
            { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 1 }
        ],
        hard: [
            { question: "What is the speed of light?", options: ["299,792 km/s", "300,000 km/s", "150,000 km/s", "Unknown"], answer: 0 },
            { question: "Who discovered Penicillin?", options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Newton"], answer: 1 }
        ]
    },
    technology: {
        easy: [
            { question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"], answer: 1 },
            { question: "Which company makes the iPhone?", options: ["Samsung", "Google", "Apple", "Nokia"], answer: 2 }
        ],
        medium: [
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"], answer: 0 },
            { question: "Which language is used for web apps?", options: ["PHP", "Python", "Java", "All of the above"], answer: 3 }
        ],
        hard: [
            { question: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"], answer: 1 },
            { question: "What is the main function of an OS?", options: ["Manage Hardware", "Browse Web", "Edit Photos", "Send Emails"], answer: 0 }
        ]
    }
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timer;
let timeLeft = 15;
let timeSpentPerQuestion = [];
let questionStartTime;

const landingPage = document.getElementById('landing-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');

const categorySelect = document.getElementById('category');
const difficultySelect = document.getElementById('difficulty');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const timeDisplay = document.getElementById('time');
const questionNumberDisplay = document.getElementById('question-number');
const nextBtn = document.getElementById('next-btn');

function startQuiz() {
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;

    if (quizData[category] && quizData[category][difficulty]) {
        currentQuestions = quizData[category][difficulty];
    } else {
        alert("No questions found for this selection!");
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    timeSpentPerQuestion = [];

    landingPage.classList.remove('active');
    landingPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    quizPage.classList.add('active');

    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    timeDisplay.innerText = timeLeft;
    startTimer();

    questionStartTime = Date.now();

    const currentQ = currentQuestions[currentQuestionIndex];
    questionText.innerText = currentQ.question;
    questionNumberDisplay.innerText = currentQuestionIndex + 1;

    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');

    currentQ.options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.classList.add('option-btn');
        btn.innerText = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSubmit();
        }
    }, 1000);
}

function selectAnswer(selectedIndex) {
    clearInterval(timer);

    const timeTaken = (Date.now() - questionStartTime) / 1000;
    timeSpentPerQuestion.push(timeTaken);

    const currentQ = currentQuestions[currentQuestionIndex];
    const options = optionsContainer.children;

    if (selectedIndex === currentQ.answer) {
        score++;
        options[selectedIndex].classList.add('correct');
        userAnswers.push(true);
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[currentQ.answer].classList.add('correct');
        userAnswers.push(false);
    }

    for (let i = 0; i < options.length; i++) {
        options[i].style.pointerEvents = 'none';
        if (i === currentQ.answer && selectedIndex !== -1 && selectedIndex !== i) {
            options[i].classList.add('correct');
        }
    }

    nextBtn.classList.remove('hidden');
}

function autoSubmit() {
    const timeTaken = 15;
    timeSpentPerQuestion.push(timeTaken);
    userAnswers.push(false);

    const currentQ = currentQuestions[currentQuestionIndex];
    const options = optionsContainer.children;

    if (options[currentQ.answer]) options[currentQ.answer].classList.add('correct');

    for (let i = 0; i < options.length; i++) {
        options[i].style.pointerEvents = 'none';
    }

    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizPage.classList.remove('active');
    quizPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    resultPage.classList.add('active');

    document.getElementById('total-score').innerText = `${score} / ${currentQuestions.length}`;
    const navAccuracy = (score / currentQuestions.length) * 100;
    document.getElementById('accuracy').innerText = `${Math.round(navAccuracy)}%`;

    renderCharts();
}

function renderCharts() {
    const ctxScore = document.getElementById('scoreChart').getContext('2d');
    const ctxTime = document.getElementById('timeChart').getContext('2d');

    new Chart(ctxScore, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [score, currentQuestions.length - score],
                backgroundColor: ['#4CAF50', '#FF5252']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Performance' }
            }
        }
    });

    new Chart(ctxTime, {
        type: 'bar',
        data: {
            labels: currentQuestions.map((_, i) => `Q${i + 1}`),
            datasets: [{
                label: 'Time Spent (s)',
                data: timeSpentPerQuestion,
                backgroundColor: '#6C63FF'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Time per Question' }
            },
            scales: {
                y: { beginAtZero: true, max: 16 }
            }
        }
    });
}
