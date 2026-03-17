const express = require('express');

const dotenv = require('dotenv'); //import .env 

const DbConnection = require('./Database_connnection');  // import dbConnection


const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");


dotenv.config() // configuring env package

// ONES the application start call the perticular method
DbConnection();

const app = express();

// middleware
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "home page :-) "
    })
})

// using routers 
app.use("/users", usersRouter);
app.use("/books", booksRouter);


const PORT = 8281;
app.listen(PORT, () => {
    console.log(` server is running ${PORT}`)
})




























