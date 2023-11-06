const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testViewCalendar() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find the email input field when it has loaded, and type in an email
        const emailInput = await driver.wait(until.elementLocated(By.id('floating_email')), 5000);
        await driver.wait(until.elementIsVisible(emailInput), 1000).sendKeys('s.parreira@aluno.ifsp.edu.br');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        // Find and click on the Visitas link
        const visitas = await driver.wait(until.elementLocated(By.xpath("//a[text() = 'Visitas']")), 10000);
        await driver.wait(until.elementIsVisible(visitas), 1000).click();

        // Find and click on the 'fc-icon fc-icon-chevron-right' span
        const rightChevronSpan = await driver.wait(until.elementLocated(By.xpath("//span[@class='fc-icon fc-icon-chevron-right']")), 5000);
        await driver.wait(until.elementIsVisible(rightChevronSpan), 1000).click();

        // Find and click on the 'Cliente Fulano Teste' link
        const clienteLink = await driver.wait(until.elementLocated(By.xpath("//a[text() = 'Cliente Fulano Teste']")), 5000);
        await driver.wait(until.elementIsVisible(clienteLink), 1000).click();

        // Verify if the new element containing 'Detalhes da visita' shows up
        const detalhesVisita = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Detalhes da visita')]")), 5000);
        if (detalhesVisita) {
            console.log("Element 'Detalhes da visita' found!");
            console.log('UC003-9 test passed.');
        } else {
            console.log("Element 'Detalhes da visita' not found.");
            console.log("UC003-9 test failed.");
        }
        
    }
    catch(error) {
        console.log(error);
    }
    finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

