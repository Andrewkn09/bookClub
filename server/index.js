const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/database.js');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));


app.get('/test', (req, res) => {
  res.send('hello')
})

app.post('/books', async (req, res) => {
  const {first, middle = null, last} = req.body;
  try {
    const authorKey = await db.one(
      `
      INSERT INTO authors (first, middle, last) VALUES ($1, $2, $3) 
      `,
      [first, middle, last]
      )
      console.log(authorKey)
      res.send('success')
    } catch (err) {
      console.log(err)
      res.send('fail')
  }

    
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}`)
})
