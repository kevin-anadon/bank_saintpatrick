/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"

import transactionSvg from "../assets/resources/images/transaction.svg"
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
              <h4>Your card: {card.cardNumber}
              </h4>
              <h4>Balance: {card.balance} $</h4>
            </div>
          </div>
          <div className="mt-4 row justify-content-center">
            <div className="col">
            <button onClick={() => {
              // TODO: Hacer la transaccion(debe pedir num tarjeta y monto que no supere mi balance [<=])
              alert("Te redirijo a las transacciones o puedo usar form por arriba tmb")
            }} type="button" className="btn btn-success p-0 rounded-circle">
              <img width="100" src={transactionSvg} alt="Transaction" />
            </button>
            <p className="text-black"><strong>Transaction</strong></p>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}