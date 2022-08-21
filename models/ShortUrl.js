const mongoose = require('mongoose')
const { Schema } = mongoose;
const shortId = require('shortid')

const shortUrlSchema = new Schema({
    
        fullURL:{
            type: String,
            required: true
        },

        shortURL:{
            type:String,
            required: true,
            default: shortId.generate
        },

        clicks:{

            type: Number,
            required: true,
            default: 0
        }
    
  });

  module.exports = mongoose.model('shortUrl', shortUrlSchema)