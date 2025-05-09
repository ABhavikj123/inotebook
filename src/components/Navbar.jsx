import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  let navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  let location = useLocation();
  useEffect(() => {

  }, [location]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === "/" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {localStorage.getItem('token') ? <button onClick={logout} className="btn btn-primary mx-2">Log Out</button> :
              <form className="d-flex" role="search">
                <Link className="btn btn-primary mx-2" to="/login" role='button'>Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role='button'>Signup</Link>
              </form>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
