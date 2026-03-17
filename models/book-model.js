const mongoose = require('mongoose');


// going to create Schema for the books model 

const Schema = mongoose.Schema;

const bookSchema = new Schema({

        name : {
            type: String,
            required: true   // name is mandatory one 
        },
        author:{
             type: String,
            required: true
        },
        genre:{
             type: String,
            required: true
        },
        publisher:{
            type: String,
            required: true
        },
},
{timestamps: true}  // time when data inserted , updated ..
)



module.exports = mongoose.model("Book" , bookSchema) // model export
//   Book as a table name (no SQL db)
// schema name : bookSchema










