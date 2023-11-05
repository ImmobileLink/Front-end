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
            // If both texts are found, click on the "Conversar" button on the bottom right corner
            const specifiedButton = await mainDiv.findElement(By.css('button.w-fit.text-white.bg-gray-500'));

            // Wait till the image finishes loading since it might affect the automation
            // Locate the img element by its alt attribute and other attributes
            const imgElement = await driver.wait(until.elementLocated(By.css('img[alt="d70c96d1-7100-4ca9-8c44-f44f2e10faf9"][loading="lazy"]')), 10000);
            // Wait until the img element is visible
            await driver.wait(until.elementIsVisible(imgElement), 15000);

            // Resume looking for the button Conversar
            await driver.wait(until.elementIsVisible(specifiedButton), 2000);
            await driver.executeScript("arguments[0].scrollIntoView(true);", specifiedButton);
            await driver.sleep(1000); // waits for a second
            // Scroll up by 50 pixels to adjust the position
            await driver.executeScript("window.scrollBy(0, -400);");
            await driver.sleep(1000); // waits for a second
            await specifiedButton.click();
        }

        // Check that the user is redirected to the correct page after logging in
        await driver.sleep(5000);
        let currentURL = await driver.getCurrentUrl();
        if (currentURL !== 'https://immobilelink.vercel.app/pt/chat/71410854-a242-4427-ba3f-758ab37581ba') {
            console.error('UC012-3 test failed.');
        } else {
            console.log('UC012-3 test passed.');
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

