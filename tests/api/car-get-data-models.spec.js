import { expect, test } from "@playwright/test"
import APIClient from "../../src/client/APIClient.js"
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js"
import { VALID_MODELS } from "../../src/data/dict/models.js"
import { CAR_MODELS } from "./fixtures/requestCars.js"
import { USERS } from "../../src/data/dict/users.js"

test.describe("Test GET request Cars - data models", () => {
    let clientModel
    let clientNotAuthorized

    const expectedBody = CAR_MODELS.map((carModel) => {
        const brand = VALID_BRANDS_RESPONSE_BODY.data.filter((brand) => brand.id === carModel.carBrandId)[0]
        const model = VALID_MODELS.data.filter((model) => model.id === carModel.carModelId)[0]
        return {
            ...carModel,
            id: expect.any(Number),
            initialMileage: carModel.mileage,
            carCreatedAt: expect.any(String),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }
    })

    test.beforeAll(async () => {
        clientModel = await APIClient.authenticate(undefined, {
            email: USERS.TANYA_MALTSEVA.email,
            password: USERS.TANYA_MALTSEVA.password
        })
        clientNotAuthorized = new APIClient()

        for (const carModel of CAR_MODELS) {
            await clientModel.cars.addCar(carModel)
        }
    })

    test("should get current users cars (GET method) - data models", async () => {
        const response = await clientModel.cars.getUserCars()

        response.data.data.sort((a, b) => a.id - b.id)

        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data.data, "Valid cars should be returned").toEqual(expectedBody)
    })

    test("should throw error message if user is not authorized (GET method) - data models", async () => {
        const response = await clientNotAuthorized.cars.getUserCars()

        await expect(response.status, "Status code should be 401").toEqual(401)
        await expect(response.data.message, "Error message should be returned").toEqual("Not authenticated")
    })

    test("should get current users cars by id (GET method) - data models", async () => {
        const cars = await clientModel.cars.getUserCars()
        cars.data.data.sort((a, b) => a.id - b.id)

        const response = await clientModel.cars.getUserCarById(cars.data.data[0].id)

        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data.data, "Valid car should be returned").toEqual(expectedBody[0])
    })

    test("should throw error message with invalid car id (GET method) - data models", async () => {
        const response = await clientModel.cars.getUserCarById(-77)

        await expect(response.status, "Status code should be 404").toEqual(404)
        await expect(response.data.message, "Error message should be returned").toEqual("Car not found")
    })

    test("should get car brands (GET method) - data models", async () => {
        const response = await clientModel.cars.getBrands()

        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY)
    })

    test("should get car brand by id (GET method) - data models", async () => {
        const response = await clientModel.cars.getBrandById(2)

        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data.data, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY.data[1])
    })

    test("should throw error message with invalid brand (GET method) - data models", async () => {
        const response = await clientModel.cars.getBrandById(0)

        await expect(response.status, "Status code should be 404").toEqual(404)
        await expect(response.data.message, "Error message should be returned").toEqual("No car brands found with this id")
    })

    test("should get car models (GET method) - data models", async () => {
        const response = await clientModel.cars.getModels()

        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data, "Valid brands should be returned").toEqual(VALID_MODELS)
    })

    test("should get car model by id (GET method) - data models", async () => {
        const response = await clientModel.cars.getModelById(45)

        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data.data, "Valid brands should be returned").toEqual(VALID_MODELS.data[21])
    })

    test("should throw error message with invalid model id (GET method) - data models", async () => {
        const response = await clientModel.cars.getModelById(10)

        await expect(response.status, "Status code should be 404").toEqual(404)
        await expect(response.data.message, "Error message should be returned").toEqual("No car models found with this id")
    })

    test.afterAll(async () => {
        const response = await clientModel.cars.getUserCars()
        for (const car of response.data.data) {
            await clientModel.cars.deleteCar(car.id)
        }
    })
})