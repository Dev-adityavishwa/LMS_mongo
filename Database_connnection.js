// Import mongoose library to work with MongoDB
const mongoose = require("mongoose");

// Function to create database connection
function DbConnection() {

    // Get MongoDB connection URL from environment variables
    const DB_url = process.env.MONGO_URL;

    // Connect to MongoDB using mongoose
    mongoose.connect(DB_url)

        // If connection is successful this block runs
        .then(() => {
            console.log("Connected to MongoDB");
        })

        // If connection fails this block runs
        .catch((error) => {
            console.error("Connection Error:", error);
        });

    // mongoose.connection gives the current connection instance
    const db = mongoose.connection;

    // This event runs if any error occurs after trying to connect
    db.on("error", console.error.bind(console, "Connection Error"));

    // This event runs only once when the database is successfully opened
    db.once("open", () => {
        console.log("Database connected successfully");
    });
}

// Export the function so it can be used in other files (server.js/app.js)
module.exports = DbConnection;