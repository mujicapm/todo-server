const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        dateCreated: {type: String},
        complete: {type: Boolean},
        completedOn: {type: String}
    }
);

//Export model
module.exports = mongoose.model('ToDo', ToDoSchema);