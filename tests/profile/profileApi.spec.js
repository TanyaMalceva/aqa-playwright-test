import {test, expect} from "@playwright/test"
import ProfilePage from '../../src/pageObjects/profilePage/ProfilePage.js'
import { USER_PROFILE_RESPONSE_BODY } from '../pom/fixtures/profile.fixtures.js'
import { STORAGE_STATE_USER_PATH } from '../../src/data/storageState.js'
test.describe("Profile page. API test", ()=>{
    let page

    test.beforeEach(async ({ browser }) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        page = await ctx.newPage()
    })

    test('frontend should use profile user returned in response', async()=>{
        await page.route("/api/users/profile", (route) => {
            route.fulfill({ body: JSON.stringify(USER_PROFILE_RESPONSE_BODY) })
        })

        const profilePage = new ProfilePage(page)
        await profilePage.navigate()
        await page.pause()

            await expect(profilePage.userName).toHaveText(
                `${USER_PROFILE_RESPONSE_BODY.data.name} ${USER_PROFILE_RESPONSE_BODY.data.lastName}`
        )
    })
})