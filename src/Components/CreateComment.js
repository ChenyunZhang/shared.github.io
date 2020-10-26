import React, { useState } from 'react'


function CreateComment(props) {

    const [commentContent, setCommentContent] = useState("");

    const handleCommentSubmit = (e) => {
      e.preventDefault();
  
      fetch(`https://shared-backend.herokuapp.com/comments`, {
        method: "POST",
        headers: {
          "content-type": "Application/json",
        },
        body: JSON.stringify({
          content: commentContent,
          post_id: props.postObj.id,
          user_id: props.currentUser.id,
        }),
      })
        .then((res) => res.json())
        .then((newComment) => {
          // props.handleUserUpdate(updatedUser);
          props.addComment(newComment);
          setCommentContent("")
        });
    };

    return (
        <>
        <div className="extra content">
          <form className="ui form" onSubmit={handleCommentSubmit}>
            <div className="field">
              <textarea
                rows="2"
                autoComplete="off"
                placeholder="Comment here"
                value={commentContent}
                required
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
            </div>
            <button className="ui primary basic button">comment</button>
          </form>
        </div>
        </>
    )
}

export default CreateComment
