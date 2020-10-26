import React, { useState } from 'react'

function Unfollowed(props) {

    const [follow, setFollow] = useState(true)

    const handleFollow=(e) =>{
    fetch("https://share-backend-app.herokuapp.com/relationships", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          follower_id: props.currentUser.id,
          followed_id: props.postObj.user.id,
        }),
      })
        .then((res) => res.json())
        .then((startFollow) => {
          props.addFollower(startFollow);
          setFollow(preState => !preState)
        });
    }
    
    return (
        <>
        <div className="right floated meta">
          <div className="ui blue basic label" onClick={handleFollow}>
          {follow ? "follow" : "unfollow"}
          </div>
        </div>
      </>
    )
}

export default Unfollowed
