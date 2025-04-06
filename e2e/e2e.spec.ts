import { test, expect } from "@playwright/test";

test("this app has title", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/Synthase Studio/);
});
