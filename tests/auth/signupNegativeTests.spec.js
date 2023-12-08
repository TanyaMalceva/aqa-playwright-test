import {expect, test} from "@playwright/test";

test.describe('User registration validations. Negative tests', ()=>{
    test('Should display a validation message if the Name field length is longer than allowed', async({page})=>{

        const name = 'T'
        const lastname = 'Maltseva'
        const email = 'aqa+tanya@gmail.com'
        const password = 'Password2'
        const repeatPassword = 'Password2'

        await page.goto('/')
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

        const registerButton = popup.locator('button.btn.btn-primary[disabled]')

        await nameInput.fill(name)
        await lastNameInput.fill(lastname)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(repeatPassword)

        const nameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(nameErrorMessage, "Error message should be shown when user has entered invalid name").toHaveText('Name has to be from 2 to 20 characters long')
        await expect(nameErrorMessage, "Name input should have red border when user has entered invalid name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered invalid data").toBeDisabled()
    });

//---------------------------------------------------------------------------------------------------

    test('Should display a validation message if the Last name field length is longer than allowed', async({page})=>{

        const name = 'Tanya'
        const lastname = 'M'
        const email = 'aqa+tanya@gmail.com'
        const password = 'Password2'
        const repeatPassword = 'Password2'

        await page.goto('/')
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

        const registerButton = popup.locator('button.btn.btn-primary[disabled]')

        await nameInput.fill(name)
        await lastNameInput.fill(lastname)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(repeatPassword)

        const lastnameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(lastnameErrorMessage, "Error message should be shown when user has entered invalid last name").toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastnameErrorMessage, "Last name input should have red border when user has entered invalid last name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered invalid data").toBeDisabled()
    });

//---------------------------------------------------------------------------------------------------

test('Should display a validation message if the Email field has invalid data', async({page})=>{

    const name = 'Tanya'
    const lastname = 'Maltseva'
    const email = 'aqa+tanya@gmail'
    const password = 'Password2'
    const repeatPassword = 'Password2'

    await page.goto('/')
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

    const registerButton = popup.locator('button.btn.btn-primary[disabled]')

    await nameInput.fill(name)
    await lastNameInput.fill(lastname)
    await emailInput.fill(email)
    await passwordInput.fill(password)
    await repeatPasswordInput.fill(repeatPassword)

    const emailErrorMessage = popup.locator('div.invalid-feedback')
    await expect(emailErrorMessage, "Error message should be shown when user has entered invalid email").toHaveText('Email is incorrect')
    await expect(emailErrorMessage, "Email input should have red border when user has entered invalid email").toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registerButton, "Register button should be disabled when user has entered invalid data").toBeDisabled()
});

//---------------------------------------------------------------------------------------------------

    test('Should display a validation message if the Password field has invalid data', async({page})=>{

        const name = 'Tanya'
        const lastname = 'Maltseva'
        const email = 'aqa+tanya@gmail.com'
        const password = 'Password'
        const repeatPassword = 'Password2'

        await page.goto('/')
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

        const registerButton = popup.locator('button.btn.btn-primary[disabled]')

        await nameInput.fill(name)
        await lastNameInput.fill(lastname)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(repeatPassword)

        const passwordErrorMessage = popup.locator('div.invalid-feedback')
        await expect(passwordErrorMessage, "Error message should be shown when user has entered invalid password")
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(passwordErrorMessage, "Password input should have red border when user has entered invalid password").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered invalid data").toBeDisabled()
    });

//---------------------------------------------------------------------------------------------------

test('Should display a validation message if datas does not match on Password and Re-enter password fields', async({page})=>{

    const name = 'Tanya'
    const lastname = 'Maltseva'
    const email = 'aqa+tanya@gmail.com'
    const password = 'Password2'
    const repeatPassword = '123'

    await page.goto('/')
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

    const registerButton = popup.locator('button.btn.btn-primary[disabled]')

    await nameInput.fill(name)
    await lastNameInput.fill(lastname)
    await emailInput.fill(email)
    await passwordInput.fill(password)
    await repeatPasswordInput.fill(repeatPassword)


    const repeatPasswordErrorMessage = popup.locator('div.invalid-feedback')
    await page.click('div.modal-footer')
    await expect(repeatPasswordErrorMessage, "Error message should be shown when user has entered different valid data to Password and Re-enter password fields")
        .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    await expect(repeatPasswordErrorMessage, "Re-enter password input should have red border when user has entered different valid data to Password and Re-enter password fields")
        .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registerButton, "Register button should be disabled when user has entered invalid data").toBeDisabled()
})
})