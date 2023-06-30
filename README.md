# MMonTheMove

```
import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [selectedFruit, setSelectedFruit] = useState("orange");
  const [value, setValue] = useState(Date);

  const handleChange = (e) => {
    if (selectedFruit === "apple") {
      setValue(new Date().toISOString().slice(0, 10));
    }
  };
  function submitChange() {
    console.log(value);
  }
  useEffect(() => {
    handleChange();
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <select
        value={selectedFruit}
        onChange={(e) => setSelectedFruit(e.target.value)}
      >
        <option disabled value="">
          Select
        </option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>

      <input
        type="text"
        value={selectedFruit === "apple" && new Date()}
        onChange={handleChange}
      />

      <button type="button" onClick={submitChange}>
        Button
      </button>
    </div>
  );
}


```
