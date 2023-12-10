import { expect, test } from "@playwright/test"
import { CAR_MODELS as userCars } from "./fixtures/requestCars.js"
import {USERS} from "../../src/data/dict/users.js";
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js";
import APIClient from "../../src/client/ApiClient.js";
import CreateCarModel from "../../src/models/cars/CreateCarModel.js";

test.describe("Test PUT Cars request", () => {
    let client
    let clientNotAuthorized
    let cars
    let firstCar

    const brand = VALID_BRANDS_RESPONSE_BODY.data[4]
    const model = VALID_BRAND_MODELS[brand.id].data[2]
    const carModel = new CreateCarModel({
        carBrandId: brand.id,
        carModelId: model.id,
        mileage: 155
    })

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            email: USERS.TANYA_MALTSEVA.email,
            password: USERS.TANYA_MALTSEVA.password
        })
        clientNotAuthorized = new APIClient()
        await client.cars.addCar(userCars[0])
        cars = await client.cars.getUserCars()
        firstCar = cars.data.data[0]
    })

    test("should modify car (PUT method)", async () => {
        const response = await client.cars.modifyUserCar(firstCar.id, carModel)
        const expectedBody = {
            ...carModel,
            id: expect.any(Number),
            initialMileage: userCars[0].mileage,
            carCreatedAt: expect.any(String),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }
        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data.data, "Valid cars should be returned").toEqual(expectedBody)
    })

    test("should throw error message with non authorized car (PUT method)", async () => {
        const response = await clientNotAuthorized.cars.modifyUserCar(firstCar.id, carModel)

        await expect(response.status, "Status code should be 401").toEqual(401)
        await expect(response.data.message, "Error message should be returned").toEqual("Not authenticated")
    })

    test("should throw error message with invalid id (PUT method)", async () => {
        const response = await client.cars.modifyUserCar(-3, carModel)

        await expect(response.status, "Status code should be 404").toEqual(404)
        await expect(response.data.message, "Error message should be returned").toEqual("Car not found")
    })

    test("should throw error message with invalid response body (PUT method)", async () => {
        const response = await client.cars.modifyUserCar(firstCar.id, {
            carBrandId: "non-existent"
        })

        await expect(response.status, "Status code should be 400").toEqual(400)
        await expect(response.data.message, "Error message should be returned").toEqual("No valid fields to edit")
    })

    test.afterAll(async () => {
        for (const car of cars.data.data) {
            await client.cars.deleteCar(car.id)
        }
    })
})