import { test, expect } from "@playwright/test";

test("can view pending tasks and see details", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Pending")).toHaveClass(/active/);
  const firstTask = page.locator("main ul li a").first();
  const taskTitle = await firstTask.innerText();
  await firstTask.click();
  await expect(page.getByRole("heading", { name: taskTitle })).toBeVisible();
});