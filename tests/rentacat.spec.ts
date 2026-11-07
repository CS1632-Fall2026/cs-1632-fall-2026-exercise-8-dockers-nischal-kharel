import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.evaluate(() => { document.cookie = "1=false"; });
    await page.evaluate(() => { document.cookie = "2=false"; });
    await page.evaluate(() => { document.cookie = "3=false"; });
});

// TODO: Fill in with test cases.
test('TEST-1-RESET', async ({ page }) => {

    //Precondition: The value of cookies "1", "2", and "3" are set to "true" (cats ID 1, 2, 3 are rented).
    await page.evaluate(() => { document.cookie = "1=true"; });
    await page.evaluate(() => { document.cookie = "2=true"; });
    await page.evaluate(() => { document.cookie = "3=true"; });

    // Execution Step: 1. Press the "Reset" link.
    await page.getByRole('link', { name: 'Reset' }).click();

    //Postcondition:
    const list = page.getByRole('list', {name: 'Cat names'});
    await expect(list.getByRole('listitem').nth(0)).toHaveText('ID 1. Jennyanydots');
    await expect(list.getByRole('listitem').nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(list.getByRole('listitem').nth(2)).toHaveText('ID 3. Mistoffelees');
});



test('TEST-2-CATALOG', async ({ page }) => {
    //Precondition: None
    // Execution Step:1. Press the "Catalog" link.
    await page.getByRole('link', { name: 'Catalog' }).click();
    //Postcondition: The source of the image in the second item in the cat photos listing is "/images/cat2.jpg".
    const secondItem = page.getByRole('list', {name: 'Cat photos'}).getByRole('listitem').nth(1);
    await expect(secondItem.getByRole('img')).toHaveAttribute('src', '/images/cat2.jpg');
});



test('TEST-3-LISTING', async ({ page }) => {
    //Precondition: 
    // Execution Step:
    await page.getByRole('link', { name: 'Catalog' }).click();
    //Postcondition: 
    const list = page.getByRole('list', {name: 'Cat names'});
    await expect(list.getByRole('listitem')).toHaveCount(3);
    await expect(list.getByRole('listitem').nth(2)).toHaveText("ID 3. Mistoffelees");
});



test('TEST-4-RENT-A-CAT', async ({ page }) => {
    //Precondition: 

    // Execution Step:
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    //Postcondition: 
    await expect(page.getByRole('button', { name: 'Rent' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Return' })).toBeVisible();
});



test('TEST-5-RENT', async ({ page }) => {
    //Precondition: 

    // Execution Step:
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).fill('1');
    await page.getByRole('button', { name: 'Rent' }).click();
    //Postcondition: 
    const list = page.getByRole('list', {name: 'Cat names'});
    await expect(list.getByRole('listitem').nth(0)).toHaveText('Rented out');
    await expect(list.getByRole('listitem').nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(list.getByRole('listitem').nth(2)).toHaveText('ID 3. Mistoffelees');
    await expect(page.getByText('Success!')).toBeVisible();
});



test('TEST-6-RETURN', async ({ page }) => {
    //Precondition: 
    await page.evaluate(() => { document.cookie = "2=true"; });
    await page.evaluate(() => { document.cookie = "3=true"; });
    // Execution Step:
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).click();
    await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).fill('2');
    await page.getByRole('button', { name: 'Return' }).click();
    //Postcondition: 
    const list = page.getByRole('list', {name: 'Cat names'});
    await expect(list.getByRole('listitem').nth(0)).toHaveText('ID 1. Jennyanydots');
    await expect(list.getByRole('listitem').nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(list.getByRole('listitem').nth(2)).toHaveText('Rented out');
    await expect(page.getByText('Success!')).toBeVisible();
});



test('TEST-7-FEED-A-CAT', async ({ page }) => {
    //Precondition: 

    // Execution Step:
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    //Postcondition: 
    await expect(page.getByRole('button', { name: 'Feed' })).toBeVisible();
});



test('TEST-8-FEED', async ({ page }) => {
    //Precondition: 

    // Execution Step:
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Number of catnips to feed:' }).click();
    await page.getByRole('textbox', { name: 'Number of catnips to feed:' }).fill('6');
    await page.getByRole('button', { name: 'Feed' }).click();
    //Postcondition: 
    await expect(page.getByText('Nom, nom, nom.')).toBeVisible({ timeout: 10000});
});



test('TEST-9-GREET-A-CAT', async ({ page }) => {
    //Precondition: 

    // Execution Step:
    await page.getByRole('link', { name: 'Greet-A-Cat' }).click();
    //Postcondition: 
    await expect(page.getByText('Meow!Meow!Meow!')).toBeVisible();
});



test('TEST-10-GREET-A-CAT-WITH-NAME', async ({ page }) => {
    //Precondition: 
    await page.goto('http://localhost:8080/greet-a-cat/Jennyanydots');
    // Execution Step:

    //Postcondition: 
    await expect(page.getByText('Meow! from Jennyanydots.')).toBeVisible();
});



test('TEST-11-FEED-A-CAT-SCREENSHOT', async ({ page }) => {
    //Precondition: 
    await page.evaluate(() => { document.cookie = "1=true"; });
    await page.evaluate(() => { document.cookie = "2=true"; });
    await page.evaluate(() => { document.cookie = "3=true"; });
    // Execution Step:
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    //Postcondition: 
    await expect(page.locator('body')).toHaveScreenshot();
});