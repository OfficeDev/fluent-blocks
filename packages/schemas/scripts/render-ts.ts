import {access, open, unlink} from 'fs/promises'
import {zodToTs, printNode, createTypeAlias} from "zod-to-ts";
import * as inlineModules from '../src/inlines'

function capitalize(lowercase: string){
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}

const out = 'types.d.ts'

async function render () {

  await access(out).then(function(){return unlink(out)})

  const definitions = await open(out, 'w')

  await Promise.all(Object.keys(inlineModules).map(moduleName=>{
    const identifier = capitalize(moduleName)
    const {node: iconPropsNode} = zodToTs(
      // @ts-ignore
      inlineModules[moduleName],
      identifier,
    )
    definitions.write(
      `${printNode(createTypeAlias(iconPropsNode, identifier))}\n\n`
    )
  }))

}

render()
