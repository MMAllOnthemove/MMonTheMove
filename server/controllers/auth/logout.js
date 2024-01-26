const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (e) {}
};
export default LogoutUser;
