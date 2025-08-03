import mongoose from "mongoose";

const EventRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventName: { type: String, required: true },
  date: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("EventRegistration", EventRegistrationSchema);
