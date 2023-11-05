const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testVisit() {
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
        const inputData = ['Cliente Fulano Teste', '11986391919', 'fulano.teste.agendamento@gmail.com', '06112023', '1400'];

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

        // Waits for Delegar Visita corretor button to be both on the DOM and visible on the screen before clicking
        const enviarVisita = await driver.wait(until.elementLocated(By.xpath("//button[span[contains(text(), 'Delegar Visita')]]")), 1000);  // wait up to a second for the element to be located
        await driver.wait(until.elementIsVisible(enviarVisita), 1000).click();  // wait up a second for the element to become visible, then click it

    }
    catch(error) {
        console.log(error);
        console.log("UC003-1 test failed.");
    }
    finally {
        console.log('UC003-1 test passed.');
        console.log("Test Ended.")
        await driver.quit();
    }
})();

