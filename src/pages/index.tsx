import React from "react"
import { useQuery } from "react-query"

export default () => {
  const { data: { layout_groups } = {}, isLoading } = useQuery({
    queryKey: "layout_groups",
    queryFn: () =>
      fetch("/api/soup_group/list").then(
        (res) =>
          res.json() as Promise<{
            layout_groups: Array<{ layout_group_name: string }>
          }>
      ),
  })

  if (isLoading) return "loading"
  if (!layout_groups) return "error no layout_groups"

  return (
    <div>
      {layout_groups.map((layout_group) => (
        <div key={layout_group.layout_group_name}>
          <a href={`/layout_group/${layout_group.layout_group_name}`}>
            {layout_group.layout_group_name}
          </a>
        </div>
      ))}
    </div>
  )
}
