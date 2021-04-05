package com.bookstore.stepdefinitions;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import io.cucumber.java.en.*;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;


public class BookStoreStepDefinition {

    public static final String DRIVER_PATH = "src/main/resources/chromedriver.exe";

    WebDriver driver;

    @Given("user visits book store website with 2 books")
    public void given() {
        System.setProperty("webdriver.chrome.driver", DRIVER_PATH);
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
        driver.get("https://amazin-online-bookstore-oa.herokuapp.com/#/Books");
    }

    @When("user clicks on add to cart for the books")
    public void when() {
        for (WebElement e : driver.findElements(By.xpath("//span[text()='Add to Cart']"))) {
            e.click();
        }
    }

    @Then("2 books should be added to cart")
    public void then() throws InterruptedException {
        Thread.sleep(500);
        List<WebElement> rows = driver.findElements(By.xpath("//span[text()='Remove from Cart']"));
        assert rows.size() == 2;
    }
}
