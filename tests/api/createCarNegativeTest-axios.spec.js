import axios from "axios"
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import {test} from '../../src/fixtures/test.fixture.js'
import {expect} from '@playwright/test'
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js"
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js"
import {config} from "../../config/config";
import {USERS} from "../../src/data/dict/users";

test.describe.only("API Negative test (axios)", ()=>{
    let client

    test.beforeAll(async ()=> {
        const jar = new CookieJar();
        client = wrapper(axios.create({
            baseURL: config.apiURL,
            jar,
            validateStatus: status => {
                return status < 501
            }
        }))

        await client.post('/auth/signin', {
            "email": USERS.TANYA_MALTSEVA.email,
            "password": USERS.TANYA_MALTSEVA.password,
            "remember": false
        })
    })

    test.only("should return error message with Route or entity not found (axios)",
        async () => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        };

        const response = await client.post("/api/cars000", requestBody)
        const body = await response.json()

        await expect(response.status(), "Status code should be 404").toEqual(404)
        expect(body.message).toBe("Not found")
    })

    test.only("should return error message (axios)", async () => {

        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": 8,
            "carModelId": modelId,
            "mileage": 122
        }
        const response = await client.post("/api/cars", requestBody)
        const body = await response.json()

        await expect(response.status(), "Status code should be 400").toEqual(400)
        expect(body.message).toBe("Cars limit reached")
    })
})