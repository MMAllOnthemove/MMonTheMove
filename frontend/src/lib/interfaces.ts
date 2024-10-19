export interface ISignUpFormValues {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    createdAt?: Date;
}
export interface ILoginFormValues {
    email: string;
    password: string;
}
export interface IForgotPasswordFormValues {
    email: string;
}
export interface IContainer {
      children: React.ReactNode;
}