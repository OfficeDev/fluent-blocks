import { faker } from '@faker-js/faker'

const boundSeed = faker.seed.bind(faker)

export function seed(value: number) {
  boundSeed(value)
  return null
}

export const fake = faker.fake.bind(faker)

export function fakeTitle() {
  const lowercase = fake('{{lorem.words}}')
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}
