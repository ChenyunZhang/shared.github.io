import React, { useEffect, useState } from "react";

function TodayInHistory() {
  const date = new Date();
  // const y = date.getFullYear();
  const d = date.getDate();
  const monthIndex = date.getMonth();
  const m = monthIndex + 1;
  const [quote, setQuote] = useState("");
  // const hours = date.getHours()
  // const minutes = date.getMinutes()
  // const seconds = date.getSeconds()

  useEffect(() => {
    fetch(`http://numbersapi.com/${m}/${d}/date`)
      .then((r) => r.text())
      .then((quoteOftheday) => {
        setQuote(quoteOftheday);
      });
  }, []);

  // const getTodayHistory =() =>{
  //   fetch(`http://numbersapi.com/${m}/${d}/date`)
  //   .then((r) => r.text())
  //   .then((quoteOftheday) => {
  //     setQuote(quoteOftheday);
  //   });
  // }

  // const handleClick =() =>{
  //   getTodayHistory()
  // }

  return (
    <div>
      <div className="item">
        <h2>Today in History</h2>
        {/* <i class="redo alternate icon" onClick={handleClick}></i> */}
        <div className="ui segment news-item">
          <p>{quote}</p>
        </div>
      </div>
    </div>
  );
}

export default TodayInHistory;
