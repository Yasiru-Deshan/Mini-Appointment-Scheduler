import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/PatientForm.css";

export default function PatientForm({ onPatientAdded }) {
  const [patient, setPatient] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("patients").insert([patient]);
    if (error) alert("Error adding patient!");
    else {
      onPatientAdded();
      setPatient({ name: "", email: "", phone: "" });
    }
  };

  return (
    <div className="patient-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={patient.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={patient.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={patient.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}
