// External imports
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

// Custom imports
import { ILoginFormValues } from "../../../utils/interfaces";
import { LoginvalidateSchema } from "../../../utils/validateSchema";
import axios from "axios";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const initialValues: ILoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginvalidateSchema}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/login`, values, {
                headers: {
                  'Content-Type': 'application/json',

                },
                withCredentials: true
              });
              // alert(response.data.message)
              if (response.data) router.push("/")
            } catch (error: any) {
              alert(error?.response?.data.errors); // Log error response data on failure, if available
            }
            // try {
            //   const response = await fetch(
            //     `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/login`,
            //     {
            //       method: "POST",
            //       credentials: "include",
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //       body: JSON.stringify(values),
            //     }
            //   );

            //   const data = await response.json();
            //   if (response.ok) {
            //     toast.success("Successful");
            //     router.push("/");
            //   } else {
            //     toast.error("Error, try gain");
            //     return;
            //   }
            // } catch (error) { }
          }, 1000);
        }}
      >
        {({ errors, touched }: any) => (
          <Form>
            <span className="mb-3 mt-4 form_input_row">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
              >
                Email
              </label>
              <Field
                name="email"
                className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage name="email">
                {(msg: any) => (
                  <div className="text-sm text-red-500 font-medium">{msg}</div>
                )}
              </ErrorMessage>
            </span>
            <span className="my-3 form_input_row ">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
              >
                Password
              </label>
              <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                <Field
                  name="password"
                  className=" bg-white border-none dark:bg-[#22303C] dark:text-[#eee] outline-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type={passwordShown ? "text" : "password"}
                />

                <button
                  type="button"
                  onClick={togglePassword}
                  className="bg-transparent border-none outline-none"
                >
                  <span>
                    {!passwordShown ? (
                      <EyeIcon className="w-6 h-6  dark:text-[#eee]" />
                    ) : (
                      <EyeSlashIcon className="w-6 h-6  dark:text-[#eee]" />
                    )}
                  </span>
                </button>
              </div>

              <ErrorMessage name="password">
                {(msg: any) => (
                  <div className="text-sm text-red-500 font-medium">{msg}</div>
                )}
              </ErrorMessage>
            </span>
            <button
              type="submit"
              className="bg-[#082f49] w-full  font-semibold text-white dark:text-[#eee] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      {/* <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
            Forgot password?{" "}
            <Link
              href="/auth/forgot_password"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Reset it here
            </Link>
          </p> */}
      {/* <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
        First time?{" "}
        <Link
          href="/auth/signup"
          className="text-blue-600 hover:text-blue-500 font-semibold "
        >
          Sign up here
        </Link>
      </p> */}
    </>
  );
};

export default Login;