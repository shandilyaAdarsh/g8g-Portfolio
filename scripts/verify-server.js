const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('HTML Length:', data.length);
    console.log('Contains Your Video Production Partner:', data.includes('Your Video'));
    console.log('Contains Animation:', data.includes('Animation'));
    console.log('Contains Lumière Skincare:', data.includes('Lumière Skincare'));
    console.log('Contains Our Studio:', data.includes('Our Studio'));
    console.log('Contains Ready to make a video:', data.includes('Ready to make a video'));

    const cssMatches = [...data.matchAll(/href="([^"]+\.css)"/g)];
    console.log('Found CSS links:', cssMatches.length);
    for (const match of cssMatches) {
      const url = match[1];
      console.log('Checking CSS:', url);
      http.get('http://localhost:3000' + url, (cssRes) => {
        let cssData = '';
        cssRes.on('data', c => cssData += c);
        cssRes.on('end', () => {
          console.log(`CSS ${url} -> Status: ${cssRes.statusCode}, Bytes: ${cssData.length}`);
        });
      });
    }

    const imgMatches = [...data.matchAll(/src="([^"]+\.(?:png|jpg|svg))"/g)];
    console.log('Found images:', imgMatches.length);
    for (const match of imgMatches.slice(0, 10)) {
      const url = match[1];
      http.get('http://localhost:3000' + url, (imgRes) => {
        console.log(`IMG ${url} -> Status: ${imgRes.statusCode}`);
      });
    }
  });
}).on('error', err => console.error('Request error:', err.message));
