const {Builder, By, until, WebDriver, WebElement} = require('selenium-webdriver');

(async function testFilterByState() {
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

        // Find the filter selector element
        let selectElement = await driver.wait(until.elementLocated(By.css('select.h-full.w-24.text-sm.text-gray-500')), 5000);
        await driver.wait(until.elementIsVisible(selectElement), 2000);
        await selectElement.click();

        // Find and click the "Estado" option
        let filterOption = await driver.wait(until.elementLocated(By.xpath('//option[text()="Estado"]')), 5000);
        await driver.wait(until.elementIsVisible(filterOption), 2000);
        await filterOption.click();

        // Find the filter selector element
        selectElement = await driver.wait(until.elementLocated(By.css('select.block.w-20.mr-4.text-sm.text-gray-500')), 5000);
        await driver.wait(until.elementIsVisible(selectElement), 2000);
        await selectElement.click();

        // Find and click the "SP" option
        let spOption = await selectElement.findElement(By.xpath('.//option[text()="SP"]'));
        await driver.wait(until.elementIsVisible(spOption), 2000);
        await spOption.click();

        // Check if the post from UC005-1 is there (as it should since the filter matches the post creation)
        const post = await driver.wait(until.elementLocated(By.xpath('//p[contains(@class, "text-sm") and contains(@class, "line-clamp-none") and normalize-space(text())="Teste automatizado UC005-1"]')), 10000);
        await driver.wait(until.elementIsVisible(post), 5000);
        if (post) {
            console.log("Post found! Filter is working as intended.");
            console.log("UC006-1 test passed.");
        } else {
            console.log("Post not found... Filters might not be working as intended.")
            console.log("UC006-1 test failed.");
        }

    } finally {
        console.log("Test Ended.")
        await driver.quit();
    }
})();

