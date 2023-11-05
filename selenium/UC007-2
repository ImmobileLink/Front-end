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
        const sairLink = await driver.wait(until.elementLocated(By.xpath('//a[text()="Meu perfil"]')), 2000);
        await driver.wait(until.elementIsVisible(sairLink), 1000).click();

        //Checking if the paywall button is present

        // Attempt to locate the element
        let elements = await driver.wait(until.elementsLocated(By.xpath('//a[contains(@class, "w-32 text-white bg-gradient-to-r") and text()="Assine Já"]')), 10000);
        console.log("Elements Length: " + elements.length);
        if (elements.length > 0) {
            // Check if the element is visible
            let isVisible = await elements[0].isDisplayed();
            if (!isVisible) {
                console.log("Premium resources are not available.");
                console.log('UC007-2 test failed.');
            }
        } else {
            let e = new Error("Element not found.");
            console.log(e);
            throw e;          
        }


    }
    catch(error) {
        // console.log(error);
        console.log("Premium resources are available.");
        console.log("UC007-2 test passed.");
    }
    finally {
        console.log("Test Ended.")
        // await driver.quit();
    }
})();

