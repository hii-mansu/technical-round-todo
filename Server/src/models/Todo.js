import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
},
{timestamps: true}
);

export default mongoose.model("Todo", todoSchema);