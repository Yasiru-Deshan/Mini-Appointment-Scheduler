import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";
import "../styles/AppointmentForm.css";

export default function AppointmentForm({ patients, onAppointmentAdded }) {
  const [appointment, setAppointment] = useState({
    patient_id: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("appointments").insert([appointment]);
    if (error) {
      toast.error("Error booking appointment!");
    } else {
      toast.success("Appointment booked successfully!");
      onAppointmentAdded();
      setAppointment({
        patient_id: "",
        date: "",
        time: "",
        reason: "",
        status: "Pending",
      });
    }
  };

  return (
    <div className="appointment-form">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="patient_id"
          value={appointment.patient_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Patient</option>
          {patients.length > 0 && patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          required
        />
        <input
          name="reason"
          placeholder="Reason"
          value={appointment.reason}
          onChange={handleChange}
          required
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}
