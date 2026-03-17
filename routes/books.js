const express = require("express");

// const { books } = require("../data/books.json") // we no need this as we are using database 
const { getAllBooks, getSingleBookByID, getALLIssuedBooks, addNewBook, updateBookById, deleteBookById } = require("../controllers/book-controller");



// for issued books 
const { users } = require("../data/users.json")

// __________________________MONGO DB PART________
const { UserModel , BookModel }  = require("../models/index");  // this is the way we are importing as we have commanly exported user-model.js and book-model.js in models/index.js 



const router = express.Router()

/*
route : /books
method : get
desc : get all the list of books in the system
access specifier : public
parameters : none

*/
// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })
// the upper route after using controllers

router.get('/', getAllBooks)


/*
route : /books/:id
method : get
desc : get  the id of books
access specifier : public
parameters : id
*/
router.get('/:id', getSingleBookByID)


/*
route : /books/issued/for-users
method :get
desc : get all the issued books  
access specifier : public
parameters : none
*/
//     /books/issued  --> all the books which has been issued 
router.get("/issued/for-users", getALLIssuedBooks)


/*
route : /books
method : POST
desc : creting the book
access specifier : public
parameters : none
*/

router.post("/", addNewBook)

/*
route : /books/:id
method : PUT
desc : updating books detail 
access specifier : public
parameters : ID
*/

router.put('/:id', updateBookById)

/*
route : /books/:id
method :DELETE
desc : DELETING book 
access specifier : public
parameters : ID
*/

router.delete("/:id", deleteBookById)






module.exports = router;




