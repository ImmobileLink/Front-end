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

        // Locate the button using the data-testid attribute and then its child button
        const acceptButton = await driver.wait(until.elementLocated(By.css('div[data-testid="flowbite-tooltip-target"] > button')), 10000); // wait up to 10 seconds
        await driver.wait(until.elementIsVisible(acceptButton), 5000); // wait up to 5 seconds
        await acceptButton.click();

        // Locate the <a> element using the text and href attribute
        const linkElement = await driver.wait(until.elementLocated(By.xpath('//a[contains(text(), "Gabriel Parreira") and @href="/perfil/37c2a797-fb70-41cb-b971-39620d123ebe"]')), 10000);
        await driver.wait(until.elementIsVisible(linkElement), 5000); // wait up to 5 seconds
        await linkElement.click();

        // Check if connected
        buttonElement = undefined;
        buttonElement = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), "Associado")]')), 10000);
        await driver.wait(until.elementIsVisible(buttonElement), 5000);

        if (buttonElement) {
            console.log("UC008-4 test passed.");
        } else {
            console.log("UC008-4 test failed.");
        }


    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

