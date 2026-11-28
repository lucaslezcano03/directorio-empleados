import { expect, test } from '@playwright/test';

test('muestra la pantalla de empleados al ingresar', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('ion-content')).toContainText('Listado general del personal');
});
