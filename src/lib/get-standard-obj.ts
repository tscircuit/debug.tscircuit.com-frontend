import type { LayoutObject, StandardObject } from "./types"
import colors from "nice-color-palettes"
import stringHash from "@sindresorhus/string-hash"

export const getStandardObj = (lo: any): StandardObject | null => {
  let {
    x,
    y,
    width,
    height,
  }: { x: number; y: number; width?: number; height?: number } = {
    ...lo,
    ...lo.size,
    ...lo.center,
    ...lo.position,
  }
  const title = lo.text || lo.name || lo.source?.text || lo.source?.name || "?"
  const content = lo

  if (x === undefined || y === undefined) return null

  if (width === undefined) {
    if (lo.outer_diameter) {
      width = lo.outer_diameter
      height = lo.outer_diameter
    }
  }

  if (width === undefined) {
    width = 0.1
    height = 0.1
  }

  return {
    x,
    y,
    width,
    height,
    title,
    content,
    bg_color: colors[stringHash(lo.type || title) % colors.length][4],
  }
}
