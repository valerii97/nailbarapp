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
  const [priceLists, setPriceLists] = useState([]);

  return (
    <div className="container-main">
      <Header modalAction={setMakeAppointment} callbackModal={setCallback} />
      <Content modalAction={setMakeAppointment} getPriceList={setPriceLists} />
      <Footer
        switcher={makeAppointment}
        closeModal={setMakeAppointment}
        prices={priceLists}
      />
      {callback && <CallbackModal closeModal={setCallback} />}
    </div>
  );
};

export default App;
