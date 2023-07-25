  /* eslint-disable react/prop-types */
  import bankLogo from '../assets/resources/images/logo.png'
  import "bootstrap/dist/css/bootstrap.min.css"
  import { Navbar } from 'react-bootstrap'




  export default function NavbarBrand(props) {
    let btnSignOut
    if (props && props.isLoggedIn) {
      btnSignOut = (
        <button onClick={() => {
          // TODO: Hacer el sign out
          alert('Te debo desloguear')
        }} type='button' className='btn btn-warning'>Sign Out</button>
      )
    }
    return (
      <Navbar className="bg-body-tertiary p-2 d-flex justify-content-between">
            <Navbar.Brand href="#home">
              <img
                alt="Bank Logo"
                src={bankLogo}
                width="30"
                className="d-inline-block align-top"
              />{' '}
              Saint Patrick Bank
            </Navbar.Brand>
            {btnSignOut}
        </Navbar>
    )
  }