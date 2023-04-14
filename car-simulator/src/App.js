import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AllScenarios from "./components/AllScenarios/AllScenarios";
import AddVehicle from "./components/AddVehicle/AddVehicle";
import AddScenario from "./components/AddScenario/AddScenario";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allscenarios" element={<AllScenarios />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
          <Route path="/addscenario" element={<AddScenario />} />{" "}
          {/* 
          
          <Route path="/userpage/todo/:userId" element={<UserPageToDo />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
// {
//   /* <SelectionField />
// <Table
//   data={tableData}
//   columns={columns}
//   editButton={true}
//   deleteButton={true}
//   addButton={true}
// /> */
// }
