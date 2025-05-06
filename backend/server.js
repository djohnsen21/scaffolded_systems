const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/feedback', async (req, res) => {
  const { goal, preconditions } = req.body;
  // Basic placeholder logic
  res.json({
    feedback: `You entered goal: "${goal}" and ${preconditions.length} preconditions. AI feedback will go here.`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
