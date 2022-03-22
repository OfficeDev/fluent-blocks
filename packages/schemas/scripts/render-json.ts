#!/usr/bin/env ts-node

import fs from 'fs/promises'
import path from 'path'

import zodToJsonSchema from 'zod-to-json-schema'

import { schemas } from '../src'

const dir = path.join(process.cwd(), 'json')

fs.rm(dir, { recursive: true, force: true }).then(() =>
  fs.mkdir(dir, { recursive: true }).then(() =>
    Promise.all(
      Object.keys(schemas).map((schemaName) => {
        if (schemas.hasOwnProperty(schemaName)) {
          // console.log(`Writing ${schemaName}`)
          return fs.writeFile(
            path.join(dir, `${schemaName}.json`),
            JSON.stringify(
              zodToJsonSchema(schemas[schemaName], schemaName),
              null,
              2
            )
          )
        } else {
          return Promise.resolve()
        }
      })
    )
  )
)
