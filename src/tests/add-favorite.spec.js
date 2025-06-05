import { test, expect } from '@playwright/test';
//Ladda in sidan före varje test
test.describe("Läslistan", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
	});

	test("spara en bok i läslistan och kontrollera att den finns där", async ({ page }) => {

		//bokens titel
		const bookTitle = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen";

		//klickar på knappen för att lägga till en bok, getbytestid!
		await page.getByTestId(`star-${bookTitle}`).click();

		//klickar sig till läslistan
		await page.getByTestId("favorites").click()

		//förvänta dig att boken finns i läslistan, getbytext
		await expect(page.getByText(bookTitle)).toBeVisible();

	})

	test("lägga till, ta bort, och lägga till en bok", async ({ page }) => {
		//bokens titel
		const bookTitle = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen"

		//repeterar samma steg som i det föregående testet
		await page.getByTestId(`star-${bookTitle}`).click();
		await page.getByTestId("favorites").click()
		await expect(page.getByText(bookTitle)).toBeVisible();

		//tar bort boken från läslistan
		//klicka sig tillbaka till katalogen
		await page.getByTestId("catalog").click();

		//klicka på star(hjärtat) för att ta bort boken från läslistan
		await page.getByTestId(`star-${bookTitle}`).click();

		//klicka sig tillbaka till läslistan
		await page.getByTestId("favorites").click()

		//förvänta dig att boken inte finns i läslistan
		await expect(page.getByText(bookTitle)).not.toBeVisible();

		//kollar första steget igen
		await page.click('[data-testid="catalog"]');
		await page.getByTestId(`star-${bookTitle}`).click();
		await page.getByTestId("favorites").click()
		await expect(page.getByText(bookTitle)).toBeVisible();

	});
});



