"use client";

import { useState } from "react";

const Counter = ({ data }) => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>{count}</button>
      {
        <ul>
          {data.map((el) => (
            <li key={el.id}>{el.id}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Counter;
