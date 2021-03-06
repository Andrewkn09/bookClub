const router = require('express').Router();
const { isAuthenticated } = require('../middleware.js');
const {
  getBooks,
  postBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookControllers.js');

router.get('/', isAuthenticated, getBooks);

router.post('/', postBook);

router.put('/', updateBook);

router.delete('/:bookId', deleteBook);
module.exports = router;
