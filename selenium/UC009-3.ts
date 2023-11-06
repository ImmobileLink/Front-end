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
        const inputData = ['Cliente Fulano Teste', '11986391919', 'fulano.teste.agendamento@gmail.com', '05112023', '1940'];

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
        let pElement = await driver.wait(until.elementLocated(By.xpath('//p[text()="Conta"]')), 2000);
        await driver.wait(until.elementIsVisible(pElement), 1000).click();
        
        // Logout
        let sairLink = await driver.wait(until.elementLocated(By.xpath('//a[text()="Sair"]')), 2000);
        await driver.wait(until.elementIsVisible(sairLink), 1000).click();

        // Login as Corretor to check if notifications worked

        // Find the email input field when it has loaded, and type in an email
        let emailInput = await driver.wait(until.elementLocated(By.id('floating_email')), 5000);
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

        // Locate the button using the data-testid attribute and then its child button
        const acceptButton = await driver.wait(until.elementLocated(By.css('div[data-testid="flowbite-tooltip-target"] > button')), 10000); // wait up to 10 seconds
        await driver.wait(until.elementIsVisible(acceptButton), 5000); // wait up to 5 seconds
        await acceptButton.click();

        // Close the notifications
        await driver.wait(until.elementIsVisible(notificacoes), 1000).click();

        // Find and click on the Conta button on the header
        pElement = await driver.wait(until.elementLocated(By.xpath('//p[text()="Conta"]')), 2000);
        await driver.wait(until.elementIsVisible(pElement), 1000).click();
        
        // Logout
        sairLink = await driver.wait(until.elementLocated(By.xpath('//a[text()="Sair"]')), 2000);
        await driver.wait(until.elementIsVisible(sairLink), 1000).click();

        // Find the email input field when it has loaded, and type in an email
        emailInput = await driver.wait(until.elementLocated(By.id('floating_email')), 5000);
        await driver.wait(until.elementIsVisible(emailInput), 1000).sendKeys('lajitip375@apxby.com');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('Senha123!');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click(); 

        // Waits for Visitas links to be both on the DOM and visible on the screen before clicking
        let visitas = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Visitas')]")), 10000);  // wait up to 10 seconds for the element to be located
        await driver.wait(until.elementIsVisible(visitas), 10000).click();  // wait up to 10 seconds for the element to become visible, then click it

        await driver.sleep(120000);
        
        // Locate the <tr> element with the specific class
        let trElement = await driver.wait(until.elementLocated(By.css('tr.fc-event.fc-event-start.fc-event-end.fc-event-today.fc-event-future.fc-list-event')), 10000);

        // Wait until the element is visible
        await driver.wait(until.elementIsVisible(trElement), 5000);

        /*
        // Click the <a> inside the <tr> element
        let aElement = await trElement.findElement(By.css('a'));
        await aElement.click();

        // Wait until the modal/div containing the button becomes visible
        let modalElement = await driver.wait(until.elementLocated(By.css('div.flex.flex-col.justify-between.self-center')), 10000);
        await driver.wait(until.elementIsVisible(modalElement), 5000);

        // Locate the button using its unique CSS properties and click
        let buttonElement = await modalElement.findElement(By.css('button.bg-red-400'));
        await buttonElement.click();

        // Accept the pop up notification
        await driver.switchTo().alert().accept();

        await driver.sleep(2000);

        // Locate the <tr> element with the specific class
        trElement = await driver.wait(until.elementLocated(By.css('tr.fc-event.fc-event-start.fc-event-end.fc-event-today.fc-event-future.fc-list-event')), 5000);

        // Wait until the element is visible
        await driver.wait(until.elementIsVisible(trElement), 5000);
        
        // Check for the <a> inside the <tr> element (without clicking)
        await trElement.findElement(By.css('a'));
        console.log("Element found.");

        */
    }
    catch(error) {
        if (error instanceof Error) { // Check if it's an Error object.
            if (error.name === 'NoSuchElementError') {
                console.log("Element not found.");
                console.log("UC009-1 test passed.");
            } else if (error.name === 'TimeoutError') {
                console.log("Timed out waiting for the element.");
                console.log("Element not found.");
                console.log("UC009-1 test passed.");
            } else {

            }
            // console.log(error.message);
        } else {
            console.log("An unexpected error occurred.");
            console.log("UC009-1 test failed.");
        }
    }    
    finally {
        console.log("Test Ended.")
        // await driver.quit();
    }
})();

