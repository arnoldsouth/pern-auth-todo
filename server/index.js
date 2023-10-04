const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// MIDDLEWARE

app.use(cors());
app.use(express.json());

// ROUTES

app.use('/authentication', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
