import React from "react";
import { Route, Routes } from 'react-router-dom';
import Calendar from "../../Calendar";
import Login from "../../Login";
import Register from "../../Register";
import ProtectedRoutes from "./ProtectedRoutes";

const Routing = () => {
  return (
      <Routes>
        <Route path="/" element = {<Login/>} />
        <Route path="/register" element = {<Register/>} />
        <Route path="/calendar" element = { 
          <ProtectedRoutes>
            <Calendar />
          </ProtectedRoutes>
        } />
      </Routes>
  )
}

export default Routing