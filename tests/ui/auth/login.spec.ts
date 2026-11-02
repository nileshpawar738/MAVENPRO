import { test, expect } from '../../../fixtures/testFixtures';
import loginData from '../../../data/loginData.json';
import { APP } from '../../../constants/appConstants';

test.describe('Login', () => {
  test('valid user can log in @smoke', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByText(APP.products.backpack)).toBeVisible();
  });

  test('invalid user sees a clear error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);

    await expect(await loginPage.getErrorMessage()).toBe(APP.messages.invalidLogin);
  });

  test('locked-out user cannot log in', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(loginData.lockedOutUser.username, loginData.lockedOutUser.password);

    await expect(await loginPage.getErrorMessage()).toBe(APP.messages.lockedOut);
  });
});
