import { StandardObject } from "lib/types"
import { useState } from "react"

export default ({ obj }: { obj: StandardObject }) => {
  const [hovering, setHovering] = useState(false)
  const style: any = {
    position: "absolute",
    backgroundColor: obj.bg_color,
    color: "#fff",
    fontFamily: "sans-serif",
    fontSize: 12,
    textAlign: "center",
    border: "2px solid rgba(0,0,0,0.5)",
  }

  style.left = obj.x
  style.top = obj.y
  style.height = obj.height
  style.width = obj.width

  return [
    <div
      style={style}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <div>{obj.title}</div>
    </div>,
    <div
      style={{
        left: 0,
        top: 0,
        position: "absolute",
        display: hovering ? "block" : "none",
        pointerEvents: "none",
        fontSize: 11,
      }}
    >
      <pre>{JSON.stringify(obj.content, null, 2)}</pre>
    </div>,
  ]
}
