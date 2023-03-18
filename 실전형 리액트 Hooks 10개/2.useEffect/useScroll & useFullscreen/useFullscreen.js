import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useFullScreen = () => {
    const element = useRef();
   const triggerFullScreen = () => {
    if(element.current){
        element.current.requestFullscreen();
    }
   }
   const exitFull = () => {
    document.exitFullscreen();
   }
   return {element, triggerFullScreen,exitFull};
}

const App = () => {
    const {element, triggerFullScreen,exitFull} = useFullScreen();
    return (
      <div className="App" style={{height:"1000vh"}}>
        <div ref={element}>
        <img  src="https://i.ibb.co/R6RwNxx/grape.jpg" />
        <button onClick={exitFull}>Exit FullScreen</button>
        </div>
        <button onClick={triggerFullScreen}>Make FullScreen</button>
      </div>
    );
  };
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);