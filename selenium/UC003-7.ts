const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testVisitNoFill() {
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

        // Waits for Meus Imóveis links to be both on the DOM and visible on the screen before clicking
        const meusImoveis = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Meus Imóveis')]")), 10000);  // wait up to 10 seconds for the element to be located
        await driver.wait(until.elementIsVisible(meusImoveis), 10000).click();  // wait up to 10 seconds for the element to become visible, then click it

        // Waits for Delegar Visita button to be both on the DOM and visible on the screen before clicking
        const delegarVisita = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Delegar Visita')]")), 10000);  // wait up to 10 seconds for the element to be located
        await driver.wait(until.elementIsVisible(delegarVisita), 10000).click();  // wait up to 10 seconds for the element to become visible, then click it

        // Waits for Selecionar corretor button to be both on the DOM and visible on the screen before clicking
        const selecCorretor = await driver.wait(until.elementLocated(By.xpath("//button[span[contains(text(), 'Selecione um corretor')]]")), 1000);  // wait up to a second for the element to be located
        await driver.wait(until.elementIsVisible(selecCorretor), 1000).click();  // wait up a second for the element to become visible, then click it

        // Waits for Gabriel Samori Parreira div to be both on the DOM and visible on the screen before clicking
        const corretorElem = await driver.wait(until.elementLocated(By.xpath("//div[p[text()='Gabriel Samori Parreira']]")), 1000);
        await driver.wait(until.elementIsVisible(corretorElem), 1000).click();

        // Creating the data that will be input        
        const inputData = ['Cliente Fulano Teste', '', '', '06112023', ''];

        // Locate all the relevant input fields based on the new selector
        const inputFields = await driver.findElements(By.css('input.dark\\:bg-gray-600'));

        // Ensure the fields are visible
        for (const field of inputFields) {
            await driver.wait(until.elementIsVisible(field), 2000);
        }

        // Loop and populate
        for (let i = 0; i < inputFields.length && i < inputData.length; i++) {
            if (!await inputFields[i].isEnabled()) {
                console.log(`Input #${i + 1} is not interactable or enabled`);
            } else {
                console.log(`Filling input #${i + 1} with data: ${inputData[i]}`);
                await inputFields[i].clear();
                await inputFields[i].click();
                await inputFields[i].sendKeys(inputData[i]);
            }
        }

        // 1. Locate the button
        const buttonElement = await driver.wait(until.elementLocated(By.xpath('//button[span[text()="Delegar Visita"]]')), 2000);

        // 2. Get the class attribute of the button
        const buttonClass = await buttonElement.getAttribute('class');

        // 3. Check if the button has the non-clickable classes
        if (buttonClass.includes('group-invalid:pointer-events-none')) {
            console.log("The button is not clickable due to 'pointer-events-none'");
            console.log("UC003-7 test passed");
        } else {
            console.log("The button is clickable");
            console.log("UC003-7 test failed");
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

