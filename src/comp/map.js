import React, { useState,useEffect } from "react";
import {ComposableMap,ZoomableGlobe,Geographies,Geography} from "react-simple-maps";
import { Motion, spring } from "react-motion";
import Data from "../data/110m.json";
import ReactTooltip from "react-tooltip";
import { scaleLinear } from "d3-scale";
// import cBp from "../data/country-by-population.json";


const mapStyles = { width: "50%",height: "auto"};

const colorScale = scaleLinear()
  // .domain([0,1000]);
  .domain([0,1200])
  .range(["#95ffff","#6bfaff", "#55c8cc", "#409699","#204b4c"]);
  // .range(["#ffedea", "#ff5233"]);

const Map =()=>{
  ///////API CALL
  const [hasError, setErrors] = useState(false);
  const [results, setResults] = useState([ ]);

  useEffect(() => {
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
      if(countries){
         }
 
    } catch (error) {
      setErrors(error);
    }
    console.log("Has error:", JSON.stringify(hasError));  
  }
  fetchData();

  },[]);

  // let cBps =cBp.find(r => r.country === results.properties.NAME_LONG);

const [turn,setTurn]=useState(1);
const [center,setCenter]=useState([0, 0]);
const [mounted, setMounted] = useState(true);
const [content, setContent] = useState("");

const LifecycleDemo=()=>{

useEffect(() => {
let interval = setTimeout(() => {
setCenter([center[0]+turn,center[1]]);
}, 10);
return () => clearTimeout(interval);
  },[]);
return "mounted";
}

const oneForTwo =()=>{
  toggle()
  toggleTurn()
  zeroCenter()
}
 const zeroCenter=()=>{
  setCenter([0,0])
 }
const toggleTurn=()=>{
  return(turn===1 ? setTurn(0) :  setTurn(1) )
}

const toggle = () => setMounted(!mounted);
const  changeCenter = center => () => ( setCenter( center ));

const circleProps={
  cx:"250",
  cy:"250",
  r:"175",
  fill:"transparent",
  stroke:"#A0B2A6",
  strokeWidth: 0.1,
};



      return (
        <div data-tip="" style={{ textAlign: "center"  }}>
        <div style={{ display: "none"  }} >{mounted && <LifecycleDemo />}</div>
        <button className="btn" onClick={oneForTwo}>{"Toggle Spin"}</button>
        <button className="btn" onClick={changeCenter([34.7818, 32.0853])}>{"Tel Aviv"}</button>
        <button className="btn" onClick={changeCenter([ 9.9937, 53.5511])}>{"Hamburg"}</button>
        <ReactTooltip  place="top" type="light" effect="float">
        {content}
        </ReactTooltip>
       <div className="mapWrap">
       <Motion
          defaultStyle={{
            x: center[0],
            y: center[1]
          }}
          style={{
            x: spring(center[0]),
            y: spring(center[1])
          }}
        >
          {({ x, y }) => (  
          <ComposableMap  width={500} height={500} projection="orthographic" projectionConfig={{ scale: 175 }} style={mapStyles}>        
            <ZoomableGlobe  center={[x, y]} >
            <circle style={circleProps}/>
            {results.length>0 &&( 
                <Geographies disableOptimization geography={Data}>
                {(geographies,proj) =>(       
                  geographies.map((geography,i) => {    
                     let d = results.find(s => s.CountryCode === geography.properties.ISO_A2);
                          return(
                      <Geography
                        key={i}
                        geography={geography}
                        projection={proj}
                        fill={d ? colorScale( (d["TotalConfirmed"]/geography.properties.population)*(1000000))  : "#F5F4F6"}
                        onMouseOver={() => {
                           setContent(geography.properties.NAME);
                        }}
                        onMouseOut={() => {
                          setContent("");
                        }}
                        onClick={()=>{
                          console.log(geography.properties.NAME);
                        }}
                        style={
                          {
                            ///default fill
                          default: {
                           
                            stroke: "#33329e",
                            strokeWidth: 0.10,
                            outline: "none",
                          },
                          hover: {
                            fill: "#61988E",
                            stroke: "#EABDA8",
                            strokeWidth: 0.10,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#61988E",
                            stroke: "#EABDA8",
                            strokeWidth: 1.25,
                            outline: "none"
                          },
                        }}
                        />                    
                      )                   
                      }
                    
                    ))}               
                    </Geographies>

                    )}

              </ZoomableGlobe>
            </ComposableMap>
          )}
        </Motion>
      </div>
     </div>
      )
}



export default Map;

// <button className="btn" onClick={fetchData}>Fetch Data</button>
