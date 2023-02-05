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
  const { soup_group_name } = router.query
  const { data: { soups } = {}, isLoading } = useQuery({
    queryKey: ["soup_group", soup_group_name],
    queryFn: () =>
      fetch(`/api/soup_group/get?soup_group_name=${soup_group_name}`).then(
        (res) =>
          res.json() as Promise<{
            soups: Array<{
              soup_id: string
              soup_name: string
              content: any
            }>
          }>
      ),
    refetchInterval: 500,
  })

  if (isLoading) return "loading"
  if (!soups) return "error no soups"

  const selected_layout = soups?.[selected_layout_index]

  return (
    <div>
      <div style={{ display: "flex", paddingBottom: 10 }}>
        {soups.map((content, i) => (
          <button
            disabled={i === selected_layout_index}
            style={{ marginRight: 10 }}
            key={content.soup_name}
            onClick={() => {
              updateHashParams({ selected_layout_index: i })
            }}
          >
            {content.soup_name}
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
            <DebugLayout soup={selected_layout.content} />
          )}
          {selected_engine === "pcb_renderer" && (
            <PCBLayout soup={selected_layout.content} />
          )}
          {selected_engine === "schematic_renderer" && (
            <DebugLayout soup={selected_layout.content} />
          )}
        </>
      )}
    </div>
  )
}
