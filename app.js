var express = require('express');
var app = express();
var db = require('./db');

const StudentController = require('./controller/studentController');
app.use('/students',StudentController);

const TeacherController = require('./controller/teacherController');
app.use('/teachers', TeacherController); 

module.exports = app;