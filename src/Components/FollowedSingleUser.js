import React from "react";
import FollowedPagebutton from "./FollowedPagebutton";

function FollowedSingleUser(props) {
  // const handleClick = () => {
  //   props.renderInfomation(props)
  // };

  return (
    <>
      <div className="ui card fluid news-item">
        <div className="content">
          <div className="right floated meta">
            <FollowedPagebutton
              user={props.user}
              deleteFollower={props.deleteFollower}
              currentUserName={props.currentUserName}
              relationship={props.relationship}
            />
          </div>
          <img
          // onClick={handleClick}
            className="ui avatar image"
            src={
              props.user.avatar
                ? props.user.avatar
                : "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            }
          />{" "}
          {props.user.username}
        </div>
      </div>
    </>
  );
}

export default FollowedSingleUser;
