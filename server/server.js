// server.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// Get current filename and directory
const __filename = fileURLToPath(import.meta.url);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// MongoDB connection
const uri = "mongodb+srv://hospital:hospital1234@hospital.ayjhufl.mongodb.net/";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//  Patient schema and model
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: String,
  surgeryHistory: String,
  illnessHistory: String,
  password: String,
  profileImage: String, // Store image URL
  prescriptions: [
    {
      care: String,
      medicines: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

//  doctor schema and model
const doctorSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  email: String,
  phone: Number,
  yearsofexp: Number,
  password: String,
  profileImage: String // Store image URL
});

// Form schema
const consultationSchema = new mongoose.Schema({
  illnessHistory: String,
  recentSurgery: Date,
  diabetics: String,
  allergies: String,
  others: String
});

const Patient = mongoose.model("Patient", patientSchema);
const Doctor = mongoose.model("doctor", doctorSchema);

// Define model
const Consultation = mongoose.model("Consultation", consultationSchema);

// Form submision
// API route to handle form submission
app.post("/api/submit", (req, res) => {
  const consultation = new Consultation(req.body);
  consultation
    .save()
    .then(() => res.status(201).send("Form submitted successfully"))
    .catch((err) => res.status(400).send(err));
});

// GET endpoint to retrieve all consultations
app.get("/api/:id/consultations", (req, res) => {
  Consultation.find()
    .then((consultations) => res.json(consultations))
    .catch((err) => res.status(500).send(err));
});

// Routes
app.post("/api/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Routes
app.post("/api/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Routes
app.post("/api/doctors", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all doctors
app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific doctor by ID
app.get("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all patient
app.get("/api/patient", async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific patient by ID
app.get("/api/patient/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//   Login Routes
app.post("/api/patient-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Received login request:", { email, password });

    const patient = await Patient.findOne({ email });
    console.log("Patient found:", patient);

    if (!patient) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (patient.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", patient });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/doctor-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Received login request:", { email, password });

    const doctor = await Doctor.findOne({ email });
    console.log("doctor found:", doctor);

    if (!doctor) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (doctor.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", doctor });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a prescription to a consultation
// Add a prescription to a patient
app.post("/api/patients/:patientId/prescribe", (req, res) => {
  const { patientId } = req.params;
  const { care, medicines } = req.body;
  // Logic to handle the prescription data
  // Example: Find the patient by ID and add prescription data
  const patient = patients.find((p) => p._id === patientId);
  if (patient) {
    // Add prescription data (this is just an example)
    patient.prescription = { care, medicines };
    res
      .status(200)
      .json({ message: "Prescription submitted successfully", patient });
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
