import React, { useEffect, useState } from "react";
import PatientForm from "./PatientForm";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentsList";
import { fetchAppointments, fetchPatients } from "../api";

function Home() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);

      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);
    };

    loadData();
  }, []);

  return (
    <div className="main-container">
      <div className="forms-container">
        <PatientForm onPatientAdded={fetchPatients} />
        <AppointmentForm
          patients={patients}
          onAppointmentAdded={fetchAppointments}
        />
      </div>
      <AppointmentList appointments={appointments} />
    </div>
  );
}

export default Home;
