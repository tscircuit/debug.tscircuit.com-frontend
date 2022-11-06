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
import LayoutObject from "./LayoutObject"

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
          .map((obj, i) => (
            <LayoutObject obj={obj} key={i} />
          ))}
      </div>
      <details style={{ marginTop: 20 }}>
        <summary>Layout JSON</summary>
        <pre>{JSON.stringify(layout, null, 2)}</pre>
      </details>
    </div>
  )
}
