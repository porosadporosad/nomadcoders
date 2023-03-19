import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useNotification = (title, options) => {
    if(!("Notification" in window)){
        return;
    };
    const fireNotif = () => {
        if(Notification !== "granted"){
            Notification.requestPermission().then(permission => {
                if(permission === "granted"){
                    new Notification(title, options)
                } else {
                    return;
                }
            }  )      } else {
            new Notification(title, options);
        }
    }
    return fireNotif;
}

const App = () => {
    const triggerNotif = useNotification();
    return (
      <div className="App">
        <button onClick={triggerNotif}>hi</button>
      </div>
    );
  };
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);