const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testSignInWrongCNPJ() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your web application's login page
        await driver.get('https://immobilelink.vercel.app/pt/auth');

        // Find sign in button and click it
        await driver.findElement(By.xpath('//button[contains(text(), "Cadastre-se")]')).click();

        // Find the email input field, and type in an email
        await driver.findElement(By.id('floating_email')).sendKeys('corretor.teste.cnpj.errado@gmail.com');

        // Find the password input field, and type in a password
        await driver.findElement(By.id('floating_password')).sendKeys('S&UYjVg%e9');

        // Find the password confirmation input field, and type in a password
        await driver.findElement(By.css("input[type='password'][name='floating_email']")).sendKeys('S&UYjVg%e9');


        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();

        await driver.sleep(1000);

        // Find the individual button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Individual')]")).click();

        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();

        await driver.sleep(1000);

        // Creating the data that will be input        
        const inputData = ['Corretor Teste CNPJ Errado', '41035166832', '81647366000159', '11986391919', '1138951302', '1147020139', '04634020', 'São Paulo', 'Jardim Brasil (Zona Sul)', 'Rua Lacedemônia', '253', 'Apt. 152'];

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
                if (i == 6) {
                    await driver.sleep(1000);
                }
            }
        }

        // Find the forward button and click it
        await driver.findElement(By.xpath("//button[contains(text(), 'Avançar')]")).click();
        
        await driver.sleep(1000);

        // Locate whether the red label element exists
        const redLabel = (await driver.findElements(By.css('label.text-red-500.text-xs')))
        console.log(redLabel.length);
        const exists = redLabel.length > 1;
        console.log(exists);
        if (exists) {
            console.log('UC001-4 test passed.');
        } else {
            console.log('UC001-4 test failed.');
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

