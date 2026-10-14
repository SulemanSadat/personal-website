import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('suleman-studio-opening-v1', 'seen'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact');
});

test('validates fields before contacting EmailJS', async ({ page }) => {
  let requests = 0;
  await page.route('https://api.emailjs.com/**', route => { requests++; return route.abort(); });
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.locator('.form-status')).toContainText('highlighted fields');
  await expect(page.locator('input[name=name]')).toBeFocused();
  expect(requests).toBe(0);
});

test('maps the EmailJS payload and reports API acceptance accurately', async ({ page }) => {
  test.skip(!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 'EmailJS build variables are required for this contract test.');
  let payload: { template_params: Record<string, string> } | undefined;
  await page.route('https://api.emailjs.com/api/v1.0/email/send', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK' });
  });
  await page.locator('input[name=name]').fill('Contact Test');
  await page.locator('input[name=email]').fill('contact-test@example.com');
  await page.locator('input[name=subject]').fill('Payload verification');
  await page.locator('textarea[name=message]').fill('Testing the production contact payload.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.locator('.form-status')).toContainText('accepted for delivery');
  expect(payload).toBeDefined();
  expect(payload!.template_params).toEqual(expect.objectContaining({
    name: 'Contact Test', from_name: 'Contact Test', user_name: 'Contact Test',
    email: 'contact-test@example.com', reply_to: 'contact-test@example.com', user_email: 'contact-test@example.com',
    subject: 'Payload verification', title: 'Payload verification', message: 'Testing the production contact payload.',
  }));
});

test('shows an actionable authorisation error', async ({ page }) => {
  test.skip(!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 'EmailJS build variables are required for this contract test.');
  await page.route('https://api.emailjs.com/api/v1.0/email/send', route => route.fulfill({ status: 403, body: 'Forbidden' }));
  await page.locator('input[name=name]').fill('Contact Test');
  await page.locator('input[name=email]').fill('contact-test@example.com');
  await page.locator('input[name=subject]').fill('Error verification');
  await page.locator('textarea[name=message]').fill('Testing the contact error feedback.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.locator('.form-status')).toContainText('not authorised');
});

test('identifies a disconnected email provider', async ({ page }) => {
  test.skip(!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 'EmailJS build variables are required for this contract test.');
  await page.route('https://api.emailjs.com/api/v1.0/email/send', route => route.fulfill({ status: 412, body: 'Invalid grant' }));
  await page.locator('input[name=name]').fill('Contact Test');
  await page.locator('input[name=email]').fill('contact-test@example.com');
  await page.locator('input[name=subject]').fill('Provider verification');
  await page.locator('textarea[name=message]').fill('Testing disconnected provider feedback.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.locator('.form-status')).toContainText('needs to be reauthorised');
});

test('live EmailJS delivery verification', async ({ page }) => {
  test.skip(process.env.RUN_EMAILJS_LIVE_TEST !== 'true', 'Run explicitly because this sends a real message.');
  let liveResponseStatus: number | undefined;
  let liveResponseBody = '';
  page.on('response', async response => { if (response.url().includes('api.emailjs.com')) { liveResponseStatus = response.status(); liveResponseBody = await response.text(); } });
  const timestamp = new Date().toISOString();
  await page.locator('input[name=name]').fill('Portfolio delivery verification');
  await page.locator('input[name=email]').fill('sadat.fullstack@gmail.com');
  await page.locator('input[name=subject]').fill(`Contact form delivery verification ${timestamp}`);
  await page.locator('textarea[name=message]').fill(`This is an authorised delivery test from the local production form at ${timestamp}. Please confirm that this message reached the configured inbox.`);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect.poll(() => liveResponseStatus).toBeTruthy();
  expect(liveResponseStatus, liveResponseBody).toBe(200);
  await expect(page.locator('.form-status')).toContainText('accepted for delivery');
});
