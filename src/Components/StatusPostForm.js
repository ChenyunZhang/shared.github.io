import React, { useState } from "react";

function StatusPostForm(props) {
  // console.log(props.userInfo);
  const [post, setPost] = useState("");
  const [featured_image, setImageUrl] = useState(null);
  // console.log(featured_image)
  const id = props.info.id;

  let handlePostForm = (e) => {
    e.preventDefault();
    if (!featured_image) {
      fetch("https://share-backend-app.herokuapp.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          content: post,
          user_id: id,
        }),
      })
        .then((r) => r.json())
        .then((newPost) => {
          props.addPost(newPost);
          setPost("");
        });
    } else {
      const formData = new FormData();
      formData.append("content", post);
      formData.append("user_id", id);
      formData.append("featured_image", featured_image);

      fetch("https://share-backend-app.herokuapp.com/posts", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .then((newPost) => {
          props.addPost(newPost);
          setPost("");
          setImageUrl(null);
        });
    }
  };

  return (
    <form className="ui form status-form" onSubmit={handlePostForm}>
      <div className="field">
        <textarea
          placeholder="What's in your mind?"
          rows="6"
          name="post"
          value={post}
          className="news-item"
          onChange={(e) => setPost(e.target.value)}
          required
        />
      </div>

      <button className="ui instagram button" type="submit">
        Post
      </button>

      <label htmlFor="upload-photo">
        {!!featured_image ? (
          <div className="upload-button">one attachment</div>
        ) : (
          <div className="upload-button">upload picture</div>
        )}
      </label>

      <input
        type="file"
        accept="image/*"
        multiple={false}
        id="upload-photo"
        onChange={(e) => setImageUrl(e.target.files[0])}
      />
    </form>
  );
}

export default StatusPostForm;
