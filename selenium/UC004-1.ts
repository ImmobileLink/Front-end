const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');
const path = require('path');

(async function testRegisterEstate() {
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

        // Define the inputData
        const inputData = ['04634020', 'SP', 'São Paulo', 'Jardim Brasil (Zona Sul)', 'Rua Lacedemônia', '253', 'Apt. 152', '1000000'];

        // Define the CSS selector to target the desired input fields
        const desiredInputSelector = 'input.dark\\:bg-gray-700.dark\\:border-gray-600';

        // Wait for the elements to be located and store them in a list
        const inputFields = await driver.findElements(By.css(desiredInputSelector));
        
        console.log("Length of input fields found: " + inputFields.length);

        // Ensure the fields are visible
        for (const field of inputFields) {
            await driver.wait(until.elementIsVisible(field), 2000);
        }

        // Loop and populate the fields with the inputData
        for (let i = 0; i < inputFields.length && i < inputData.length; i++) {
            if (!await inputFields[i].isEnabled()) {
                console.log(`Input #${i + 1} is not interactable or enabled`);
            } else {
                console.log(`Filling input #${i + 1} with data: ${inputData[i]}`);
                await inputFields[i].clear();
                await inputFields[i].click();
                await inputFields[i].sendKeys(inputData[i]);
                if (i == 0) {
                    await driver.sleep(2000);
                }
            }
        }

        // 1. Locate and click the first div containing the placeholder "Selecione uma opção"
        let selectDiv = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'css-13zxwcv-placeholder') and text()='Selecione uma opção']")), 10000);
        await driver.wait(until.elementIsVisible(selectDiv), 2000);
        await selectDiv.click();

        // Give it a moment to ensure the UI state changes if any
        await driver.sleep(1000);

        // 2. Check if the input with class "css-1hac4vs-dummyInput" is expanded
        let selectInput = await driver.wait(until.elementLocated(By.css('input.css-1hac4vs-dummyInput')), 10000);
        let isExpanded = await selectInput.getAttribute('aria-expanded');

        let inputList = await driver.wait(until.elementLocated(By.id('react-select-2-listbox')), 10000);
        // console.log(await inputList.getAttribute('outerHTML'));

        if (isExpanded === 'true') {
            console.log("The input is expanded.");
            // Now, locate and click one option of the list
            let options = await driver.findElements(By.css('#react-select-2-listbox .css-1jxcyd6-option'));
            await options[2].click(); // 2 is for the third option since index starts from 0
        } else {
            console.log("The input is not expanded.");
        }


        // Now we are clicking on the first radio buttons found for each column: "Mobília" and "Condição"
        const radioButtonMobilia = await driver.findElement(By.name('mobilia'));
        await radioButtonMobilia.click();

        const radioButtonCondicao = await driver.findElement(By.name('condicao'));
        await radioButtonCondicao.click();

        // 1. Locate and click the first div containing the placeholder "Selecione..."
        selectDiv = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'css-13zxwcv-placeholder') and text()='Selecione...']")), 10000);
        await driver.wait(until.elementIsVisible(selectDiv), 2000);
        await selectDiv.click();

        // Give it a moment to ensure the UI state changes if any
        await driver.sleep(1000);

        // 2. Check if the input with class "css-1hac4vs-dummyInput" is expanded
        selectInput = await driver.wait(until.elementLocated(By.id('react-select-3-input')), 10000);
        isExpanded = await selectInput.getAttribute('aria-expanded');

        inputList = await driver.wait(until.elementLocated(By.id('react-select-3-listbox')), 10000);
        // console.log(await inputList.getAttribute('outerHTML'));

        if (isExpanded === 'true') {
            console.log("The input is expanded.");
            // Now, locate and click one option of the list
            let options = await driver.findElements(By.css('#react-select-3-listbox .css-1jxcyd6-option'));
            await options[2].click(); // 2 is for the third option since index starts from 0
        } else {
            console.log("The input is not expanded.");
        }

        // Closing the dropdown list
        selectDiv = await driver.wait(until.elementLocated(By.css('.css-1djicoy-control')), 10000);
        await driver.wait(until.elementIsVisible(selectDiv), 2000);
        await selectDiv.click();

        // Locate the textarea
        const textArea = await driver.findElement(By.css('textarea.dark\\:bg-gray-700'));

        // Ensure the textarea is visible and interactable
        await driver.wait(until.elementIsVisible(textArea), 2000);

        // Click on it (optional, but can help in certain cases)
        await textArea.click();

        // Send your desired text
        await textArea.sendKeys('Descrição teste de cadastro de imóvel');

        // Path to your image (make sure it's an absolute path)
        const imagePath = path.resolve('./images/dall-e-apartment.png');  // Replace with the path to your image

        // Locate the file input element
        const fileInput = await driver.findElement(By.css('input[type="file"]'));

        // Upload the image
        await fileInput.sendKeys(imagePath);

        // Find the register button and click it
        const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')));
        await driver.wait(until.elementIsVisible(submitButton), 2000)
        await submitButton.click();

        // Locate the div based on its exact content
        const divExists = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "mt-2 sm:mt-4 text-gray-800 dark:text-white")]/h2[text()="Rua Lacedemônia, 253"]/following-sibling::p[text()="Jardim Brasil (Zona Sul) - São Paulo/SP"]')));
        await driver.wait(until.elementIsVisible(divExists), 2000);
        if (divExists) {
            console.log("The div with the specified content exists!");
            console.log("UC004-1 test passed.")
        } else {
            console.log("The div with the specified content does not exist.");
            console.log("UC004-1 test failed.")
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();