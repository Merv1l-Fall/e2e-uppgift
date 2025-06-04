import { test, expect } from '@playwright/test';
//Ladda in sidan före varje test
test.describe("Läslistan", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');

		// förvänta sig att sidan har en titel som innehåller "Läslistan" för att kolla att sidan laddat korrekt.
		await expect(page).toHaveTitle(/Läslistan/);

		// förvänta sig att sidan har en rubrik som är "Läslistan" för att kolla så sidan laddat korrekt.
		await expect(page.locator('h1')).toHaveText('Läslistan');
	});

	test("spara en bok i läslistan och kontrollera att den finns där", async ({ page }) => {

		//bokens titel
		const bookTitle = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen";

		//klickar på knappen för att lägga till en bok
		await page.click(`[data-testid="star-${bookTitle}"]`);

		//klickar sig till läslistan
		await page.click('[data-testid="favorites"]');

		//förvänta dig att boken finns i läslistan
		await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();

	})

	test("lägga till, ta bort, och lägga till en bok", async ({ page }) => {
		//bokens titel
		const bookTitle = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen"

		//repeterar samma steg som i det föregående testet
		await page.click(`[data-testid="star-${bookTitle}"]`);
		await page.click('[data-testid="favorites"]');
		await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();

		//tar bort boken från läslistan
		//klicka sig tillbaka till katalogen
		await page.click('[data-testid="catalog"]');

		//klicka på star(hjärtat) för att ta bort boken från läslistan
		await page.click(`[data-testid="star-${bookTitle}"]`);

		//klicka sig tillbaka till läslistan
		await page.click('[data-testid="favorites"]');

		//förvänta dig att boken inte finns i läslistan
		await expect(page.locator('.book', { hasText: bookTitle })).toHaveCount(0);

		//kollar första steget igen
		await page.click('[data-testid="catalog"]');
		await page.click(`[data-testid="star-${bookTitle}"]`);
		await page.click('[data-testid="favorites"]');
		await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();

	});
});



