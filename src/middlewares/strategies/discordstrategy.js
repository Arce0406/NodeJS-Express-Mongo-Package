const passport = require('passport');
const Strategy = require('passport-discord');
const DiscordUser = require('../../models/DiscordUser');
require('dotenv').config()

/* serialize and deserialize cookies */
passport.serializeUser((user, done) => {
    console.log('Serializing User...');
    console.log(user);
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User...');
    console.log(id);
    try {
        const user = await DiscordUser.findById(id);
        // if (!user) throw new Error('User not found');
        console.log(user);
        if (user) done(null, user);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
});

/* add new strategy to passport module */
passport.use(new Strategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.OAUTH2_DISCORD_CALLBACK_URL,
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken);
    console.log(profile);
    try {
        //
        const result = await DiscordUser.findOne({
            discordid: profile.id
        });
        // 若存在既有使用者資料
        // 1.刷新Token
        if (result) {
            console.log('user exist.');
            return done(null, result);
        } else {
            console.log('user does not exist.');
            const newUser = await DiscordUser.create({
                discordid: profile.id,
                username: profile.username,
                discriminator: profile.discriminator,
                email: profile.email,
                guilds: profile.guilds
            });
            let savedUser = await newUser.save();
            return done(null, savedUser);
        }

    } catch (err) {
        console.log(err);
        return done(err, null);
    }
}));