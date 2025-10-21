import React from "react";
import "../styles/AppointmentsList.css";

export default function AppointmentList({ appointments }) {
  return (
    <div className="appointment-list">
      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.patients?.name}</td>
                <td>{a.patients?.email}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.reason}</td>
                <td>
                  <span className={`status-badge ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
