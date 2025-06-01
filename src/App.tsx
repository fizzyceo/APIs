import { useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import axios from "axios";
interface Actionneur {
  name: string;
  pourcentage: number;
}
interface Company {
  name: string;
  logo: string;
  actionneurs: Actionneur[];
  sav?: SAV;
  services: Service[];
}
enum SERVICE_TYPE {
  REPARATION,
  VENTE,
  CONSULTING,
}
interface Service {
  name: string;
  numberOfEmployees: number;
  type: SERVICE_TYPE;
}
interface SAV {
  dateDebut: Date;
  dateFin: Date;
  pourcentage: number;
}
interface Job {
  title: string;
  location?: string;
  datePosted?: Date;
  company: Company;
}
let job1: Job = {
  company: {
    name: "fizz",
    logo: "https://example.com",
    actionneurs: [
      { name: "zaki", pourcentage: 8.5 },
      { name: "rami", pourcentage: 8.6 },
      { name: "salim", pourcentage: 0.86 },
      { name: "wissal", pourcentage: 2 },
      { name: "ilyes", pourcentage: 22 },
    ],
    services: [
      {
        name: "rep",
        numberOfEmployees: 5,
        type: SERVICE_TYPE.REPARATION,
      },
    ],
  },
  title: "JOB1",
};
function App() {
  const [datePosted, setDatePosted] = useState("anyTime");
  const [jobType, setJobType] = useState("fullTime");
  const [onsiteRemote, setOnSiteRemote] = useState("onSite");
  const [search, setSearch] = useState("");
  const [jobList, setJobList] = useState([]);
  async function executeSearch() {
    let response = await axios.get(
      `https://linkedin-data-api.p.rapidapi.com/search-jobs?keywords=${search}&datePosted=${datePosted}&jobType=${jobType}&onsiteRemote=${onsiteRemote}`,
      {
        headers: {
          "x-rapidapi-key":
            "376005f580msh398cf232769c1b0p1c6ea7jsn3edc47131b1b",
          "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
        },
      }
    );
    let resultat: Job[] = response.data.data;
    setJobList(response.data.data);
  }

  return (
    <div className="main bg-gray-900 min-h-screen p-5 ">
      <div className="search bg-gray-100 w-3/5 p-5 rounded-lg mx-auto  text-black flex items-center flex-col ">
        <h1 className="text-xl font-bold">🔍 Search</h1>
        <input
          className="outline-1 rounded-full text-center px-3 py-2 w-4/5 my-5"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="Search Job..."
        />
        <div className="filters">
          <select
            className="outline-1 rounded-full text-center px-3 py-2"
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
            className="outline-1 rounded-full text-center px-3 py-2"
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
            className="outline-1 rounded-full text-center px-3 py-2"
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
        <button
          className="bg-blue-600 rounded-full w-3/5 text-white py-2 my-4 "
          onClick={executeSearch}
        >
          Search
        </button>
      </div>

      {jobList.length === 0 ? (
        <div>No Jobs Found...</div>
      ) : (
        <div className="flex flex-row gap-5 items-center justify-center flex-wrap">
          {jobList.map((element) => {
            return <Card element={element} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
