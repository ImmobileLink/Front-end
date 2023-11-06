const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find the email input field, and type in an email
        await driver.findElement(By.id('floating_email')).sendKeys('s.parreira@aluno.ifsp.edu.br');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the login button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Entrar")]')).click();

        await driver.sleep(3000);

        // Wait for the div to be visible
        const mainDivs = await driver.wait(until.elementsLocated(By.css('.mb-4')), 10000);
        const mainDiv = mainDivs[0];
        await driver.wait(until.elementIsVisible(mainDiv), 5000);   
    
        // Check for the presence of "Imobiliaria Bluepenasnx" and "Teste Automatizado UC005-1" within the div
        const imobiliariaElement = await mainDiv.findElements(By.xpath('.//p[contains(text(), "Imobiliaria BluePenasnx")]'));
        const testeElement = await mainDiv.findElements(By.xpath('.//p[contains(text(), "Teste automatizado UC005-1")]'));

        // console.log("Post Title Find Length: " + imobiliariaElement.length);
        // console.log("Post Body Find Length: " + testeElement.length);

        if (imobiliariaElement.length > 0 && testeElement.length > 0) {
            // If both texts are found, click the "..." on the top right corner
            const specifiedButton = await mainDiv.findElement(By.css('button.float-right'));
            await specifiedButton.click();
        }

        // Locate the button with the text "Denunciar" and click it
        const denunciarButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), "Denunciar")]')), 10000);
        await driver.wait(until.elementIsVisible(denunciarButton), 5000);
        await denunciarButton.click();

        // Locate the radio button with the value "Spam" and click it
        const spamRadioButton = await driver.wait(until.elementLocated(By.css('input[type="radio"][value="Spam"]')), 10000);

        // Scroll the radio button into view and click it
        await driver.executeScript("arguments[0].scrollIntoView(true);", spamRadioButton);
        await driver.sleep(1000);
        await driver.wait(until.elementIsVisible(spamRadioButton), 5000);
        await spamRadioButton.click();

        // Locate the textarea
        const textArea = await driver.findElement(By.css('textarea.dark\\:bg-dark-200'));

        // Scroll the textarea into view
        await driver.executeScript("arguments[0].scrollIntoView(true);", textArea);
        await driver.sleep(1000);
        await driver.wait(until.elementIsVisible(textArea), 5000);
        await textArea.click();

        // Send desired text
        await textArea.sendKeys('Descrição teste de denúncia de post');

        // Find the "FINALIZAR DENÚNCIA" button and click it
        const submitButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(@class, "bg-blue-700") and contains(., "FINALIZAR DENÚNCIA")]')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
        await driver.sleep(1000);
        await driver.wait(until.elementIsVisible(submitButton), 2000);
        await submitButton.click();

        // See if the div containing Denúncia Realizada is present or not
        const denunciaElement = await driver.wait(until.elementLocated(By.css('h1.ml-0.md\\:ml-8.text-xl.md\\:text-2xl.my-2.md\\:my-4')), 10000).catch(() => null);
        if (denunciaElement) {
            const isElementVisible = await driver.wait(until.elementIsVisible(denunciaElement), 5000).catch(() => null);
            if (isElementVisible) {
                console.log("Element 'DENÚNCIA REALIZADA' is located and visible.");
                console.log("UC012-2 test passed.");
            } else {
                console.log("Element 'DENÚNCIA REALIZADA' is located but not visible.");
                console.log("UC012-2 test failed.");
            }
        } else {
            console.log("Element 'DENÚNCIA REALIZADA' is not located.");
            console.log("UC012-2 test failed.");
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

