const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testCancelEditProfile() {
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

        // Find and click on the Conta button on the header
        const conta = await driver.wait(until.elementLocated(By.xpath('//p[text()="Conta"]')), 5000);
        await driver.wait(until.elementIsVisible(conta), 1000).click();

        // Accessing the Meu Perfil page
        const meuPerfil = await driver.wait(until.elementLocated(By.xpath('//a[text()="Meu perfil"]')), 2000);
        await driver.wait(until.elementIsVisible(meuPerfil), 1000).click();

        // Open the Profile editting screen
        // Define the XPath for the button within the specific div
        let buttonXPath = '//div[@class="flex gap-5"]/button';

        // Locate the button using the specified XPath
        let buttonElement = await driver.wait(until.elementLocated(By.xpath(buttonXPath)), 10000);

        // Wait for the button to be visible
        await driver.wait(until.elementIsVisible(buttonElement), 10000);

        // Click the button
        await buttonElement.click();

        // Change Name
        // 1. Locate the input field using its name attribute
        let inputXPath = '//input[@name="nome"]';
        let inputField = await driver.wait(until.elementLocated(By.xpath(inputXPath)), 10000);

        // 2. Wait for the input field to be visible
        await driver.wait(until.elementIsVisible(inputField), 10000);

        // 3. Clear the current value and send new keys to the input field
        await inputField.clear();
        await inputField.sendKeys('Gabriel S. Parreira');

        // Add a description
        // 1. Locate the textarea using its name attribute
        let textareaXPath = '//textarea[@name="sobre"]';
        let textareaField = await driver.wait(until.elementLocated(By.xpath(textareaXPath)), 10000);

        // 2. Wait for the textarea to be visible
        await driver.wait(until.elementIsVisible(textareaField), 10000);

        // 3. Clear the current value (if any) and send new keys to the textarea
        await textareaField.clear();
        await textareaField.sendKeys('Descrição teste UC013-1.');

        // Change CEP
        // 1. Locate the input field for CEP inside the specific div using its name attribute
        let cepInputXPath = '//div[contains(@class, "relative") and label[text()="CEP"]]/input[@name="cep"]';
        let cepInputField = await driver.wait(until.elementLocated(By.xpath(cepInputXPath)), 10000);

        // 2. Wait for the input field to be visible
        await driver.wait(until.elementIsVisible(cepInputField), 10000);

        // 3. Clear the current value (if any) and send the CEP number to the input field
        await cepInputField.clear();
        await cepInputField.sendKeys('06705490');

        // Change estate street number
        // 1. Locate the input field for "numero" using its name attribute
        let numeroXPath = '//div[label[text()="numero"]]/input[@name="numero"]';
        let numeroInputField = await driver.wait(until.elementLocated(By.xpath(numeroXPath)), 10000);

        // 2. Wait for the "numero" input field to be visible
        await driver.wait(until.elementIsVisible(numeroInputField), 10000);

        // 3. Clear the current value (if any) and send the desired number to the input field
        await numeroInputField.clear();
        await numeroInputField.sendKeys('1919');

        // Change the addon (appartment or house No)
        // 1. Locate the input field for "complemento" using its name attribute
        let complementoXPath = '//div[label[text()="complemento"]]/input[@name="complemento"]';
        let complementoInputField = await driver.wait(until.elementLocated(By.xpath(complementoXPath)), 10000);

        // 2. Wait for the "complemento" input field to be visible
        await driver.wait(until.elementIsVisible(complementoInputField), 10000);

        // 3. Clear the current value (if any) and send the desired text to the input field
        await complementoInputField.clear();
        await complementoInputField.sendKeys('Casa 3');

        // Cancel changes
        // 1. Locate the button with the specified text content
        buttonXPath = '//button[@type="button" and contains(@class,"dark:enabled:hover:bg-gray-700")]/span[text()="Cancelar"]';
        let cancelButton = await driver.wait(until.elementLocated(By.xpath(buttonXPath)), 10000);

        // 2. Wait for the button to be visible
        await driver.wait(until.elementIsVisible(cancelButton), 10000);

        // 3. Click on the button
        await cancelButton.click();

        // Define the XPath for the h2 element within the specific div
        let h2XPath = '//div[@class="p-8 -mt-28 relative"]/h2[@class="font-bold text-2xl dark:text-white"]';

        // Locate the h2 element using the specified XPath
        let h2Element = await driver.wait(until.elementLocated(By.xpath(h2XPath)), 10000);

        // Get the text content of the h2 element
        let h2Text = await h2Element.getText();

        await driver.sleep(5000);

        // Check if the text is "Gabriel S. Parreira"
        if (h2Text === "Gabriel Samori Parreira") {
            console.log("The content of h2 is exactly 'Gabriel Samori Parreira'.");
            console.log("UC013-3 test passed.");
        } else {
            console.log("The content of h2 is not 'Gabriel Samori Parreira'.");
            console.log("UC013-3 test failed.");
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

