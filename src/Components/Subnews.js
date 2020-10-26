import React from "react";
import { Link } from "react-router-dom";

function Subnews(props) {
//   console.log(props);
  return (
    <>
      <div className="ui segment news-item">
        <div className="ui divided items">
          <div className="item">
            <div className="content">
              <a className="header" href={props.url} target="_blank">
                {props.title}
              </a>
              <div className="meta news-description">
                <span>{props.description}</span>
              </div>
              {/* <div className="meta description news-description">
                <p>{props.description}</p>
              </div> */}
                <div className="extra">{props.published_date}</div>
            </div>
            <div className="image ">
              <img src={props.image} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subnews;
