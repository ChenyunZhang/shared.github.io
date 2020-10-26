import React, { useState, useEffect } from "react";
import PostForm from "./StatusPostForm";
import SharedPosts from "./SharedPosts";
import LeftNavBar from "./LeftNavBar";
import RightNavBar from "./RightNavBar";
import Nav from "./NavBarLogIn";

function HomeShow(props) {
  const [posts, setPost] = useState([]);
  const [likes, setLike] = useState([]);
  const [comments, setComment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const url1 = "https://share-backend-app.herokuapp.com/posts";
  const url2 = "https://share-backend-app.herokuapp.com/likes";
  const url3 = "https://share-backend-app.herokuapp.com/comments";

  const promises = Promise.all([fetch(url1), fetch(url2), fetch(url3)]);

  useEffect(() => {
    promises
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((res) => {
        setPost(res[0]);
        setLike(res[1]);
        setComment(res[2]);
      });
  }, []);

  // ##############################################################################

  let addPost = (newPost) => {
    let copyOfPost = [newPost, ...posts];
    setPost(copyOfPost);
  };

  let deletePost = (deletedPostObj) => {
    let copyOfPosts = posts.filter((postObj) => {
      return postObj.id !== deletedPostObj.id;
    });
    const likeObjj = likes.filter((likeObj) => likeObj.post.id === deletedPostObj.id)
    if(!!likeObjj[0]){
      deleteLike(likeObjj[0])
    }
    setPost(copyOfPosts);
  };

  // ################################################################################
  let addLike = (newLike) => {
    const newLikeArr = [...likes, newLike];
    setLike(newLikeArr);
  };

  let deleteLike = (deletedLikeObj) => {
    let copyOfLikes = likes.filter((likeObj) => {
      return likeObj.id !== deletedLikeObj.id;
    });
    setLike(copyOfLikes);
  };

  // ###################################################################################
  let addComment = (newComment) => {
    const newCommentArr = [newComment, ...comments];
    setComment(newCommentArr);
  };

  let deleteComment = (deletedCommentObj) => {
    let copyOfComments = comments.filter((commentObj) => {
      return commentObj.id !== deletedCommentObj;
    });
    setComment(copyOfComments);
  };

  // ###################################################################################
  // const addFollower = (newRelationship) => {
  //   const newRelationshipArr = [newRelationship, ...relationship];
  //   setRelationship(newRelationshipArr);
  // };

  // const deleteFollower = (deleteRelationshipObj) => {
  //   let copyOfRelationships = relationship.filter((relationshipObj) => {
  //     return relationshipObj.followed_id !== deleteRelationshipObj.followed_id;
  //   });
  //   setComment(copyOfRelationships);
  // };

  // ###################################################################################
  const changeSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  let filteredPost = posts.filter((post) => {
    if(post.content){
      return post.user.username.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase())
  }});
  // ###################################################################################
  let arrayofPosts = filteredPost.map((post) => (
    <SharedPosts
      key={post.id}
      postObj={post}
      currentUser={props.userInfo}
      deletePost={deletePost}
      addLike={addLike}
      deleteLike={deleteLike}
      addComment={addComment}
      deleteComment={deleteComment}
      addFollower={props.addFollower}
      deleteFollower={props.deleteFollower}
      comment={comments.filter((comment) => comment.post_id === post.id)}
      like={likes.filter((like) => like.post_id === post.id)}
    />
  ));

  // ##############################################################################

  // #########################################################################
  return (
    <>
      <Nav
        userInfo={props}
        searchTerm={searchTerm}
        handleLogOut={props.handleLogOut}
        changeSearchTerm={changeSearchTerm}
      />
      <div className="ui internally celled grid">
        <div className="row">
          <div className="four wide column">
            <LeftNavBar
              userInfo={props.userInfo}
              likes={likes}
              posts={posts}
            />
          </div>
          <div className="seven wide column">
            <PostForm 
            info={props.userInfo}
            addPost={addPost} />
            {arrayofPosts}
          </div>

          {/* third part */}
          <div className="five wide column">
            <RightNavBar
              userInfo={props.userInfo}
              likes={likes}
              posts={posts}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeShow;
