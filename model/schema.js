const mongoose = require('mongoose');
const Schema = mongoose.Schema({                                              
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
    }
});

const ToDoSchema = mongoose.model('ToDos',Schema);
module.exports = ToDoSchema;