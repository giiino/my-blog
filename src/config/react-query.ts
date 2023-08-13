import { QueryClientConfig } from '@tanstack/react-query'

export const reactQueryConf: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
}
