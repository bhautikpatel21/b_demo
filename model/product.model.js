const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },

    discription : {
        type : String
    },

    category : {
        type : String
    },

    price : {
        type : Number
    },

    isDelete : {
        type : Boolean,
        default : false
    }
},
{
    versitionKey : false,
    timestamps : true
});

module.exports = mongoose.model('products',productSchema);