import BasePage from "../BasePage.js";
import {expect} from "@playwright/test";
import {SignupPopup} from "../components/SignupPopup.js";

export class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Sign Up'}));
        this.signupPopup = this._page.locator('button:text("Sign Up")');
    }
    async openSignupPopup() {
        await expect(this.signupPopup, "Registration link should be visible").toBeVisible();
        await this.signupPopup.click();
        return new SignupPopup(this._page)
    }
}