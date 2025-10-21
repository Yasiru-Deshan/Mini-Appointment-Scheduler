import React, { useState } from "react";
import "../styles/AppointmentsList.css";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";

export default function AppointmentList({ appointments, loadAppointments }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const handleEditAppointment = async () => {
    const { error } = await supabase
      .from("appointments")
      .update(formData)
      .eq("id", selectedAppointment.id);

    if (error) {
      toast.error("Error updating appointment!");
    } else {
      toast.success("Appointment updated successfully!");
      loadAppointments();
      setIsModalOpen(false);
    }
  };

  const handleDeleteAppointment = async () => {
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", selectedAppointment.id);

    if (error) {
      toast.error("Error deleting appointment!");
    } else {
      toast.success("Appointment deleted successfully!");
      loadAppointments();
      setIsModalOpen(false);
    }
  };

  const openModal = (appointment, type) => {
    setSelectedAppointment(appointment);
    setModalType(type);
    if (type === "edit") {
      setFormData({
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              <th>Actions</th>
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
                <td>
                  <button
                    onClick={() => openModal(a, "edit")}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal(a, "delete")}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === "delete" ? (
          <div>
            <p>Are you sure you want to delete this appointment?</p>
            <button
              onClick={handleDeleteAppointment}
              className="confirm-button"
            >
              Confirm
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditAppointment();
            }}
          >
            <h3>Edit Appointment</h3>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
            <button type="submit" className="confirm-button">
              Save Changes
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
