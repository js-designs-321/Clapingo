const mongoose = require('mongoose');
const Student = require('../model/student');

function validAddition(req,res,next){
    Student.find({_id : req.userId, favouriteTeacher: { $in: [req.body.teacher] }}, function(err,teacher) {
        if(err){
            return res.status(500).send({ message: 'Failed to add teacher.' });
        }if(teacher.length == 0){   
            next();  
        }else{
            res.status(400).send({message: 'Teacher Already Liked By Student.'});
        }
    });
}

module.exports = validAddition; 