import { test, expect } from '@playwright/test';

test.describe("Läslistan lägga till böcker", () => {
	//Ladda in sidan före varje test
	test.beforeEach(async ({ page }) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');

	});

	test("lägga till en bok", async ({ page }) => {
		//bokens info
		const bookTitle = "Samurai"
		const bookAuthor = "Hiroshi Morita";

		await page.getByTestId("add-book").click();

		// Fyll i formuläret med bokens titel och författare
		await page.getByTestId('add-input-title').fill(bookTitle);

		await page.getByTestId("add-input-author").fill(bookAuthor);

		// Klicka på knappen för att lägga till boken
		await page.getByTestId("add-submit").click();
	});

	test("lägga till och kontrollera att boken finns i katalogen", async ({ page }) => {
		//bokens info
		const bookTitle = "Samurai";
		const bookAuthor = "Hiroshi Morita";

		await page.getByTestId("add-book").click();

		// Fyll i formuläret med bokens titel och författare
		await page.getByTestId("add-input-title").fill(bookTitle);
		await page.getByTestId("add-input-author").fill(bookAuthor);

		// Klicka på knappen för att lägga till boken
		await page.getByTestId("add-submit").click();

		// Gå tillbaka till katalogen
		await page.getByTestId("catalog").click();

		// Förvänta sig att boken finns i katalogen
		await expect(page.getByText(bookTitle)).toBeVisible();
	});

	test("Lägga till flera böcker och kontrollera att de finns i katalogen", async ({ page }) => {
		//bok 1 info
		const bookTitle1 = "Samurai";
		const bookAuthor1 = "Hiroshi Morita";
		//bok 2 info
		const bookTitle2 = "Krigets konst";
		const bookAuthor2 = "Sun Tzu";

		await page.getByTestId("add-book").click();

		// Fyll i formuläret med första bokens titel och författare
		await page.getByTestId("add-input-title").fill(bookTitle1);
		await page.getByTestId("add-input-author").fill(bookAuthor1);
		// Klicka på knappen för att lägga till första boken
		await page.getByTestId("add-submit").click();

		//lägg  till andra boken
		await page.getByTestId("add-input-title").fill(bookTitle2);
		await page.getByTestId("add-input-author").fill(bookAuthor2);
		// Klicka på knappen för att lägga till andra boken
		await page.getByTestId("add-submit").click();

		// Gå tillbaka till katalogen
		await page.getByTestId("catalog").click();

		// Förvänta sig att båda böckerna finns i katalogen
		await expect(page.getByText(bookTitle1)).toBeVisible();
		await expect(page.getByText(bookTitle2)).toBeVisible();
	});

	test("lägga till samma bok flera gånger", async ({ page }) => {
		//bokens info
		const bookTitle = "Samurai";
		const bookAuthor = "Hiroshi Morita";

		await page.getByTestId("add-book").click();

		// Fyll i formuläret med bokens titel och författare
		await page.getByTestId("add-input-title").fill(bookTitle);
		await page.getByTestId("add-input-author").fill(bookAuthor);

		// Klicka på knappen för att lägga till boken
		await page.getByTestId("add-submit").click();

		// Försök att lägga till samma bok igen
		await page.fill('[data-testid="add-input-title"]', bookTitle);
		await page.fill('[data-testid="add-input-author"]', bookAuthor);
		await page.getByTestId("add-submit").click();

		// kolla att båda böckerna finns i katalogen
		await page.getByTestId("catalog").click();
		await expect(page.getByText(bookTitle)).toHaveCount(2);
	
	});
});