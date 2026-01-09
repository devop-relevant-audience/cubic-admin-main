/**
 * API Test Script - Tests all GET endpoints
 * 
 * Usage:
 *   1. Start the dev server: npm run dev
 *   2. In another terminal: node scripts/test-api.js
 * 
 * Options:
 *   node scripts/test-api.js              # Test against localhost:3000
 *   node scripts/test-api.js <base_url>   # Test against custom URL
 */

const BASE_URL = process.argv[2] || 'http://localhost:3001';

// All modules to test
const MODULES = [
  'banner',
  'club',
  'event',
  'eventtag',
  'inquiry',
  'ourclass',
  'seo',
  'service',
  'tag',
  'trainer',
  'trainertag',
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

async function testEndpoint(url, description) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok && data.type === 'S') {
      return { success: true, data, status: response.status };
    } else {
      return { success: false, data, status: response.status, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function printResult(endpoint, result, details = '') {
  const icon = result.success ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
  const status = result.status ? `${colors.dim}[${result.status}]${colors.reset}` : '';
  console.log(`  ${icon} ${endpoint} ${status} ${details}`);
  
  if (!result.success && result.error) {
    console.log(`    ${colors.red}Error: ${result.error}${colors.reset}`);
  }
}

async function testModule(module) {
  console.log(`\n${colors.cyan}Testing /api/${module}${colors.reset}`);
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
  };
  
  // Test: GET / (list all)
  const listResult = await testEndpoint(`${BASE_URL}/api/${module}`);
  results.total++;
  if (listResult.success) {
    results.passed++;
    const pluralKey = Object.keys(listResult.data).find(k => Array.isArray(listResult.data[k]));
    const count = pluralKey ? listResult.data[pluralKey].length : 0;
    printResult(`GET /api/${module}`, listResult, `${colors.dim}(${count} items)${colors.reset}`);
  } else {
    results.failed++;
    printResult(`GET /api/${module}`, listResult);
  }
  
  // Test: GET /one
  const oneResult = await testEndpoint(`${BASE_URL}/api/${module}/one`);
  results.total++;
  if (oneResult.success) {
    results.passed++;
    const singularKey = Object.keys(oneResult.data).find(k => 
      k !== 'type' && k !== 'message' && !Array.isArray(oneResult.data[k])
    );
    const hasData = singularKey && oneResult.data[singularKey] !== null;
    printResult(`GET /api/${module}/one`, oneResult, hasData ? `${colors.dim}(found)${colors.reset}` : `${colors.dim}(empty)${colors.reset}`);
  } else {
    results.failed++;
    printResult(`GET /api/${module}/one`, oneResult);
  }
  
  // Test: GET /count
  const countResult = await testEndpoint(`${BASE_URL}/api/${module}/count`);
  results.total++;
  if (countResult.success) {
    results.passed++;
    printResult(`GET /api/${module}/count`, countResult, `${colors.dim}(${countResult.data.count} total)${colors.reset}`);
  } else {
    results.failed++;
    printResult(`GET /api/${module}/count`, countResult);
  }
  
  // Test: GET /distinct (with a field parameter)
  const distinctResult = await testEndpoint(`${BASE_URL}/api/${module}/distinct?filter=${encodeURIComponent(JSON.stringify({ field: '_id' }))}`);
  results.total++;
  if (distinctResult.success) {
    results.passed++;
    printResult(`GET /api/${module}/distinct`, distinctResult);
  } else {
    results.failed++;
    printResult(`GET /api/${module}/distinct`, distinctResult);
  }
  
  return results;
}

async function testTrainerSpecial() {
  console.log(`\n${colors.cyan}Testing /api/trainer special endpoints${colors.reset}`);
  
  const results = { total: 0, passed: 0, failed: 0 };
  
  // Test: GET /gettag (trainer-specific)
  const gettagResult = await testEndpoint(`${BASE_URL}/api/trainer/gettag`);
  results.total++;
  if (gettagResult.success) {
    results.passed++;
    const tagCount = gettagResult.data.tags?.length || 0;
    printResult(`GET /api/trainer/gettag`, gettagResult, `${colors.dim}(${tagCount} popular tags)${colors.reset}`);
  } else {
    results.failed++;
    printResult(`GET /api/trainer/gettag`, gettagResult);
  }
  
  return results;
}

async function runTests() {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${colors.cyan}API Endpoint Test Suite${colors.reset}`);
  console.log(`Testing against: ${colors.yellow}${BASE_URL}${colors.reset}`);
  console.log(`${'='.repeat(60)}`);
  
  const totalResults = {
    total: 0,
    passed: 0,
    failed: 0,
  };
  
  // Test connectivity first
  console.log(`\n${colors.cyan}Checking connectivity...${colors.reset}`);
  try {
    const healthCheck = await fetch(`${BASE_URL}/api/banner/count`);
    if (!healthCheck.ok) {
      throw new Error(`Server returned ${healthCheck.status}`);
    }
    console.log(`  ${colors.green}✓${colors.reset} Server is reachable`);
  } catch (error) {
    console.log(`  ${colors.red}✗${colors.reset} Cannot connect to server`);
    console.log(`\n${colors.red}Error: ${error.message}${colors.reset}`);
    console.log(`\n${colors.yellow}Make sure the dev server is running:${colors.reset}`);
    console.log(`  cd cubic-admin-main && npm run dev\n`);
    process.exit(1);
  }
  
  // Test all modules
  for (const module of MODULES) {
    const results = await testModule(module);
    totalResults.total += results.total;
    totalResults.passed += results.passed;
    totalResults.failed += results.failed;
  }
  
  // Test trainer special endpoints
  const trainerSpecial = await testTrainerSpecial();
  totalResults.total += trainerSpecial.total;
  totalResults.passed += trainerSpecial.passed;
  totalResults.failed += trainerSpecial.failed;
  
  // Print summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${colors.cyan}Test Summary${colors.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Total:  ${totalResults.total} tests`);
  console.log(`${colors.green}Passed: ${totalResults.passed}${colors.reset}`);
  if (totalResults.failed > 0) {
    console.log(`${colors.red}Failed: ${totalResults.failed}${colors.reset}`);
  }
  
  const passRate = ((totalResults.passed / totalResults.total) * 100).toFixed(1);
  console.log(`\nPass rate: ${passRate}%`);
  
  if (totalResults.failed === 0) {
    console.log(`\n${colors.green}All tests passed! ✓${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}Some tests failed. Check the errors above.${colors.reset}\n`);
  }
  
  process.exit(totalResults.failed > 0 ? 1 : 0);
}

// Run tests
runTests();

