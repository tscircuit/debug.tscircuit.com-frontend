import { useState } from "react"

export const useHashParams = <T extends Object>(
  defaults: T,
): [T, (m: Partial<T>) => void] => {
  if (typeof window === "undefined") {
    return [defaults, () => {}]
  }

  const [updateIndex, triggerUpdate] = useState(0)
  let current_hash_obj: any
  try {
    current_hash_obj = {
      ...defaults,
      ...JSON.parse(decodeURIComponent(window.location.hash).slice(1)),
    }
  } catch (e) {
    current_hash_obj = defaults
  }

  return [
    current_hash_obj,
    (mergeObj: Partial<T>) => {
      window.location.hash = encodeURIComponent(
        JSON.stringify({
          ...current_hash_obj,
          ...mergeObj,
        }),
      )
      triggerUpdate(updateIndex + 1)
    },
  ]
}
