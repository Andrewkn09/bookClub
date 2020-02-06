const pgp = require('pg-promise');
const config = require('../config/config.js');

const db = pgp(config.pgURI)

module.exports = db