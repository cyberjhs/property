import React, { useEffect, useState } from 'react'
import Arrow from './assets/DownArrow.svg'
import bath from './assets/bath.svg'
import bedroom from './assets/bedroom.svg'
import heart from './assets/heart.svg'
import DataE from '../DataEstate'
import redHeart from './assets/red-heart.svg'

const getData = () => {
  let data = localStorage.getItem('state')
  if(data){
    return JSON.parse(data);
  }
  else{
    return [];
  }
}

const Main = () => {

  const [location,setLocation] = useState("");
  const [price,setPrice] = useState("Under 20000 $");
  const [bed,setBed] = useState("Under 20");
  const [baths,setBath] =useState("Under 20");
  const [newData,setNewData] = useState([DataE])
  const [saveData,setSaveData] = useState(getData);
  const cost = parseInt(price.split(" ")[1]);
  const beds = parseInt(bed.split(" ")[1]);
  const bathrooms = parseInt(baths.split(" ")[1]);
  
  useEffect(() => {
    const FilterData = DataE.filter((Data) =>{
      if(Data.Location.startsWith(location) && 
      Data.Price<=(cost) && Data.Beds<=beds && Data.Bath<=bathrooms){
        return true;
      }
      return false;
    })
    setNewData(FilterData);
  },[location,cost,beds,bathrooms])

  
  const SavedDataOnClick = (idx) => {
    if(saveData.indexOf(DataE[idx]) === -1){
      setSaveData([...saveData,DataE[idx]]);
      newData[idx].isclick = true;
    }
    else{
      saveData.splice(saveData.indexOf(DataE[idx]),1)
      setSaveData([...saveData]);
      newData[idx].isclick = !true;
    }
  }

  useEffect(() => {
      localStorage.setItem('state', JSON.stringify(saveData));
  },[saveData])

  return (
    <div>
      <div className='sectionHeader'>
        <p>Search properties to rent</p>
        <span className='searchInput'><input type={"text"} placeholder="Search With Search Bar"/><img src={Arrow} alt="Search"/></span>
      </div>
      <div className='filterResult'>
            <div>
                <span>Location</span>
                <select onChange={((e) => setLocation(e.target.value))}>
                    <option value={""}>All Location</option>
                    <option>1520 New York Ave</option>
                    <option>1035 New Jersey Ave</option>
                    <option>109 Howard Street</option>
                    <option>301 Philadelphia Ave</option>
                    <option>205 Perry Street.</option>
                    <option>209 Congress Street</option>
                </select>
            </div>
            <div>
                <span>Prices</span>
                <select onChange={((e) => setPrice(e.target.value))}>
                    <option value={"Under 20000 $"}>All Prices</option>
                    <option>Under 5000 $</option>
                    <option>Under 9000 $</option>
                    <option>Under 12000 $</option>
                    <option>Under 14000 $</option>
                    <option>Under 16000 $</option>
                </select>
            </div>
            <div>
                <span>Bedrooms</span>
                <select onChange={((e) => setBed(e.target.value))}>
                    <option value={"Under 20"}>Under Max</option>
                    <option>Under 7</option>
                    <option>Under 8</option>
                    <option>Under 9</option>
                    <option>Under 10</option>
                    <option>Under 11</option>
                </select>
            </div>
            <div>
                <span>BathRoom</span>
                <select onChange={((e) => setBath(e.target.value))}>
                    <option value={"Under 20"}>Under Max</option>
                    <option>Under 4</option>
                    <option>Under 6</option>
                    <option>Under 7</option>
                    <option>Under 9</option>
                    <option>Under 11</option>
                </select>
            </div>
            <div>Search</div>
      </div>
      <div className='card'>
        {newData.map((ele,idx) =>{
          return(
            <div key={idx} className='cardItems'>
            <div className='cardImage' style={{backgroundImage: `url(${ele.Thumbnail})`}}></div>
            <div className='cardDetails'>
              <div>
                <span className='locationAndPrice'>
                  <span>$ {ele.Price}<span> /Week</span></span>
                  <p>{ele.Location}</p>
                </span>
                <img width={'40px'} src={newData[idx]?.isclick?(redHeart):(heart)} alt="heart" onClick={() => SavedDataOnClick(idx)}/>
              </div>
              <div className='bedBath'>
                <span><img src={bedroom} width={'40px'} alt='bedroom'/><p>{ele.Beds}&nbsp;Beds</p></span>
                <span><img src={bath} width={'40px'} alt='bathroom'/><p>{ele.Bath}&nbsp;Bath</p></span>
              </div>
            </div>
          </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Main