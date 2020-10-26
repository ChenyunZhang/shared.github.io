import React, { useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import UnFollowed from "./Unfollowed";

// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

function SharedPosts(props) {
  const handleLike = () => {
    if (props.like.every((l) => l.user_id !== props.currentUser.id)) {
      fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          user_id: props.currentUser.id,
          post_id: props.postObj.id,
        }),
      })
        .then((res) => res.json())
        .then((newLike) => {
          props.addLike(newLike);
        });
    } else {
      const likeObj = props.like.filter(
        (l) => l.user_id === props.currentUser.id
      )[0].id;
      fetch(`http://localhost:3000/likes/${likeObj}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((deleteLike) => {
          props.deleteLike(deleteLike);
        });
    }
  };

  // ########################################################################

  // allow user to post without image.
  const postImage = props.postObj.featured_image
    ? props.postObj.featured_image.url
    : null;

  const handlePostClick = () => {
    fetch(`https://share-backend-app.herokuapp.com/posts/${props.postObj.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedObj) => {
        props.deletePost(deletedObj);
      });
  };
  // ########################################################################

  const [commentState, setCommentState] = useState(false);
  const handleComment = () => {
    setCommentState((preState) => !preState);
  };

  let arrayOfComment = props.comment.map((commentObj) => (
    <Comment
      key={commentObj.id}
      comment={commentObj}
      post={props.postObj}
      user={props.currentUser}
      deleteComment={props.deleteComment}
    />
  ));

  // ###########################################################

  let button;

  // const [follow, setFollow] = useState();

  const isFollowed = () => {
    if (props.postObj.user_id === props.currentUser.id) {
      return null;
    } else if (
      props.currentUser.followed.some((obj) => obj.id === props.postObj.user_id)
    ) {
      return (button = (
        <FollowButton
          currentUser={props.currentUser}
          postObj={props.postObj}
          deleteFollower={props.deleteFollower}
        />
      ));
    } else {
      return (button = (
        <UnFollowed
          currentUser={props.currentUser}
          postObj={props.postObj}
          addFollower={props.addFollower}
        />
      ));
    }
  };

  // ########################################################################

  return (
    <>
      <div className="ui centered card post">
        <div className="content">
          {isFollowed()}
          <img
            className="ui avatar image"
            src={
              props.postObj.user.avatar
                ? props.postObj.user.avatar
                : "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            }
          />
          {props.postObj.user.username}
        </div>
        <div className="image card-image">
          <img src={props.postObj.image ? props.postObj.image : postImage} />
        </div>
        <div className="content">
          <div className="right floated">
            {props.postObj.user.id === props.currentUser.id ? (
              <i
                className="trash alternate outline icon"
                onClick={handlePostClick}
              ></i>
            ) : null}
          </div>
          <div className="header">{props.postObj.content}</div>
        </div>
        <div className="content">
          <span className="right floated">
            <i
              className={`red heart ike icon
            ${
              props.like.some(
                (likeobj) => likeobj.user_id === props.currentUser.id
              )
                ? null
                : "outline"
            }
            `}
              onClick={handleLike}
            ></i>
            {`${props.like.length} ${props.like.length > 1 ? "likes" : "like"}`}
          </span>
          <i className="comment outline icon" onClick={handleComment}></i>
          {`${props.comment.length} comments`}
        </div>
        {commentState ? (
          <CreateComment
            currentUser={props.currentUser}
            postObj={props.postObj}
            addComment={props.addComment}
          />
        ) : null}

        {commentState ? arrayOfComment : null}
      </div>
    </>
  );
}

export default SharedPosts;
