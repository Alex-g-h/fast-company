const { Schema, model } = require("mongoose");

content: string;
pageId: userId: string;

const schema = new Schema(
  {
    content: { type: String, required: true },
    // according to user to comment for
    pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // ID user send comment
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Comment", schema);
