import {expect, test} from "@playwright/test";

test.describe('User registration. Positive test @smoke @regression', ()=>{
    test('New user registration', async({page})=>{

        const name = 'Tanya'
        const lastname = 'Maltseva'
        const email = 'aqa+tanya@gmail.com'
        const password = 'Password2'
        const repeatPassword = 'Password2'

        await page.goto('/')

        //debugging
        await page.pause()

        const signUpButton = page.locator('.hero-descriptor_btn', {hasText:'Sign up'});
        await expect(signUpButton, "Sign up button should be visible").toBeVisible()
        await expect(signUpButton, "Sign up button should be enabled").toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('div.modal-content')
        await expect(popup, "Sign up button should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('button.btn.btn-primary')

        await nameInput.fill(name)
        await lastNameInput.fill(lastname)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(repeatPassword)

        await expect(registerButton, "Register button should be enabled when user has entered valid data").toBeEnabled()

    })
})