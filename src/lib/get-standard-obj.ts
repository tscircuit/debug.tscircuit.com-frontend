import type { LayoutObject, StandardObject } from "./types"
import colors from "nice-color-palettes"
import stringHash from "@sindresorhus/string-hash"
import { U } from "ts-toolbelt"

export const getStandardObj = (
  lo: Partial<U.Merge<LayoutObject>> & LayoutObject
): StandardObject | null => {
  let {
    x,
    y,
    width,
    height,
  }: { x: number; y: number; width?: number; height?: number } = {
    ...lo,
    ...(lo as any).size,
    ...(lo as any).center,
    ...(lo as any).position,
  }
  const title = lo.text || lo.name || lo.source?.text || lo.source?.name || "?"
  const content = lo

  if (x === undefined || y === undefined) return null

  if (width === undefined) {
    if ("outer_diameter" in lo) {
      width = lo.outer_diameter
      height = lo.outer_diameter
    }
  }

  if (width === undefined || height === undefined) {
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
    bg_color: colors[stringHash((lo as any).type || title) % colors.length][4],
  }
}
