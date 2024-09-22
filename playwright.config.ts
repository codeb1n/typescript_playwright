import { defineConfig, devices } from "@playwright/test";

defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 2,
  retries: 2,
  reporter: [["list"], ["allure-playwright"]],
  use: {
    screenshot: "on",
    video: "on",
    trace: "on",
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: { browserName: "chromium" },
    },
    {
      name: "Mobile Chrome",
      use: { browserName: "chromium", ...devices["Pixel 5"] },
    },
  ],
});
