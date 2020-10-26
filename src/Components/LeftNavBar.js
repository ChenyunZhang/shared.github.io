import React from "react";
import { Link } from "react-router-dom";
import Today from "./TodayInHistory";
import GenderNotosay from "./GenderNotosay";
import She from "./GenderShe";
import He from "./GenderHe";
import They from "./GenderThey";

function LeftNavBar(props) {
  // console.log(props.userInfo)
  let gender;
  if (props.userInfo.gender === "She/her") {
    gender = <She userInfo={props.userInfo} />;
  } else if (props.userInfo.gender === "He/him") {
    gender = <He userInfo={props.userInfo} />;
  } else if (props.userInfo.gender === "They/them") {
    gender = <They userInfo={props.userInfo} />;
  } else {
    gender = <GenderNotosay userInfo={props.userInfo} />;
  }

  return (
    <>
      <div className="ui divided items">
        <Today />
        <hr />
        <div className="content news-item">
          <div className="ui segment">
            <div className="ui centered card">
              <img
                className="ui image left-bar"
                src={
                  props.userInfo.avatar
                    ? props.userInfo.avatar
                    : "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                }
              ></img>
              <div className="content">
                <div className="ui two buttons">
                  <Link className="ui labeled button" tabIndex="0" to="/myposts">
                    <div className="ui violet button">
                      <i className="heart icon"></i> Post:{" "}
                    </div>
                    <i className="ui basic violet left pointing label">
                      {
                        props.posts.filter(
                          (postObj) => postObj.user_id === props.userInfo.id
                        ).length
                      }
                    </i>
                  </Link>

                  <Link className="ui labeled button" tabIndex="0" to="/">
                    <div className="ui blue button">
                      <i className="heart icon"></i> Like:{" "}
                    </div>
                    <i className="ui basic blue left pointing label">
                      {
                        props.likes.filter(
                          (likeObj) => likeObj.user_id === props.userInfo.id
                        ).length
                      }
                    </i>
                  </Link>
                </div>
              </div>

              <div className="content">
                <div className="ui list">
                  <div className="item">
                    <i className="user icon"></i>
                    <div className="content">{props.userInfo.username}</div>
                  </div>

                  <div className="item">
                    <i className="marker icon"></i>
                    <div className="content">
                      {props.userInfo.location
                        ? props.userInfo.location
                        : "Mars"}
                    </div>
                  </div>

                  {gender}

                  <div className="item">
                    <i className="mail icon"></i>
                    <div className="content">{props.userInfo.email}</div>
                  </div>

                  <div className="item">
                    <i className="users icon"></i>
                    <div className="content">
                      <Link to="/followeds">
                        Followed: {props.userInfo.followed.length}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="content">{arrayOfFollowers}</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftNavBar;
