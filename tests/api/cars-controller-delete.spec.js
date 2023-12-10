import { expect, test } from "@playwright/test"
import {USERS} from "../../src/data/dict/users.js";
import APIClient from "../../src/client/APIClient.js"
import { CAR_MODELS as userCars } from "./fixtures/requestCars.js"

test.describe("Test DELETE request Cars", () => {
    let client
    let cars
    let clientNotAuthorized


    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            email: USERS.TANYA_MALTSEVA.email,
            password: USERS.TANYA_MALTSEVA.password
        })
        clientNotAuthorized = new APIClient()

        for (const userCar of userCars.slice(2)) {
            await client.cars.addCar(userCar)
        }

        cars = await client.cars.getUserCars()
    })

    test("should delete car by id (DELETE method)", async () => {
        const firstCar = cars.data.data[0]
        const response = await client.cars.deleteCar(firstCar.id)

        await expect(response.status, "Status code should be 200").toEqual(200)
        await expect(response.data, "should delete car").toEqual({ data: { carId: firstCar.id }, status: "ok" })
    })

    test("should throw error message if user not authorized (DELETE method)", async () => {
        const secondCar = cars.data.data[1]
        const response = await clientNotAuthorized.cars.deleteCar(secondCar[1])

        await expect(response.status, "Status code should be 401").toEqual(401)
        await expect(response.data.message, "should throw error message").toEqual("Not authenticated")
    })

    test("should throw error message with invalid id (DELETE method)", async () => {
        const response = await client.cars.deleteCar(19)

        await expect(response.status, "Status code should be 404").toEqual(404)
        await expect(response.data.message, "should throw error message").toEqual("Car not found")
    })

    test.afterAll(async () => {
        for (const car of cars.data.data) {
            await client.cars.deleteCar(car.id)
        }
    })
})