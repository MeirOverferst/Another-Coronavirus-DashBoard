
import { useState } from 'react'



export const Fetcher=()=>{

  const [hasError, setErrors] = useState(null);
  const [results, setResults] = useState(" ");

 

  fetch("https://api.covid19api.com/summary")
  .then(res => res.json())
  .then(json => {
    if (json) {
      setResults(json)
    } else {
      setResults(" ")
    }
  })
  .catch(err => {
    setErrors(err)
  
  })
console.log("results",results);

  return {hasError,results}
}
























//   fetch("https://api.covid19api.com/summary", requestOptions)
//   .then(res => res.json())
//   if (json) {
//     setResults(json)
//   } else {
//     setResults(" ")
//   }
// })

// .catch(err => {
//   setErrors(err)
  
// })},[])




//   async function fetchData() {
//     try {
// ;    
//         const response = await 
//         const json = await response.json();
//         const countries =json.Countries;
        
//         setResults(countries);
//       } catch (error) {
//         setErrors(error);
//       }
//     }
//   console.log("Has error:", JSON.stringify(hasError));    
//   console.log(results);


// return {hasError,results}

// }
 

