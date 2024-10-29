import * as Yup from "yup";

// For signup

export const SignupvalidateSchema = Yup.object({
    fullName: Yup.string()
        .required("Fullname is required!")
        .min(4, "Fullname must be minimum 4 characters!"),
    username: Yup.string()
        .required("Username is required!")
        .min(4, "Username must be minimum 4 characters!"),
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!")
        .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
    password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be minimum 6 characters!"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null as unknown], "Password must match!")
        .required("Please confirm password!"),
});

export const LoginvalidateSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!")
        .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
    password: Yup.string()
        .min(4, "Password must be minimum 4 characters!")
        .required("Password Required!"),
});
export const ForgotPasswordvalidateSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!")
        .matches(/\@allelectronics.co.za$/, "Domain not allowed"),
});
