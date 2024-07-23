import React, { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import DebugLayout from "lib/components/DebugLayout"
import { useHashParams } from "lib/hooks/use-hash-params"
import PCBLayout from "lib/components/PCBLayout"
import { Schematic } from "@tscircuit/schematic-viewer"
import * as builder from "@tscircuit/builder"
import { SoupTableViewer } from "@tscircuit/table-viewer"
import { CadViewer } from "@tscircuit/3d-viewer"
import "react-data-grid/lib/styles.css"
import { ErrorBoundary } from "react-error-boundary"

const ENGINES = ["debug_sch", "debug_pcb", "pcb", "schematic", "3d", "table"]

export default () => {
  const router = useRouter()

  const [{ selected_engine, selected_layout_index }, updateHashParams] =
    useHashParams({
      selected_engine: "debug_sch",
      selected_layout_index: 0,
    })
  const { soup_group_name } = router.query
  const {
    data: { soups } = {},
    isLoading,
  } = useQuery({
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
          }>,
      ),
    refetchInterval: 500,
  })

  if (isLoading) return "loading"
  if (!soups) return "error no soups"

  const selected_layout = soups?.[selected_layout_index]

  return (
    <div>
      <div
        style={{
          display: "flex",
          paddingBottom: 10,
        }}
      >
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
        <button
          onClick={() => {
            const copyText = selected_layout.content
            navigator.clipboard.writeText(JSON.stringify(copyText, null, 2))
          }}
        >
          Copy Current Soup
        </button>
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
          {selected_engine === "debug_sch" && (
            <DebugLayout
              soup={
                selected_layout.content?.elements?.filter(
                  (elm) =>
                    !elm?.type?.startsWith("pcb_") &&
                    !elm?.type?.startsWith("cad_"),
                ) ?? []
              }
            />
          )}
          {selected_engine === "debug_pcb" && (
            <DebugLayout
              soup={
                selected_layout.content?.elements?.filter(
                  (elm) =>
                    !elm?.type?.startsWith("schematic_") &&
                    !elm?.type?.startsWith("cad_"),
                ) ?? []
              }
            />
          )}
          {selected_engine === "pcb" && (
            <PCBLayout soup={selected_layout.content?.elements} />
          )}
          {selected_engine === "schematic" && (
            <Schematic
              style={{ height: 500 }}
              soup={selected_layout.content.elements}
            />
          )}
          {selected_engine === "3d" && (
            <ErrorBoundary
              fallbackRender={(props) => (
                <div>
                  <h1>Something went wrong rendering 3d viewer</h1>
                  <pre>{props.error.message}</pre>
                </div>
              )}
            >
              <div
                style={{
                  height: window.innerHeight ? window.innerHeight - 30 : 600,
                }}
              >
                <CadViewer soup={selected_layout.content.elements} />
              </div>
            </ErrorBoundary>
          )}
          {selected_engine === "table" && (
            <div>
              <SoupTableViewer
                elements={selected_layout.content.elements as any}
                height={
                  typeof window !== "undefined" ? window.innerHeight - 50 : 800
                }
                appearance="dark"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
