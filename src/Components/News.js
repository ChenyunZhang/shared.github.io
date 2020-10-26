import React, { useState, useEffect } from "react";
import Subnews from "./Subnews";

function News() {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const num = getRandomInt(13);

  const [newsArr, setNewsArr] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.nytimes.com/svc/mostpopular/v2/shared/1.json?api-key=JC0T7bCpESCb2SGJBe6axdrSFW0X03H7"
    )
      .then((r) => r.json())
      .then((newsData) => {
        setNewsArr(
          newsData.results
            .filter((newsObj) => newsObj.media.length > 0)
            .slice(num, num + 3)
        );
      });
  }, []);
  //   console.log(newsArr);

  function updateNew() {
    fetch(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=JC0T7bCpESCb2SGJBe6axdrSFW0X03H7"
    )
      .then((r) => r.json())
      .then((newsData) => {
        setNewsArr(
          newsData.results
            .filter((newsObj) => newsObj.media.length > 0)
            .slice(num, num + 3)
        );
      });
  }
  //   console.log(newsArr.filter(newsObj => newsObj.media.length>0))

  let news = newsArr.map((newsObj) => (
    <Subnews
      key={newsObj.id}
      title={newsObj.title}
      published_date={newsObj.published_date}
      description={newsObj.nytdsection}
      url={newsObj.url}
      image={newsObj.media[0]["media-metadata"][0].url}
    />
  ));

  const handleClick = () => {
    updateNew();
  };

  return (
    <>
      <h2>
        News Time <i className="redo alternate icon" onClick={handleClick}></i>
      </h2>
      {news}
    </>
  );
}

export default News;
