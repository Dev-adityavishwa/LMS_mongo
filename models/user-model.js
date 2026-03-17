const mongoose = require('mongoose');

// going to create Schema for the books model 

const Schema = mongoose.Schema;

const userSchema = new Schema({

        name : {
            type: String,
            required: true   // name is mandatory one 
        },
        surname:{
             type: String,
            required: true
        },
        email:{
             type: String,
            required: true
        },
        issuedBook:{    // we need to put here the book id  (which is object ID ) 
            type: mongoose.Schema.Types.ObjectId, // it is rquired objectID
            ref : "Book",  // where do we get ObjID (reference form Book Table) 
            required: false
        },issueDate:{
            type: String,
            required : false
        },returnDate:{
            type: String,
            required : false
        },subscriptionType:{
            type: String,
            required : true
        },subscriptionDate:{
            type: String,
            required : true
        }
},
{timestamps: true}  // time when data inserted , updated ..
)



module.exports = mongoose.model("User" , userSchema) // model export




















