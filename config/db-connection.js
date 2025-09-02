require('dotenv').config();

// Import mongoose library
const mongoose = require('mongoose');

// Call it and pass in the connection string 
mongoose.connect(process.env.MONGODB_URI)

    // This is an asynchronous operation, meaning I can chain on a .then
    .then(() => {
        console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
    })

    // Will output the message if the error happens when Mongo is trying to connect
    .catch(error => {
        console.error("Failed to connect to MongoDB", error.message);
        //This will kill the server
        process.exit(1);
    })

// After mongoose has established the connection to MongoDB database,if something happens this message will be outputted
mongoose.connection.on("error", error => {
    console.error("MongoDB connection error:", error.message);
})