const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testVisitNotification() {
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

        // Find and click on the Conta button on the header
        const pElement = await driver.wait(until.elementLocated(By.xpath('//p[text()="Conta"]')), 2000);
        await driver.wait(until.elementIsVisible(pElement), 1000).click();
        
        // Logout
        const sairLink = await driver.wait(until.elementLocated(By.xpath('//a[text()="Sair"]')), 2000);
        await driver.wait(until.elementIsVisible(sairLink), 1000).click();

        // Login as Corretor to check if notifications worked

        // Find the email input field when it has loaded, and type in an email
        const emailInput = await driver.wait(until.elementLocated(By.id('floating_email')), 5000);
        await driver.wait(until.elementIsVisible(emailInput), 1000).sendKeys('s.parreira@aluno.ifsp.edu.br');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        // Find and click on the Notificações button on the header
        const notificacoes = await driver.wait(until.elementLocated(By.xpath('//p[text()="Notificações"]')), 5000);
        await driver.wait(until.elementIsVisible(notificacoes), 1000).click();

        // Locate the <div> element for the notification
        const divElement = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "text-gray-500") and contains(@class, "dark:text-gray-400")]')), 2000);

        // Retrieve text from the <div> excluding the nested <a>
        const divText = await divElement.getText();

        // Locate the nested <a> element within the <div>
        const aElement = await divElement.findElement(By.xpath('./a[contains(@class, "font-semibold") and contains(@class, "text-blue-400")]'));
        const aText = await aElement.getText();

        // Expected texts
        const expectedDivText = " agendou uma nova visita em seu nome";
        const expectedAText = "Imobiliaria BluePenasnx";

        // Verify the texts
        if (divText === "Imobiliaria BluePenasnx agendou uma nova visita em seu nome" && aText === "Imobiliaria BluePenasnx") {
            console.log("The text matches! The notification exists and is right");
        } else {
            console.log("The text does not match! The notification might not exist or be wrong");
        }
    }
    catch(error) {
        console.log(error);
        console.log("UC003-8 test failed.");
    }
    finally {
        console.log('UC003-8 test passed.');
        console.log("Test Ended.")
        await driver.quit();
    }
})();

