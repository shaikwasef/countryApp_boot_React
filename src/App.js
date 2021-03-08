import React, {useState , useCallback} from "react";
import "./style.css";
import axios from "axios";


function App() {

  const [countryList,setCountryList] = useState([]);

  const selectedOptionInfo = async (e) => {
    if (event.keyCode == 13) {
      alert("key");
      setCountryList([]);
      const url = "https://restcountries.eu/rest/v2/name/" + event.target.value;
      var flagLink = "";
      const info = await axios.get(url);
      info.data.forEach(value => {
       setCountryList(countryList.concat(value));
      });
    }
  };

    const countryNames = countryList.map((value, key) => {
      return <option key={key}>{value}</option>;
    });
    var obj = countryList;
    obj.sort((a,b) => b.population -a.population);
    const tableContent = obj.map((data)=> 
    {return(
      <tr>
      <th><img src = {data.flag} style={{width : "100px"}}/></th>
      <th>{data.name}</th>
      <th>{data.capital}</th>
      <th>{data.region}</th>
      <th>{data.subregion}</th>
      <th>{data.population}</th>
      </tr>
    );})
    
    return (
      <div className="container">
        <input
          onKeyPress={(event) => selectedOptionInfo(event)}
          placeholder="enter country name"
        />
        <table>
          <tr>
            <th>FLAG</th>
            <th>NAME</th>
            <th>CAPITAL</th>
            <th>REGION</th>
            <th>SUBREGION</th>
            <th>POPULATION</th>
          </tr>
          {tableContent}
        </table>
      </div>
    );
}

export default App;
