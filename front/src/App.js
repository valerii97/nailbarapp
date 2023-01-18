import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import CallbackModal from "./components/CallbackModal";

const App = () => {
  const [makeAppointment, setMakeAppointment] = useState(false);
  const [callback, setCallback] = useState(false);
  const [btnbgcolor, setBtnbgcolor] = useState("#D6AB7E");

  return (
    <div className="container-main">
      <Header
        modalAction={setMakeAppointment}
        callbackModal={setCallback}
        changebtnbgcolor={setBtnbgcolor}
        btnbgcolor={btnbgcolor}
      />
      <Content modalAction={setMakeAppointment} />
      <Footer switcher={makeAppointment} closeModal={setMakeAppointment} />
      {callback && <CallbackModal closeModal={setCallback} />}
    </div>
  );
};

export default App;
