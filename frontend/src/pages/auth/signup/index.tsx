import { useToast } from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import logo from "../../../../public/mmlogo.png";
import axios from "axios";

interface MyFormValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
}

export default function Signup() {
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

  const validateSchema = Yup.object({
    fullName: Yup.string()
      .required("Fullname is required!")
      .min(4, "Password must be minimum 4 digits!"),
    username: Yup.string()
      .required("Username is required!")
      .min(4, "Password must be minimum 4 digits!"),
    email: Yup.string()
      .email("Email is invalid!")
      .required("Email is required!"),
    password: Yup.string()
      .min(4, "Password must be minimum 4 digits!")
      .required("Password Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null as any], "Password must match!")
      .required("Pleas confirm password!"),
  });
  const initialValues: MyFormValues = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    createdAt: new Date(),
  };

  return (
    <>
      <main className="auth">
        <article className="auth_card">
          <div className="form_header">
            <span className="auth_card_logo">
              <Image
                src={logo}
                alt="allelectronics logo"
                priority={true}
                placeholder="blur"
              />
            </span>
            <h3 className="text-center py-2 text-gray-900 dark:text-[#eee] font-semibold">
              Create an account
            </h3>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values, actions) => {
              setTimeout(async () => {
                // console.log(JSON.stringify(values, null, 2));
                // actions.setSubmitting(false);
                try {
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/signup`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    }
                  );

                  const data = await response.json();
                  // console.log(data);
                  if (response.ok) {
                    localStorage.setItem("token", data.jwtToken);
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
                <span className="my-3 form_input_row">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                  >
                    Fullname
                  </label>
                  <Field
                    name="fullName"
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage name="fullName">
                    {(msg: any) => (
                      <div className="text-sm text-red-500 font-medium">
                        {msg}
                      </div>
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
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage name="username">
                    {(msg: any) => (
                      <div className="text-sm text-red-500 font-medium">
                        {msg}
                      </div>
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
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage name="email">
                    {(msg: any) => (
                      <div className="text-sm text-red-500 font-medium">
                        {msg}
                      </div>
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
                      className=" bg-white border-none  outline-none text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type={passwordShown ? "text" : "password"}
                    />

                    <button
                      type="button"
                      onClick={togglePassword}
                      className="bg-transparent border-none outline-none"
                    >
                      <span>
                        {!passwordShown ? (
                          <EyeIcon className="w-6 h-6" />
                        ) : (
                          <EyeSlashIcon className="w-6 h-6" />
                        )}
                      </span>
                    </button>
                  </div>

                  <ErrorMessage name="password">
                    {(msg: any) => (
                      <div className="text-sm text-red-500 font-medium">
                        {msg}
                      </div>
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
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage name="confirmPassword">
                    {(msg: any) => (
                      <div className="text-sm text-red-500 font-medium">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </span>

                <button
                  type="submit"
                  className="bg-[#082f49] w-full  font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
                >
                  Signup
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Login
            </Link>
          </p>
        </article>
      </main>
    </>
  );
}