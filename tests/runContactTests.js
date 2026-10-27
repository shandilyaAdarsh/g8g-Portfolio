/**
 * Automated Test Suite for G8G Media Contact & Lead Conversion System (Phase 4)
 * Validates Section 11 requirements:
 * 1. Valid form submission.
 * 2. Missing required fields.
 * 3. Invalid email format.
 * 4. Invalid service values.
 * 5. Oversized request body (>50 KB).
 * 6. Invalid website URL format.
 * 7. Honeypot spam trap rejection.
 * 8. Rate limiting enforcement.
 * 9. Contact context query parameter mapping.
 */

import { EventEmitter } from 'events'
import {
  handleContactRequest,
  resetRateLimitStore,
} from '../server/contactHandler.ts'
import { mapQueryToService } from '../src/schemas/contact.ts'

// Helper to simulate Node.js IncomingMessage
function createMockRequest({
  method = 'POST',
  url = '/api/contact',
  body = {},
  rawBody = null,
  ip = '127.0.0.1',
  headers = {},
}) {
  const req = new EventEmitter()
  req.method = method
  req.url = url
  req.socket = { remoteAddress: ip }
  req.headers = {
    'content-type': 'application/json',
    ...headers,
  }

  // Stream data asynchronously
  process.nextTick(() => {
    const payload = rawBody !== null ? rawBody : JSON.stringify(body)
    req.emit('data', Buffer.from(payload))
    req.emit('end')
  })

  return req
}

// Helper to simulate Node.js ServerResponse
function createMockResponse() {
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(key, val) {
      this.headers[key.toLowerCase()] = val
    },
    writeHead(status, headers = {}) {
      this.statusCode = status
      Object.entries(headers).forEach(([k, v]) => this.setHeader(k, v))
    },
    end(chunk = '') {
      this.body = chunk.toString()
      this.emit?.('finish')
    },
    getJson() {
      try {
        return JSON.parse(this.body)
      } catch {
        return null
      }
    },
  }
  return res
}

