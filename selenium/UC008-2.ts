const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testConnection() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find the email input field, and type in an email
        let emailField = await driver.wait(until.elementLocated(By.id('floating_email')), 10000);
        await driver.wait(until.elementIsVisible(emailField), 5000).sendKeys('gabriel.s.parreira@gmail.com');
        
        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        // Click on the name link Gabriel Samori Parreira
        let nameElement = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex cursor-pointer")]/div/p[text()="Imobiliaria BluePenasnx"]')), 10000);
        await driver.wait(until.elementIsVisible(nameElement), 5000);
        await nameElement.click();

        // Ask for connection
        let buttonElement = await driver.wait(until.elementLocated(By.xpath('//button[contains(@class, "bg-blue-700") and text()="Associar"]')), 10000);
        await driver.wait(until.elementIsVisible(buttonElement), 5000);
        await buttonElement.click();

        // Log out from Gabriel Parreira
        // Find and click on the Conta button on the header
        const pElement = await driver.wait(until.elementLocated(By.xpath('//p[text()="Conta"]')), 2000);
        await driver.wait(until.elementIsVisible(pElement), 1000).click();
        
        // Logout
        const sairLink = await driver.wait(until.elementLocated(By.xpath('//a[text()="Sair"]')), 2000);
        await driver.wait(until.elementIsVisible(sairLink), 1000).click();


        // Log in as Gabriel Samori Parreira
        // Find the email input field, and type in an email
        emailField = await driver.wait(until.elementLocated(By.id('floating_email')), 10000);
        await driver.wait(until.elementIsVisible(emailField), 5000).sendKeys('lajitip375@apxby.com');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('Senha123!');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        // Go to notifications and verifiy whether the connection request has arrived from Gabriel Parreira
        // Find and click on the Notificações button on the header
        const notificacoes = await driver.wait(until.elementLocated(By.xpath('//p[text()="Notificações"]')), 5000);
        await driver.wait(until.elementIsVisible(notificacoes), 1000).click();

        // Locate the <div> element for the notification
        const divElement = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "text-gray-500") and contains(@class, "dark:text-gray-400")]')), 2000);

        // Retrieve text from the <div> excluding the nested <a>
        const divText = await divElement.getText();

        // Locate the nested <a> element within the <div>
        const aElement = await divElement.findElement(By.xpath('.//a[contains(@class, "font-semibold") and contains(@class, "text-blue-400") and contains(text(), "Gabriel Parreira")]'));
        const aText = await aElement.getText();

        // Verify the texts
        if (divText === "Gabriel Parreira propôs uma associação" && aText === "Gabriel Parreira") {
            console.log("The text matches! The notification exists and is right");
            console.log("UC008-1 test passed.");
        } else {
            console.log("The text does not match! The notification might not exist or be wrong");
            console.log("UC008-1 test failed.");
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

