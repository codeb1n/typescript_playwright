import { Page, FrameLocator } from "@playwright/test";
import { allure } from "allure-playwright";

export class DonationInfoPage {
  constructor(private page: Page) {}

  private donationWidgetIframe(): FrameLocator {
    return this.page.frameLocator('iframe[title="Donation Widget"]');
  }

  async chooseMonthlyDonation() {
    const iframeElement = this.donationWidgetIframe();
    await allure.step("Choose 'Monthly' donation option", async () => {
      const monthlyButton = iframeElement.locator(
        '[data-qa="more-frequent-button"]'
      );
      await monthlyButton.click();
    });
  }

  async chooseCurrencyDonation(currency: string) {
    const iframeElement = this.donationWidgetIframe();
    await allure.step("Choose donation currency", async () => {
      const currencySelector = iframeElement.locator(
        '[data-qa="currency-selector"]'
      );
      await currencySelector.selectOption(currency);
    });
  }

  async enterDonationAmount(amount: string) {
    const iframeElement = this.donationWidgetIframe();
    await allure.step(`Enter donation amount: ${amount}`, async () => {
      const amountInput = iframeElement.getByTestId("price-input");
      await amountInput.fill(amount);
    });
  }

  async clickDonateMonthly() {
    const iframeElement = this.donationWidgetIframe();
    await allure.step("Click 'Donate Monthly' button", async () => {
      const donateButton = iframeElement.locator('[data-qa="donate-button"]');
      await donateButton.click();
    });
  }
}
