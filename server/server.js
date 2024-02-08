
const express = require('express');
const cors = require('cors');
const expressApp = express();
const jwt = require('jsonwebtoken');
const { main } = require('./app.js');
const { log } = require('winston');

// Use the CORS middleware
expressApp.use(cors());

const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'user2', password: 'password2' },
];

const SECRET_KEY = 'qwert1234';

expressApp.use(express.json());

const PORT = process.env.PORT || 8080;
expressApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));

expressApp.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});



expressApp.put('/api/user', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    //find the correct user and update the username and password


    res.json({ message: 'Profile updated successfully' });
  } else {
    res.status(400).json({ error: 'Invalid username or password' });
  }
});


expressApp.post('/api/settings', (req, res) => {
  const { cronTime, email } = req.body;
  if (cronTime && email) {
    // Save the cronTime and email to the database
    res.json({ message: 'Settings saved successfully' });
  }
  else {
    res.status(400).json({ error: 'Invalid cronTime or email' });
  }
}
);


expressApp.get('/api/sync', async (req, res) => {
  try {

    let data = await main();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
