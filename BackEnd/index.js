const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());

const Signup = require('./Auth/Signup');
const Signin = require('./Auth/signin');
const Verify = require('./Auth/verify');
const SearchUsers = require('./Friends/searchFriends');
const SendRequest = require('./Friends/sendRequest');


app.get('/', (req, res) => {
    res.send('Hello World!');
  });


  app.put('/signup', Signup);
  app.post('/signin', Signin);
  app.put('/verify', Verify);
  app.post('/search-users', SearchUsers);
  app.post('/add-friend', SendRequest);
  
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });