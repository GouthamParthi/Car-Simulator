import React, { useEffect, useState } from "react";
import styles from "./AddVehicle.module.css";
import AppLayout from "../AppLayout/AppLayout";
import Buttons from "../Buttons/Buttons";
import SelectionField from "../SelectionField/SelectionField";
import { getScenario, addVehicle } from "../../Api/Api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function AddVehicle() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const direction = [
    { value: "towards", label: "Towards" },
    { value: "backwards", label: "Backwards" },
    { value: "upwards", label: "Upwards" },
    { value: "downwards", label: "Downwards" },
  ];
  const [scenarioslist, setScenariosList] = useState([]);
  const [seletedScenario, setSelectedScenario] = useState([]);
  const [positionXValue, setPositionXValue] = useState(0);
  const [positionYValue, setPositionYValue] = useState(0);
  const initialState = Object.freeze({
    id: "",
    vehicleName: "",
    positionX: "",
    positionY: "",
    speed: "",
    direction: "",
  });
  const [formData, updateFormData] = useState(initialState);
  const handleFormChange = (e) => {
    if (e.target.name === "positionX") {
      setPositionXValue(e.target.value);
    }
    if (e.target.name === "positionY") {
      setPositionYValue(e.target.value);
    }
    updateFormData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let seletedScenarioData = scenarioslist.filter((scenario) => {
      return scenario.scenarioName === seletedScenario;
    });
    let formDataWithId = {
      ...formData,
      id: (seletedScenarioData[0]?.vehicles.length || 0) + 1,
    };
    seletedScenarioData[0].vehicles.push(formDataWithId);
    let scenarioId = seletedScenarioData[0].id;
    let data = { vehicles: seletedScenarioData[0].vehicles };
    const res = await addVehicle(scenarioId, data);
    if (res.status === 200) {
      enqueueSnackbar("Vehicle added successfully", { variant: `success` });
    }
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
      <header className={styles.header}>Vehicle/add</header>
      <section className={styles.title}>Add Vehicle</section>
      <form onSubmit={handleSubmit}>
        <div className={styles.addVehicleForm}>
          <div className={styles.formArrangement}>
            <div>
              <h4>Scenario</h4>
              <SelectionField
                defaultPlaceholder="Select Scenario"
                onOptionChangeHandler={(e) => {
                  setSelectedScenario(e.target.value);
                }}
                options={scenarioslist}
                objectProperty="scenarioName"
              />
            </div>
            <div>
              <h4>Vehicle Name</h4>
              <input
                type="text"
                className={styles.textField}
                placeholder="Target abc"
                name="vehicleName"
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <h4>Speed</h4>
              <input
                type="number"
                className={styles.textField}
                placeholder="speed"
                name="speed"
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className={styles.formArrangement}>
            <div>
              <h4>Position X</h4>
              <h6>(Please enter a maximum value of 950px)</h6>
              <input
                type="number"
                className={
                  positionXValue <= 950
                    ? styles.textField
                    : [styles.textField, styles.error].join(" ")
                }
                placeholder="PositionX"
                name="positionX"
                onChange={handleFormChange}
                min={0}
                max={950}
                positionXValue
                required
              />
            </div>
            <div>
              <h4>Position Y </h4>
              <h6>(Please enter a maximum value of 425)</h6>
              <input
                type="number"
                className={
                  positionYValue <= 425
                    ? styles.textField
                    : [styles.textField, styles.error].join(" ")
                }
                placeholder="PositionY"
                name="positionY"
                onChange={handleFormChange}
                min={0}
                max={425}
                required
              />
            </div>
            <div>
              <h4>Direction</h4>
              <SelectionField
                defaultPlaceholder="Select Direction"
                options={direction}
                onOptionChangeHandler={handleFormChange}
                fieldName="direction"
                objectProperty="label"
              />
            </div>
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
    </AppLayout>
  );
}

export default AddVehicle;
