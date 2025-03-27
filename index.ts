import path from "path";
import puppeteer from "puppeteer";
import fs from "fs";

const pathChrome = fs.existsSync("/usr/bin/chromium-browser")
  ? "/usr/bin/chromium-browser"
  : "/usr/bin/chromium";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: pathChrome,
    headless: false,
    timeout: 0,
    ignoreDefaultArgs: ["--enable-automation"],
    args: [
      "--kiosk",
      "--app",
      "--disable-infobars",
      "--silent",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--start-fullscreen",
    ],
    defaultViewport: null,
    protocolTimeout: 120000,
  });
  const page = await browser.newPage();
  await page.goto(`file://${path.join(__dirname, "index.html")}`);
})();
