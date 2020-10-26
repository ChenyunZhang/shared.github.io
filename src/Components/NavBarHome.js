import React from 'react'
import { Link }  from "react-router-dom";

function NavbarHome() {
    return (
        <>
        <nav className="navbar navbar-custom navbar-fixed-top">
            <div className="container-fluid">
            <div className="navbar-header">
                <Link to="/" className="navbar-brand home-page-link">Shared</Link>
                </div>
                {/* <ul className="nav navbar-nav">
                    <li><Link className="home-page-link">Home</Link></li>
                    <li><Link className="home-page-link">About</Link></li>
                    <li><Link className="home-page-link">feature</Link></li>
                    <li><Link className="home-page-link">Contact</Link></li>
                </ul>
                    <form className="navbar-form navbar-left" action="/action_page.php">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <button type="submit" className="btn btn-default">Search</button>
                    </form> */}
                <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login" className="navBar-login-Text home-page-link">Login/Signup</Link></li>
                </ul>
            </div>
        </nav>
        <br />
        <br />
        <br />
                </>
    )
}

export default NavbarHome
