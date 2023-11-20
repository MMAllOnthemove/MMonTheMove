// External imports
import { useToast } from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

// Custom imports
import { ISignUpFormValues } from "../../../utils/interfaces";
import { SignupvalidateSchema } from "../../../utils/validateSchema";

const Signup = () => {
  const router = useRouter();

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  // Chakra ui toast
  const toast = useToast();

  const initialValues: ISignUpFormValues = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    createdAt: new Date(),
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupvalidateSchema}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/signup`,
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );

              const data = await response.json();
              // console.log(data);
              if (response.ok) {
                toast({
                  title: "Successful.",
                  description: ``,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.push("/");
              } else {
                toast({
                  title: "Error.",
                  description: `${data}`,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
                return;
              }
            } catch (error) {
              // console.log(error);
            }
          }, 1000);
        }}
      >
        {({ errors, touched }: any) => (
          <Form>
            <span className="mb-3 mt-4 form_input_row">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
              >
                Fullname
              </label>
              <Field
                name="fullName"
                className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage name="fullName">
                {(msg: any) => (
                  <div className="text-sm text-red-500 font-medium">{msg}</div>
                )}
              </ErrorMessage>
            </span>
            <span className="my-3 form_input_row">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
              >
                Username
              </label>
              <Field
                name="username"
                className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage name="username">
                {(msg: any) => (
                  <div className="text-sm text-red-500 font-medium">{msg}</div>
                )}
              </ErrorMessage>
            </span>
            <span className="my-3 form_input_row">
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
            <span className="my-3 form_input_row">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
              >
                Confirm password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage name="confirmPassword">
                {(msg: any) => (
                  <div className="text-sm text-red-500 font-medium">{msg}</div>
                )}
              </ErrorMessage>
            </span>

            <button
              type="submit"
              className="bg-[#082f49] w-full  font-semibold text-white dark:text-[#eee] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
            >
              Signup
            </button>
          </Form>
        )}
      </Formik>
      {/* <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
        Have an account?{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 hover:text-blue-500 font-semibold"
        >
          Login
        </Link>
      </p> */}
    </>
  );
};

export default Signup;
