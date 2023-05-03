import React, { useEffect, useState } from 'react'
import InputField from '../../../components/InputField'
import axios from 'axios'
import Navbar from '../../../components/Navbar'

function Parts() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)



useEffect(() => {
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 1c5914b1-9eaf-3aa7-a0d9-cf11c0a72e10"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData("https://eu.ipaas.samsung.com/eu/gcic/GetPartsInfo/1.0/ImportSet", {
    
  "IsCommonHeader": {
      "Company": "C720",
      "AscCode": "1730640",
      "Lang": "EN",
      "Country": "ZA",
      "Pac": "999999920180502152320"
  },
  "IvPartsNo": "DA32-00011E"

}).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
}, [])

  return (
    <>
    <Navbar />
   <main>
    <div className="container mx-auto">
    <section className="my-4">
      <h2></h2>
            <InputField className="searchInput input" name="search" type="search" placeholder="Search here" />
            
          </section>
    </div>
   </main>
    </>
  )
}

export default Parts