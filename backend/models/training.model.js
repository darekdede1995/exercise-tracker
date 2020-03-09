const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TrainingSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    exercises: {
        type: [String],
        required: false
    },
    finished: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;