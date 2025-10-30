const mongoose = require("mongoose");

workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    workshopImage: {
      type: String,
      trim: true,
      default:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    workshopImagePublicId: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    facilitator: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
    },
    // resource: [String],
    price: {
      type: String,
      required: true,
      trim: true,
      default: "Free",
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shareId: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workshop", workshopSchema);
