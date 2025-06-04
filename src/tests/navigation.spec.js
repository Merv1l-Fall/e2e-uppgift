import { test, expect } from '@playwright/test';

test.describe("Läslistan navigering", () => {
	//Ladda in sidan före varje test
	test.beforeEach(async ({ page }) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');

		// förvänta sig att sidan har en titel som innehåller "Läslistan" för att kolla att sidan laddat korrekt.
		await expect(page).toHaveTitle(/Läslistan/);

		// förvänta sig att sidan har en rubrik som är "Läslistan" för att kolla så sidan laddat korrekt.
		await expect(page.locator('h1')).toHaveText('Läslistan');
	});

	test("navigera till alla vyer", async ({ page }) => {
		// Klicka på läslistaknappen
		await page.click('[data-testid="favorites"]');

		// Förvänta sig att sparade böcker är synlig
		await expect(page.locator('main > div')).toHaveClass('favorites');

		//klicka på katalogknappen
		await page.click('[data-testid="catalog"]');

		// Förvänta sig att katalogen är synlig
		await expect(page.locator('main > div')).toHaveClass('catalog');

		//klicka på lägg till bok-knappen
		await page.click('[data-testid="add-book"]');

		// Förvänta sig att lägg till bok-vyn är synlig
		await expect(page.locator('main > div')).toHaveClass('form');
	});
	
	test("kolla att sparade böcker inte försvinner vid navigering", async ({ page }) => {
		//bokens titel
		const bookTitle = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen"

		//repeterar samma steg som i bok testet
		await page.click(`[data-testid="star-${bookTitle}"]`);
		await page.click('[data-testid="favorites"]');
		await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();

		//klicka sig tillbaka till katalogen
		await page.click('[data-testid="catalog"]');

		//klicka sig till lägg tillbaka till sparade böcker
		await page.click('[data-testid="favorites"]');
		//förvänta dig att boken finns i läslistan
		await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();

		//klicka sig till lägga till bok vyn
		await page.click('[data-testid="add-book"]');

		//kolla sparade böcker igen för att säkerställa att de inte är borta
		await page.click('[data-testid="favorites"]');
		await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();
	});

});