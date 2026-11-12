import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  },
  { timestamps: true },
);

registrationSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.models.Registration || mongoose.model("Registration", registrationSchema);
