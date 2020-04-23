import React, { useState } from "react";
import Map from "./map";

const Main = () => {
// Hooks Base actions
  const [hasError, setErrors] = useState(false);
  const [results, setResults] = useState(" ");

  async function fetchData() {
    try {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };    
        const response = await fetch("https://api.covid19api.com/summary", requestOptions);
        const json = await response.json();
        const countries =json.Countries;
        
        setResults(countries);
      } catch (error) {
        setErrors(error);
      }
    }
console.log("Has error:", JSON.stringify(hasError));    
console.log(results);

  return (      
    <div>
     <Map fetchData={fetchData}  />
   </div>
  );
};

export default Main;