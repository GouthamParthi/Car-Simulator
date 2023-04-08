import React, { useEffect, useState } from "react";
import styles from "./AddScenario.module.css";
import AppLayout from "../AppLayout/AppLayout";
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { createNewScenario, getScenario } from "../../Api/Api";
import { enqueueSnackbar, useSnackbar } from "notistack";
function AddScenario() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = Object.freeze({
    id: "",
    scenarioName: "",
    scenarioTime: "",
    vehicles: [],
  });
  const [scenarioslist, setScenariosList] = useState([]);
  const [formData, updateFormData] = useState(initialState);

  const handleFormChange = (e) => {
    updateFormData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formDataWithId = {
      ...formData,
      id: (scenarioslist.length || 0) + 1,
    };
    scenarioslist.push(formDataWithId);
    const res = await createNewScenario(formDataWithId);
    
      enqueueSnackbar("Scenario added successfully", { variant: `success` });
    
  };
  useEffect(() => {
    const handleapi = async () => {
      const res = await getScenario();
      setScenariosList(res);
    };
    handleapi();
  }, []);
  return (
    <AppLayout>
      <div className={styles.addScenario}>
        <header className={styles.header}>Scenario/add</header>
        <header className={styles.title}>Add Scenario</header>
        <form onSubmit={handleSubmit}>
          <div className={styles.addScenarioForm}>
            <div>
              <h4>Scenario Name</h4>
              <input
                type="text"
                className={styles.textField}
                placeholder="Scenario"
                name="scenarioName"
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <h4>Scenario Time</h4>
              <input
                type="number"
                className={styles.textField}
                placeholder="Time"
                name="scenarioTime"
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className={styles.controlButtons}>
            <Buttons buttonColor="green" buttonName="Add" type="submit" />
            <Buttons buttonColor="orange" buttonName="Reset" type="reset" />
            <Buttons
              buttonColor="skyBlue"
              buttonName="Go Back"
              onButtonClicked={() => navigate(-1)}
            />
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

export default AddScenario;
