import { useToast } from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import logo from "../../../../public/mmlogo.png";

interface MyFormValues {
  email: string;
  password: string;
}
function ForgotPassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  // Chakra ui toast
  const toast = useToast();

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid!")
      .required("Email is required!"),
    password: Yup.string()
      .min(4, "Password must be minimum 4 digits!")
      .required("Password Required!"),
  });

  const initialValues: MyFormValues = {
    email: "",
    password: "",
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
              Forgot password
            </h3>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values, actions) => {
              setTimeout(async () => {
                // console.log(JSON.stringify(values, null, 2));
                // actions.setSubmitting(false);
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/update_password/:email`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                  }
                );
                await response.json();
                toast({
                  title: "Successful.",
                  description: `Password successfully updated`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.push("/auth/login");
              }, 1000);
            }}
          >
            {({ errors, touched }: any) => (
              <Form>
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
                <button
                  type="submit"
                  className="bg-[#082f49] w-full  font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
                >
                  Update password
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
          <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
            First time?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Sign up here
            </Link>
          </p>
        </article>
      </main>
    </>
  );
}

export default ForgotPassword;
