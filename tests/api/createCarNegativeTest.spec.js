import {test} from '../../src/fixtures/test.fixture.js';
import {expect} from '@playwright/test';
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js"
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js"

test.describe("API", ()=>{
    test("should return error message with Route or entity not found", async ({userAPIClient}) => {

        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        const response = await userAPIClient.post("/api/cars000", requestBody)
        const body = await response.json()

        await expect(response.status(), "Status code should be 404").toEqual(404)
        expect(body.message).toBe("Not found")
    })

    test("should return error message", async ({userAPIClient}) => {

        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": 8,
            "carModelId": modelId,
            "mileage": 122
        }
        const response = await userAPIClient.post("/api/cars", requestBody)
        const body = await response.json()

        await expect(response.status(), "Status code should be 400").toEqual(400)
        expect(body.message).toBe("Cars limit reached")
    })
})