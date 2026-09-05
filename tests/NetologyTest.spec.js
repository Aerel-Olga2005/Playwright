import { test, expect } from "@playwright/test";
const { chromium } = require("playwright");
const { email, password } = require("../user");

test("test positive", async () => {
  const browser = await chromium.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");

  await page.getByText('Другие способы входа').click();
  await page.getByText('Войти по почте').click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole('textbox', { name: 'Пароль' }).click();  
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId('login-submit-btn').click();

  await expect(page.getByText("Учим - и помогаем на каждом этапе")).toBeVisible();

  await browser.close();
});

test("test negative", async () => {
  const browser = await chromium.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");

  await page.getByText('Другие способы входа').click();
  await page.getByText('Войти по почте').click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('ftuyfugu');
  await page.getByRole('textbox', { name: 'Пароль' }).click();

  await expect(page.getByText("Неверный email")).toBeVisible();

  await browser.close();
});
