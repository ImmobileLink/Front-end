const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');
const path = require('path');

(async function testPost() {
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

        // Locate and populate the textarea
        const textArea = await driver.wait(until.elementLocated(By.xpath('//textarea[@placeholder="Nova publicação"]')), 10000);
        await driver.wait(until.elementIsVisible(textArea), 2000);
        await textArea.click();
        await textArea.sendKeys('Teste automatizado UC005-1');

        // Path to your image
        const imagePath = path.resolve('./images/dall-e-UC005-1-Empresa.png');  // Replace with the relative path to your image

        // Locate the file input element
        const fileInput = await driver.findElement(By.css('input[type="file"]'));

        // Upload the image
        await fileInput.sendKeys(imagePath);

        // Find and click the select element
        let selectElement = await driver.wait(until.elementLocated(By.css('select.w-auto.lg\\:w-16.bg-gray-200')), 5000);
        await driver.wait(until.elementIsVisible(selectElement), 2000);
        await selectElement.click();

        // Find and click the "SP" option
        let spOption = await driver.wait(until.elementLocated(By.xpath('//option[text()="SP"]')), 5000);
        await driver.wait(until.elementIsVisible(spOption), 2000);
        await spOption.click();

        // Close the dropdown menu
        await selectElement.click();

        // Find and click the select element
        selectElement = await driver.wait(until.elementLocated(By.css('select.w-full.lg\\:w-32.bg-gray-200')), 5000);
        await driver.wait(until.elementIsVisible(selectElement), 2000);
        await selectElement.click();

        // Find and click the "SP" option
        spOption = await driver.wait(until.elementLocated(By.xpath('//option[text()="São Paulo"]')), 5000);
        await driver.wait(until.elementIsVisible(spOption), 2000);
        await spOption.click();

        // Close the dropdown menu
        await selectElement.click();

        // Waits for Publicar button to be both on the DOM and visible on the screen before clicking
        const publicar = await driver.wait(until.elementLocated(By.xpath("//button[span[contains(text(), 'Publicar')]]")), 1000);  // wait up to a second for the element to be located
        await driver.wait(until.elementIsVisible(publicar), 1000).click();  // wait up a second for the element to become visible, then click it

        const post = await driver.wait(until.elementLocated(By.xpath('//p[contains(@class, "text-sm") and contains(@class, "line-clamp-none") and normalize-space(text())="Teste automatizado UC005-1"]')), 10000);
        await driver.wait(until.elementIsVisible(post), 5000);
        if (post) {
            console.log("Post found!");
            console.log("UC005-1 test passed.");
        } else {
            console.log("Post not found...")
            console.log("UC005-1 test failed.");
        }

    } finally {
        console.log("Test Ended.")
        //await driver.quit();
    }
})();

