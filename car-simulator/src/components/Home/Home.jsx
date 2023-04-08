import React, { useEffect, useState } from "react";
import AppLayout from "../AppLayout/AppLayout";
import styles from "./Home.module.css";
import SelectionField from "../SelectionField/SelectionField";
import Table from "../Table/Table";
import PlayGround from "../PlayGround/PlayGround";
import Buttons from "../Buttons/Buttons";
import { addVehicle, getScenario } from "../../Api/Api";
function Home() {
  const [scenarioslist, setScenariosList] = useState([]);
  const [seletedScenario, setSelectedScenario] = useState([]);
  const [simulationPlayState, setSimulationPlayState] = useState(false);
  const [editSelected, setEditSelected] = useState({});
  const columns = [
    { field: "id", header: "Vehicle Id" },
    { field: "vehicleName", header: "Vehicle Name" },
    { field: "positionX", header: "Position X" },
    { field: "positionY", header: "Position Y" },
    { field: "speed", header: "Speed" },
    { field: "direction", header: "Direction" },
  ];
  const handleOptionChange = (e) => {
    const filterScenario = scenarioslist.filter((scenario) => {
      return scenario.scenarioName === e.target.value;
    });
    setSimulationPlayState(false);
    setSelectedScenario(...filterScenario);
  };
  const handleSimulationPlayState = (e) => {
    if (e.target.value === "start simulation") {
      setSimulationPlayState(true);
    } else {
      setSimulationPlayState(false);
    }
  };
  const handleEdit = (vehicleId) => {
    const individualEdit = seletedScenario.vehicles.map((vehicle) => {
      if (vehicle.id === vehicleId) {
        setEditSelected(vehicle);
        return { ...vehicle, isEdit: true };
      }
      return vehicle;
    });
    setSelectedScenario((prevState) => {
      return { ...prevState, vehicles: individualEdit };
    });
  };
  const handleInputChange = (e, changedField) => {
    setEditSelected((state) => {
      return { ...state, [changedField]: e.target.value };
    });
  };
  const handleSave = async (vehicleId) => {
    const individualEdit = seletedScenario.vehicles.map((vehicle) => {
      if (vehicle.id === vehicleId) {
        return editSelected;
      }
      return vehicle;
    });
    let scenarioId = seletedScenario.id;
    await addVehicle(scenarioId, { vehicles: individualEdit });
    const getRes = await getScenario();
    setScenariosList(getRes);
    setSelectedScenario(getRes[seletedScenario.id - 1]);
  };
  const handelDeleteVehicle = async (vehicleId) => {
    const individualDelete = seletedScenario.vehicles.filter((vehicle) => {
      return vehicle.id !== vehicleId;
    });
    let scenarioId = seletedScenario.id;
    await addVehicle(scenarioId, { vehicles: individualDelete });
    const getRes = await getScenario();
    setScenariosList(getRes);
    setSelectedScenario(getRes[seletedScenario.id - 1]);
  };
  useEffect(() => {
    const handleapi = async () => {
      const res = await getScenario();
      setScenariosList(res);
      if (res.length !== 0) {
        setSelectedScenario(res[0]);
      }
    };
    handleapi();
  }, []);
  return (
    <AppLayout>
      <div className={styles.home}>
        <header className={styles.header}>Scenario</header>
        <SelectionField
          options={scenarioslist}
          onOptionChangeHandler={handleOptionChange}
          optionsAreArrayOfObjects={true}
          objectProperty="scenarioName"
        />
        {seletedScenario ? (
          <Table
            data={seletedScenario.vehicles}
            columns={columns}
            editButton={true}
            deleteButton={true}
            name="Vehicles"
            handleSave={handleSave}
            handleInputChange={handleInputChange}
            handleEdit={handleEdit}
            handleDelete={handelDeleteVehicle}
          />
        ) : null}
        <div className={styles.controlButtons}>
          <Buttons
            buttonName="Start Simulation"
            buttonColor="green"
            onButtonClicked={handleSimulationPlayState}
          />
          <Buttons
            buttonName="Stop Simulation"
            buttonColor="skyBlue"
            onButtonClicked={handleSimulationPlayState}
          />
        </div>

        <PlayGround
          seletedScenario={
            seletedScenario.length !== 0 ? seletedScenario : null
          }
          simulationPlayState={simulationPlayState}
        />
      </div>
    </AppLayout>
  );
}

export default Home;
