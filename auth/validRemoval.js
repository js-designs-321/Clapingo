const mongoose = require('mongoose');
const Student = require('../model/student');

function validRemoval(req,res,next){
    Student.find({_id : req.userId, favouriteTeacher : {$in : [req.body.teacher]}} , function(err,teacher) {
        if(err){
            return res.status(500).send({ message: 'Failed to remove teacher.' });
        }if(teacher.length == 0){    
            res.status(400).send({message: 'Teacher currently not marked favorite by student'}); 
        }else{
            next(); 
        }
    });
}

module.exports = validRemoval; 