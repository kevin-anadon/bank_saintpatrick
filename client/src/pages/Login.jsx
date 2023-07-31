/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Cleave from "cleave.js/react"

import Navbar from "../components/Navbar"

export default function Login() {
  const [authStatus, setAuthStatus] = useState(false)
  const [cardNumber, setCardNumber] = useState(0)
  const [pin, setPin] = useState(0)
  const { register, handleSubmit, formState: { errors } } = useForm()
  
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

  const onSubmit = async () => {
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
              {/* <Cleave 
                className={`form-control mt-1 ${errors.cardNumber ? 'is-invalid' : ''}`}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={handleCardNumberChange}
                {...register("cardNumber", {
                  required: true,
                  
                })}
                options={{
                  blocks: [4,4,4,4], 
                  delimiter: '-', 
                  numericOnly: true
                }}></Cleave> */}
              <input
                {...register("cardNumber", {
                  required: true,
                  minLength: 16,
                  maxLength: 16
                })}
                type="number"
                className={`form-control mt-1 ${errors.cardNumber ? 'is-invalid' : ''}`}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={handleCardNumberChange}            
              />
              {errors.cardNumber && <label className="invalid-feedback">This field is required</label>}
              {/* {errors.cardNumber && <label className="invalid-feedback"></label>} */}
            </div>
            <div className="form-group mt-3">
              <label>Pin</label>
              <input
                {...register("pin", {
                  required: true, 
                  minLength: 4,
                  maxLength: 4
                })}
                type="password"
                className={`form-control mt-1 ${errors.pin ? 'is-invalid' : ''}`}
                placeholder="Enter pin (4 digits)"
                onChange={handlePinChange}
              />
              {/* {(pin <= 999 || pin > 9999) && <label className="">The pin must be of 4-digits</label>} */}
              {errors.pin && <label className="invalid-feedback">This field is required</label>}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={handleSubmit(onSubmit)} type="submit" className="btn btn-primary">
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