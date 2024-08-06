# Patient and Doctor Management System

## Overview

This project is designed to manage patient and doctor registrations, logins, and interactions. It includes features for both patients and doctors to register, log in, and access their respective dashboards. Doctors can view their patients and provide consultations, while patients can view available doctors and request consultations.

## Table of Contents

- [Routes](#routes)
- [Features](#features)
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [API Endpoints](#api-endpoints)

## Routes

### Patient Routes

- **`/patient`**
  - **Description:** Handles registration and login for patients.
  - **Endpoints:**
    - `POST /patient/` - Register a new patient.
    - `POST /patient/` - Log in an existing patient.

### Doctor Routes

- **`/doctor`**
  - **Description:** Handles registration and login for doctors.
  - **Endpoints:**
    - `POST /doctor/` - Register a new doctor.
    - `POST /doctor/` - Log in an existing doctor.

### Dashboards

- **`/DoctorDashboard`**
  - **Description:** A dashboard for doctors to view and manage their patients.
  - **Features:**
    - View a list of patients.
    - Access patient details.
    - View and manage consultations.
    - **Popup for Consultations:**
      - Displays a list of patients.
      - Includes a form for writing prescriptions.

- **`/PatientDashboard`**
  - **Description:** A dashboard for patients to view available doctors and request consultations.
  - **Features:**
    - View a list of doctors.
    - Each doctor entry includes:
      - **Name**
      - **Speciality**
      - **Consultation Button**: When clicked, shows a form with the following steps:
        - **STEP 1:** Provide current illness history and recent surgery details (time span to be mentioned).
        - **STEP 2:** Enter family medical history with:
          - Diabetics or Non-Diabetics (radio button)
          - Any Allergies (text field)
          - Others (text field)
        - **STEP 3:** Submit consultation details to be saved in the database.

### Popup for Consultations

- **Description:** Allows patients to request consultations and doctors to manage prescriptions.
- **Prescription Page:**
  - Displays a list of consultations submitted by patients.
  - Doctors can view and write prescriptions.
- **Prescription Form:**
  - **Fields:**
    - **Care to be Taken** (mandatory field)
    - **Medicines**

Demo Link : 
https://shaikhjunaid775.github.io/hospitality
