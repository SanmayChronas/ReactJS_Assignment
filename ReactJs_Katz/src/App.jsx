import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';



function App() {
  const [bgColor, setBgColor] = useState("white");
  const colors = useSelector((state) => state.colors.colors);
  useEffect(() => {

    let index = localStorage.getItem("colorIndex")
    if (index) {
      let i = parseInt(index) + 1;
      i >= 6 && (i= 0)
      setBgColor(colors[i])
      localStorage.setItem("colorIndex" , i)
    }else{
      setBgColor(colors[0])
      localStorage.setItem("colorIndex" , 0)
    }
  }, []);

  return (
    <div className="App" style={{backgroundColor:bgColor}}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
