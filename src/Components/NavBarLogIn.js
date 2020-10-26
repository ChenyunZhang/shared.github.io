import React from 'react'
import { Link } from 'react-router-dom'

function NavBarLogIn(props) {

    const handleSearch = (e) =>{
        e.preventDefault()
        props.changeSearchTerm(e.target.value)
    }
        return (
           <>
           <nav className="navbar navbar-fixed-top navbar-custom">
            <div className="container-fluid nav-custom-container">
                <ul className="nav navbar-nav">
                    <li><Link to="/" className="navbar-brand home-page-link">Share</Link></li>
                    <li><Link to="/home" className="home-page-link">Home</Link></li>
                    <li className="nav-item btn-group">
						<Link className="dropdown-toggle home-page-link" data-toggle="dropdown" id="dropdownMenu1" data-toggle="dropdown" to="/home">Account</Link>
						<div className="dropdown-menu">
							<li><Link className="dropdown-item home-page-link" to="/profile">Edit profile</Link></li>
                            {/* <li><Link className="dropdown-item home-page-link" to="/myposts">My posts</Link></li> */}
						</div>
					</li>
                </ul>
                    <div className="navbar-form navbar-left">
                    <div className="form-group">
                        <input 
                        type="text" 
                        className="btn btn-default"
                        name="search"
                        autoComplete="off"
                        value={props.searchTerm}
                        onChange={handleSearch}
                        placeholder="Search Share" />
                    </div>
                    </div>
                <ul className="nav navbar-nav navbar-right">
                <li><Link to="/" onClick={props.handleLogOut} className="home-page-link"><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li>
                </ul>
            </div>
            </nav>
            <br />
            <br />
            <br />
           </>
        )
    }

export default NavBarLogIn
