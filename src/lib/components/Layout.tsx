import { applyTransform } from "lib/apply-transform"
import { getStandardObj } from "lib/get-standard-obj"
import { Layout } from "lib/types"
import { useState } from "react"
import {
  Matrix,
  identity,
  scale,
  translate,
  compose,
  flipY,
} from "transformation-matrix"

const defaultTransform = compose(
  identity(),
  // flipY(),
  translate(400, 300),
  scale(100, 100)
)

export default ({ layout }: { layout: Layout }) => {
  const [transform, setTransform] = useState<Matrix>(defaultTransform)
  return (
    <div>
      <div
        style={{ position: "relative", backgroundColor: "#eee", height: 600 }}
      >
        {layout.objects
          .map((obj) => getStandardObj(obj))
          .filter(Boolean)
          .map((obj) => applyTransform(obj as any, transform))
          .map((obj, i) => {
            const style: any = {
              position: "absolute",
              backgroundColor: "#f00",
              color: "#fff",
              fontFamily: "sans-serif",
              fontSize: 12,
              textAlign: "center",
            }

            style.left = obj.x
            style.top = obj.y
            style.height = obj.height
            style.width = obj.width

            return (
              <div key={i} style={style}>
                {obj.title}
              </div>
              // <pre>{JSON.stringify(obj, null, 2)}</pre>
            )
          })}
      </div>
      <details style={{ marginTop: 20 }}>
        <summary>Layout JSON</summary>
        <pre>{JSON.stringify(layout, null, 2)}</pre>
      </details>
    </div>
  )
}
