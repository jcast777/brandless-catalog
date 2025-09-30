import { publicApi, guitarApi, apiTokenUtils } from './api'

// Test utility to debug API calls
export const testApiConnection = async () => {
  console.log('🔍 Testing API Connection...')
  
  // 1. Check token configuration
  console.log('1. Token Configuration:')
  console.log('   - Token configured:', apiTokenUtils.isConfigured())
  console.log('   - Token value:', apiTokenUtils.getToken()?.substring(0, 10) + '...')
  
  // 2. Test basic API connection
  console.log('\n2. Testing Basic Connection:')
  try {
    const response = await publicApi.get('/health')
    console.log('   ✅ Health check passed:', response.data)
  } catch (error: any) {
    console.log('   ❌ Health check failed:', error.response?.data || error.message)
  }
  
  // 3. Test token validation
  console.log('\n3. Testing Token Validation:')
  try {
    const isValid = await apiTokenUtils.testToken()
    console.log('   - Token valid:', isValid)
  } catch (error: any) {
    console.log('   ❌ Token test failed:', error.response?.data || error.message)
  }
  
  // 4. Test specific endpoints
  console.log('\n4. Testing Specific Endpoints:')
  
  // Test posts endpoint
  try {
    const response = await publicApi.get('/content/posts?per_page=1')
    console.log('   ✅ Posts endpoint:', response.data)
  } catch (error: any) {
    console.log('   ❌ Posts endpoint failed:', error.response?.data || error.message)
  }
  
  // Test categories endpoint
  try {
    const response = await publicApi.get('/content/categories')
    console.log('   ✅ Categories endpoint:', response.data)
  } catch (error: any) {
    console.log('   ❌ Categories endpoint failed:', error.response?.data || error.message)
  }
  
  // Test featured posts
  try {
    const response = await publicApi.get('/content/posts/featured')
    console.log('   ✅ Featured posts endpoint:', response.data)
  } catch (error: any) {
    console.log('   ❌ Featured posts endpoint failed:', error.response?.data || error.message)
  }
  
  // 5. Test guitarApi functions
  console.log('\n5. Testing GuitarApi Functions:')
  
  try {
    const guitars = await guitarApi.getGuitars({ per_page: 1 })
    console.log('   ✅ guitarApi.getGuitars():', guitars)
  } catch (error: any) {
    console.log('   ❌ guitarApi.getGuitars() failed:', error.response?.data || error.message)
  }
  
  try {
    const categories = await guitarApi.getCategories()
    console.log('   ✅ guitarApi.getCategories():', categories)
  } catch (error: any) {
    console.log('   ❌ guitarApi.getCategories() failed:', error.response?.data || error.message)
  }
}

// Quick test function for individual endpoints
export const testEndpoint = async (endpoint: string) => {
  console.log(`🔍 Testing endpoint: ${endpoint}`)
  try {
    const response = await publicApi.get(endpoint)
    console.log('✅ Success:', response.data)
    return response.data
  } catch (error: any) {
    console.log('❌ Failed:', error.response?.data || error.message)
    throw error
  }
}

// Test with different parameters
export const testPostsWithParams = async () => {
  console.log('🔍 Testing posts with different parameters...')
  
  const testCases = [
    { params: {}, description: 'No parameters' },
    { params: { per_page: 5 }, description: 'With per_page' },
    { params: { page: 1, per_page: 3 }, description: 'With pagination' },
    { params: { search: 'guitar' }, description: 'With search' },
  ]
  
  for (const testCase of testCases) {
    try {
      const params = new URLSearchParams()
      Object.entries(testCase.params).forEach(([key, value]) => {
        params.append(key, value.toString())
      })
      
      const endpoint = `/content/posts${params.toString() ? '?' + params.toString() : ''}`
      console.log(`\n📋 ${testCase.description}:`)
      console.log(`   Endpoint: ${endpoint}`)
      
      const response = await publicApi.get(endpoint)
      console.log(`   ✅ Success: ${response.data?.data?.length || 0} items`)
    } catch (error: any) {
      console.log(`   ❌ Failed:`, error.response?.data || error.message)
    }
  }
}
