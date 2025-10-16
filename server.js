const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Ensure submissions directory exists
const submissionsDir = path.join(__dirname, 'submissions');
if(!fs.existsSync(submissionsDir)) fs.mkdirSync(submissionsDir);

app.post('/submit', (req, res) => {
  const now = Date.now();
  const filename = path.join(submissionsDir, `submission-${now}.json`);
  fs.writeFile(filename, JSON.stringify({ ts: now, body: req.body }, null, 2), (err) => {
    if(err){
      console.error('Failed to write submission', err);
      return res.status(500).json({ ok: false, error: 'Failed to store submission' });
    }
    console.log('Saved submission to', filename);
    res.json({ ok: true });
  });
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
