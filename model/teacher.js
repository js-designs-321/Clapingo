const mongoose = require('mongoose');  

const teacherSchema = {
    name : String,
    email : String,
    password : String,
    likedBy : {
        type : Number,
        default : 0
    }
}

const Teacher = mongoose.model('Teacher',teacherSchema); 

module.exports = mongoose.model('Teacher');