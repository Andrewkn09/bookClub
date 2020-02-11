if (process.env.NODE_ENV !== 'production') {
  require ('dotenv').config
}

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/database.js');

const bcrypt = require("bcrypt")
const passport = require('passport')
const initilizePassport = require('./passport-config.js')
initilizePassport(passport)



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));


app.post('/register', async (req, res) => {
  const {name, email} = req.body;

  try {
    //async fn that hashes password, 2nd arg = how secure
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    db.none(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, 
    [name, email, hashedPassword])

    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
})


app.get('/books', async (req, res) => {

  try {
    const bookList = await db.many(`SELECT * FROM books`);

    res.send({favorites: bookList})

  } catch (err) {

    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/books', async (req, res) => {
  const {title, author, genre} = req.body;

  try {

      const {id: authorKey} = await db.one(`INSERT INTO authors (name) VALUES ($1) RETURNING id`,
          [author]
      ).catch(err => {
        return db.one(`SELECT id FROM authors WHERE name=$1 `, 
          [author])
      })


      const {id: genreKey} = await db.one(`INSERT INTO genres (genre) VALUES ($1) RETURNING id`, [genre])
        .catch(err => {return db.one(`SELECT id from genre WHERE genre=$1`, [genre])
     })

    
      await db.one(`INSERT INTO books (title, author, genre) VALUES ($1, $2, $3)`,
        [title, authorKey, genreKey]
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
