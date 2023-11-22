import {test} from '../../src/fixtures/testGaragePage'
import {expect} from "@playwright/test";

test.describe('Test garage page', ()=> {
    test.only('User can opened Garage page via storage state', async ({userGaragePage}) => {

        await userGaragePage.navigate()
        await expect(userGaragePage.addCarButton, "Button should be visible").toBeVisible()
        await expect(userGaragePage.addCarButton, "Button should have correct title").toHaveText("Add car")
    })
})