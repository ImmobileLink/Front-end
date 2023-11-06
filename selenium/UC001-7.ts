const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testSignInWrongEmail() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find sign in button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Cadastre-se")]')).click();

        // Find the email input field, and type in an email
        await driver.findElement(By.id('floating_email')).sendKeys('s.parreira@aluno.ifsp.edu.br');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the password confirmation input field, and type in a password
        await driver.findElement(By.css("input[type='password'][name='floating_email']")).sendKeys('S&UYjVg%e9');


        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();

        await driver.sleep(1000);

        // Locate whether the red label element exists
        const redLabel = (await driver.findElements(By.css('label.text-red-500.text-xs')))
        console.log(redLabel.length);
        const exists = redLabel.length > 2;
        console.log(exists);
        if (exists) {
            console.log('UC001-7 test passed.');
        } else {
            console.log('UC001-7 test failed.');
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