async function runTests() {
  console.log('\n======================================================')
  console.log('   G8G MEDIA PHASE 4 — AUTOMATED TEST SUITE')
  console.log('======================================================\n')

  let passed = 0
  let failed = 0

  function assert(condition, testName) {
    if (condition) {
      console.log(`  [PASS] ${testName}`)
      passed++
    } else {
      console.error(`  [FAIL] ${testName}`)
      failed++
    }
  }

  // Reset rate limits before testing
  resetRateLimitStore()

  // 1. Valid Form Submission
  {
    const req = createMockRequest({
      ip: '10.0.0.1',
      body: {
        fullName: 'Alexander Vance',
        email: 'alex@lumina.design',
        service: 'product-demo-video',
        projectOverview: 'We require a 60-second spatial product film for our upcoming hardware release.',
        companyName: 'Lumina Design Lab',
        websiteUrl: 'https://lumina.design',
        region: 'North America',
        budget: '10000-plus',
        timeline: '1-3-months',
        contactMethod: 'email',
      },
    })
    const res = createMockResponse()
    await handleContactRequest(req, res)
    const data = res.getJson()

    assert(res.statusCode === 200, 'Test 1.1: Valid submission returns HTTP 200')
    assert(data?.success === true, 'Test 1.2: Valid submission returns success=true')
    assert(data?.referenceId?.startsWith('G8G-INQ-'), 'Test 1.3: Safe reference ID generated')
    assert(data?.status === 'accepted' || data?.status === 'delivered', 'Test 1.4: Legitimate status returned')
  }

  // 2. Missing Required Fields
  {
    const req = createMockRequest({
      ip: '10.0.0.2',
      body: {
        fullName: '',
        email: '',
        service: 'invalid-service',
        projectOverview: 'Short',
      },
    })
    const res = createMockResponse()
    await handleContactRequest(req, res)
    const data = res.getJson()

    assert(res.statusCode === 422, 'Test 2.1: Missing required fields returns HTTP 422')
    assert(data?.success === false, 'Test 2.2: Returns success=false')
    assert(!!data?.fieldErrors?.fullName, 'Test 2.3: Flags fullName error')
    assert(!!data?.fieldErrors?.email, 'Test 2.4: Flags email error')
    assert(!!data?.fieldErrors?.projectOverview, 'Test 2.5: Flags projectOverview error')
  }

  // 3. Invalid Email Format
  {
    const req = createMockRequest({
      ip: '10.0.0.3',
      body: {
        fullName: 'Jordan Bell',
        email: 'not-an-email-address',
        service: 'explainer-video',
        projectOverview: 'A technical explainer video for our distributed consensus architecture.',
      },
    })
    const res = createMockResponse()
    await handleContactRequest(req, res)
    const data = res.getJson()

    assert(res.statusCode === 422, 'Test 3.1: Invalid email returns HTTP 422')
    assert(!!data?.fieldErrors?.email, 'Test 3.2: Rejects malformed email string')
  }

  // 4. Invalid Service Value
  {
    const req = createMockRequest({
      ip: '10.0.0.4',
      body: {
        fullName: 'Elena Rostova',
        email: 'elena@brand.com',
        service: 'unsupported-service-category',
        projectOverview: 'Looking for general creative production services.',
      },
    })
    const res = createMockResponse()
    await handleContactRequest(req, res)
    const data = res.getJson()

    assert(res.statusCode === 422, 'Test 4.1: Unknown service option returns HTTP 422')
    assert(!!data?.fieldErrors?.service, 'Test 4.2: Flags invalid service field error')
  }

  // 5. Oversized Request Body (>50 KB)
  {
    const giantString = 'A'.repeat(60 * 1024) // 60 KB
    const req = createMockRequest({
      ip: '10.0.0.5',
      rawBody: JSON.stringify({
        fullName: 'Bot User',
        email: 'bot@spam.com',
        service: 'product-demo-video',
        projectOverview: giantString,
      }),
    })
    const res = createMockResponse()
    await handleContactRequest(req, res)
    const data = res.getJson()

    assert(res.statusCode === 413, 'Test 5.1: Request exceeding 50 KB returns HTTP 413 Payload Too Large')
    assert(data?.error?.includes('too large'), 'Test 5.2: Returns explicit size rejection error')
  }

  // 6. Invalid Website URL
  {
    const req = createMockRequest({
      ip: '10.0.0.6',
      body: {
        fullName: 'Marcus Shaw',
        email: 'marcus@corp.com',
        service: 'brand-film',
        websiteUrl: 'not_a_valid_url_at_all',
        projectOverview: 'A brand film celebrating our 10-year company founding milestone.',
      },
    })
    const res = createMockResponse()
    await handleContactRequest(req, res)
    const data = res.getJson()

    assert(res.statusCode === 422, 'Test 6.1: Invalid website URL returns HTTP 422')
    assert(!!data?.fieldErrors?.websiteUrl, 'Test 6.2: Flags websiteUrl format error')
  }

  // 7. Honeypot Spam Trap
  {
    const req = createMockRequest({
      ip: '10.0.0.7',
      body: {
        fullName: 'Spam Bot 3000',
        email: 'spammer@botnet.xyz',
        service: 'commercials',
        projectOverview: 'Buy our fake products right now.',
        honeypot: 'Automated spam payload filling hidden field',
      },
    })
    const res = createMockResponse()
    await handleContactRequest(req, res)
    const data = res.getJson()

    assert(res.statusCode === 400, 'Test 7.1: Honeypot trap triggers HTTP 400 rejection')
    assert(data?.error?.includes('spam'), 'Test 7.2: Rejection message cites spam filter')
  }

  // 8. Rate Limiting Enforcement (Max 5 requests per 15 mins)
  {
    const testIp = '192.168.100.99'
    let rateLimited = false

    for (let i = 0; i < 6; i++) {
      const req = createMockRequest({
        ip: testIp,
        body: {
          fullName: `Requester ${i}`,
          email: `requester${i}@example.com`,
          service: 'product-demo-video',
          projectOverview: 'Rapid sequential submissions to test rate limiter.',
        },
      })
      const res = createMockResponse()
      await handleContactRequest(req, res)

      if (res.statusCode === 429) {
        rateLimited = true
      }
    }

    assert(rateLimited, 'Test 8.1: Rate limiting triggers HTTP 429 after 5 requests from same IP')
  }

  // 9. Contact Context Query Parameter Mapping
  {
    assert(mapQueryToService('product-demo-video') === 'product-demo-video', 'Test 9.1: Maps product-demo-video')
    assert(mapQueryToService('product-demos') === 'product-demo-video', 'Test 9.2: Maps product-demos alias')
    assert(mapQueryToService('explainers') === 'explainer-video', 'Test 9.3: Maps explainers alias')
    assert(mapQueryToService('commercials') === 'promotional-advertising', 'Test 9.4: Maps commercials alias')
    assert(mapQueryToService('advertising') === 'promotional-advertising', 'Test 9.5: Maps advertising alias')
    assert(mapQueryToService('product-launch') === 'product-launch-video', 'Test 9.6: Maps product-launch alias')
    assert(mapQueryToService('brand-films') === 'brand-film', 'Test 9.7: Maps brand-films alias')
    assert(mapQueryToService('unknown-random-query') === undefined, 'Test 9.8: Rejects unknown query string')
  }

  console.log('\n------------------------------------------------------')
  console.log(`Results: ${passed} passed, ${failed} failed`)
  console.log('======================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Test execution failed with error:', err)
  process.exit(1)
})
