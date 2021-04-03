import React, {useState , useCallback , useRef} from "react";
import "./style.css";
import axios from "axios";
import debounce from "lodash.debounce";


function App() {

  const [countryList,setCountryList] = useState([]);
  const countryInput = useRef(null);

  const selectedOptionInfo = async (value) => {
      setCountryList([]);
      if(value != ""){
      const url = "http://localhost:8080/application/webapi/countries/" + value;
      const info = await axios.get(url);
      info.data.map(value => {
       setCountryList(countryList => countryList.concat(value));
      });}
  };

  const clearBlackList = async  () => {
    const url = "http://localhost:8080/application/webapi/countries" ;
    const info = await axios.delete(url,{},{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    selectedOptionInfo(countryInput.current.value);
  }
  const onPressDebounce = useCallback(debounce(selectedOptionInfo,1000),[]);

  const onBlackList = async (value) =>{
    console.log(value);
    const url = "http://localhost:8080/application/webapi/countries";
    var object = {};
    countryList.map((country) => {
      if(country.name == value){
        object = country;
      }
    });
    const res = await axios.post(url,object,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    selectedOptionInfo(countryInput.current.value);
  }

    
    const tableContent = countryList.map((data,index)=>
   
    {
      return(
      <tr key = {index}>
      <th><img src = {data.flag} style={{width : "100px"}}/></th>
      <th>{data.name}</th>
      <th>{data.capital}</th>
      <th>{data.region}</th>
      <th>{data.subregion}</th>
      <th>{data.population}</th>
      <th>
      <input type="checkbox"  value={data.name} onChange = {(event) => onBlackList(event.target.value)}/>
      <label>BLACK LIST</label>
      </th>
      </tr>
    );})
    
    return (
      <div className="container">
        <input
          ref={countryInput}
          onKeyPress={(event) => onPressDebounce(event.target.value)}
          placeholder="enter country name"
        />
        <div>
        <button type="checkbox" onClick = {(event => clearBlackList())}>CLEAR BLACK LIST</button>
        </div>
        <table>
        <tbody>
          <tr>
            <th>FLAG</th>
            <th>NAME</th>
            <th>CAPITAL</th>
            <th>REGION</th>
            <th>SUBREGION</th>
            <th>POPULATION</th>
            <th>BLACKLIST</th>
          </tr>
          {tableContent}
          </tbody>
        </table>
      </div>
    );
}

export default App;
