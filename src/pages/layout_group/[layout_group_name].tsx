import React, { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import DebugLayout from "lib/components/DebugLayout"
import { useHashParams } from "lib/hooks/use-hash-params"
import PCBLayout from "lib/components/PCBLayout"

const ENGINES = ["debug_renderer", "pcb_renderer", "schematic_renderer"]

export default () => {
  const router = useRouter()

  const [{ selected_engine, selected_layout_index }, updateHashParams] =
    useHashParams({
      selected_engine: "debug_renderer",
      selected_layout_index: 0,
    })
  const { layout_group_name } = router.query
  const { data: { layouts } = {}, isLoading } = useQuery({
    queryKey: ["layout_group", layout_group_name],
    queryFn: () =>
      fetch(`/api/layout/list?layout_group_name=${layout_group_name}`).then(
        (res) =>
          res.json() as Promise<{
            layouts: Array<{
              layout_group_name: string
              layout_name: string
              layout: any
            }>
          }>
      ),
    refetchInterval: 500,
  })

  if (isLoading) return "loading"
  if (!layouts) return "error no layouts"

  const selected_layout = layouts?.[selected_layout_index]

  return (
    <div>
      <div style={{ display: "flex", paddingBottom: 10 }}>
        {layouts.map((layout, i) => (
          <button
            disabled={i === selected_layout_index}
            style={{ marginRight: 10 }}
            key={layout.layout_name}
            onClick={() => {
              updateHashParams({ selected_layout_index: i })
            }}
          >
            {layout.layout_name}
          </button>
        ))}
        <div style={{ flexGrow: 1 }}></div>
        {ENGINES.map((engine) => (
          <button
            style={{ marginLeft: 10 }}
            disabled={engine === selected_engine}
            key={engine}
            onClick={() => {
              updateHashParams({ selected_engine: engine })
            }}
          >
            {engine}
          </button>
        ))}
      </div>
      {selected_layout && (
        <>
          {selected_engine === "debug_renderer" && (
            <DebugLayout layout={selected_layout.layout} />
          )}
          {selected_engine === "pcb_renderer" && (
            <PCBLayout layout={selected_layout.layout} />
          )}
          {selected_engine === "schematic_renderer" && (
            <DebugLayout layout={selected_layout.layout} />
          )}
        </>
      )}
    </div>
  )
}
