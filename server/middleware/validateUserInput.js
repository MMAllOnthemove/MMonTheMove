const Yup = require("yup");

const validateSchema = Yup.object({
  fullName: Yup.string()
    .required("Fullname is required!")
    .min(4, "Password must be minimum 4 digits!"),
  username: Yup.string()
    .required("Username is required!")
    .min(4, "Password must be minimum 4 digits!"),
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
  password: Yup.string()
    .required("Please Enter password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match!")
    .required("Pleas confirm password!"),
});

module.exports = { validateSchema };
