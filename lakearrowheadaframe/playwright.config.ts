import { defineConfig, devices } from "@playwright/test";

const localBaseURL = "http://127.0.0.1:3101";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? localBaseURL;
const isRemoteQA = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: "./tests",
  outputDir: "/tmp/lakearrowheadaframe-playwright",
  fullyParallel: true,
  forbidOnly: true,
  retries: isRemoteQA ? 2 : 0,
  workers: isRemoteQA ? 1 : 2,
  reporter: [["list"], ["html", { outputFolder: "/tmp/lakearrowheadaframe-report", open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: isRemoteQA
    ? undefined
    : {
        command: "PLAYWRIGHT=1 npx next dev --port 3101",
        url: localBaseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
