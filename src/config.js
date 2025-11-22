// API Configuration
// Replace these values with your actual AWS API endpoints and keys

const config = {
  // AWS API Gateway endpoint for washer status
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT || 'https://your-api-gateway-url.amazonaws.com/prod',
  
  // API Key (if required by your API Gateway)
  apiKey: process.env.REACT_APP_API_KEY || '',
  
  // Polling interval for real-time updates (in milliseconds)
  pollingInterval: 30000, // 30 seconds
  
  // Request timeout (in milliseconds)
  requestTimeout: 10000, // 10 seconds
};

export default config;
