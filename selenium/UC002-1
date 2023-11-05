const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testLogin() {
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

        // Check that the user is redirected to the correct page after logging in
        await driver.sleep(5000);
        let currentURL = await driver.getCurrentUrl();
        if (currentURL !== 'https://immobilelink.vercel.app/pt/feed') {
            console.error('UC002-1 test failed.');
        } else {
            console.log('UC002-1 test passed.');
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

