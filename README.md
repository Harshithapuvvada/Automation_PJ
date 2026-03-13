# Automation_PJ- Project Overview

Based on the repository analysis, this project is composed of two main parts:
1. **A Dynamic Quiz Web Application** (Frontend)
2. **Automated UI Tests** (Java/Selenium)

Here is a detailed breakdown of all the project's functionalities and components:

---

## 1. Dynamic Quiz Web Application
A frontend-only interactive quiz application built with HTML, CSS, and JavaScript. It is designed to run on a local web server (e.g., accessed via `http://localhost/frugaltestpj/index.php`).

### Core Features & Mechanics:
- **Landing Page (Configuration):**
  - Users can select a **Category** (General Knowledge, Science, Technology).
  - Users can choose a **Difficulty** level (Easy, Medium, Hard).
  - A "Start Quiz" button initializes the game state based on these selections.

- **Quiz Execution Page:**
  - **Dynamic Question Loading:** Fetches questions based on the selected category and difficulty. The question bank is hardcoded in `js/script.js` as a JSON object.
  - **Countdown Timer:** Each question has a strict 15-second time limit. If time runs out, the quiz automatically selects an incorrect answer and forces the user to the next question.
  - **Live Feedback:** Upon selecting an option, the app immediately highlights the correct answer in green and incorrect ones in red.
  - **Tracking Metrics:** It tracks both user correctness and the exact time spent answering each question.

- **Results & Analytics Page:**
  - **Score Summary:** Displays the raw Total Score (e.g., "2 / 3") and the overall Accuracy percentage.
  - **Data Visualizations:** Integrates `Chart.js` for dynamic analytics:
    - **Performance Chart (Doughnut):** Visualizes the breakdown of Correct vs. Incorrect answers.
    - **Time Chart (Bar):** Displays a bar graph of "Time Spent (s)" per question.
  - Provides a "Restart Quiz" button to reload the application.

### Technologies Used:
- **HTML5 & CSS3:** Structure and styling (found in `index.php` and `css/style.css`). It utilizes the Google Font *Poppins*.
- **Vanilla JavaScript:** All game logic, state management, timer functions, and DOM manipulation (`js/script.js`).
- **Chart.js:** Used via CDN for analytics visualization on the result page.

---

## 2. Automated UI Testing Infrastructure
The project contains multiple Java projects dedicated to Selenium WebDriver automation, primarily focused on end-to-end testing of the Quiz application.

### Test Components:
- **Main Quiz Automation Script (`tests/QuizAutomation.java` & `FrugalTestPj_Automation/src/tests/QuizAutomation.java`):**
  - **Environment:** Uses Chrome (`ChromeDriver`) and Selenium's `WebDriverWait` for synchronization.
  - **Test Flow:**
    1. **Landing Page Verification:** Opens the local web app and asserts the page title matches `"Dynamic Quiz Application"`.
    2. **Quiz Initialization:** Interacts with the interface to start the quiz using default settings.
    3. **Automated Submission:** Iterates through the questions, reading the question text, parsing the option buttons, simulating clicks/selections, and triggering the "Next Question" transitions.
    4. **Results Verification:** Waits for the results page execution, extracts the dynamically generated Total Score and Accuracy text from the DOM, and validates the end of the test.
  
- **Smoke Tests (`questionAutomationpj/src/questionAutomationpj/TestSelenium.java`):**
  - A simple template class that instantiates WebDriver and navigates to Google, likely used as an environment sanity check to ensure the Selenium binaries (`chromedriver.exe`) are properly configured locally.

### Technologies Used:
- **Java:** Main scripting language for tests.
- **Selenium WebDriver:** For browser automation, element location (`By.id`, `By.className`), and explicit waits (`ExpectedConditions`).
