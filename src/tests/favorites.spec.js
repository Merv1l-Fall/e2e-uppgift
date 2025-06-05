import {test, expect} from '@playwright/test';

test.describe("Läslistan favoriter", () => {
	//Ladda in sidan före varje test
	test.beforeEach(async ({page}) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
	});

	test("kolla att sparade böcker inte försvinner vid navigering", async ({ page }) => {
		//bokens titel
		const bookTitle = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen"

		//repeterar samma steg som i bok testet
		await page.getByTestId(`star-${bookTitle}`).click();
		await page.getByTestId("favorites").click()
		await expect(page.getByText(bookTitle)).toBeVisible();

		//klicka sig tillbaka till katalogen
		await page.click('[data-testid="catalog"]');

		//klicka sig till lägg tillbaka till sparade böcker
		await page.getByTestId("favorites").click()
		//förvänta dig att boken finns i läslistan
		await expect(page.getByText(bookTitle)).toBeVisible();

		//klicka sig till lägga till bok vyn
		await page.getByTestId("add-book").click();

		//kolla sparade böcker igen för att säkerställa att de inte är borta
		await page.getByTestId("favorites").click()
		await expect(page.getByText(bookTitle)).toBeVisible();
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
			await page.getByTestId(`star-${bookTitle}`).click();
		}
		//klickar sig till läslistan
		await page.getByTestId("favorites").click()

		//Förvänta sig att alla böcker finns i läslistan
		for (const bookTitle of books) {
			await expect(page.getByText(bookTitle)).toBeVisible();
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
			await page.getByTestId(`star-${bookTitle}`).click();
		}
		//ta bort en bok från läslistan
		const bookToRemove = "Min katt är min chef";
		await page.getByTestId(`star-${bookToRemove}`).click();

		//klicka sig till läslistan
		await page.getByTestId("favorites").click()
		//Förvänta sig att boken inte finns i läslistan
		await expect(page.getByText(bookToRemove)).not.toBeVisible();

	});

});