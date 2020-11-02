import * as chromium from "chrome-aws-lambda";

import { GetPDFBuffer } from "./types/HelperTypes";

export class Helper {
  static getPDFBuffer: GetPDFBuffer = async (url: string = null, html: string = null, options: any) => {
    let browser = null;
    try {
      const executablePath = process.env.IS_OFFLINE
        ? null
        : await chromium.executablePath;
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath,
      });

      const page = await browser.newPage();

      const loaded = page.waitForNavigation({
        waitUntil: "load",
      });

      if (options.authentication) {
        await page.authenticate(options.authentication);
      }
      
      if (options.headers) {
        await page.setExtraHTTPHeaders(options.headers)
      }

      if(url) {
        await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0', 'load'] });
      } else if(html) {
        await page.setContent(html, { waitUntil: ['domcontentloaded', 'networkidle0', 'load'] });
      }
      await loaded;

      const pdfOptions = {
        format: "Letter",
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
        ...options,
      };
      return await page.pdf(pdfOptions);
    } catch (error) {
      return error;
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }
  };
}
