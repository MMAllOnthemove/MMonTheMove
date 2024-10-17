"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { SignupvalidateSchema } from "@/lib/auth_validation_schema"
import { ISignUpFormValues } from "@/lib/interfaces"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useSignup from "@/hooks/useSignup"
import { datetimestamp } from "@/lib/date_formats"


const SignupScreen = () => {

    const { signup, loading, error } = useSignup()

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const toggleConfirmPassword = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };
    const initialValues: ISignUpFormValues = {
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const router = useRouter()

    return (
        <Formik initialValues={initialValues}
            validationSchema={SignupvalidateSchema}
            onSubmit={async (values) => {

                const newValues = {
                    fullName: values.fullName,
                    username: values.username,
                    email: values.email,
                    password: values.password,

                    createdAt: datetimestamp
                }
                await signup(newValues);
            }}



        >

            <Form>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Create account</CardTitle>
                        <CardDescription>
                            {error}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="fullName">Full name</Label>
                            <Field
                                name="fullName"
                                className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                            />
                            <ErrorMessage name="fullName">
                                {(msg: any) => (
                                    <div className="text-sm text-red-500 font-medium">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Field
                                name="username"
                                className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                            />
                            <ErrorMessage name="username">
                                {(msg: any) => (
                                    <div className="text-sm text-red-500 font-medium">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Field
                                name="email"
                                className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                            />
                            <ErrorMessage name="email">
                                {(msg: any) => (
                                    <div className="text-sm text-red-500 font-medium">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                                <Field
                                    name="password"
                                    className="bg-white outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
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
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                                <Field
                                    name="confirmPassword"
                                    className="bg-white outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                    type={confirmPasswordShown ? "text" : "password"}
                                />

                                <button
                                    type="button"
                                    onClick={toggleConfirmPassword}
                                    className="bg-transparent border-none outline-none"
                                >
                                    <span>
                                        {!confirmPasswordShown ? (
                                            <EyeIcon className="w-6 h-6" />
                                        ) : (
                                            <EyeSlashIcon className="w-6 h-6" />
                                        )}
                                    </span>
                                </button>
                            </div>
                            <ErrorMessage name="confirmPassword">
                                {(msg: any) => (
                                    <div className="text-sm text-red-500 font-medium">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Continue</Button>
                    </CardFooter>
                </Card>
            </Form>

        </Formik>
    )
}
export default SignupScreen