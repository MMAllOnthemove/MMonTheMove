const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (e) {
    // console.log("Logout error", e);
  }
};
export default LogoutUser;
