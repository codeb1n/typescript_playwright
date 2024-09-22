import { test, Browser, devices } from "@playwright/test";
import { DonationPage } from "../pages/DonationPage";
import { DonationInfoPage } from "../pages/DonationInfoPage";
import { DonorInfoPage } from "../pages/DonorInfoPage";
import { PaymentMethodPage } from "../pages/PaymentMethodPage";
import { CardInfoPage } from "../pages/CardInfoPage";
import { cardData, userData } from "../data/data";

const DonationFlow = async (browser: Browser, isMobile: boolean = false) => {
  const context = await browser.newContext(
    isMobile ? { ...devices["Pixel 5"] } : {}
  );
  const page = await context.newPage();
  return {
    page,
    donationPage: new DonationPage(page),
    donationInfoPage: new DonationInfoPage(page),
    donorInfoPage: new DonorInfoPage(page),
    paymentMethodPage: new PaymentMethodPage(page),
    cardInfoPage: new CardInfoPage(page),
  };
};

test.describe("Donation Flow", () => {
  test("Desktop: Donation fails with a declined credit card", async ({
    browser,
  }) => {
    const {
      donationPage,
      donationInfoPage,
      donorInfoPage,
      paymentMethodPage,
      cardInfoPage,
    } = await DonationFlow(browser);

    await donationPage.navigate();
    await donationPage.clickGiveNow();

    await donationInfoPage.chooseMonthlyDonation();
    await donationInfoPage.chooseCurrencyDonation("USD");
    await donationInfoPage.enterDonationAmount("100");
    await donationInfoPage.clickDonateMonthly();

    await donorInfoPage.enterDonorDetails(
      userData.firstName,
      userData.lastName,
      userData.email
    );
    await donorInfoPage.clickContinue();

    await paymentMethodPage.uncheckCoverTransactionCosts();
    await paymentMethodPage.selectCreditCard();

    await cardInfoPage.enterCardDetails(
      cardData.cardNumber,
      cardData.expiryDate,
      cardData.cvc
    );
    await cardInfoPage.clickDonate();
    await cardInfoPage.verifyCardDeclined();
  });

  test("Mobile: Donation fails with a declined credit card", async ({
    browser,
  }) => {
    const {
      donationPage,
      donationInfoPage,
      donorInfoPage,
      paymentMethodPage,
      cardInfoPage,
    } = await DonationFlow(browser, true);

    await donationPage.navigate();
    await donationPage.clickGiveNow();

    await donationInfoPage.chooseMonthlyDonation();
    await donationInfoPage.chooseCurrencyDonation("USD");
    await donationInfoPage.enterDonationAmount("100");
    await donationInfoPage.clickDonateMonthly();

    await donorInfoPage.enterDonorDetails(
      userData.firstName,
      userData.lastName,
      userData.email
    );
    await donorInfoPage.clickContinue();

    await paymentMethodPage.uncheckCoverTransactionCosts();
    await paymentMethodPage.selectCreditCard();

    await cardInfoPage.enterCardDetails(
      cardData.cardNumber,
      cardData.expiryDate,
      cardData.cvc
    );
    await cardInfoPage.clickDonate();
    await cardInfoPage.verifyCardDeclined();
  });
});
