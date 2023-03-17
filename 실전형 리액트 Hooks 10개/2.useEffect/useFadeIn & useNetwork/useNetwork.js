import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useNetwork = onChange => {
  if(typeof onChange === "function"){
    onChange(navigator.onLine);
  }
  const handleChange = () => {
    setStatus(navigator.onLine);
  }
  const[status, setStatus] = useState(navigator.onLine);
  useEffect(()=>{
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    }
  },[])
  return status;
}

const App = () => {
  const handleNetworkChange = () => {
    console.log(online ? "We just went online" : "We are offline");
  }
  const online = useNetwork(handleNetworkChange);
  return (
    <div className="App">
      <h1>{online ? "online":"offline"}</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);