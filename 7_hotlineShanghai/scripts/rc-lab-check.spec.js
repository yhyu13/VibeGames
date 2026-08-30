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

  // rc-showcase / rc-intro-copy 已于 2026-08-30 归档至 old/(SOP 一致性清理),
  // 对应页面级断言移除;rc-lab 的 37+37 确定性断言即本门全部覆盖面。
  expect(errors, errors.join('\n')).toEqual([]);
});
