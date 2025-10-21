import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import AuthUI from "./components/Auth";
import PatientForm from "./components/PatientForm";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentsList";
import Navbar from "./components/Navbar"; // Import the Navbar
import "./App.css";

export default function App() {
  const [session, setSession] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchPatients();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    const { data } = await supabase.from("patients").select("*");
    setPatients(data);
  };

  const fetchAppointments = async () => {
    const { data } = await supabase
      .from("appointments")
      .select("*, patients(name, email)");
    setAppointments(data);
  };

  return (
    <div className="app-container">
      {session && (
        <Navbar
          userEmail={session.user.email}
          onLogout={() => supabase.auth.signOut()}
        />
      )}
      <h1>Mini Appointment Scheduler</h1>
      {!session ? (
        <AuthUI />
      ) : (
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
      )}
    </div>
  );
}
