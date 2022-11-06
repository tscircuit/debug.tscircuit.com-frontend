/**
 * Generic layout format
 */
export interface Layout {
  objects: LayoutObject[]
}

export type LayoutObject =
  | {
      text?: string
      x: number
      y: number
      width: number
      height: number
    }
  | {
      center: { x: number; y: number }
      size?: { width: number; height: number }
    }
  | {
      position: { x: number; y: number }
      anchor: "left"
      text: string
    }
  | {
      x: number
      y: number
      outer_diameter: number
    }

export type StandardObject = {
  x: number
  y: number
  width: number
  height: number
  bg_color: string
  title: string
  content: Object
}
