import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/signUp/WelcomePage";

test.describe("New user registration", ()=>{
    let page
    let welcomePage
    let signupPopup

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1200,
                height: 840
            }
        })
        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })
    test('Successful Signup', async ({page}) => {
            const signUpData = {
                name: 'Tanya',
                lastName: 'Maltseva',
                email: 'aqa+tanya@gmail.com',
                password: 'Password2',
                reenterPassword: 'Password2'
            }
            signupPopup = await welcomePage.openSignupPopup()
            await signupPopup.userRegistration(signUpData)
        })
});
//-------------------------------------User registration validation--------------------------------
test.describe.only('User registration validation', ()=> {
    let page
    let welcomePage
    let signupPopup

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext({
            viewport: {
                width: 1200,
                height: 840
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async () => {
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })
    test('Should display a validation message if the Name field length is longer than allowed (POM)', async ({page}) => {
        const signUpData = {
            name: 'T',
            lastName: 'Maltseva',
            email: 'aqa+tanya@gmail.com',
            password: 'Password2',
            reenterPassword: 'Password2'
        }
        signupPopup = await welcomePage.openSignupPopup()
        await signupPopup.fillSignupForm(signUpData)
        await expect(signupPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signupPopup.errorMessage, "Name has to be from 2 to 20 characters long").toHaveText('Name has to be from 2 to 20 characters long')
        await expect(signupPopup.errorMessage, "Name input should have red border when user has entered invalid name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
    });
    //------------------------------------------------------------------------------------
    test('Should display a validation message if the Last Name field is invalid (POM)', async ({page}) => {
        const signUpData = {
            name: 'Tanya',
            lastName: 'M',
            email: 'aqa+tanya@gmail.com',
            password: 'Password2',
            reenterPassword: 'Password2'
        }
        signupPopup = await welcomePage.openSignupPopup()
        await signupPopup.fillSignupForm(signUpData)
        await expect(signupPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signupPopup.errorMessage, "Validation message should be displayed if the field was invalid")
            .toHaveText('Last name has to be from 2 to 20 characters long')
    });
    //------------------------------------------------------------------------------------
    test('Should display a validation message if the Email field has invalid data (POM)', async ({page}) => {
            const signUpData = {
                name: 'Tanya',
                lastName: 'Maltseva',
                email: 'aqa+tanya@gmail',
                password: 'Password2',
                reenterPassword: 'Password2'
            }
            signupPopup = await welcomePage.openSignupPopup()
            await signupPopup.fillSignupForm(signUpData)
            await expect(signupPopup.registerButton, "Register button should be disabled").toBeDisabled()
            await expect(signupPopup.errorMessage, "Error message should be shown when user has entered invalid email").toHaveText('Email is incorrect')
            await expect(signupPopup.errorMessage, "Email input should have red border when user has entered invalid email").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        });
    //------------------------------------------------------------------------------------------
    test('Should display a validation message if the Password field has invalid data (POM)', async ({page}) => {
        const signUpData = {
            name: 'Tanya',
            lastName: 'Maltseva',
            email: 'aqa+tanya@gmail.com',
            password: 'Password',
            reenterPassword: 'Password2'
        }
        signupPopup = await welcomePage.openSignupPopup()
        await signupPopup.fillSignupForm(signUpData)
        await expect(signupPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signupPopup.errorMessage, "Error message should be shown when user has entered invalid password")
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(signupPopup.errorMessage, "Password input should have red border when user has entered invalid password").toHaveCSS('border-color', 'rgb(220, 53, 69)')
    });
    //----------------------------------------------------------------------------------------
    test('Should display a validation message if datas does not match on Password and Re-enter password fields (POM)', async ({page}) => {
        const signUpData = {
            name: 'Tanya',
            lastName: 'Maltseva',
            email: 'aqa+tanya@gmail.com',
            password: 'Password',
            reenterPassword: '123'
        }
        signupPopup = await welcomePage.openSignupPopup()
        await signupPopup.fillSignupForm(signUpData)
        //await page.click('div.modal-footer')
        await expect(signupPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signupPopup.errorMessage, "Error message should be shown when user has entered different valid data to Password and Re-enter password fields")
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(signupPopup.errorMessage, "Re-enter password input should have red border when user has entered different valid data to Password and Re-enter password fields")
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    });
})