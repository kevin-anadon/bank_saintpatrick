import "./Footer.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => { 
  return (
    <footer>
      <a 
        className="d-flex flex-column-reverse justify-content-center align-items-center" href="https://github.com/kevin-anadon">
          <FontAwesomeIcon className="github-icon" size="2xl" icon={faGithub} style={{color: "#005758"}} />
          <p className="mb-0">Open Source Coded by Kevin Anadon</p>
      </a>
    </footer>
  )
}