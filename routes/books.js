const express = require("express");

const { books } = require("../data/books.json")
// for issued books 
const { users } = require("../data/users.json")


const router = express.Router()

/*
route : /books
method : get
desc : get all the list of books in the system
access specifier : public
parameters : none

*/
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})
/*
route : /books/:id
method : get
desc : get  the id of books
access specifier : public
parameters : id
*/
router.get('/:id', (req, res) => {

    const { id } = req.params; // to fetch the parameter 
    const book = books.find((each) => each.id === id)

    if (!book) {
        return res.status(404).json({
            success: "false",
            message: `user not found ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book  // to get a specific 
    })
})


/*
route : /books
method : POST
desc : creting the book
access specifier : public
parameters : none
*/

router.post("/", (req, res) => {
    // parameter passing
    const { id, name, author, genre, price, publisher } = req.body;



    if (!id || !name || !author || !genre || !price || !publisher) {
        return res.status(404).json({
            success: "false",
            message: `please provide all the required field`
        })
    }

    const book = books.find((each) => each.id === id)
    if (book) {
        return res.status(489).json({
            success: "false",
            message: "books already exists"
        })
    }

    books.push({
        id, name, author, genre, price, publisher
    })
    res.status(201).json({
        success: "true",
        message: "book created successfully"
    })
    res.end()
})

/*
route : /books/:id
method : PUT
desc : updating books detail 
access specifier : public
parameters : ID
*/

router.put('/:id', (req, res) => {
    const { id } = req.params; // to fetch the parameter 


    //  check if the data is in object  
    if (!data || Object.keys(data).length == 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update"
        })
    }
    const { data } = req.body;  // passing data from req.body

    // check the book exist 
    const book = books.find((each) => each.id === id)

    if (!book) {
        return res.status(404).json({
            success: "false",
            meggase: `book Not found of id : ${id}`
        })
    }

    // if we are getting user then update
    // with spread operator 
    const updateBook = books.map((each) => {
        if (each.id === id) {
            return {
                ...each,  //spread operator --> read the notes 
                ...data,
            }
        }
        return each
    })
    // or use
    // Object.assign(user,data);
    res.status(200).json({
        success: true,
        data: updateBook,
        message: "user updated successfully"
    })
})

/*
route : /books/:id
method :DELETE
desc : DELETING book 
access specifier : public
parameters : ID
*/

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const book = books.find((each) => each.id === id)

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `user not found  ${id}`

        })
    }

    const updateBook = books.filter((each) => each.id !== id)

    // const index = users.indexOf(user);
    // users.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Book  deleted successfully",
        data: updateBook,
    })

})


/*
route : /books/issued/for-users
method :get
desc : get all the issued books  
access specifier : public
parameters : none
*/
//     /books/issued  --> all the books which has been issued 

router.get("/issued/for-users", (req, res) => {
    // const issueBooks = books.filter((each) => each.issued = true);

    const userwithissuedBooks = users.filter((each) => {
        if (each.issuedBook) {
            return each;  // return the p
        }
    })

    const issuedBooks = [];
    userwithissuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book)
    })

    // if no issue book 
    if (!issuedBooks === 0) {
        res.status(404).json({

            success: false,
            message: "no books issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks,
        message: "got the all issued books"
    })
});







module.exports = router;




