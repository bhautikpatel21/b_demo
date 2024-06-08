const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
    },

    gender : {
        type : String,
        enum : ['Male','Female']
    },

    email : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    profilImage : {
        type : String
    },
    
    isDelete : {
        type : Boolean,
        default : false
    },

    isAdmin : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('userModel',userSchema);