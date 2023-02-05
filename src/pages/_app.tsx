import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
