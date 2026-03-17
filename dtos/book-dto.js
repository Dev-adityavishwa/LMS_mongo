// Data Transfer Object

class IssuedBook{
    _id;
    name;
    author;
    genre;
    price;
    publisher;
    issueBy;
    issuedDate;
    returnDate;

    constructor(user){
        this._id = user.IssuedBook._id;
        this.name = user.IssuedBook.name;
        this.author = user.IssuedBook.author;
        this.genre = user.IssuedBook.genre;
        this.price = user.IssuedBook.price;
        this.publisher = user.IssuedBook.publisher;
        this.issueBy = user.name;   // its not present in book table > its present in user table 
        this.issuedDate = user.IssuedDate;
        this.returnDate = user.returnDate;

    }
}

// use this dto in controller 









