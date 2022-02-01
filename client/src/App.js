import React from "react";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginScreen from "./screeens/Auth/LoginScreen";
import RegisterScreen from "./screeens/Auth/RegisterScreen";
import ForgotPassword from "./screeens/Auth/ForgotPassword";
import ResetPassword from "./screeens/Auth/ResetPassword";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route exact path='/' element={<div>hi</div>} />
          <Route exact path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route exact path='/forgotpassword' element={<ForgotPassword />} />
          <Route exact path='/resetpassword' element={<ResetPassword />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
