const { dependencies } = require('../package.json')
const { join } = require('path')

const { createWriteStream, access, constants } = require('fs')
const { get } = require('https')

const url = `https://cdn.jsdelivr.net/npm/@fluent-blocks/basic-icons@${
  dependencies['@fluent-blocks/basic-icons'].split(':')[1]
}/basic-icons.svg`
const spritePath = join('.storybook', 'public', 'basic-icons.svg')

access(spritePath, constants.F_OK, (dne) => {
  if (dne) {
    const file = createWriteStream(spritePath)
    get(url, (res) => {
      res.pipe(file)
      file.on('finish', file.close)
    }).on('error', (err) => {
      console.log('Error fetching built sprite: ', err.message)
    })
  }
})
