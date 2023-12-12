import { faker } from '@faker-js/faker';

const user = {
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
}
console.log(user)

//console.log(faker.internet.email())



