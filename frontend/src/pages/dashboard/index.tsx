import React from "react";
import Login from "../auth/login";
import Navbar from "../../../components/Navbar";
// Next auth session hook
import { useSession } from "next-auth/react";
import { Head } from "next/document";

function Dashboard() {
  // Google auth session
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Navbar />
        <main>
          <h1 className="font-sans text-slate-800 font-semibold">
            Coming soon
          </h1>
        </main>
      </>
    );
  }
}

export default Dashboard;
