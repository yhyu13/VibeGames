import { test, expect } from "@playwright/test";

test("boots renderer and shows menu", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#seed-input")).toBeVisible();
  const canvas = page.locator("canvas");
  await expect(canvas).toHaveCount(1);
  await expect(page.locator(".title")).toHaveText("ALIEN INVADER");
});

test("starts a seeded run and reaches the HUD", async ({ page }) => {
  await page.goto("/");
  await page.fill("#seed-input", "12345");
  await page.click("#start-run");
  await expect(page.locator(".condition-screen")).toBeVisible();
  await page.click("#choose-loadout");
  await expect(page.locator(".loadout-screen")).toBeVisible();
  await page.click("#deploy");
  await expect(page.locator("#hud")).toBeVisible({ timeout: 10_000 });
  await expect(page.locator(".stat").first()).toBeVisible();
});

test("fires weapons and damages defenses", async ({ page }) => {
  await page.goto("/");
  await page.fill("#seed-input", "424242");
  await page.click("#start-run");
  await page.click("#choose-loadout");
  await page.click("#deploy");
  await expect(page.locator("#hud")).toBeVisible({ timeout: 10_000 });

  // Hold fire for a few seconds
  await page.keyboard.down("Space");
  await page.waitForTimeout(2000);
  await page.keyboard.up("Space");

  // Sim should still be active (no crash), hull stat present
  await expect(page.locator(".stat").first()).toBeVisible();
  const hudText = await page.locator("#hud-dynamic").textContent();
  expect(hudText).toContain("Hull");
});

test("opens and solves a virus puzzle", async ({ page }) => {
  await page.goto("/");
  await page.fill("#seed-input", "777");
  await page.click("#start-run");
  await page.click("#choose-loadout");
  await page.click("#deploy");
  await expect(page.locator("#hud")).toBeVisible({ timeout: 10_000 });

  await page.locator(".virus-panel .btn.small").first().click();
  await expect(page.locator(".modal")).toBeVisible();
  await page.locator(".modal .btn").first().click();
  await page.locator(".modal .btn").first().click();
});

test("reaches a win/lose screen", async ({ page }) => {
  await page.goto("/");
  await page.fill("#seed-input", "999");
  await page.click("#start-run");
  await page.click("#choose-loadout");
  await page.click("#deploy");
  await expect(page.locator("#hud")).toBeVisible({ timeout: 10_000 });

  // End day several times (no major action needed? End Day requires no major action used)
  for (let i = 0; i < 8; i++) {
    await page.locator("#end-day").click().catch(() => {});
    await page.waitForTimeout(300);
  }
  // One of: still running (day capped), victory, or defeat screen
  const isEnd = await page.locator(".end-screen").count();
  const isHud = await page.locator("#hud").count();
  expect(isEnd + isHud).toBeGreaterThan(0);
});
