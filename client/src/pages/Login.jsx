/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { API_URL } from "../constants"

import Navbar from "../components/Navbar"

export default function Login() {
  const [authStatus, setAuthStatus] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [pin, setPin] = useState(0)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const MySwal = withReactContent(Swal)
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user && user.firstName) {
      handleAuthStatusChange()
    }
    // Apply the style to prevent scrolling on the entire page
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      // Reset the style when the component unmounts
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [])

  const handleCardDisplay = () => {
        const rawText = [...cardNumber.split('-').join('')] // Remove old space
        
        if (rawText.length <= 16) {
          const creditCard = [] // Create card as array
          rawText.forEach((text, index) => {
              if (index % 4 === 0 && index !== 0) creditCard.push('-') // Add space
              creditCard.push(text)
          })
          return creditCard.join('')
        }
  }

  const handleCardDelete = (event) => {
    const key = event.key || event.charCode
    if (key === 'Backspace' && event.target.value.trim(1).length === 1) setCardNumber('')
  }

  const handleCardNumberChange  = (event) => { 
    const inputCardNumber = event.target.value
    if (inputCardNumber.trim().length >= 1) setCardNumber(inputCardNumber.split('-').join(''))
  }

  const handlePinChange = (event) => { 
    setPin(event.target.value)
  }

  const handleAuthStatusChange = () => {
    setAuthStatus(!authStatus)
  }

  const onSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
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
        const authToken = data.token
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('card', JSON.stringify(card))
        sessionStorage.setItem('authToken', JSON.stringify(authToken))
        handleAuthStatusChange()
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${data.msg}!`,
          footer: '<a href="https://github.com/kevin-anadon/bank_saintpatrick">Why do I have this issue?</a>'
        })
      }
    } catch (error) {
      MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Try again later!`
      })
      throw Error(error)
    }
  }

  if (!authStatus) {
    return (
      <>
      <Navbar/>
      <div className="Auth-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Card Number</label>
              <input
                {...register("cardNumber", {
                  required: true,
                  maxLength: 19,
                  minLength: 19
                })}
                maxLength="19"
                type="text"
                className={`form-control mt-1 ${errors.cardNumber ? 'is-invalid' : ''}`}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={handleCardDisplay()}
                onChange={handleCardNumberChange}        
                onKeyDown={handleCardDelete}    
              />
              {errors.cardNumber && <label className="invalid-feedback">This field is required</label>}
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
                maxLength="4"
                className={`form-control mt-1 ${errors.pin ? 'is-invalid' : ''}`}
                placeholder="Enter pin (4 digits)"
                onChange={handlePinChange}
              />
              {/* {(pin <= 999 || pin > 9999) && <label className="">The pin must be of 4-digits</label>} */}
              {errors.pin && <label className="invalid-feedback">This field is required</label>}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
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