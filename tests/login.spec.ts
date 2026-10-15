import { expect, test } from '@playwright/test';

const loginUrl = 'https://the-internet.herokuapp.com/login';

test('valid credentials open the secure area', async ({ page }) => {
  await page.goto(loginUrl);
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page
    .getByRole('textbox', { name: 'Password' })
    .fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /Login/ }).click();

  await expect(page).toHaveURL(/\/secure$/);
  await expect(
    page.getByRole('heading', { name: 'Secure Area', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('You logged into a secure area!'),
  ).toBeVisible();
});

test('invalid credentials show an error message', async ({ page }) => {
  await page.goto(loginUrl);
  await page.getByRole('textbox', { name: 'Username' }).fill('invalid-user');
  await page
    .getByRole('textbox', { name: 'Password' })
    .fill('invalid-password');
  await page.getByRole('button', { name: /Login/ }).click();

  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});
