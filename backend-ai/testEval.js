import http from 'http';

const testCases = [
  "Bought dinner at a restaurant for 2500 rupees",
  "Paid monthly electricity bill",
  "Purchased new shoes from the mall"
];

console.log("Running Backend AI Evaluation Suite...\n");

testCases.forEach((testInput, index) => {
  const data = JSON.stringify({ promptText: testInput });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/ai/analyze',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      console.log(`Test Case ${index + 1}: Input -> "${testInput}"`);
      console.log(`Response:`, JSON.parse(body));
      console.log('-------------------------------------------');
    });
  });

  req.on('error', (error) => {
    console.error(`Test Case ${index + 1} failed:`, error.message);
  });

  req.write(data);
  req.end();
});