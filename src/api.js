import { supabase } from "./supabaseClient";

export const fetchPatients = async () => {
  const { data } = await supabase.from("patients").select("*");
  return data;
};

export const fetchAppointments = async () => {
  const { data } = await supabase
    .from("appointments")
    .select("*, patients(name, email)");
  return data;
};