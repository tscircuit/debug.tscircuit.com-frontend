import { Soup } from "lib/types"
import { useMeasure } from "react-use"
import { PCBViewer } from "@tscircuit/pcb-viewer"
import { identity, compose, scale, translate } from "transformation-matrix"
import { useMemo, useState } from "react"
import useMouseMatrixTransform from "use-mouse-matrix-transform"

const defaultTransform = compose(translate(400, 300), scale(40, 40))

export default ({ soup }: { soup: Soup }) => {
  const [ref, refDimensions] = useMeasure()
  const [transform, setTransform] = useState(defaultTransform)
  const { ref: transformRef } = useMouseMatrixTransform({
    transform,
    onSetTransform: setTransform,
  })
  return (
    <div ref={transformRef as any}>
      <div ref={ref as any}>
        <PCBViewer
          key={refDimensions.width}
          soup={soup}
          height={window.innerHeight ? window.innerHeight - 100 : 600}
        />
      </div>
    </div>
  )
}
