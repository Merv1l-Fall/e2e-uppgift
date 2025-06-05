import { test, expect } from '@playwright/test';

test.describe("Läslistan navigering", () => {
	//Ladda in sidan före varje test
	test.beforeEach(async ({ page }) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');


	});

	test("smoke test att sidan existerar och är hel", async ({ page }) => {
		// förvänta sig att sidan har en titel som innehåller "Läslistan" för att kolla att sidan laddat korrekt.
		await expect(page).toHaveTitle(/Läslistan/);

		// förvänta sig att sidan har en rubrik som är "Läslistan" för att kolla så sidan laddat korrekt.
		await expect(page.locator('h1')).toHaveText('Läslistan');
	});

	test("navigera till alla vyer", async ({ page }) => {
		// Klicka på läslistaknappen
		await page.getByTestId('favorites').click();

		// Förvänta sig att sparade böcker är synlig. Fixa med page.getbytext
		await expect(page.getByText("När du valt, kommer dina favoritböcker att visas här." || "Dina favoriter:")).toBeVisible();

		//klicka på katalogknappen
		await page.getByTestId('catalog').click();

		// Förvänta sig att katalogen är synlig
		await expect(page.getByText("Hur man tappar bort sin TV-fjärr 10 gånger om dagen")).toBeVisible();

		//klicka på lägg till bok-knappen
		await page.getByTestId('add-book').click();

		// Förvänta sig att lägg till bok-vyn är synlig
		await expect(page.locator('main > div')).toHaveClass('form');
		await expect(page.getByTestId("add-submit")).toBeVisible();
	});

});