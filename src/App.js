import React, { useState, useEffect, useRef } from "react";
import { data } from "./data.js";

function App() {
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const [vilages, setVilages] = useState([]);

  const createOption = (value, key) =>  <option key={key}>{value}</option>;


  const changeHandler = (levelName, dataList, leveType) => {
    dataList.forEach((level) => {
      if (levelName === level.name) {
        mapDataToSelects(level.children, leveType);
      }
    });
  };

  const mapDataToSelects = (levels, leveltype) => {
    switch (leveltype) {
      case "districts":
        setDistricts(levels);
        break;
      case "sectors":
        setSectors(levels);
        break;
      case "cells":
        setCells(levels);
        break;
      case "villages":
        setVilages(levels);
        break;
    }
  };

  const setDefaults = () => {
    if (provinces.length > 0) {
      setDistricts(provinces[0].children);
    } else if (districts.length > 0) {
      setSectors(districts[0].children);
    } else if (sectors.length > 0) {
      setCells(sectors[0].children);
    } else if (cells.length > 0) {
      setVilages(cells[0].children);
    }
  };

  useEffect(() => {
    setProvinces(data);
  }, [provinces, districts, sectors, cells, vilages]);
  return (
    <div className="App">
      <div className="container container-fluit">
        <div className="row">
          <div className="col-3"></div>

          <div className="col-8">
            <h1>Admnistrative structures</h1>
            <br />
            <br />
            <br />
            <label>Select province</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) =>
                changeHandler(e.target.value, provinces, "districts")
              }
             
            >
              <option>Select province</option>
              {provinces.map((province, index) =>
                createOption(province.name, index)
              )}
            </select>

            <label>Select district</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) =>
                changeHandler(e.target.value, districts, "sectors")
              }
            >
               <option>Select district</option>
              {districts.map((district, index) =>
                createOption(district.name, index)
              )}
            </select>
            <label>Select sector</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => changeHandler(e.target.value, sectors, "cells")}
            >
               <option>Select sector</option>
              {sectors.map((sector, index) => createOption(sector.name, index))}
            </select>
            <label>Select cells</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => changeHandler(e.target.value, cells, "villages")}
            >
               <option>Select cell</option>
              {cells.map((cell, index) => createOption(cell.name, index))}
            </select>

            <label>Select village</label>
            <select className="form-select" aria-label="Default select example">
            <option>Select village</option>
              {vilages.map((vilage, index) => createOption(vilage.name, index))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
