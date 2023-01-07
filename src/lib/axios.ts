import defaultAxios from "axios"

export const getAxios = () => {
  if (
    typeof window !== "undefined" &&
    window.location.origin.includes("localhost")
  ) {
    return defaultAxios.create({
      baseURL: "https://debug.tscircuit.com/",
    })
  }
  return defaultAxios
}
