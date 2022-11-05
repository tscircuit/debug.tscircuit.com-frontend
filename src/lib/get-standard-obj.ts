import type { LayoutObject, StandardObject } from "./types"

export const getStandardObj = (lo: any): StandardObject | null => {
  const {
    x,
    y,
    width = 0.1,
    height = 0.1,
  }: { x: number; y: number; width?: number; height?: number } = {
    ...lo,
    ...lo.size,
    ...lo.center,
  }
  const title = lo.text || lo.name || lo.source?.text || lo.source?.name || "?"
  const content = lo

  if (x === undefined || y === undefined) return null

  return {
    x,
    y,
    width,
    height,
    title,
    content,
  }
}
