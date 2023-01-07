import { getAxios } from "lib/axios"
import React from "react"
import { useQuery } from "react-query"

export default () => {
  const { data: { soup_groups } = {}, isLoading } = useQuery({
    queryKey: "soup_group.list",
    queryFn: () =>
      getAxios()
        .get("/api/soup_group/list")
        .then((r) => r.data),
  })

  if (isLoading) return "loading"
  if (!soup_groups) return "error no soup_groups"

  return (
    <div>
      {soup_groups.map((soup_group: any) => (
        <div key={soup_group.soup_group_name}>
          <a href={`/soup_group/${soup_group.soup_group_name}`}>
            {soup_group.soup_group_name}
          </a>
        </div>
      ))}
    </div>
  )
}
