/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

import Navbar from "../components/Navbar"
import sendTransaction from "../assets/resources/images/sendTransaction.svg"
import recieveTransaction from "../assets/resources/images/recieveTransaction.svg"

export default function Transactions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTabClosing, setIsTabClosing] = useState(false);
  const [transactions, setTransactions] = useState([])
  const MySwal = withReactContent(Swal)

  const user = JSON.parse(sessionStorage.getItem('user'))
  const card  = JSON.parse(sessionStorage.getItem('card'))

  const loadTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/transactions/${user.id}`)
      const transactions = await response.json()
      // TODO: Mostrar data
      setTransactions(transactions.reverse())
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `There was an error loading your transactions!`,
      })
      throw Error(error)
    }
  }

  useEffect(() => {
    if (user && user.firstName) {
      setIsLoggedIn(true)
      loadTransactions()
    } else window.location.href = '/login'
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
        <div className="mt-5 container d-flex flex-column align-items-center">
          <h1>Transactions History</h1>
          <p className="text-muted">(Last Month)</p>
          <div className="mt-4">
            {transactions.map(transaction => (
              <div key={transaction.id} className="card mb-4 text-center">
              <div className="card-header">Transaction {transaction.id}</div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center">
                <img width="50" height="40" src={sendTransaction} alt="Transaction"/>
                <h5 className="card-title">Send to {`${transaction.recipient.firstName} ${transaction.recipient.lastName}`}</h5>
                </div>
                <p className="card-text mt-2">Amount: ${transaction.amount}, Date: {transaction.transaction_date}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      </>
    )
  }
}