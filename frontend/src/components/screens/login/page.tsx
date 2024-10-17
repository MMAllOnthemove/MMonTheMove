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
import useLogin from "@/hooks/useLogin"
import { LoginvalidateSchema } from "@/lib/auth_validation_schema"
import { ILoginFormValues } from "@/lib/interfaces"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Link from "next/link"

export default function LoginScreen() {
    const { login, loading, error } = useLogin();

    const initialValues: ILoginFormValues = {
        email: "",
        password: "",
    };

    return (
        <Formik initialValues={initialValues}
            validationSchema={LoginvalidateSchema}
            onSubmit={async (values) => {
                await login(values);
            }}


        >

            <Form>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Signin to your account</CardTitle>
                        <CardDescription>
                            {error}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
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
                            <Field
                                name="password"
                                type="password"
                                className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                            />
                            <ErrorMessage name="password">
                                {(msg: any) => (
                                    <div className="text-sm text-red-500 font-medium">{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full outline-none" type="submit" disabled={loading}> {loading ? 'Logging in...' : 'Login'}</Button>
                        <Link href="/auth/forgot_password">Forgot password</Link>
                    </CardFooter>
                </Card>
            </Form>

        </Formik>
    )
}
