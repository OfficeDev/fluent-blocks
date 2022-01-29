import Faker from 'faker'

export default function fakeTitle(fake: Faker.FakerStatic['fake']) {
  const lowercase = fake('{{lorem.words}}')
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}
