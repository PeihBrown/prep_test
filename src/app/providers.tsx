'use client'

import { ReactNode, memo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type ProvidersProps = {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export const Providers = memo(({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
})

Providers.displayName = 'Providers' 