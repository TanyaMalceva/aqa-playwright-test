import BaseComponent from "../pageObjects/BaseComponent.js";
import Header from "./components/Header.js";
import {expect} from "@playwright/test";
export default class BasePage extends BaseComponent {
    constructor(page, url, container) {
        const wrapper = container ?? page.locator('html')
        super(page, wrapper)
        this._url = url
       // this.activeHeaderItem = page.locator('a.btn.header-link.-active')
        this.header = new Header(page)
    }
    async navigate(){
        await this.open()
        await this.waitLoaded()
    }
    async open() {
        await this._page.goto(this._url)
    }
    async logout(){
        await this._page.locator('#userNavDropdown').click()
        await this._page.locator('nav.user-nav_menu.dropdown-menu button', {hasText : 'Logout'}).click()
        await expect(this._page).toHaveURL('/')
    }
}