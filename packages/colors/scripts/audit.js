const { sRGB_to_luminance } = require('../cjs/lib/csswg')
const { hex_to_sRGB } = require('../cjs/lib/palettes')

const palettes = {
  // These are extracted from @fluentui/react-theme/lib/global/brandColors.js
  brandWeb: {
    10: `#001526`,
    20: `#002848`,
    30: `#043862`,
    40: `#004578`,
    50: `#004c87`,
    60: `#005a9e`,
    70: `#106ebe`,
    80: `#0078d4`,
    90: `#1890f1`,
    100: `#2899f5`,
    110: `#3aa0f3`,
    120: `#6cb8f6`,
    130: `#82c7ff`,
    140: `#c7e0f4`,
    150: `#deecf9`,
    160: `#eff6fc`,
  },
  brandTeams: {
    10: `#2b2b40`,
    20: `#2f2f4a`,
    30: `#333357`,
    40: `#383966`,
    50: `#3d3e78`,
    60: `#444791`,
    70: `#4f52b2`,
    80: `#5b5fc7`,
    90: `#7579eb`,
    100: `#7f85f5`,
    110: `#9299f7`,
    120: `#aab1fa`,
    130: `#b6bcfa`,
    140: `#c5cbfa`,
    150: `#dce0fa`,
    160: `#e8ebfa`,
  },
  brandOffice: {
    10: `#29130b`,
    20: `#4d2415`,
    30: `#792000`,
    40: `#99482b`,
    50: `#a52c00`,
    60: `#c33400`,
    70: `#e06a3f`,
    80: `#d83b01`,
    90: `#dd4f1b`,
    100: `#fe7948`,
    110: `#ff865a`,
    120: `#ff9973`,
    130: `#e8825d`,
    140: `#ffb498`,
    150: `#f4beaa`,
    160: `#f9dcd1`,
  },
}

const acc = new Map()

Object.keys(palettes).forEach((paletteName) => {
  Object.keys(palettes[paletteName]).forEach((tokenName) => {
    const luminance =
      sRGB_to_luminance(hex_to_sRGB(palettes[paletteName][tokenName])) * 100
    if (!acc.has(tokenName)) {
      acc.set(tokenName, [])
    }
    acc.set(tokenName, [...acc.get(tokenName), luminance])
  })
})

const avgs = new Map()
let size = 0
let min = Infinity
let max = -Infinity

acc.forEach((luminances, tokenName) => {
  const avg = luminances.reduce((sum, lum) => sum + lum, 0) / luminances.length
  avgs.set(tokenName, avg)
  size += 1
  min = Math.min(min, avg)
  max = Math.max(max, avg)
})

avgs.forEach((luminance, tokenName) => {
  console.log(`${tokenName}: ${luminance.toFixed(2)}`)
})

console.log(`\nn_shades: ${size}\n`)
console.log(`range: [${min.toFixed(2)}, ${max.toFixed(2)}]`)
