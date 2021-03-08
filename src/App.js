import React, {useCallback} from "react";
import "./style.css";
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countryList: [] };
  }


  async selectedOptionInfo(event) {
    if (event.keyCode == 13) {
      this.setState({countryList : []});
      const url = "https://restcountries.eu/rest/v2/name/" + event.target.value;
      var flagLink = "";
      const info = await axios.get(url);
      info.data.forEach(value => {
        this.setState({countryList : this.state.countryList.concat(value)});
      });
    }
  }

  render() {
    const countryNames = this.state.countryList.map((value, key) => {
      return <option key={key}>{value}</option>;
    });
    var obj = this.state.countryList;
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
          onKeyPress={() => this.selectedOptionInfo(event)}
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
}

export default App;
