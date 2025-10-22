const mongoose = require("mongoose");
const { Schema } = mongoose;

const registerSchema = new Schema(
  {
    workshopId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Workshop",
    },

    fullName: {
      type: String,
      required: true,
      lowercase: true,
      default: "Jane Doe",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      default: "example@com",
    },

    phoneNumber: {
      type: String,
      trim: true,
      default: "0123456789",
    },
  },
  { timestamps: true }
);

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
