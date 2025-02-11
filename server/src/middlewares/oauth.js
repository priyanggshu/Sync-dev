import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../db/User.js";
import jwt from "jsonwebtoken";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
            accessType: 'offline',
            prompt: 'consent'
        },
        async ( accessToken, refreshToken, profile, done ) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if(!user) {
                    user = new User({
                        username: profile.displayName,
                        email: profile.emails[0]?.value,
                        password: null,
                        googleDriveAccessToken: accessToken,
                        googleDriveRefreshToken: refreshToken || null
                    });

                    await user.save();
                } else {
                    user.googleDriveAccessToken = accessToken;

                    if(refreshToken) {
                        user.googleDriveRefreshToken = refreshToken
                    }
                    await user.save();
                }

                const token = jwt.sign(
                    { userId: user.id, user: user.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '8h'}
                );

                return done(null, { user, token, refreshToken });
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if(!user) return done(null, false)
            
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});