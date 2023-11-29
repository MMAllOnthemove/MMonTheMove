const express = require("express");

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (e) {
    // console.log("Logout error", e);
  }
};
module.exports = { logoutUser };
