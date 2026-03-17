//  we need models in the controller 
const { BookModel, UserModel } = require("../models");

// a dto is needed 
const IssuedBook = require("../dtos/book-dto");

// const getBooks =( ) => {

// }
// module.export = getBooks

// first api >> go and call this method in books.js at route (make sure this file is imported there )  >> because logic is written here 

// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })     >> here we was  using books.json data but now we have database 

exports.getAllBooks = async (req, res) => {
    //  call the books from database   >> Booksmodel table should be called here 
    const books = await BookModel.find() // it will find all those entries which are in books 

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no books in the system"
        })
    }
    res.status(200).json({
        success: true,
        data: books
    })
}


// (req, res) => {

//     const { id } = req.params; // to fetch the parameter 
//     const book = books.find((each) => each.id === id)

//     if (!book) {
//         return res.status(404).json({
//             success: "false",
//             message: `user not found ${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: book  // to get a specific 
//     })
// }

exports.getSingleBookByID = async (req, res) => {

    const { id } = req.params;
    //  we dont need to iterate to find the id 
    const book = await BookModel.findById(id)
    if (!book) {
        return res.status(404).json({
            success: false,
            message: `user not found ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: book  // to get a specific 
    })
}

// router.get("/issued/for-users", (req, res) => {
//     // const issueBooks = books.filter((each) => each.issued = true);

//     const userwithissuedBooks = users.filter((each) => {
//         if (each.issuedBook) {
//             return each;  // return the p
//         }
//     })

//     const issuedBooks = [];
//     userwithissuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedBook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book)
//     })

//     // if no issue book 
//     if (!issuedBooks === 0) {
//         res.status(404).json({

//             success: false,
//             message: "no books issued yet"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks,
//         message: "got the all issued books"
//     })
// });



// here the dto used (we have the dto for the bookModel)
exports.getALLIssuedBooks = async (req, res) => {
    // we need all the users who ever had the issued book 
    const users = await UserModel.find({   /// here we will get the users array which has issued book 
        issuedBook: { $exists: true }
        // or if you want to find a column have the value then do this 
        // category : "OBC"
    }).populate('issuedBook')


    //  all issued books here  (use the dto here )
    const issuedBooks = users.map((each) => {
        return new IssuedBook(each);  // all the users with issuedBook 
    })

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no books issued yet"
        })
    }
    res.status(200).json({
        success: true,
        data: issuedBooks
    })

}


// POST


// (req, res) => {
//     // parameter passing
//     const { id, name, author, genre, price, publisher } = req.body;



//     if (!id || !name || !author || !genre || !price || !publisher) {
//         return res.status(404).json({
//             success: "false",
//             message: `please provide all the required field`
//         })
//     }

//     const book = books.find((each) => each.id === id)
//     if (book) {
//         return res.status(489).json({
//             success: "false",
//             message: "books already exists"
//         })
//     }

//     books.push({
//         id, name, author, genre, price, publisher
//     })
//     res.status(201).json({
//         success: "true",
//         message: "book created successfully"
//     })
//     res.end()

exports.addNewBook = async (req, res) => {

    const { data } = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book "
        })
    }

    // await BooksModel.create(data);
    // res.status(201).json({
    //     success: true,
    //     message: "Book Added SuccessFully",
    //     data: data
    // })

    // 2nd way
    await BookModel.create(data);

    res.status(201).json({
        success: true,
        message: "Book Added Successfully",
        data: data
    });
}


//  PUT operation 


// (req, res) => {
//     const { id } = req.params; // to fetch the parameter 

//     const { data } = req.body;  // passing data from req.body
//     //  check if the data is in object  
//     if (!data || Object.keys(data).length == 0) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide the data to update"
//         })
//     }

//     // check the book exist 
//     const book = books.find((each) => each.id === id)

//     if (!book) {
//         return res.status(404).json({
//             success: "false",
//             meggase: `book Not found of id : ${id}`
//         })
//     }

//     // if we are getting user then update
//     // with spread operator 
//     const updateBook = books.map((each) => {
//         if (each.id === id) {
//             return {
//                 ...each,  //spread operator --> read the notes 
//                 ...data,
//             }
//         }
//         return each
//     })
//     // or use
//     // Object.assign(user,data);
//     res.status(200).json({
//         success: true,
//         data: updateBook,
//         message: "user updated successfully"
//     })
// }


exports.updateBookById = async (req, res) => {

    // two ways to do 

    // const { id } = req.params;
    // const {data}  = req.body;
    // if (!data || Object.keys(data).length == 0) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Please provide the data to update"
    //     })
    // }
    // // check if the book exists 
    // const book = await BooksModel.findbyID(id);
    //  if (!book) {
    //     return res.status(404).json({
    //         success: false,
    //         meggase: `book Not found of id : ${id}`
    //     })
    // }

    // // update the book found then update
    // Object.assign(book, data);
    // await book.save();
    // res.status(404).json({
    //         success: true,
    //         meggase: "book update success",
    //         data :book
    //     })

    const { id } = req.params;
    const { data } = req.body;
    if (!data || Object.keys(data).length == 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update"
        })
    }

    const updatedBook = await BookModel.findOneAndUpdate(
        { _id: id },
        data,
        { new: true }  // sees new updates
    );

    if (!updatedBook) {
        return res.status(404).json({
            success: false,
            message: "book not found by ID"
        })
    }
    res.status(200).json({
        success: true,
        message: "book  updated successfully",
        data: updatedBook
    })

}

// delete 

//  (req, res) => {

//     const { id } = req.params;

//     const book = books.find((each) => each.id === id)

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `user not found  ${id}`

//         })
//     }

//     const updateBook = books.filter((each) => each.id !== id)

//     // const index = users.indexOf(user);
//     // users.splice(index, 1);

//     res.status(200).json({
//         success: true,
//         message: "Book  deleted successfully",
//         data: updateBook,
//     })

// })


exports.deleteBookById = async (req, res) => {
    const { id } = req.params;

    // check if the exist 

    const book = await BookModel.findById(id);
    if (!book) {
        return res.status(400).json({
            success: false,
            message: "book is not found"
        })
    }

    await BookModel.findbyIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "book deleted successfully"
    })
}














