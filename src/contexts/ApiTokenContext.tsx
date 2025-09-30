'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useApiToken } from '@/hooks/useApiToken'

interface ApiTokenContextType {
  isConfigured: boolean
  isValid: boolean | null
  isLoading: boolean
  error: string | null
  token: string | null
  retestToken: () => Promise<void>
}

const ApiTokenContext = createContext<ApiTokenContextType | undefined>(undefined)

interface ApiTokenProviderProps {
  children: ReactNode
}

export const ApiTokenProvider: React.FC<ApiTokenProviderProps> = ({ children }) => {
  const apiTokenState = useApiToken()

  return (
    <ApiTokenContext.Provider value={apiTokenState}>
      {children}
    </ApiTokenContext.Provider>
  )
}

export const useApiTokenContext = () => {
  const context = useContext(ApiTokenContext)
  if (context === undefined) {
    throw new Error('useApiTokenContext must be used within an ApiTokenProvider')
  }
  return context
}

// Optional: Component to display API token status
export const ApiTokenStatus: React.FC = () => {
  const { isConfigured, isValid, isLoading, error, retestToken } = useApiTokenContext()

  if (isLoading) {
    return <div className="text-sm text-gray-500">Checking API token...</div>
  }

  if (!isConfigured) {
    return (
      <div className="text-sm text-red-600">
        ⚠️ API token not configured. Please set NEXT_PUBLIC_API_TOKEN in your environment.
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        ❌ API token error: {error}
        <button 
          onClick={retestToken}
          className="ml-2 text-blue-600 hover:underline"
        >
          Retry
        </button>
      </div>
    )
  }

  if (isValid) {
    return <div className="text-sm text-green-600">✅ API token is valid</div>
  }

  return <div className="text-sm text-yellow-600">⏳ API token status unknown</div>
}
