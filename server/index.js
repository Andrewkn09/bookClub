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
  const {title, author} = req.body;

  try {
    
    const {id: authorKey} = await db.one(`INSERT INTO authors (name) VALUES ($1) RETURNING id`,
          [author]
      ).catch(err => {
        return db.one(`SELECT id FROM authors WHERE name=$1 `, 
          [author])
      })

      await db.one(`INSERT INTO books (title, author) VALUES ($1,$2)`,
        [title, authorKey]
      )

      res.send('success')
    } catch (err) {

      console.log(err)
      res.sendStatus(500)
  } 
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}`)
})
