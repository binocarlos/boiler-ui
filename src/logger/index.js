if (process.env.NODE_ENV === 'production') {
  module.exports = require('./logger.prod')
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./logger.prod') 
} else {
  module.exports = require('./logger.dev')
}