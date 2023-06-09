import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Web3 from 'web3'
import configuration from './contracts/PostContract.json'
import StateContextProvider from './context/StateContextProvider';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import { Routes } from 'react-router-dom';

function App() {



  return (
    <StateContextProvider>

      <Router>
        <Routes>

          <Route path="/" element={<Login />} ></Route>
          <Route path="/Login" element={<Login />} ></Route>

          <Route path="/Register" element={<Register />} ></Route>

          <Route path="/Home" element={<Home />} ></Route>

        </Routes>
      </Router>

    </StateContextProvider>
  )
}

export default App;
