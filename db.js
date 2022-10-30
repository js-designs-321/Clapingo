const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/clapingoDB";


mongoose.connect(url,{
    useNewUrlParser : true
})
.then(console.log('connecting'))
.catch(err => console.log(`error: ${err}`));