import {expect, test} from "@playwright/test";
import APIClient from "../../../../src/client/APIClient.js";
import {USERS} from "../../../../src/data/dict/users.js";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../../../src/data/dict/models.js";
import CreateCarModel from "../../../../src/models/cars/CreateCarModel.js";

test.describe('Cars', ()=> {
    let client

    test.beforeAll(async () => {
        client = await APIClient.authenticate({
            "email": USERS.TANYA_MALTSEVA.email,
            "password": USERS.TANYA_MALTSEVA.password,
            "remember": false
        })
    })

    test('should create car with valid data', async()=>{
        const carModel = new CreateCarModel({carBrandId: 1, carModelId: 1, mileage: 22})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
        const model = VALID_BRAND_MODELS[brand.id].data.find((model)=> model.id === carModel.carModelId)
        const response = await client.cars.createCar(carModel)

        const expectedBody = {
            ...carModel,
            initialMileage: carModel.mileage,
            id: expect.any(Number),
            carCreatedAt: expect.any(String),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }
        expect(response.data.data, 'Returned car object should ba valid').toEqual(expectedBody)
    })
})