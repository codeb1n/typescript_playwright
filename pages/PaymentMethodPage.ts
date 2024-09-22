import { Page, FrameLocator } from "@playwright/test";
import { allure } from "allure-playwright";

export class PaymentMethodPage {
  constructor(private page: Page) {}

  private donationWidgetIframe(): FrameLocator {
    return this.page.frameLocator('iframe[title="Donation Widget"]');
  }

  async uncheckCoverTransactionCosts() {
    const iframeElement = this.donationWidgetIframe();
    await allure.step(
      "Unchecking cover transaction costs checkbox",
      async () => {
        const coverFeeCheckbox = iframeElement.locator(
          '[data-qa="cover-fee-checkbox"]'
        );
        await coverFeeCheckbox.uncheck();
      }
    );
  }

  async selectCreditCard() {
    const iframeElement = this.donationWidgetIframe();
    await allure.step("Selecting credit card as payment method", async () => {
      const creditCardButton = iframeElement.locator('[data-qa="cc-button"]');
      await creditCardButton.click();
    });
  }
}
