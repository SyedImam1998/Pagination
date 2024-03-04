import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = React.useState([]);
  const [hasPrev, setHasPrev] = React.useState(false);
  const [hasNext, setHasNext] = React.useState(false);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        "http://localhost:4000/getData/?page=" + pageNum
      );
      console.log("data.data", data.data);
      setHasPrev(data.data.hasPreviousPage);
      setHasNext(data.data.hasNextPage);
      setData(data.data.data);
    };

    fetchData();
  }, [pageNum]);

  const loadData = (operation) => {
    if (operation === "prev") {
      setPageNum(pageNum - 1);
    } else if (operation === "next") {
      setPageNum(pageNum + 1);
    }
  };
  return (
    <div>
      <div>
        {data.length > 0 &&
          data.map((item, index) => {
            return <div key={index}>{item.name}</div>;
          })}
      </div>
      <br></br>
      <div className="pagination">
        {hasPrev && (
          <div className="paginationBtn" onClick={() => loadData("prev")}>
            Previous
          </div>
        )}
        {hasNext && (
          <div className="paginationBtn" onClick={() => loadData("next")}>
            Next
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
