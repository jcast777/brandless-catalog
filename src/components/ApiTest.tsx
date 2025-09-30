'use client'

import { useState } from 'react'
import { guitarApi, apiTokenUtils } from '@/lib/api'
import { testApiConnection, testEndpoint } from '@/lib/api-test'

export default function ApiTest() {
  const [results, setResults] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setLoading(true)
    setResults(prev => prev + `\n🔍 Running ${testName}...\n`)
    
    try {
      const result = await testFn()
      setResults(prev => prev + `✅ ${testName} passed\n${JSON.stringify(result, null, 2)}\n\n`)
    } catch (error: any) {
      setResults(prev => prev + `❌ ${testName} failed\n${error.message}\n${JSON.stringify(error.response?.data, null, 2)}\n\n`)
    }
    
    setLoading(false)
  }

  const runFullTest = async () => {
    setResults('')
    setLoading(true)
    
    // Capture console logs
    const originalLog = console.log
    console.log = (...args) => {
      setResults(prev => prev + args.join(' ') + '\n')
      originalLog(...args)
    }
    
    try {
      await testApiConnection()
    } catch (error) {
      console.log('Test failed:', error)
    }
    
    // Restore console.log
    console.log = originalLog
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={runFullTest}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Run Full Test
          </button>
          
          <button
            onClick={() => runTest('Token Check', () => Promise.resolve({
              configured: apiTokenUtils.isConfigured(),
              token: apiTokenUtils.getToken()?.substring(0, 10) + '...'
            }))}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Check Token
          </button>
          
          <button
            onClick={() => runTest('Health Check', () => testEndpoint('/health'))}
            disabled={loading}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Health Check
          </button>
          
          <button
            onClick={() => runTest('Get Posts', () => guitarApi.getGuitars({ per_page: 3 }))}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Get Posts
          </button>
          
          <button
            onClick={() => runTest('Get Categories', () => guitarApi.getCategories())}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            Get Categories
          </button>
          
          <button
            onClick={() => setResults('')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Test Results:</h2>
        <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-4 rounded border max-h-96 overflow-y-auto">
          {results || 'Click a test button to see results...'}
        </pre>
      </div>
      
      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2">Running test...</span>
        </div>
      )}
    </div>
  )
}
