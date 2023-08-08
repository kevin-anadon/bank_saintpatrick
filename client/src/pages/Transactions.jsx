/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {Button, Modal} from 'react-bootstrap';
import { API_URL } from "../constants"

import sendTransaction from "../assets/resources/images/sendTransaction.svg"
import recieveTransaction from "../assets/resources/images/recieveTransaction.svg"

export default function Transactions() {
  const [showModal, setShowModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTabClosing, setIsTabClosing] = useState(false);
  const [transactions, setTransactions] = useState([])
  const [recipientCardNumber, setRecipientCardNumber] = useState('')
  const [amount, setAmount] = useState(0)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const MySwal = withReactContent(Swal)

  const user = JSON.parse(sessionStorage.getItem('user'))
  const card  = JSON.parse(sessionStorage.getItem('card'))
  const authToken  = JSON.parse(sessionStorage.getItem('authToken'))

  const handleModalClose = () => setShowModal(false)

  const handleModalShow = () => setShowModal(true)

  const loadTransactions = async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${user.id}?thisMonth=${true}`, {
        headers: {
          'auth-token': authToken
        }
      })
      const transactions = await response.json()
      setTransactions(transactions)
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


  const formatDate = (notFormattedDate) => {
    return (new Date(notFormattedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }))
  }

  const handleRecipientCardDisplay = () => {
        const rawText = [...recipientCardNumber.split('-').join('')] // Remove old space     
        if (rawText.length <= 16) {
          const creditCard = [] // Create card as array
          rawText.forEach((text, index) => {
              if (index % 4 === 0 && index !== 0) creditCard.push('-') // Add space
              creditCard.push(text)
          })
          return creditCard.join('')
        }
  }

  const handleRecipientCardDelete = (event) => {
    const key = event.key || event.charCode
    if (key === 'Backspace' && event.target.value.trim(1).length === 1) setRecipientCardNumber('')
  }

  const handleRecipientCardNumberChange  = (event) => { 
    const inputRecipientCardNumber = event.target.value
    if (inputRecipientCardNumber.trim().length >= 1) setRecipientCardNumber(inputRecipientCardNumber.split('-').join(''))
  }

  const handleAmountChange  = (event) => { 
    setAmount(event.target.value)
  }

  const onSubmit = () => {
     MySwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm Transaction'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': authToken
            },
            body: JSON.stringify({
              senderId: user.id,
              senderCardNumber: card.cardNumber,
              recipientCardNumber,
              amount: parseFloat(amount)
            })
          })  
    
          const data = await response.json()      
          if (response.status === 200) {
            MySwal.fire({
              icon: 'success',
              title: 'Transaction Successful',
              text: `${data.msg}`,
            })
            setShowModal(false)
            loadTransactions()
          } else {
            MySwal.fire({
              icon: 'error',
              title: 'Transaction Failed',
              text: `${data.msg ?? data.errors[0].msg}!`,
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
    })
  }

  if (isLoggedIn) {
    return (
      <div className="Home-container">
        <div className="mt-4 container d-flex flex-column align-items-center">
          <h1>Transactions History</h1>
          <p className="text-muted">(Last Month)</p>
          <div className="mt-4">
            <div className="mb-2 d-flex justify-content-end">
              <button className="btn btn-outline-primary" onClick={handleModalShow}>Make a Transaction</button>
            </div>
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                          value={handleRecipientCardDisplay()}
                          onChange={handleRecipientCardNumberChange}        
                          onKeyDown={handleRecipientCardDelete}    
                        />
                        {errors.cardNumber && <label className="invalid-feedback">This field is required</label>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Amount</label>
                        <input
                          {...register("amount", {
                            required: true,
                            minLength: 0
                          })}              
                          min="0.00"          
                          type="number"
                          className={`form-control mt-1 ${errors.amount ? 'is-invalid' : ''}`}
                          placeholder="0.00"
                          step="0.01"
                          onChange={handleAmountChange}      
                          />
                          {errors.amount && <label className="invalid-feedback">This field is required</label>}
                    </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                  Confirm Transaction
                </Button>
              </Modal.Footer>
            </Modal>
            {transactions.map(({id, sender, recipient, amount, transaction_date, isSent}) => (
              <div key={id} className="card mb-4 text-center">
              <div className="card-header">Transaction {id}</div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center">
                <img width="50" height="40" src={isSent ? sendTransaction: recieveTransaction} alt="Transaction"/>
                <h5 className="card-title">
                  {isSent ? `Transferred to ${recipient.firstName + ' ' + recipient.lastName}` : `Received from ${sender.firstName + ' ' + sender.lastName}`}
                </h5>
                </div>
                <p className="card-text mt-2">Amount: ${amount}, Date: {formatDate(transaction_date)}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}