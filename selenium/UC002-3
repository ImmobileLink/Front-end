const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testLoginWrongUser() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find the email input field, and type in an email
        await driver.findElement(By.id('floating_email')).sendKeys('s.parreira@aluno.ifsp.edu.br');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e8');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        await driver.sleep(1000);

        // Locate whether the error message element exists
        let wrongMessage = await driver.wait(until.elementLocated(By.xpath(`//div[span[text()="Ops!"]]`)), 10000); // waits up to 5 seconds
        if (wrongMessage === undefined || wrongMessage === null) {
            console.error('UC002-3 test failed.');
        } else {
            console.log('UC002-3 test passed.');
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

