const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');
const path = require('path');

(async function testRegisterEstateWithoutFilling() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find the email input field, and type in an email
        await driver.findElement(By.id('floating_email')).sendKeys('lajitip375@apxby.com');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('Senha123!');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        // Find and click on the Visitas link
        const visitas = await driver.wait(until.elementLocated(By.xpath("//a[text() = 'Meus Imóveis']")), 10000);
        await driver.wait(until.elementIsVisible(visitas), 1000).click();

        // Find and click on the 'Cadastrar Imóvel' button
        const cadastrarImovelBtn = await driver.wait(until.elementLocated(By.xpath("//button[.//span[text() = 'Cadastrar Imóvel']]")), 10000);
        await driver.wait(until.elementIsVisible(cadastrarImovelBtn), 1000).click();

        // 1. Locate the button
        const buttonElement = await driver.wait(until.elementLocated(By.xpath('//button[span[text()="Cadastrar"]]')), 2000);

        // 2. Get the class attribute of the button
        const buttonClass = await buttonElement.getAttribute('class');

        // 3. Check if the button has the non-clickable classes
        if (buttonClass.includes('group-invalid:pointer-events-none')) {
            console.log("The button is not clickable due to 'pointer-events-none'");
            console.log("UC004-4 test passed");
        } else {
            console.log("The button is clickable");
            console.log("UC004-4 test failed");
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

