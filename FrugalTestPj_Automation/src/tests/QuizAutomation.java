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

            WebElement startBtn = driver.findElement(By.id("start-btn"));
            startBtn.click();

            WebElement quizPage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("quiz-page")));
            if (quizPage.isDisplayed()) {
                System.out.println("Quiz Started: PASSED");
            } else {
                System.out.println("Quiz Started: FAILED");
            }

            int totalQuestions = 3;

            for (int i = 1; i <= totalQuestions; i++) {
                System.out.println("Processing Question " + i + "...");

                WebElement qText = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("question-text")));
                System.out.println("Question: " + qText.getText());

                List<WebElement> options = driver.findElements(By.className("option-btn"));
                if (options.isEmpty()) {
                    System.out.println("Error: No options found!");
                    break;
                }

                int optionToSelect = 2;
                if (options.size() > optionToSelect) {
                    options.get(optionToSelect).click();
                    System.out.println("Selected Option index: " + optionToSelect);
                } else {
                    options.get(0).click();
                }

                if (i < totalQuestions) {
                    WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("next-btn")));
                    nextBtn.click();
                } else {
                    WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("next-btn")));
                    nextBtn.click();
                }

                Thread.sleep(1000);
            }

            // Give time for the result page animation and chart rendering to stabilize
            Thread.sleep(2000);

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
            // driver.quit();
        }
    }
}
