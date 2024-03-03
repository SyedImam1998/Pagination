import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = React.useState([]);
  const [pageNum,setPageNum]=useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:4000/getData/?page="+pageNum);
      console.log("data.data", data.data);
      setData(data.data.data)
    };

    fetchData();
  }, [pageNum]);

  return (
    <div>
      <div>
        {data.length > 0 &&
          data.map((item,index) => {
            return <div key={index}>{item.name}</div>;
          })}
      </div>
      <br></br>
      <div className="pagination">
        <label  onClick={()=>setPageNum(1)}>1</label>
        <label onClick={()=>setPageNum(2)}>2</label>
      </div>
    </div>
  );
}

export default App;
