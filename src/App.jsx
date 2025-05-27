import { useState } from "react";
import "./App.css";

function App() {
  const [datePosted, setDatePosted] = useState("anyTime");
  const [jobType, setJobType] = useState("fullTime");
  const [onsiteRemote, setOnSiteRemote] = useState("onSite");
  const [search, setSearch] = useState("");
  const [jobList, setJobList] = useState([]);
  function executeSearch() {
    fetch(
      `https://linkedin-data-api.p.rapidapi.com/search-jobs?keywords=${search}&datePosted=${datePosted}&jobType=${jobType}&onsiteRemote=${onsiteRemote}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "376005f580msh398cf232769c1b0p1c6ea7jsn3edc47131b1b",
          "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
        },
      }
    )
      .then((resultat) => {
        return resultat.json();
      })
      .then((result) => {
        console.log(result);

        setJobList(result);
      });
  }

  return (
    <div className="main">
      <div className="search">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="Search Job..."
        />
        <div className="filters">
          <select
            value={datePosted}
            onChange={(e) => {
              setDatePosted(e.target.value);
            }}
            name="datePosted"
          >
            <option value="anyTime">anyTime</option>
            <option value="pastMonth">pastMonth</option>
            <option value="pastWeek">pastWeek</option>
            <option value="past24Hours">past24Hours</option>
          </select>
          <select
            value={jobType}
            onChange={(e) => {
              setJobType(e.target.value);
            }}
            name="jobType"
          >
            <option value="fullTime">fullTime</option>
            <option value="partTime">partTime</option>
            <option value="contract">contract</option>
            <option value="internship">internship</option>
          </select>
          <select
            value={onsiteRemote}
            onChange={(e) => {
              setOnSiteRemote(e.target.value);
            }}
            name="onsiteRemote"
            id=""
          >
            <option value="onSite">onSite</option>
            <option value="remote">remote</option>
            <option value="hybrid">hybrid</option>
          </select>
        </div>
        <button onClick={executeSearch}>Search</button>
      </div>
    </div>
  );
}

export default App;
