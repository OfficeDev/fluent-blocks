import * as alea from 'alea'

interface PrngFactory {
  new (seed?: string): () => number
}

const Alea: PrngFactory = alea as unknown as PrngFactory

const prng = new Alea('fuib')

export const randomNumber = prng

export const randomString = (n = 4) =>
  prng()
    .toString(16)
    .slice(2, n + 2)
