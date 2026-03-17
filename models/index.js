// created index.js  >> So all the models can be export at ones

const UserModel = require('./user-model')
const BookModel = require('./book-model');

module.exports = {
    UserModel,
    BookModel 
}

// allowing easier import in another parts
