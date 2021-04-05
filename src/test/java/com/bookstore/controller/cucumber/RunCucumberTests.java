package com.bookstore.controller.cucumber;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "html:src/main/resources/features/test.html"}, features = "src/main/resources/features", glue = "com.bookstore.stepdefinitions")
public class RunCucumberTests {
}
