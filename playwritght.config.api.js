// @ts-check
import { defineConfig, devices } from '@playwright/test'
import {config as testConfig} from "./config/config.js";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config =  defineConfig({
    // testDir: './tests',
    testMatch: 'tests/**/*.spec.js',
    globalSetup: './globalSetup',
    globalTeardown: './globalTeardown',
    // grep: /@smoke/,
    timeout: 360_000,
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: 2,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html'],
        // ['playwright-qase-reporter',
        //   {
        //     apiToken: '54aa8a4b6a86823aad3bd91584e368a3fb6a306f600d94d5bcb1d529eedd4c4d',
        //     projectCode: 'AH',
        //     runComplete: true,
        //     basePath: 'https://api.qase.io/v1',
        //     logging: true,
        //     uploadAttachments: true,
        //   }],
        // [
        //   '@testomatio/reporter/lib/adapter/playwright.js',
        //   {
        //     apiKey: testConfig.reporters.testomat.key,
        //   },
        // ],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        headless: true,
        // storageState: STORAGE_STATE_USER_PATH,
        httpCredentials: testConfig.httpCredentials,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: testConfig.baseURL,
        viewport: {
            width: 1200,
            height: 840
        },
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        launchOptions:{
            // slowMo: 1000
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'api tests',
            use: { ...devices['Desktop Chrome'] },
            testMatch: 'tests/api/**/*.spec.js',
        },
        //
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});

export default config