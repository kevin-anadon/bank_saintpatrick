/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"

import Navbar from "../components/Navbar"

export default function Home() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTabClosing, setIsTabClosing] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user'))
  const card  = JSON.parse(sessionStorage.getItem('card'))

  useEffect(() => {
    if (user && user.firstName) setIsLoggedIn(true)
    else window.location.href = '/login'
  }, [])
  
  useEffect(() => {       
    const handleWindowUnload = () => {
      setIsTabClosing(true)
    }
    
    if (isTabClosing) {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('card')
    }

    window.addEventListener('unload', handleWindowUnload)

    return () => {
      window.removeEventListener('unload', handleWindowUnload)
    }
  }, [isTabClosing])

  const formatCardNumber = (cardNumber) => {
    return cardNumber.toString().replace(/(\d{4})/g, '$1-').trim().slice(0, -1)
  }

  if (isLoggedIn) {
    return (
      <>
      <Navbar isLoggedIn={true}/>
      <div className="Home-container">
        <div className="mt-4 container text-center">
          <div className="row justify-content-center">
            <div className="col">
              <h1>Welcome {user.firstName} {user.lastName}</h1>
            </div>
          </div>
          <div className="mt-4 row justify-content-center">
            <div className="col-6">
              <h4>Your card: {formatCardNumber(card.cardNumber)}
              </h4>
              <h4>Balance: {card.balance} $</h4>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}