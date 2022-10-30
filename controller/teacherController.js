const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Teacher = require('../model/teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Teacher.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, teacher) {
      if (err) return res.status(500).send("There was a problem registering the teacher.")
      var token = jwt.sign({ id: teacher._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token: token });
    }); 
});

router.get("/most-liked-teacher",function(req,res){
    Teacher.find({}).sort('-likedBy').exec(function (err, member) {
      if(err){
          res.send(err); 
      }else{
          const response = "Teacher which is marked favorite by Most Students : " + member[0].name;
          res.send(response);
      }
    });
});

module.exports = router;