import Navbar from "../components/Navbar"

export default function Home() {  
  // TODO: Ver que no entre aca sin que este logueado
  // TODO: Mejorar UI y btn de transaccion
  const { id, firstName, lastName } = JSON.parse(sessionStorage.getItem('user'))
  const { cardNumber, balance }  = JSON.parse(sessionStorage.getItem('card'))
  return (
    <>
    <Navbar />
    <div className="Container bg-light">
      <h1>Welcome {firstName} {lastName}</h1>
      <h3>Your card: {cardNumber} has: {balance} 💲</h3><h3/>
    </div>
    </>
  )
}