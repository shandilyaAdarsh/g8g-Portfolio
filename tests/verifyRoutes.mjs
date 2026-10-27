async function testRoutes() {
  const port = process.env.PORT || 3000
  const baseUrl = `http://localhost:${port}`
  const routes = [
    '/api/health',
    '/',
    '/work',
    '/work/nexa-audio-commercial',
    '/services/video-production',
    '/about',
    '/contact',
  ]
  console.log(`Testing live Next.js routes on ${baseUrl}...`)
  for (const r of routes) {
    const res = await fetch(baseUrl + r)
    console.log(`  [HTTP ${res.status}] ${r}`)
  }

  // Test contact API POST valid
  const postRes = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Production Director',
      email: 'director@studio.test',
      service: 'product-demo-video',
      projectOverview: 'Evaluating cinematic 3D product visualization for global launch.',
    }),
  })
  const postJson = await postRes.json()
  console.log(`  [POST /api/contact ${postRes.status}] success=${postJson.success} ref=${postJson.referenceId}`)

  // Test contact API POST spam honeypot
  const spamRes = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Bot User',
      email: 'bot@spam.test',
      honeypot: 'spam-bot-value',
      service: 'product-demo-video',
      projectOverview: 'Spam payload.',
    }),
  })
  console.log(`  [POST /api/contact (honeypot) ${spamRes.status}] (Expected 400)`)
}

testRoutes()
