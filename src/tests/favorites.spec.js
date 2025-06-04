import {test, expect} from '@playwright/test';

test.describe("Läslistan favoriter", () => {
	//Ladda in sidan före varje test
	test.beforeEach(async ({page}) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');

		// förvänta sig att sidan har en titel som innehåller "Läslistan" för att kolla att sidan laddat korrekt.
		await expect(page).toHaveTitle(/Läslistan/);

		// förvänta sig att sidan har en rubrik som är "Läslistan" för att kolla så sidan laddat korrekt.
		await expect(page.locator('h1')).toHaveText('Läslistan');
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

	test("spara flera böcker i läslistan och kontrollera att de finns där", async ({ page }) => {
		//bok lista med böcker
		const books = [
			"Min katt är min chef",
			"100 sätt att undvika måndagar",
			"Att prata med växter – och vad de egentligen tycker om dig"
		];

		//Loopar listan och favoriterar varje bok
		for (const bookTitle of books) {
			await page.click(`[data-testid="star-${bookTitle}"]`);
		}
		//klickar sig till läslistan
		await page.click('[data-testid="favorites"]');

		//Förvänta sig att alla böcker finns i läslistan
		for (const bookTitle of books) {
			await expect(page.locator('.book', { hasText: bookTitle })).toBeVisible();
		}
	});

	test("ta bort en bok från läslistan och kontrollera att den inte finns där", async ({ page }) => {
		//börja med att spara flera böcker
		const books = [
			"Min katt är min chef",
			"100 sätt att undvika måndagar",
			"Att prata med växter – och vad de egentligen tycker om dig"
		];
		for (const bookTitle of books) {
			await page.click(`[data-testid="star-${bookTitle}"]`);
		}
		//ta bort en bok från läslistan
		const bookToRemove = "Min katt är min chef";
		await page.click(`[data-testid="star-${bookToRemove}"]`);

		//klicka sig till läslistan
		await page.click('[data-testid="favorites"]');
		//Förvänta sig att boken inte finns i läslistan
		await expect(page.locator('.book', { hasText: bookToRemove })).toHaveCount(0);

	});

});