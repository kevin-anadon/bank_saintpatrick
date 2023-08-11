  /* eslint-disable react/prop-types */
  import bankLogo from '../assets/resources/images/logo.png'
  import "bootstrap/dist/css/bootstrap.min.css"
  import { Nav, Navbar } from 'react-bootstrap'
  import Swal from "sweetalert2"
  import withReactContent from "sweetalert2-react-content"
  import "./Navbar.css"

  export default function NavbarBrand() {
    const MySwal = withReactContent(Swal)
    let btnSignOut

    const handleSignOut = () => {
      MySwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#005758',
        cancelButtonColor: '#F7C548',
        confirmButtonText: 'Sign out',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('card')
        sessionStorage.removeItem('authToken')
        window.location.href = '/'
      }
    })
  }

    if (sessionStorage.getItem('user')) {
      btnSignOut = (
        <button onClick={handleSignOut} type='button' className='btn btn-signout'>Sign Out</button>
      )
    }

    return (
      <Navbar expand="sm" className="bg-body-tertiary p-2">
            <Navbar.Brand href="/home">
              <img
                alt="Bank Logo"
                src={bankLogo}
                width="30"
                className="d-inline-block align-top"
              />{' '}
              Saint Patrick Bank
            </Navbar.Brand>
            {(sessionStorage.getItem('user')) 
              ? 
              (<>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href='/home'>Home</Nav.Link>
                    <Nav.Link href='/transactions'>Transactions</Nav.Link>
                  </Nav>
                  {btnSignOut}
                </Navbar.Collapse>
              </>)
              : null
            }
        </Navbar>
    )
  }