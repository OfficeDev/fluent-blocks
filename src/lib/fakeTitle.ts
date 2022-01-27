import { fake } from 'faker'

export default function fakeTitle() {
  const lowercase = fake('{{lorem.words}}')
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}
