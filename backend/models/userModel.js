import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      // unique: true,
      trim: true,
      lowercase: true,
    },
    // password: {
    //   type: String,
    //   require: true,
    // },
    // answer: {
    //   type: String,
    //   require: true,
    // },
    mobile: {
      type: Number,
      require: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
