import React from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

function Signup() {
  return (
    <section className="bg-gray-20 flex justify-center flex-col h-screen text-center">
      <div className="container mx-auto flex gap-3 flex-col">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          Signup
        </h1>
        <button
          type="button"
          className="flex items-center mx-auto bg-white font-sans font-medium text-slate-500 px-6 py-4 rounded-sm shadow-md gap-2"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
            </svg>
          </span>
          Signup with Google
        </button>

        <p className="font-sans font-semibold text-slate-900">
          or{" "}
          <Link className="text-sky-700" href="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
