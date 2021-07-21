import "./style.js";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { resetUserSlice } from "../../container/loginContainer/userSlice";
import { resetPostSlice } from "../../container/newsFeedContainer/postSlice";
import { setupAuthHeader } from "../../utils/common";

const LogoutButton = ({
  mobileview,
  handleMenuClose,
  handleMobileMenuClose,
}) => {
  const dispatch = useDispatch();

  function logout() {
    dispatch(resetUserSlice());
    dispatch(resetPostSlice());
    setupAuthHeader();
    handleMenuClose && handleMenuClose();
    handleMobileMenuClose && handleMobileMenuClose();
  }

  return mobileview ? (
    <MenuItem onClick={logout}>
      <IconButton>
        <ExitToAppIcon style={{ color: "black" }} />
      </IconButton>
      Logout
    </MenuItem>
  ) : (
    <MenuItem onClick={logout}>Logout</MenuItem>
  );
};

export default LogoutButton;