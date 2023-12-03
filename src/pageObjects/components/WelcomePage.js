import BasePage from "../BasePage.js";
import {expect} from "@playwright/test";
import GaragePage from "../panel/garagePage/GaragePage.js";
import SignUpPopup from "../../pageObjects/components/SignupPopup.js";
import SignInPopup from "../../pageObjects/components/SignInPopup.js";

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
        this.signUpButton = page.locator('.btn-primary')
        this.signInButton = page.locator('.header_signin')
    }

    async openSignUpPopup (){
        await this.signUpButton.click()
        return new SignUpPopup(this._page)
    }

    async openSignInPopup (){
        await this.signInButton.click()
        return new SignInPopup(this._page)
    }

    async loginAsGuest(){
        await this.header.guestLoginButton.click()
        await expect(this._page).toHaveURL('/panel/garage')
        return new GaragePage(this._page)
    }
}