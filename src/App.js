import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthUI from "./components/Auth";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";;

export default function App() {
  const [session, setSession] = useState(null);

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

  return (
    <div className="app-container">
      <ToastContainer />
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
        <Home/>
      )}
    </div>
  );
}
