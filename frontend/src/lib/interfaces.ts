export interface ISignUpFormValues {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    createdAt?: Date;
}
export interface ILoginFormValues {
    email?: string;
    password?: string;
}