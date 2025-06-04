import { test, expect } from '@playwright/test';

test.describe("Läslistan lägga till böcker", () => {
	//Ladda in sidan före varje test
	test.beforeEach(async ({ page }) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');

		// förvänta sig att sidan har en titel som innehåller "Läslistan" för att kolla att sidan laddat korrekt.
		await expect(page).toHaveTitle(/Läslistan/);

		// förvänta sig att sidan har en rubrik som är "Läslistan" för att kolla så sidan laddat korrekt.
		await expect(page.locator('h1')).toHaveText('Läslistan');
	});

	test("lägga till en bok", async ({ page }) => {
		//bokens info
		const bookTitle = "Samurai"
		const bookAuthor = "Hiroshi Morita";

		await page.click('[data-testid="add-book"]');

		// Fyll i formuläret med bokens titel och författare
		await page.fill('[data-testid="add-input-title"]', bookTitle);

		await page.fill('[data-testid="add-input-author"]', bookAuthor);

		// Klicka på knappen för att lägga till boken
		await page.click('[data-testid="add-submit"]');
	});

	test("lägga till och kontrollera att boken finns i katalogen", async ({ page }) => {
		//bokens info
		const bookTitle = "Samurai";
		const bookAuthor = "Hiroshi Morita";

		await page.click('[data-testid="add-book"]');

		// Fyll i formuläret med bokens titel och författare
		await page.fill('[data-testid="add-input-title"]', bookTitle);
		await page.fill('[data-testid="add-input-author"]', bookAuthor);

		// Klicka på knappen för att lägga till boken
		await page.click('[data-testid="add-submit"]');

		// Gå tillbaka till katalogen
		await page.click('[data-testid="catalog"]');

		// Förvänta sig att boken finns i katalogen
		await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();
	});

	test("Lägga till flera böcker och kontrollera att de finns i katalogen", async ({ page }) => {
		//bok 1 info
		const bookTitle1 = "Samurai";
		const bookAuthor1 = "Hiroshi Morita";
		//bok 2 info
		const bookTitle2 = "Krigets konst";
		const bookAuthor2 = "Sun Tzu";

		await page.click('[data-testid="add-book"]');

		// Fyll i formuläret med första bokens titel och författare
		await page.fill('[data-testid="add-input-title"]', bookTitle1);
		await page.fill('[data-testid="add-input-author"]', bookAuthor1);
		// Klicka på knappen för att lägga till första boken
		await page.click('[data-testid="add-submit"]');

		//lägg  till andra boken
		await page.fill('[data-testid="add-input-title"]', bookTitle2);
		await page.fill('[data-testid="add-input-author"]', bookAuthor2);
		// Klicka på knappen för att lägga till andra boken
		await page.click('[data-testid="add-submit"]');

		// Gå tillbaka till katalogen
		await page.click('[data-testid="catalog"]');

		// Förvänta sig att båda böckerna finns i katalogen
		await expect(page.locator('.book', { hasText: bookTitle1 })).toBeVisible();
		await expect(page.locator('.book', { hasText: bookTitle2 })).toBeVisible();
	});

	test("lägga till samma bok flera gånger", async ({ page }) => {
		//bokens info
		const bookTitle = "Samurai";
		const bookAuthor = "Hiroshi Morita";

		await page.click('[data-testid="add-book"]');

		// Fyll i formuläret med bokens titel och författare
		await page.fill('[data-testid="add-input-title"]', bookTitle);
		await page.fill('[data-testid="add-input-author"]', bookAuthor);

		// Klicka på knappen för att lägga till boken
		await page.click('[data-testid="add-submit"]');

		// Försök att lägga till samma bok igen
		await page.fill('[data-testid="add-input-title"]', bookTitle);
		await page.fill('[data-testid="add-input-author"]', bookAuthor);
		await page.click('[data-testid="add-submit"]');

		// kolla att båda böckerna finns i katalogen
		await page.click('[data-testid="catalog"]');
		await expect(page.locator('.book', { hasText: bookTitle })).toHaveCount(2);
	});
});