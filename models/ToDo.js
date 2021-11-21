const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        dateCreated: {type: Date, required: true},
        isComplete: {type: Boolean, required: true},
        dateComplete: {type: Date}
    }
);

//Export model
module.exports = mongoose.model('ToDo', ToDoSchema);