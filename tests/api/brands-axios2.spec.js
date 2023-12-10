import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import {test} from "../../src/fixtures/test.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js";
import {config} from "../../config/config.js";
import {USERS} from "../../src/data/dict/users.js";
test.describe("API", ()=>{
    let client
    test.beforeAll(async ()=>{
        const jar = new CookieJar();
        client = wrapper(axios.create({
            baseURL: config.apiURL,
            jar,
            validateStatus: status => {
                return status < 501
            }
        }))
        await client.post('/auth/signin', {
            "email": USERS.JOE_DOU.email,
            "password": USERS.JOE_DOU.password,
            "remember": false
        })
    })
    test("should return valid brands", async ()=>{
        const response = await client.get('/cars')
        console.log(response)
        // expect(response.status, "Status code should be 200").toEqual(200)
        // expect(response.data, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY)
    })

    for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
            test(`should return valid models for ${brand.title} brand`, async ()=>{
                const brandId = brand.id
                const response = await client.get(`/cars/models?carBrandId=${brandId}`)
                const body = response.data

                expect(response.status, "Status code should be 200").toEqual(200)
                expect(body, "Valid models should be returned").toEqual(VALID_BRAND_MODELS[brandId])
            })
        }

            test('should create new car axios2', async ()=>{
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