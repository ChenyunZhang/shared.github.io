import React, { Component } from "react";
// import { Link }  from "react-router-dom";
import Home from "./HomeShow";

export class UserHome extends Component {

  render() {
  
    return (
      <>
        <Home
        userInfo={this.props}
        searchTerm ={this.props.searchTerm}
        handleLogOut={this.props.handleLogOut} 
        changeSearchTerm={this.props.changeSearchTerm}
        addFollower={this.props.addFollower}
        deleteFollower={this.props.deleteFollower}
        />
      </>
    );
  }
}

export default UserHome;
