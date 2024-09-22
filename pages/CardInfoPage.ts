import { Page, FrameLocator, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class CardInfoPage {
  constructor(private page: Page) {}

  private donationWidgetIframe(): FrameLocator {
    return this.page.frameLocator('iframe[title="Donation Widget"]');
  }

  async enterCardDetails(cardNumber: string, expiryDate: string, cvc: string) {
    const cardNumberIframe = this.donationWidgetIframe().frameLocator(
      'iframe[title="Secure card number input frame"]'
    );
    const expiryDateIframe = this.donationWidgetIframe().frameLocator(
      'iframe[title="Secure expiration date input frame"]'
    );
    const cvcIframe = this.donationWidgetIframe().frameLocator(
      'iframe[title="Secure CVC input frame"]'
    );

    await allure.step("Enter card details", async () => {
      const cardNumberInput = cardNumberIframe.locator(
        'input[name="cardnumber"]'
      );
      await cardNumberInput.fill(cardNumber);

      const expiryDateInput = expiryDateIframe.locator(
        'input[name="exp-date"]'
      );
      await expiryDateInput.fill(expiryDate);

      const cvcInput = cvcIframe.locator('input[name="cvc"]');
      await cvcInput.fill(cvc);
    });
  }

  async clickDonate() {
    const iframeElement = this.donationWidgetIframe();
    await allure.step("Click 'Donate' button", async () => {
      const donateButton = iframeElement.locator('[data-qa="card-continue"]');
      await expect(donateButton).toBeEnabled();
      await donateButton.click();
    });
  }

  async verifyCardDeclined() {
    const iframeElement = this.donationWidgetIframe();
    await allure.step("Verify card was declined", async () => {
      const errorElement = iframeElement.getByTestId("undefined-error-title");
      await errorElement.waitFor({ state: "visible" });
      await expect(errorElement).toHaveText("Your card was declined");
    });
  }
}
