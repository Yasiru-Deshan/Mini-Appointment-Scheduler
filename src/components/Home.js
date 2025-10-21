import React, { useEffect, useState } from "react";
import PatientForm from "./PatientForm";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentsList";
import { fetchAppointments, fetchPatients } from "../api";

function Home() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const data = await fetchAppointments();
    setAppointments(data);
  }

  const loadPatients = async () => {
    const data = await fetchPatients();
    setPatients(data);
  }

  useEffect(() => {
    const loadData = async () => {
      await loadAppointments();
      await loadPatients();
    };

    loadData();
  }, []);

  return (
    <div className="main-container">
      <div className="forms-container">
        <PatientForm onPatientAdded={loadPatients} />
        <AppointmentForm
          patients={patients}
          onAppointmentAdded={loadAppointments}
        />
      </div>
      <AppointmentList
        appointments={appointments}
        loadAppointments={loadAppointments}
      />
    </div>
  );
}

export default Home;
