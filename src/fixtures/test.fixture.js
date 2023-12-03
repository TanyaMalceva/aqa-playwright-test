import {test as base, request} from "@playwright/test"
import ProfilePage from "../pageObjects/profilePage/ProfilePage.js";
import {WelcomePage} from '../pageObjects/signUp/WelcomePage.js';
import {USERS} from '../data/dict/users.js';
import {STORAGE_STATE_USER_PATH} from '../data/dict/storageState.js';
import GaragePage from '../pageObjects/panel/garagePage/GaragePage.js';

export const test = base.extend({
    headerLinks: ['Garage', 'Fuel expenses', 'Instructions'],
    userInfo: USERS.JOE_DOU,
    userProfilePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()
        // before test
        await use(profilePage)

        //after test
    },
    userGaragePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()
        await use(garagePage)

        //всі сторінки закриються після тесту
        await ctx.close()
    },
    userAPIClient: async ({},use)=>{
        const ctx = await request.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        await use(ctx)

        await ctx.dispose()
    },
    managerProfilePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const popup = await welcomePage.openSignInPopup()
        await popup.signIn({
            email: USERS.JOE_DOU.email, // manager credentials
            password: USERS.JOE_DOU.password
        })
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()
        await use(profilePage)
    },
}
)