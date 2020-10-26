import React, { useState } from "react";
import Nav from "./NavBarNotHome";
import FollowedSingleUser from "./FollowedSingleUser";
// import FollowedUserDetail from "./FollowedUserDetail"

function FollowedHouse(props) {

  const filteredUser = props.followed_people.filter((user) => {
    if(user.username){
      return user.username.toLowerCase().includes(props.search.toLowerCase()) || user.username.toLowerCase().includes(props.search.toLowerCase())
  }});

  const arrayOfFellowedPeople = filteredUser.map((followedUser) => (
    <FollowedSingleUser
      key={followedUser.id}
      user={followedUser}
      deleteFollower={props.deleteFollower}
      currentUserName={props.currentUserName}
      relationship={props.relationship}
      // renderUser={props.rrenderUser}
      // renderInfomation={props.renderInfomation}
    />
  ));

  const handleSearch = (e) =>{
    e.preventDefault()
    props.changeSearchTerm(e.target.value)
}
  return (
    <>
      <Nav props={props}/>
      <div className="ui internally celled grid">
        <div className="row">
          <div className="five wide column"></div>
          <div className="six wide column">
            <div className="ui segment">
            <h2>Manage my follows</h2>
            <input
                type="text"
                className="btn btn-default"
                name="search"
                autoComplete="off"
                value={props.search}
                onChange={handleSearch}
                placeholder="search user"
              />
              </div>
            {arrayOfFellowedPeople}
          </div>
          <div className="five wide column"></div>
          {/* <div className="eleven wide column">
           {props.renderUser ? <FollowedUserDetail renderUser={props.renderUser} /> : null}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default FollowedHouse;
