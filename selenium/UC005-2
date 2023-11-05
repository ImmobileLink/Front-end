const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');
const path = require('path');

(async function testPostNoFillling() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find the email input field, and type in an email
        await driver.findElement(By.id('floating_email')).sendKeys('s.parreira@aluno.ifsp.edu.br');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        // Locate and populate the textarea
        const textArea = await driver.wait(until.elementLocated(By.xpath('//textarea[@placeholder="Nova publicação"]')), 10000);
        await driver.wait(until.elementIsVisible(textArea), 2000);
        await textArea.click();
        await textArea.sendKeys('Teste automatizado UC005-2');

        // Waits for Publicar button to be both on the DOM and visible on the screen before clicking
        const publicar = await driver.wait(until.elementLocated(By.xpath("//button[span[contains(text(), 'Publicar')]]")), 1000);  // wait up to a second for the element to be located
        await driver.wait(until.elementIsVisible(publicar), 1000).click();  // wait up a second for the element to become visible, then click it

        // 2. Checks if the error message has appeared
        // Check for the error message
        const errorMessage = await driver.wait(until.elementLocated(By.css('div.go685806154')), 5000);
        await driver.wait(until.elementIsVisible(errorMessage), 2000);

        // If the element is found, print to the console and stop the interval
        if (errorMessage) {
            console.log("Error message found!");
            console.log('UC005-2 test passed.')
        } else {
            console.log("Error message not found!");
            console.log('UC005-2 test passed.')
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

