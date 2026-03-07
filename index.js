const express = require('express');

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

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




























