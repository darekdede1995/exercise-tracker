const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GroupSchema = new Schema({
    name: { type: String, required: true },
    userid: { type: String}
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;