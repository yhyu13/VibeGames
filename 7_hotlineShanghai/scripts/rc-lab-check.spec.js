import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const { test, expect } = await import(pathToFileURL(process.env.PLAYWRIGHT_TEST_PATH).href);
const output = 'smoke';
mkdirSync(output, { recursive: true });

test('RC lab and showcase remain clean', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console.error: ${message.text()}`);
  });

  await page.goto('/rc-lab/', { waitUntil: 'load' });
  await page.waitForFunction(() => window.__rcLab?.status === 'done');
  await page.waitForFunction(() => window.__rcPortCheck?.status === 'done');

  const { report, portReport } = await page.evaluate(() => ({
    report: window.__rcLab.lastReport,
    portReport: window.__rcPortCheck.lastReport,
  }));

  expect(report, '__rcLab.lastReport').toBeTruthy();
  expect(report.ok, JSON.stringify(report.scenes.filter((scene) => !scene.ok))).toBe(true);
  expect(portReport, '__rcPortCheck.lastReport').toBeTruthy();
  expect(portReport.ok, JSON.stringify(portReport)).toBe(true);
  console.log(`RC_LAB_OK checks=${report.passedChecks}/${report.totalChecks}`);
  console.log(`PORT_OK checks=${portReport.passedChecks}/${portReport.totalChecks}`);
  await page.screenshot({ path: `${output}/rc-lab.png` });

  await page.goto('/rc-showcase/', { waitUntil: 'load' });
  await page.waitForFunction(() => window.__rcShowcase?.status === 'done');
  const showcase = await page.evaluate(() => window.__rcShowcase.getState());
  expect(showcase.fps).toBeGreaterThan(0);
  expect(showcase.activeCascades).toBeGreaterThan(0);
  console.log(`SHOWCASE_OK ${JSON.stringify(showcase)}`);
  await page.screenshot({ path: `${output}/rc-showcase.png` });

  expect(errors, errors.join('\n')).toEqual([]);
});

test('RC intro copy remains clean', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console.error: ${message.text()}`);
  });

  await page.goto('/rc-intro-copy/', { waitUntil: 'load' });
  await page.waitForFunction(() => window.__rcIntroCopy?.status === 'done');
  const state = await page.evaluate(() => window.__rcIntroCopy.getState());
  expect(state.rc.activeCascades).toBeGreaterThan(0);
  expect(state.rc.jfaPasses).toBeGreaterThan(0);
  expect(state.rc.ditherEnabled).toBe(false);
  console.log(`RC_INTRO_COPY_OK cascades=${state.rc.activeCascades} jfa=${state.rc.jfaPasses} dither=${state.rc.ditherEnabled}`);
  expect(errors, errors.join('\n')).toEqual([]);
});
