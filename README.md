# MMonTheMove

```
import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("");

  // Allow user to select only today's date
  var today = new Date().toISOString().split("T")[0];
  function handleSelectChange(e) {
    setSelectedOption(e.target.value);
  }
  function submitChange(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedDate = formData.get("date");
    console.log("Selected option", selectedOption);
    console.log("Selected date", selectedDate);
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <form onSubmit={submitChange}>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option disabled value="">
            Select
          </option>
          <option value="Booked in">Booked in</option>
          <option value="Repair in progress">Repair in progress</option>
          <option value="Parts pending">Parts pending</option>
          <option value="Parts issued">Parts issued</option>
          <option value="Quote pending">Quote pending</option>
          <option value="Waiting for customer">Waiting for customer</option>
          <option value="Repair completed">Repair completed</option>
          <option value="Pending Q&A">Pending Q&A</option>
          <option value="SO Cancel">SO Cancel</option>
          <option value="Scrap approved">Scrap approved</option>
          <option value="Waiting for parts">Waiting for parts</option>
          <option value="For invoicing">For invoicing</option>
        </select>

        {/* Can only select today's date */}
        <input type="date" name="date" min={today} max={today} />

        <button type="submit">Button</button>
      </form>
    </div>
  );
}




```
