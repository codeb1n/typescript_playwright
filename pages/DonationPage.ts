import { Page } from "@playwright/test";
import { allure } from "allure-playwright";

const DONATION_URL = "https://data.fundraiseup.com/qa-test-7R58U3/";

export class DonationPage {
  constructor(private page: Page) {}

  async navigate() {
    await allure.step("Navigating to donation page", async () => {
      await this.page.goto(DONATION_URL);
    });
  }

  async clickGiveNow() {
    await allure.step("Click 'Give Now' button", async () => {
      const giveNowButton = this.page.locator("#XBGSFAMB");
      await giveNowButton.click();
    });
  }
}
