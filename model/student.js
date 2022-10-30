const mongoose = require('mongoose');  

const studentSchema = {
    name : String,
    email : String,
    password : String,
    favouriteTeacher : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Teacher'
        }
    ]
};

const Student = mongoose.model('Student',studentSchema);

module.exports = mongoose.model('Student');