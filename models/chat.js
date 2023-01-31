const { Schema, model } = require("mongoose");

const ChatSchema = Schema({
  dateCreated: {
    type: String,
    required: "the dateCreated is necessary",
  },
  dateDeleted: {
    type: String,
  },
  messages: [
    {
      type: String,
    },
  ],
});

ChatSchema.methods.toJSON = function () {
  const { __v, _id, messages, ...chatData } = this.toObject();
  chatData.uid = _id;
  return chatData;
};

module.exports = model("Chats", ChatSchema);
