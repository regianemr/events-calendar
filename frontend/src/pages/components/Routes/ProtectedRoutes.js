import React from "react";
import UserService from "../../../Services/UserService";
import Routing from "./Routing";

const userService = new UserService()

const ProtectedRoutes = ({children}) => {
  const authenticatedUser = userService.authenticatedUser()
  return authenticatedUser ? children : <Routing/>
}

export default ProtectedRoutes