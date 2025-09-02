const mongoose = require('mongoose');

// Define the shape of a Bookmark document
const bookmarkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            trim: true,
        },

        url: {
            type: String,
            required: [true, 'URL is required.'],
            match: [/^https?:\/\/.+/, 'Please enter a valid URL.'],
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        // Owner of the bookmark
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'The owner is required.'],
        },
    },
    { timestamps: true } // automatically adds createdAt + updatedAt
);

// Check schema validators when updating a document
mongoose.set('runValidators', true);

// Compile the schema into a model
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
