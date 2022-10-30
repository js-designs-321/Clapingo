const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require('../model/student');
const Teacher = require('../model/teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const VerifyToken = require('../auth/VerifyToken');
const ValidAddition = require('../auth/validAddition');
const ValidRemoval = require('../auth/validRemoval');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Student.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, student) {
      if (err) return res.status(500).send("There was a problem registering the student.")
      var token = jwt.sign({ id: student._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token: token });
    }); 
});

router.post('/login', function(req, res) {
    Student.findOne({ email: req.body.email }, function (err, student) {
      if (err) return res.status(500).send('Error on the server.');
      if (!student) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, student.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: student._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token: token });
    });
});

router.patch("/add-favorite-teacher", VerifyToken , ValidAddition ,async function(req, res, next) {
    await Student.findByIdAndUpdate(req.userId,{$push: {favouriteTeacher : req.body.teacher}});
    await Teacher.findByIdAndUpdate(req.body.teacher,{$inc : {likedBy : 1}});
    res.status(200).send("Successfully added favorite teacher");
});

router.patch("/remove-favorite-teacher", VerifyToken , ValidRemoval , async function(req, res, next){
    await Student.findByIdAndUpdate(req.userId,{$pull: {favouriteTeacher : req.body.teacher}});
    await Teacher.findByIdAndUpdate(req.body.teacher,{$inc : {likedBy : -1}});
    res.status(200).send("Successfully removed favorite teacher");
});
    
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;