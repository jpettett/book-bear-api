const mongoose = require('../db/connection');

const UserSChema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        return ret; //return returned mongoose doc
      }
    }
  }
);

module.exports = mongoose.model('User', UserSChema);
