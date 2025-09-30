import { useState, useEffect } from 'react'
import { apiTokenUtils } from '@/lib/api'

interface ApiTokenState {
  isConfigured: boolean
  isValid: boolean | null
  isLoading: boolean
  error: string | null
  token: string | null
}

export const useApiToken = () => {
  const [state, setState] = useState<ApiTokenState>({
    isConfigured: false,
    isValid: null,
    isLoading: true,
    error: null,
    token: null
  })

  useEffect(() => {
    const checkToken = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        const token = apiTokenUtils.getToken()
        const isConfigured = apiTokenUtils.isConfigured()

        if (!isConfigured) {
          setState({
            isConfigured: false,
            isValid: false,
            isLoading: false,
            error: 'API token is not configured',
            token: null
          })
          return
        }

        // Test token validity
        const isValid = await apiTokenUtils.testToken()

        setState({
          isConfigured,
          isValid,
          isLoading: false,
          error: isValid ? null : 'API token is invalid or expired',
          token
        })
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }))
      }
    }

    checkToken()
  }, [])

  const retestToken = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const isValid = await apiTokenUtils.testToken()
      setState(prev => ({
        ...prev,
        isValid,
        isLoading: false,
        error: isValid ? null : 'API token is invalid or expired'
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }))
    }
  }

  return {
    ...state,
    retestToken
  }
}
