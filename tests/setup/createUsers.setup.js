import {expect, test} from "@playwright/test";
import {USERS} from "../../src/data/dict/users.js";
import {STORAGE_STATE_USER_PATH} from "../../src/data/dict/storageState.js";
import {WelcomePage} from "../../src/pageObjects/WelcomePage.js";

test("Login as User and save storage state", async ({page, context})=>{
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    const popup = await welcomePage.openSignInPopup()
    await popup.signIn({
        email: USERS.TANYA_MALTSEVA.email,
        password: USERS.TANYA_MALTSEVA.password
    })
    await context.storageState({
        path: STORAGE_STATE_USER_PATH
    })
})

// test("Create user", async ()=>{
//     console.log("CREATE USERS")
//     expect(1).toBe(1)
// })