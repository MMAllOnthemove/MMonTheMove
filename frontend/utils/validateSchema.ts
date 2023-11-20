import * as Yup from "yup";


// For signup

export const SignupvalidateSchema = Yup.object({
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
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 digits!"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null as any], "Password must match!")
        .required("Please confirm password!"),
});

export const LoginvalidateSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    password: Yup.string()
        .min(4, "Password must be minimum 4 digits!")
        .required("Password Required!"),
});