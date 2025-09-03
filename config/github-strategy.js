require('dotenv').config();
const User = require('../models/user-model');
const { Strategy: GitHubStrategy } = require('passport-github2');
const passport = require('passport');

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    // The profile object has access to our emails
    scope: ['user:email']
}

passport.use(new GitHubStrategy(options,
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await User.findOne({ githubId: profile.id })

            if (!user) {
                user = await User.create({
                    githubId: profile.id,
                    username: profile.username,
                    // The primary email will be stored
                    email: profile.emails?.[0]?.value || `${profile.username}@github.com`
                });

            }
            return done(null, user)
        } catch (error) {
            return done(error, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        return done(null, user)
    } catch (error) {
        done(error, false)
    }
});