import React, { useEffect, useState } from "react";

function TodayInHistory() {
  const date = new Date();
  // const y = date.getFullYear();
  const d = date.getDate();
  const monthIndex = date.getMonth();
  const m = monthIndex + 1;
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch(`http://numbersapi.com/${m}/${d}/date`)
      .then((r) => r.text())
      .then((quoteOftheday) => {
        setQuote(quoteOftheday);
      });
  }, []);


  return (
    <div>
      <div className="item">
        <h2>Today in History</h2>
        <div className="ui segment news-item">
          <p>{quote}</p>
        </div>
      </div>
    </div>
  );
}

export default TodayInHistory;
