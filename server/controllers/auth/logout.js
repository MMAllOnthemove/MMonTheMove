const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default LogoutUser;
