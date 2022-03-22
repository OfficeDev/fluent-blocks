import { access, open, unlink } from 'fs/promises'
import { zodToTs, printNode, createTypeAlias } from 'zod-to-ts'
import * as modules from '../src'

function capitalize(lowercase: string) {
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}

const out = 'types.d.ts'

async function render() {
  await access(out).then(() => unlink(out))

  const definitions = await open(out, 'w')

  await Promise.all(
    Object.keys(modules).map((moduleName) => {
      // @ts-ignore
      if (modules[moduleName]._def) {
        const identifier = capitalize(moduleName)
        const { node } = zodToTs(
          // @ts-ignore
          modules[moduleName],
          identifier
        )
        return definitions.write(
          `${printNode(createTypeAlias(node, identifier), {})}\n\n`
        )
      } else {
        return Promise.resolve()
      }
    })
  )
}

render()
