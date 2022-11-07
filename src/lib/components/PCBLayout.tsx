import { Layout } from "lib/types"
import { useMeasure } from "react-use"
import * as PCBViewer from "@tscircuit/pcb-viewer"
import { identity, compose, scale, translate } from "transformation-matrix"
import { useMemo } from "react"

export default ({ layout }: { layout: Layout }) => {
  const [ref, refDimensions] = useMeasure()
  const transform = useMemo(() => {
    const transform = compose(translate(400, 300), scale(40, 40))
    return transform
  }, [])
  return (
    <div ref={ref as any}>
      <PCBViewer.CanvasElementsRenderer
        key={refDimensions.width}
        elements={layout.objects as any}
        transform={transform}
        height={600}
        width={refDimensions.width}
        grid={{
          spacing: 1,
          view_window: {
            left: 0,
            right: refDimensions.width || 500,
            top: 600,
            bottom: 0,
          },
        }}
      />
    </div>
  )
}
