# MMonTheMove

```
import "./styles.css";
import {useState}from "react"

export default function App() {
  const [selectedValue, setSelectedValue] =  useState("")
  const [value, setValue] =  useState("");
  let d = new Date();
  var today = d.toISOString().split('T')[0];
  // var yesterday = d.setDate(d.getDate() -1);

  function submit (){
    console.log(selectedValue)
    console.log(value)
  }
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <select value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
        <option value="" disabled>Select</option>
        <option value="apple" >Apple</option>
        <option value="banana" >Banana</option>
      </select>

   
<input type="date" value={value} onChange={(e)=>{setValue(e.target.value)}}  min={today} max={today} />
<button type="button" onClick={submit}>Button</button>
    </div>
  );
}



```
