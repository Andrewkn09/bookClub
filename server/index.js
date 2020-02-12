if (process.env.NODE_ENV !== 'production') {
  require ('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/database.js');

const cookieSession = require('cookie-session')
const passport = require('passport')
//initialize passport config
require('./passport-config.js')()

const authRoutes = require('./routes/authRoutes.js')
const {isAuthenticated} = require('./middleware.js')


// const session = require('express-session')
// app.use(session({
//   //key that is kept secret that encrypts information, want to be random
//   secret:process.env.SESSION_SECRET,
//   //should we resave session variables if nothing is changed
//   resave: false,
//   //do you want to save empty value in session if there's no value
//   saveUninitialized: false
// }))

//persist session on refresh
app.use(
  cookieSession({
    name: 'bookSession',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET]
  })
)

//sets up passport config
// initilizePassport()
//passport fn that sets up basics need to start
app.use(passport.initialize())
//works with app.use session, store variables to be persisted across entire session
app.use(passport.session())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use('/', authRoutes)

app.get('/books', isAuthenticated, async (req, res) => {
  console.log(req.user)
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/'))
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}`)
})
