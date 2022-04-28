import { LAB_to_sRGB, LCH_to_Lab, Lab_to_LCH, snap_into_gamut } from './csswg'
import { Palette, Vec3 } from './types'

function targetLightnessForRange(t: number, range = [0, 100]): number {
  const delta = range[1] - range[0]
  const offset = range[0]
  const line = t * delta + offset
  return Math.max(range[0], Math.min(range[1], line))
}

function paletteShadesFromCurvePoints(
  curvePoints: Vector3[],
  nShades: number,
  range = [0, 100]
): Vec3[] {
  if (curvePoints.length <= 2) {
    return []
  }

  const paletteShades = []

  let c = 0

  for (let i = 0; i < nShades; i++) {
    const l = targetLightnessForRange(i / (nShades - 1), range)

    while (l > curvePoints[c + 1].z) {
      c++
    }

    const a1 = curvePoints[c].x
    const b1 = curvePoints[c].y
    const l1 = curvePoints[c].z

    const a2 = curvePoints[c + 1].x
    const b2 = curvePoints[c + 1].y
    const l2 = curvePoints[c + 1].z

    const u = (l - l1) / (l2 - l1)

    paletteShades[i] = [
      l1 + (l2 - l1) * u,
      a1 + (a2 - a1) * u,
      b1 + (b2 - b1) * u,
    ]
  }

  return paletteShades.map(([l, a, b]) => snap_into_gamut(l, a, b))
}

export function paletteShadesFromCurve(
  curve: CurvedHelixPath,
  nShades = 8,
  curveDepth = 12,
  range = [0, 100]
): Vec3[] {
  const curvePoints = curve
    .getPoints(Math.ceil((curveDepth * (1 + Math.abs(curve.torsion || 1))) / 2))
    .map((curvePoint) => rotatePointHue(curvePoint, curve.torsion, curve.torsionL0)) // getPoints gets a depth of 2 * n + 1
  return paletteShadesFromCurvePoints(curvePoints, nShades, range)
}

export function sRGB_to_hex(rgb: Vec3): string {
  return `#${rgb
    .map((x) => {
      const channel = x < 0 ? 0 : Math.floor(x >= 1.0 ? 255 : x * 256)
      return channel.toString(16).padStart(2, '0')
    })
    .join('')}`
}

export function Lab_to_hex(lab: Vec3): string {
  return sRGB_to_hex(LAB_to_sRGB(lab))
}

export function hex_to_sRGB(hex: string): Vec3 {
  const aRgbHex = hex.match(/#?(..)(..)(..)/)
  return aRgbHex
    ? [
        parseInt(aRgbHex[1], 16) / 255,
        parseInt(aRgbHex[2], 16) / 255,
        parseInt(aRgbHex[3], 16) / 255,
      ]
    : [0, 0, 0]
}

function paletteShadesToHex(paletteShades: Vec3[]): string[] {
  return paletteShades.map(Lab_to_hex)
}

export interface CurvedHelixPath extends CurvePath<Vector3> {
  torsion?: number
  torsionL0?: number
}

function rotatePointHue(point: Vector3, torsion = 0, torsionL0 = 50): Vector3 {
  const t = point.z

  const hueOffset = torsion * (t - torsionL0)

  const [l1, c1, h1] = Lab_to_LCH([point.z, point.x, point.y])
  const [l2, a2, b2] = LCH_to_Lab([l1, c1, h1 + hueOffset])

  point.set(a2, b2, l2)

  return point
}

function getPointOnCurvedHelixPathWithinGamut(
  this: CurvedHelixPath,
  t: number
): Vector3 {
  const point = rotatePointHue(
    CurvePath.prototype.getPoint.call(this, t),
    this.torsion,
    this.torsionL0
  )
  const [l, a, b] = snap_into_gamut(point.z, point.x, point.y)
  point.set(a, b, l)
  return point
}

export function curvePathFromPalette({
  keyColor,
  darkCp,
  lightCp,
  hueTorsion,
}: Palette): CurvedHelixPath {
  const blackPos = new Vector3(0, 0, 0)
  const whitePos = new Vector3(0, 0, 100)
  const [l, a, b] = LCH_to_Lab(keyColor)
  const keyColorPos = new Vector3(a, b, l)

  const curve = new CurvePath<Vector3>() as CurvedHelixPath

  const darkControlPos = new Vector3(
    keyColorPos.x,
    keyColorPos.y,
    keyColorPos.z * (1 - darkCp)
  )

  curve.add(new QuadraticBezierCurve3(blackPos, darkControlPos, keyColorPos))

  const lightControlPos = new Vector3(
    keyColorPos.x,
    keyColorPos.y,
    keyColorPos.z + (100 - keyColorPos.z) * lightCp
  )

  curve.add(new QuadraticBezierCurve3(keyColorPos, lightControlPos, whitePos))

  curve.torsion = hueTorsion
  curve.torsionL0 = l

  curve.getPoint = getPointOnCurvedHelixPathWithinGamut

  return curve
}

export function cssGradientFromCurve(
  curve: CurvedHelixPath,
  nShades = 8,
  curveDepth = 12
) {
  const hexes = paletteShadesToHex(
    paletteShadesFromCurve(curve, curveDepth, nShades)
  )
  return `linear-gradient(to right, ${hexes.join(', ')})`
}
