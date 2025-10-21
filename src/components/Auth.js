import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient";

export default function AuthUI() {
  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2 style={{ textAlign: "center" }}>Login / Sign Up</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={[]} // can add ['google', 'github'] if you enabled them
      />
    </div>
  );
}
