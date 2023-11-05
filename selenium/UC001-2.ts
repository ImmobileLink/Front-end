const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testSignInAsCompany() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find sign in button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Cadastre-se")]')).click();

        // Find the email input field, and type in an email
        await driver.findElement(By.id('floating_email')).sendKeys('empresa.teste@gmail.com');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the password confirmation input field, and type in a password
        await driver.findElement(By.css("input[type='password'][name='floating_email']")).sendKeys('S&UYjVg%e9');


        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();

        await driver.sleep(1000);

        // Find the individual button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Empresarial')]")).click();

        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();

        await driver.sleep(1000);

        // Creating the data that will be input        
        const inputData = ['Empresa Teste Automatizado 01', '81647366000162', '11986391919', '1138951302', '1147020139', '04634020', 'São Paulo', 'Jardim Brasil (Zona Sul)', 'Rua Lacedemônia', '253', 'Apt. 152'];

        // Locate all the relevant input fields
        const inputFields = await driver.findElements(By.css('input.bg-transparent'));

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
                if (i == 5) {
                    await driver.sleep(1000);
                }
            }
        }

        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();

        await driver.sleep(1000);

        let svgElements = await driver.findElements(By.css('svg.absolute.text-xl.right-3.hover\\:cursor-pointer.hover\\:scale-110'));
        console.log(`Found ${svgElements.length} matching SVG elements.`);

        // Locate the <select> element
        let selectElement = await driver.findElement(By.css('select.bg-branco.dark\\:bg-dark-200.mb-1.w-16.mx-1'));

        // Click on the <select> element to expand the dropdown
        await selectElement.click();

        // Choose an option by its visible text (e.g., "SP")
        let optionToSelect = await selectElement.findElement(By.xpath('./option[text()="SP"]'));
        await optionToSelect.click();

        // Click on the <select> element to close the dropdown
        await selectElement.click();

        // 1. Click the SVG icon using the provided XPath
        await svgElements[0].click();

        // 2. Wait for the dropdown list to be visible.
        // Since the <ul> has many <li> elements, let's wait for them to appear.
        await driver.sleep(1000);

        // 3. Click on a specific option
        const adamantinaOption = await driver.findElement(By.xpath('//ul[contains(@class, "z-40")]/option[text()="Adamantina"]'));
        await driver.actions().move({origin: adamantinaOption}).click().perform();

        // 4. Click the SVG icon using the provided XPath to close the list
        await svgElements[0].click();

        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();

        await driver.sleep(1000);

        // Wait for the div containing the span with the desired content to be present
        const targetDiv = await driver.wait(until.elementLocated(By.xpath(`//div[span[text()="FREE"]]`)), 1000); // waits up to 5 seconds

        // Find the button inside the located div and click it
        await targetDiv.findElement(By.css('button')).click;

        // Find the finish button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Finalizar Cadastro')]")).click();

        await driver.sleep(1000);

        // Check that the user is redirected to the correct page after logging in
        let endMessage = await driver.wait(until.elementLocated(By.xpath(`//div[span[text()="Pronto!"]]`)), 10000); // waits up to 5 seconds

        if (endMessage === undefined || endMessage === null) {
            console.error('UC001-2 test failed.');
        } else {
            console.log('UC001-2 test passed.');
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

