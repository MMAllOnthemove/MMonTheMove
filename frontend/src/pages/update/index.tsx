import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface IOtpValues {
  otp: string;
}
function Update() {
  const [ipAddress, setIp] = useState("");
  const [otp, setOtp] = useState("");

  const update = async () => {
    await fetch(`${process.env.NEXT_API_IPIFY}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.ip);
        setIp(data?.ip);
      });
  };
  // console.log("update", update);
  useEffect(() => {
    update();
  }, [ipAddress]);

  const submit = async () => {
    const values = {
      ipAddress,
      otp,
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_OTP}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        window.alert("Successful");
      } else if (!response.ok) {
        window.alert("Error, try gain");
        return;
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <main className="updatePage">
      <article className="">
        <span className="mb-3 mt-4 form_input_row">
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
          >
            OTP
          </label>
          <input
            name="otp"
            value={otp}
            maxLength={5}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </span>

        <button
          onClick={submit}
          type="button"
          className="bg-[#082f49] w-full  font-semibold text-white dark:text-[#eee] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
        >
          Send
        </button>
      </article>
    </main>
  );
}

export default Update;
