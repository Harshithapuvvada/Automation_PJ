<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Quiz Application</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>

    <div class="container">
        <div id="landing-page" class="active">
            <h1>Dynamic Quiz App</h1>
            <p>Test your knowledge!</p>

            <div class="selection-container">
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category">
                        <option value="general">General Knowledge</option>
                        <option value="science">Science</option>
                        <option value="technology">Technology</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="difficulty">Difficulty</label>
                    <select id="difficulty">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <button id="start-btn" onclick="startQuiz()">Start Quiz</button>
            </div>
        </div>

        <div id="quiz-page" class="hidden">
            <div class="quiz-header">
                <div class="timer-box">
                    <span id="time">15</span>s
                </div>
                <div class="score-indicator">
                    Question: <span id="question-number">1</span>
                </div>
            </div>

            <div class="question-container">
                <h2 id="question-text">Question text goes here?</h2>
                <div id="options-container" class="options-grid">
                    <!-- Options injected via JS -->
                </div>
            </div>

            <button id="next-btn" class="hidden" onclick="nextQuestion()">Next Question</button>
        </div>

        <div id="result-page" class="hidden">
            <h2>Quiz Results</h2>
            <div class="result-summary">
                <div class="stat">
                    <h3>Total Score</h3>
                    <p id="total-score">0</p>
                </div>
                <div class="stat">
                    <h3>Accuracy</h3>
                    <p id="accuracy">0%</p>
                </div>
            </div>

            <div class="charts-container">
                <div class="chart-box">
                    <canvas id="scoreChart"></canvas>
                </div>
                <div class="chart-box">
                    <canvas id="timeChart"></canvas>
                </div>
            </div>

            <button onclick="location.reload()">Restart Quiz</button>
        </div>
    </div>

    <script src="js/script.js"></script>
</body>

</html>