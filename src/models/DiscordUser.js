const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let schema = new mongoose.Schema({
    discordid:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    discriminator:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('DiscordUser', schema);