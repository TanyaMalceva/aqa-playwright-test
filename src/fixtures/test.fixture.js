import { test as base, request } from "@playwright/test"
import GaragePage from '../pageObjects/panel/garagePage/GaragePage.js'
import { STORAGE_STATE_USER_PATH } from "../data/storageState.js"
import ProfilePage from "../pageObjects/profilePage/ProfilePage.js"

export const test = base.extend({
    userProfilePage: async ({ browser }, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()

        await use(profilePage)

        ctx.close()
    },
    userGaragePage: async ({ browser }, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()

        const garagePage = new GaragePage(page)
        await garagePage.navigate()

        await use(garagePage)

        await ctx.close()
    },
    userAPIClient: async ({}, use) => {
        const ctx = await request.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })

        await use(ctx)
        await ctx.dispose()
    }
})

//------------------------------------------------

// import {test as base, request} from "@playwright/test"
// import ProfilePage from "../pageObjects/profilePage/ProfilePage.js";
// import {WelcomePage} from '../pageObjects/signUp/WelcomePage.js';
// import {USERS} from '../data/dict/users.js';
// import {STORAGE_STATE_USER_PATH} from '../data/dict/storageState.js';
// import GaragePage from '../pageObjects/panel/garagePage/GaragePage.js';
// //-----------------------
// import {CookieJar} from "tough-cookie";
// import AuthController from "../controllers/AuthController.js";
// import {config} from "../../config/config.js";
// import CarController from "../controllers/CarController.js";
// import UserController from "../controllers/UserController.js";
//
// export const test = base.extend({
//     headerLinks: ['Garage', 'Fuel expenses', 'Instructions'],
//     userInfo: USERS.JOE_DOU,
//     userProfilePage: async ({browser}, use)=>{
//         const ctx = await browser.newContext({
//             storageState: STORAGE_STATE_USER_PATH
//         })
//         const page = await ctx.newPage()
//         const profilePage = new ProfilePage(page)
//         await profilePage.navigate()
//         // before test
//         await use(profilePage)
//
//         //after test
//     },
//     userGaragePage: async ({browser}, use)=>{
//         const ctx = await browser.newContext({
//             storageState: STORAGE_STATE_USER_PATH
//         })
//         const page = await ctx.newPage()
//         const garagePage = new GaragePage(page)
//         await garagePage.navigate()
//         await use(garagePage)
//
//         //всі сторінки закриються після тесту
//         await ctx.close()
//     },
//     userAPIClient: async ({},use)=>{
//         const ctx = await request.newContext({
//             storageState: STORAGE_STATE_USER_PATH
//         })
//         await use(ctx)
//
//         await ctx.dispose()
//     },
//     managerProfilePage: async ({page}, use)=>{
//         const welcomePage = new WelcomePage(page)
//         await welcomePage.navigate()
//         const popup = await welcomePage.openSignInPopup()
//         await popup.signIn({
//             email: USERS.JOE_DOU.email, // manager credentials
//             password: USERS.JOE_DOU.password
//         })
//         const profilePage = new ProfilePage(page)
//         await profilePage.navigate()
//         await use(profilePage)
//     },
//     //--------------------------------------------------
//
//         client: async ({page}, use)=>{
//             const cookie = new CookieJar()
//             const options = {
//                 baseUrl: config.apiURL,
//                 cookies: cookie
//             }
//             const authController = new AuthController(options)
//             await authController.signIn({
//                 email: USERS.JOE_DOU.email,
//                 password: USERS.JOE_DOU.password,
//             })
//             await use({
//                 cars: new CarController(options),
//                 auth: authController
//             })
//         },
//         clientWithUser: async ({page}, use)=>{
//             async  function getClient(userData){
//                 const cookie = new CookieJar()
//                 const options = {
//                     baseUrl: config.apiURL,
//                     cookies: cookie
//                 }
//                 const authController = new AuthController(options)
//                 await authController.signIn(userData)
//
//                 return {
//                     cars: new CarController(options),
//                     auth: authController
//                 }
//             }
//             await use(getClient)
//         },
//         clientWithNewUser: async ({page}, use)=>{
//             const userData = {
//                 "name": "John",
//                 "lastName": "Dou",
//                 "email": `test${Date.now()}@test.com`,
//                 "password": "Qwerty12345",
//                 "repeatPassword": "Qwerty12345"
//             }
//             console.log(userData.email)
//             const cookie = new CookieJar()
//             const options = {
//                 baseUrl: config.apiURL,
//                 cookies: cookie
//             }
//             const authController = new AuthController(options)
//             const userController = new UserController(options)
//             await authController.signUp(userData)
//             await authController.signIn({
//                 email: userData.email,
//                 password: userData.password,
//             })
//             await use({
//                 cars: new CarController(options),
//                 auth: authController,
//                 users: userController
//             })
//
//             await userController.deleteCurrentUser()
//         },
//     }
// )