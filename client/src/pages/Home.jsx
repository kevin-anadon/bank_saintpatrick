/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { API_URL } from "../constants"
import Cards from "react-credit-cards-2"
import "react-credit-cards-2/dist/es/styles-compiled.css"
import "./Home.css"

export default function Home() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cardBalance, setCardBalance] = useState(0.00)
  const [isTabClosing, setIsTabClosing] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user'))
  const card  = JSON.parse(sessionStorage.getItem('card'))
  const authToken  = JSON.parse(sessionStorage.getItem('authToken'))
  

  const getCardBalance = async () => {
    try {
      const response = await (await fetch(`${API_URL}/cards/${card.cardNumber}`, {
        headers:{
          'auth-token': authToken,
        }
      })).json()
      setCardBalance(response.balance)
      if (response.balance !== card.balance) {
        card.balance = response.balance
        sessionStorage.setItem('card', JSON.stringify(card))
      }
    }
     catch (error) {
      throw Error(error)
    }
  }

  useEffect(() => {
    if (user && user.firstName) {
      getCardBalance()
      setIsLoggedIn(true)
    }
    else window.location.href = '/login'
  }, [])
  
  useEffect(() => {       
    const handleWindowUnload = () => {
      setIsTabClosing(true)
    }
    
    if (isTabClosing) {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('card')
      sessionStorage.removeItem('authToken')
    }

    window.addEventListener('unload', handleWindowUnload)

    return () => {
      window.removeEventListener('unload', handleWindowUnload)
    }
  }, [isTabClosing])

  if (isLoggedIn) {
    return (
      <div className="Home-container">
        <div className="mt-4 container text-center">
          <div className="row justify-content-center">
            <div className="col">
              <h1>Welcome {user.firstName} {user.lastName}</h1>
            </div>
          </div>
          <div className="row justify-content-center custom-margin-top">
            <div className="col-sm-8 col-lg-4">
              <Cards
                number={card.cardNumber}
                name={user.firstName + ' ' + user.lastName}
                expiry={'XX/XX'}
              />
            </div>
          </div>
          <div className="row justify-content-center custom-margin-top">
            <div className="col-lg-4 col-sm-8">
              <div className="card">
                <div className="card-header">
                  Balance Available
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 text-start">
                      <p className="text-muted">US DOLLARS</p>
                    </div>
                    <div className="col-8 text-end">
                      <p className="text-dark">${cardBalance ?? 0.00}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}