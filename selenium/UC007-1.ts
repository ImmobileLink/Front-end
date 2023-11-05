const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testChangePlan() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Login as Corretor

        // Find the email input field when it has loaded, and type in an email
        const emailInput = await driver.wait(until.elementLocated(By.id('floating_email')), 5000);
        await driver.wait(until.elementIsVisible(emailInput), 1000).sendKeys('s.parreira@aluno.ifsp.edu.br');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        // Find and click on the Conta button on the header
        const pElement = await driver.wait(until.elementLocated(By.xpath('//p[text()="Conta"]')), 2000);
        await driver.wait(until.elementIsVisible(pElement), 1000).click();
        
        // Accessing the Planos page
        const sairLink = await driver.wait(until.elementLocated(By.xpath('//a[text()="Planos"]')), 2000);
        await driver.wait(until.elementIsVisible(sairLink), 1000).click();

        // Locate all buttons matching the given criteria
        let buttons = await driver.wait(until.elementsLocated(By.css('button.flex.p-2.cursor-pointer.text-white.bg-blue-700')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", buttons[1]);
        await driver.wait(until.elementIsVisible(buttons[1]), 2000);
        console.log("Log: Before clicking Button[1]");
        await driver.sleep(1000);
        await buttons[1].click();
        console.log("Log: After clicking Button[1]");
        

        // Accepting the alert pop up notification
        // await driver.sleep(10000000);
        await driver.switchTo().alert().accept();
        console.log("Log: After accepting pop up");
        // await driver.sleep(10000000);
        console.log('UC007-1 test passed.');

    }
    catch(error) {
        console.log(error);
        console.log("UC007-1 test failed.");
    }
    finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

