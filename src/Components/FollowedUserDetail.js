import React, { useState } from "react";

function FollowedUserDetail(props) {
  const [postArr, setPostArr] = useState([]);
  const [likedArr, setLikedArr] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  fetch("https://shared-backend.herokuapp.com/users")
    .then((r) => r.json())
    .then((allUsers) => {
      const current = allUsers.filter(
        (userObj) => userObj.id === props.renderUser.user.id
      )[0];

      setPostArr(current.posts);
      setLikedArr(current.likes.post);
      setCurrentUser(current);
      //   console.log(currentUser.likes.map(like => like.post))
    });

  return (
    <>
      <div class="ui cards stackable followed-user-profile">
        {/* <div class="ui centered card"> */}
          <div class="image followed-user-profile-image">
            <img className="image followed-user-profile-image centered" src={currentUser.avatar} />
          </div>
        {/* </div> */}

        <div class="ui card followed-user-profile">
          {/* <div class="ui segment"> */}
          <div className="content">
          <p></p>
          <p></p>
            <p> <i className="mail icon"></i>Email: {currentUser.email} </p>
            <p> <i className="marker icon"></i>Location: {currentUser.location} </p>
            <p>  <i class="pencil alternate icon"></i>Posts: {`${postArr.length} posts`} </p>
            <p>  <i class="user secret icon"></i>Gender: {currentUser.gender} </p>
          {/* </div> */}
        </div>
        </div>
        {/* <div class="content">
            <div class="header">{currentUser.username}</div>
            <div class="meta">
              <a>email</a>
            </div>
            <div class="description">
              {currentUser.email}
            </div>
          </div>
          <div class="extra content">
            <span class="right floated"><i className="marker icon"></i>{currentUser.location}</span>
            <span>
              <i class="user icon"></i>
              {`${postArr.length} posts`}
            </span>
          </div>
        </div> */}
      </div>

      <div className="ui internally celled grid">
        <div className="row">
          <div className="eight wide column">{`${currentUser.username}'s liked posts`}</div>
          <div className="eight wide column">{`${currentUser.username}'s posts`}</div>
        </div>
      </div>
    </>
  );
}

export default FollowedUserDetail;
