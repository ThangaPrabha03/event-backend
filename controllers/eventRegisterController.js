import EventRegistration from "../models/EventRegistration.js";
import nodemailer from "nodemailer";

export const registerEvent = async (req, res) => {
  const { name, email, eventName, date } = req.body;

  try {
    const newEvent = new EventRegistration({ name, email, eventName, date });
    await newEvent.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Event Registration Confirmation",
      text: `Hello ${name},\n\nYour event "${eventName}" is registered for ${date}.\n\nThanks,\nPrabha Event Team`,
    });

    res.status(200).json({ message: "Event registered and email sent successfully!" });
  } catch (error) {
    console.error("Error in registerEvent:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ New GET endpoint to fetch events
export const getEvents = async (req, res) => {
  try {
    const events = await EventRegistration.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};
