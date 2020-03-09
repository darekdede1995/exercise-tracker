const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSessionSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true
  }
);

const UserSession = mongoose.model("UserSession", UserSessionSchema);

module.exports = UserSession;
