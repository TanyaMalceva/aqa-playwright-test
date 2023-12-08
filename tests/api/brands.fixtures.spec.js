import {test} from "../../src/fixtures/test.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js";
import {USERS} from "../../src/data/dict/users.js";

test.describe("API Controller", ()=>{

    test("should return user's cars", async ({client})=>{
        const response = await client.cars.getUserCars()
        expect(response.status, "Status code should be 200").toEqual(200)
        // expect(response.data, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY)
    })

    test("should return user's cars 2", async ({clientWithUser})=>{
        const client = await clientWithUser({
            email: USERS.TANYA_MALTSEVA.email,
            password: USERS.TANYA_MALTSEVA.password,
        })
        const response = await client.cars.getUserCars()
        expect(response.status, "Status code should be 200").toEqual(200)
        // expect(response.data, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY)
    })

    test("should return user's cars 3", async ({clientWithNewUser : client})=>{
        const response = await client.cars.getUserCars()
        expect(response.status, "Status code should be 200").toEqual(200)
        // expect(response.data, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY)
    })

    for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
        test(`should return valid models for ${brand.title} brand new`, async ()=>{
            const brandId = brand.id
            const response = await client.get(`/cars/models?carBrandId=${brandId}`)
            const body = response.data

            expect(response.status, "Status code should be 200").toEqual(200)
            expect(body, "Valid models should be returned").toEqual(VALID_BRAND_MODELS[brandId])
        })
    }

    test('should create new car', async ()=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }

        const response = await client.post('/cars', requestBody)
        const body = response.data

        expect(response.status, "Status code should be 200").toEqual(201)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be created with data from request").toMatchObject(requestBody)
    })
})