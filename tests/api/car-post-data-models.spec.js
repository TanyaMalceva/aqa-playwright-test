import {expect, test} from "@playwright/test";
import { USERS } from "../../src/data/dict/users.js"
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js";
import APIClient from "../../src/client/APIClient.js"
import CreateCarModel from "../../src/models/cars/CreateCarModel.js"

test.describe("Test POST request - data models", () => {
    let client
    let clientNotAuthorized

    const brand = VALID_BRANDS_RESPONSE_BODY.data[2]
    const model = VALID_BRAND_MODELS[brand.id].data[3]
    const carModel = new CreateCarModel({
        carBrandId: brand.id,
        carModelId: model.id,
        mileage: 89
    })

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            email: USERS.TANYA_MALTSEVA.email,
            password: USERS.TANYA_MALTSEVA.password
        })
        clientNotAuthorized = new APIClient()
    })

    test("should create new car - data models", async () => {
        const response = await client.cars.addCar(carModel)

        const expectedBody = {
            ...carModel,
            id: expect.any(Number),
            initialMileage: carModel.mileage,
            carCreatedAt: expect.any(String),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }

        await expect(response.status, "Status code should be 201").toEqual(201)
        await expect(response.data.data, "Valid brands should be returned").toEqual(expectedBody)
    })

    test("should return error message if model not found - data models", async () => {
        const response = await client.cars.addCar({ ...carModel, carModelId: 133 })

        await expect(response.status, "Status code should be 404").toEqual(404)
        await expect(response.data.message, "should throw error message").toEqual("Model not found")
    })

    test("should throw error message with non authorized car - data models", async () => {
        const response = await clientNotAuthorized.cars.addCar(carModel)

        await expect(response.status, "Status code should be 401").toEqual(401)
        await expect(response.data.message, "Error message should be returned").toEqual("Not authenticated")
    })

    test("should return error message with invalid car brand type - data models", async () => {
        const response = await client.cars.addCar({ ...carModel, carBrandId: "non-existent" })

        await expect(response.status, "Status code should be 400").toEqual(400)
        await expect(response.data.message, "should throw error message").toEqual("Invalid car brand type")
    })

    test.afterAll(async () => {
        const response = await client.cars.getUserCars()
        for (const car of response.data.data) {
            await client.cars.deleteCar(car.id)
        }
    })
})