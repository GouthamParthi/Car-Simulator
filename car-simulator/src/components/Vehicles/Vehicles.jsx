import React from "react";
import styles from "./Vehicles.module.css";
function Vehicles({ seletedScenario, simulationPlayState }) {
  let timeout;

  if (simulationPlayState === true) {
    document.documentElement.style.setProperty("--simulation", `running`);
    timeout = setTimeout(() => {
      document.documentElement.style.setProperty("--simulation", `paused`);
    }, seletedScenario.scenarioTime * 1000);
  } else {
    document.documentElement.style.setProperty("--simulation", `paused`);
    clearTimeout(timeout);
  }
  return (
    <div className={styles.vehicles}>
      {seletedScenario
        ? seletedScenario.vehicles.map((vehicle, i) => {
            return (
              <div
                className={[
                  styles[`oneOfTheVehicles`],
                  styles[vehicle.direction],
                  styles["simulationplay"],
                ].join(" ")}
                key={i}
                style={{
                  translate: `${
                    vehicle.positionX <= 950 ? vehicle.positionX : 950
                  }px ${vehicle.positionY <= 425 ? vehicle.positionY : 425}px`,
                  animationDuration: `${
                    vehicle.speed <= 30 ? 30 - vehicle.speed + 1 : 1
                  }s`,
                }}
              >
                {vehicle.id}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Vehicles;
