import React, { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import Layout from "lib/components/Layout"

export default () => {
  const router = useRouter()
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
  })
  let [selected_layout_index, setSelectedLayoutInd] = useState(0)

  if (isLoading) return "loading"
  if (!layouts) return "error no layouts"

  const selected_layout = layouts?.[selected_layout_index]

  return (
    <div>
      <div>
        {layouts.map((layout, i) => (
          <button
            style={{ marginRight: 10 }}
            key={layout.layout_name}
            onClick={() => {
              setSelectedLayoutInd(i)
            }}
          >
            {layout.layout_name}
          </button>
        ))}
      </div>
      {selected_layout && <Layout layout={selected_layout.layout} />}
    </div>
  )
}
