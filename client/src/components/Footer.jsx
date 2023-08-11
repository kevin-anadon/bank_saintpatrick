import githubSVG from "../assets/resources/images/github.svg"
import "./Footer.css"
import "bootstrap/dist/css/bootstrap.min.css"

export const Footer = () => { 
  return (
    <footer>
      <a 
        className="d-flex justify-content-center align-items-center" href="https://github.com/kevin-anadon">
          <img src={githubSVG} alt="Github Icon"></img>
          <p className="mb-0">Open Source Coded by Kevin Anadon</p>
      </a>
    </footer>
  )
}