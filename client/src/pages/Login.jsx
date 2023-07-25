/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"

import Navbar from "../components/Navbar"

export default function Login() {  
  // Provicional, futuro hacerlo con localStorage o algo que guarde
  let [authStatus, setAuthStatus] = useState(false)
  let [cardNumber, setCardNumber] = useState(0)
  let [pin, setPin] = useState(0)

  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user && user.firstName) {
      handleAuthStatusChange()
    }
  }, [])

  const handleCardNumberChange  = (event) => { 
    setCardNumber(event.target.value)
  }

  const handlePinChange = (event) => { 
    setPin(event.target.value)
  }

  const handleAuthStatusChange = () => {
    setAuthStatus(!authStatus)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // TODO: Validacion del lado cliente que no falte
    try {
      const response = await fetch('http://localhost:3001/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cardNumber,
          pin
        })
      })

      const data = await response.json()
      
      if (response.status === 200) {
        const { id, firstName, lastName } = data.user
        const user = {id, firstName, lastName}
        const { cardNumber, balance } = data.card
        const card = {cardNumber, balance}
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('card', JSON.stringify(card))
        handleAuthStatusChange()
      } else {
        // TODO: alerta bonita
        alert(data.msg)
      }
    } catch (error) {
      throw Error(error)
    }
  }

  if (!authStatus) {
    return (
      <>
      <Navbar/>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Card Number</label>
              <input
                type="number"
                className="form-control mt-1"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={handleCardNumberChange}            
              />
            </div>
            <div className="form-group mt-3">
              <label>Pin</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter pin (4 digits)"
                onChange={handlePinChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">pin?</a>
            </p>
          </div>
        </form>
      </div>
      </>
    )
  }

  window.location.href = '/home'
}