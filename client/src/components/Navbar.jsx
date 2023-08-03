  /* eslint-disable react/prop-types */
  import bankLogo from '../assets/resources/images/logo.png'
  import "bootstrap/dist/css/bootstrap.min.css"
  import { Nav, Navbar } from 'react-bootstrap'
  import Swal from "sweetalert2"
  import withReactContent from "sweetalert2-react-content"

  export default function NavbarBrand(props) {
    const MySwal = withReactContent(Swal)
    let btnSignOut

    const handleSignOut = () => {
      MySwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sign out'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('card')
        window.location.href = '/'
      }
    })
  }

    if (props && props.isLoggedIn) {
      btnSignOut = (
        <button onClick={handleSignOut} type='button' className='btn btn-warning'>Sign Out</button>
      )
    }
    return (
      <Navbar className="bg-body-tertiary p-2 d-flex justify-content-between">
            <Navbar.Brand href="/home">
              <img
                alt="Bank Logo"
                src={bankLogo}
                width="30"
                className="d-inline-block align-top"
              />{' '}
              Saint Patrick Bank
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href='/home'>Home</Nav.Link>
              <Nav.Link href='/transactions'>Transactions</Nav.Link>
            </Nav>
            {btnSignOut}
        </Navbar>
    )
  }