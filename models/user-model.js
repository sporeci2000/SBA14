const mongoose = require('mongoose');

// To hash and compare passwords
const bcrypt = require('bcrypt');

// Define the shape of a User document
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },

        // For local authentication
        password: {
            type: String,
            required: [true, 'Password is required.'],
            minlength: [8, 'Password must be at least 8 characters long.'],
            select: false, // don’t return password by default
        },

        // For third-party auth
        githubId: {
            type: String,
            unique: true,
            sparse: true, // allows multiple docs without githubId
        }
    },
    { timestamps: true }
);

// Middleware: hash password if new/modified
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Compare entered password with stored hash
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Ensure user has at least one auth method
userSchema.pre('validate', function (next) {
    if (!this.password && !this.githubId) {
        next(new Error('User must have either a password or a GitHub ID.'));
    } else {
        next();
    }
});

// Check the Schema validators when updating a document
mongoose.set('runValidators', true);

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;
