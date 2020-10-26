import React, { useState } from "react";

function FollowedPagebutton(props) {
  const [follow, setFollow] = useState(true);

  const handleFollow = () => {
    const relationshipObj = props.relationship.filter(relationshipObj => relationshipObj.followed_id === props.user.id)[0]
    fetch(`https://shared-backend.herokuapp.com/relationships/${relationshipObj.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((unfollow) => {
        props.deleteFollower(unfollow);
        setFollow((preState) => !preState);
      });
  };

  const buttonClass = "ui blue basic label"

  return (
    <>
      <div className="right floated meta">
        <div className={follow ? buttonClass : null } onClick={handleFollow}>
          {follow ? "unfollow" : ""}
        </div>
      </div>
    </>
  );
}

export default FollowedPagebutton;
