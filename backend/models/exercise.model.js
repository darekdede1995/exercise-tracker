const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
    userid: { type: String, required: false },
    name: { type: String, required: true },
    date: { type: Date, required: false },
    group: {
        posses: { type: Boolean, required: true },
        name: { type: String, required: false },
    },
    description: { type: String, required: false },
    repetition: {
        posses: { type: Boolean, required: true },
        amount: { type: String, required: false }
    },
    weight: {
        posses: { type: Boolean, required: true },
        amount: { type: String, required: false }
    },
    duration: {
        posses: { type: Boolean, required: true },
        amount: { type: String, required: false }
    },
    distance: {
        posses: { type: Boolean, required: true },
        amount: { type: String, required: false }
    },
    difficulty: { type: String, required: false },
    pattern: { type: Boolean, required: true }
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;