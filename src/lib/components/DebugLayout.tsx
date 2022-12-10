import { applyTransform } from "lib/apply-transform"
import { getStandardObj } from "lib/get-standard-obj"
import { Layout } from "lib/types"
import { useEffect, useRef, useState } from "react"
import {
  Matrix,
  identity,
  scale,
  translate,
  compose,
  flipY,
} from "transformation-matrix"
import LayoutObject from "./LayoutObject"

type Point = { x: number; y: number }

const defaultTransform = compose(
  identity(),
  // flipY(),
  translate(400, 300),
  scale(40, 40)
)

/**
 * Type order, if earlier renders ABOVE later elements, meaning things at the
 * beginning are stacked on top of things at the end.
 */
const TYPE_ORDER = ["default", "schematic_box", "schematic_line"]
const DEFAULT_TYPE_IND = TYPE_ORDER.indexOf("default")
const getTypeInd = (type: string) => {
  const ind = TYPE_ORDER.indexOf(type)
  if (ind === -1) return DEFAULT_TYPE_IND
  return ind
}

export default ({ layout }: { layout: Layout }) => {
  const [transform, setTransform] = useState<Matrix>(defaultTransform)
  const canvasElm = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasElm.current) return
    const elm = canvasElm.current
    let init_tf = transform

    let m0: Point = { x: 0, y: 0 },
      m1: Point = { x: 0, y: 0 },
      md = false

    const getMousePos = (e: MouseEvent) => {
      const rect = elm.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    function handleMouseDown(e: MouseEvent) {
      m0 = getMousePos(e)
      md = true
      e.preventDefault()
    }
    function handleMouseUp(e: MouseEvent) {
      m1 = getMousePos(e)

      const new_tf = compose(translate(m1.x - m0.x, m1.y - m0.y), init_tf)
      setTransform(new_tf)
      init_tf = new_tf

      md = false
    }
    function handleMouseMove(e: MouseEvent) {
      if (!md) return
      m1 = getMousePos(e)

      setTransform(compose(translate(m1.x - m0.x, m1.y - m0.y), init_tf))
    }
    function handleMouseWheel(e: WheelEvent) {
      const center = getMousePos(e)
      const new_tf = compose(
        translate(center.x, center.y),
        scale(1 - e.deltaY / 1000, 1 - e.deltaY / 1000),
        translate(-center.x, -center.y),
        init_tf
      )
      setTransform(new_tf)
      init_tf = new_tf
      e.preventDefault()
    }
    function handleMouseOut(e: MouseEvent) {
      if (!md) return
      md = false
      m1 = getMousePos(e)

      const new_tf = compose(translate(m1.x - m0.x, m1.y - m0.y), init_tf)
      setTransform(new_tf)
      init_tf = new_tf
    }

    elm.addEventListener("mousedown", handleMouseDown)
    elm.addEventListener("mouseup", handleMouseUp)
    elm.addEventListener("mousemove", handleMouseMove)
    elm.addEventListener("mouseout", handleMouseOut)
    elm.addEventListener("wheel", handleMouseWheel)

    return () => {
      elm.removeEventListener("mousedown", handleMouseDown)
      elm.removeEventListener("mouseup", handleMouseUp)
      elm.removeEventListener("mousemove", handleMouseMove)
      elm.removeEventListener("mouseout", handleMouseOut)
      elm.removeEventListener("wheel", handleMouseWheel)
    }
  }, [canvasElm.current])

  const layout_objects = [...layout.objects]

  // order based on type order
  layout_objects.sort((a, b) => {
    const ai = getTypeInd(a.type)
    const bi = getTypeInd(b.type)
    return ai > bi ? -1 : ai === bi ? 0 : 1
  })

  return (
    <div>
      <div
        ref={canvasElm}
        style={{
          position: "relative",
          backgroundColor: "#eee",
          height: 600,
          overflow: "hidden",
        }}
      >
        {layout_objects
          .map((obj) => getStandardObj(obj))
          .map((obj, i) => {
            if (!obj)
              return null

              // generate key prior to transform
            ;(obj as any).key = `${i}_${JSON.stringify(obj)}`
            return obj
          })
          .filter(Boolean)
          .map((obj) => applyTransform(obj as any, transform))
          .map((obj, i) => (
            <LayoutObject obj={obj} key={(obj as any).key} />
          ))}
      </div>
      <details style={{ marginTop: 20 }}>
        <summary>Layout JSON</summary>
        <pre>{JSON.stringify(layout, null, 2)}</pre>
      </details>
    </div>
  )
}
