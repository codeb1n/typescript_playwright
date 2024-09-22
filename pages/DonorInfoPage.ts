import { Page, FrameLocator } from "@playwright/test";
import { allure } from "allure-playwright";

export class DonorInfoPage {
  constructor(private page: Page) {}

  private donationWidgetIframe(): FrameLocator {
    return this.page.frameLocator('iframe[title="Donation Widget"]');
  }

  async enterDonorDetails(firstName: string, lastName: string, email: string) {
    await allure.step("Enter donor's personal details", async () => {
      const iframeElement = this.donationWidgetIframe();
      await iframeElement
        .getByTestId("privacy-first-name-input")
        .fill(firstName);
      await iframeElement.getByTestId("privacy-last-name-input").fill(lastName);
      await iframeElement.getByTestId("privacy-email-input").fill(email);
    });
  }

  async clickContinue() {
    const iframeElement = this.donationWidgetIframe();
    await allure.step("Click 'Continue' button", async () => {
      const continueButton = iframeElement.getByTestId("pay-button");
      await continueButton.click();
    });
  }
}
