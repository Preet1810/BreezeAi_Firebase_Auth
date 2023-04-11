import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AuthComponent from './components/Auth'
import UserDashboard from './components/userDashboard'
const App=() => {

  const [authUser, setAuthUser]=useState(null);

  useEffect(() => {

    const listen=onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })
  }, [])


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser? <Navigate to="/dashboard" />:<AuthComponent />} />
          <Route path="/dashboard" element={authUser? <UserDashboard authUser={authUser} />:<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App