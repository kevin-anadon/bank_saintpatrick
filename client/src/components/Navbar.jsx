import bankLogo from '../assets/resources/images/logo.png'
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar } from 'react-bootstrap'




export default function NavbarBrand() {
  return (
    <Navbar className="bg-body-tertiary p-2">
          <Navbar.Brand href="#home">
            <img
              alt="Bank Logo"
              src={bankLogo}
              width="30"
              className="d-inline-block align-top"
            />{' '}
            Saint Patrick Bank
          </Navbar.Brand>
      </Navbar>
  )
}