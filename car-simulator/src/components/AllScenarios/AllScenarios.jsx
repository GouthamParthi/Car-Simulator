import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import styles from "./AllScenarios.module.css";
import Buttons from "../Buttons/Buttons";
import Table from "../Table/Table";
import { deleteScenario, getScenario, saveScenario } from "../../Api/Api";
import ModalDelete from "../ModalDelete/ModalDelete";
function AllScenarios() {
  const [tableData, setTableData] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [editSelected, setEditSelected] = useState({});
  const columns = [
    { field: "id", header: "Scenario Id" },
    { field: "scenarioName", header: "Scenario Name" },
    { field: "scenarioTime", header: "Scenario Time" },
    { field: "vehicles", header: "Number of Vehicles" },
  ];
  const handelDeleteAllScenario = () => {
    tableData.forEach(async (scenario) => {
      let scenarioId = scenario.id;
      const res = await deleteScenario(scenarioId);
      setTableData(res);
    });
  };
  const handelDeleteScenario = async (scenarioId) => {
    await deleteScenario(scenarioId);
    const getRes = await getScenario();
    setTableData(getRes);
  };
  const handlemodal = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };
  const handleEdit = (scenarioid) => {
    const individualEdit = tableData.map((scenario) => {
      if (scenario.id === scenarioid) {
        setEditSelected(scenario);
        return { ...scenario, isEdit: true };
      }
      return scenario;
    });
    setTableData(individualEdit);
  };
  const handleInputChange = (e, changedField) => {
    setEditSelected((state) => {
      return { ...state, [changedField]: e.target.value };
    });
  };
  const handleSave = async (scenarioid) => {
    await saveScenario(scenarioid, editSelected);
    const getRes = await getScenario();
    setTableData(getRes);
  };
  useEffect(() => {
    const handleapi = async () => {
      const res = await getScenario();
      setTableData(res);
    };
    handleapi();
  }, [showmodal]);

  return (
    <div>
      <ModalDelete
        handleDelete={handelDeleteAllScenario}
        show={showmodal}
        handlemodal={handlemodal}
      />
      <AppLayout>
        <div className={styles.titleAndControlButtons}>
          <header className={styles.header}>All Scenarios</header>
          <div className={styles.controlButtons}>
            <Link to={"/addscenario"}>
              <Buttons buttonName="New Scenario" buttonColor="skyBlue" />
            </Link>
            <Link to={"/addvehicle"}>
              <Buttons buttonName="Add Vehicle" buttonColor="green" />
            </Link>
            <Buttons
              buttonName="Delete All"
              buttonColor="orange"
              onButtonClicked={handlemodal}
            />
          </div>
        </div>
        {tableData ? (
          <Table
            data={tableData.length > 0 ? tableData : null}
            columns={columns}
            editButton={true}
            deleteButton={true}
            addButton={true}
            name="Scenarios"
            handleDelete={handelDeleteScenario}
            handleEdit={handleEdit}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
          />
        ) : null}
      </AppLayout>
    </div>
  );
}

export default AllScenarios;
