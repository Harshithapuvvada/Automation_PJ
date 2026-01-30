package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class QuizAutomation {

    public static void main(String[] args) {

        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // 1. Verify Landing Page
            System.out.println("=== 1. Verify Landing Page ===");
            driver.get("http://localhost/frugaltestpj/index.php");
            driver.manage().window().maximize();

            String pageTitle = driver.getTitle();
            String currentUrl = driver.getCurrentUrl();

            System.out.println("Page Title: " + pageTitle);
            System.out.println("Current URL: " + currentUrl);

            if (pageTitle.equals("Dynamic Quiz Application")) {
                System.out.println("Land Page Verification: PASSED");
            } else {
                System.out.println("Land Page Verification: FAILED");
            }

            // 2. Start Quiz
            System.out.println("\n=== 2. Start Quiz ===");
            // Using default selection (General / Easy)
            WebElement startBtn = driver.findElement(By.id("start-btn"));
            startBtn.click();

            // Wait for quiz page to be visible
            WebElement quizPage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("quiz-page")));
            if (quizPage.isDisplayed()) {
                System.out.println("Quiz Started: PASSED");
            } else {
                System.out.println("Quiz Started: FAILED");
            }

            // 3. Question Navigation & Answer Selection
            System.out.println("\n=== 3. Question Navigation & Answer Selection ===");

            // Loop through questions (General Easy has 3 questions)
            int totalQuestions = 3;

            for (int i = 1; i <= totalQuestions; i++) {
                System.out.println("Processing Question " + i + "...");

                // Verify Question Text
                WebElement qText = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("question-text")));
                System.out.println("Question: " + qText.getText());

                // Verify Options present
                List<WebElement> options = driver.findElements(By.className("option-btn"));
                if (options.isEmpty()) {
                    System.out.println("Error: No options found!");
                    break;
                }

                // Select an answer (e.g., always select the 2nd options, index 1)
                // The prompt says "select the answer option '3'", let's select index 2 (3rd
                // option)
                int optionToSelect = 2;
                if (options.size() > optionToSelect) {
                    options.get(optionToSelect).click();
                    System.out.println("Selected Option index: " + optionToSelect);
                } else {
                    options.get(0).click(); // Fallback
                }

                // Click Next if it's not the last question
                // Or if logic auto-shows it (my logic shows it after click)
                if (i < totalQuestions) {
                    WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("next-btn")));
                    nextBtn.click();
                } else {
                    // Last question flows to result automatically in some logic,
                    // but my script.js shows Next button which calls showResults() on last index?
                    // Let's check script.js: nextQuestion() checks index < length.
                    // If index == length - 1 (last question state), nextQuestion() is called.
                    // It increments index, then index == length -> showResults().
                    // So we MUST click next button even on last question to trigger showResults.
                    WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("next-btn")));
                    nextBtn.click();
                }

                Thread.sleep(1000); // Short pause for visual confirmation
            }

            // 4. Submit Quiz (Handled by last Next Button in this logic, effectively
            // "Submit")
            System.out.println("\n=== 4. Submit Quiz ===");
            // In my logic, "Next" on last question acts as submit/finish.

            // 5. Score Calculation
            System.out.println("\n=== 5. Score Calculation ===");
            WebElement resultPage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("result-page")));

            if (resultPage.isDisplayed()) {
                WebElement diffText = driver.findElement(By.id("total-score"));
                WebElement accText = driver.findElement(By.id("accuracy"));

                System.out.println("Quiz Finished!");
                System.out.println("Total Score Displayed: " + diffText.getText());
                System.out.println("Accuracy Displayed: " + accText.getText());
                System.out.println("Result Verification: PASSED");
            } else {
                System.out.println("Result Page Not Visible: FAILED");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close browser
            // driver.quit();
            // Commented out so user can see result, uncomment for full auto
        }
    }
}
