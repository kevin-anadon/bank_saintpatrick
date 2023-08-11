import githubSVG from "../assets/resources/images/github.svg"
import "./Footer.css"
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

export const Footer = () => { 
  const [isMobileView, setIsMobileView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 600)
  }

  const handleMouseEnter  = () => {
    setIsHovered(true)
  }

  const handleMouseLeave  = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <footer>
      <a 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="d-flex justify-content-center align-items-center" href="https://github.com/kevin-anadon">
          <img src={githubSVG} alt="Github Icon"></img>
          {(isHovered && !isMobileView) ? (
            <p className="mb-0">Open Source Coded by Kevin Anadon</p>
          ) : null}
      </a>
    </footer>
  )
}