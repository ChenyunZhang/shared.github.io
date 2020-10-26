import React from "react";
// import Modal  from 'react-bootstrap/Modal'
// import Button  from 'react-bootstrap/Button'

function Comment(props) {
  // console.log(props)
  const handleCommentDelete = () => {
      fetch(`https://shared-backend.herokuapp.com/comments/${props.comment.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((deletedCommentObj) => {
          props.deleteComment(deletedCommentObj.id);
        });
    };
  ;

  return (
    <>
    <div className="content">
      <div className="ui list">
        <div className="item">
          <img className="ui avatar image" src={props.comment.user.avatar ? props.comment.user.avatar : "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"} />

          <div className="content">
            <div className="author">{props.comment.user.username}</div>
            <div className="meta">
              <span className="date">{props.comment.created_time}</span>
            </div>
            <div className="text">{props.comment.content}</div>
            <div className="actions right floated">
              {props.comment.user_id === props.user.id ? (
                <i
                  className="trash alternate icon"
                  onClick={handleCommentDelete}
                >
                </i>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Comment;
