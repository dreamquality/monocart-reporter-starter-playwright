import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",

  metadata: {
    env: "DEV",
    type: "Regression",
    url: "https://www.npmjs.org/package/monocart-reporter",
  },

  retries: process.env.CI ? 2 : 3,

  use: {
    baseURL: "https://www.saucedemo.com",
    browserName: "chromium",
    headless: !!process.env.CI,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure", // on
    video: "retain-on-failure", // on

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    locale: "en-US",
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    acceptDownloads: true, // Enable downloads
  },
  reporter: [
    ["dot"],
    ["line"],
    [
      "monocart-reporter",
      {
        name: "My Test Report",
        outputFile: "./my-report/index.html",
        customFieldsInComments: true,
        // custom columns
        columns: (defaultColumns) => {
          // insert custom column(s) before a default column
          const index = defaultColumns.findIndex(
            (column) => column.id === "duration"
          );
          defaultColumns.splice(
            index,
            0,
            {
              // define the column in reporter
              id: "owner",
              name: "Owner",
              align: "center",
              searchable: true,
              styleMap: {
                "font-weight": "normal",
              },
            },
            {
              // another column for JIRA link
              id: "jira",
              name: "JIRA Key",
              width: 100,
              searchable: true,
              styleMap: "font-weight:normal;",
              formatter: (v, rowItem, columnItem) => {
                const key = rowItem[columnItem.id];
                return `<a href="https://your-jira-url/${key}" target="_blank">${v}</a>`;
              },
            }
          );
        },
      },
    ],
  ],

  /* Maximum time one test can run for. */
  // timeout: 200 * 1000,

  // expect: {
  //   /**
  //    * Maximum time expect() should wait for the condition to be met.
  //    * For example in `await expect(locator).toHaveText();`
  //    */
  //   timeout: 20000
  // },

  // forbidOnly: !!process.env.CI,

  // workers: process.env.CI ? 2 : 1

  projects: [
    {
      name: "chromium",

      /* Project-specific settings. */
      use: {
        ...devices["Desktop Chrome"],
        locale: "en-US",
        extraHTTPHeaders: {
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        locale: "en-US",
        extraHTTPHeaders: {
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        locale: "en-US",
        extraHTTPHeaders: {
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    },
  ],
});
