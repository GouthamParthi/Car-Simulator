import React from "react";
import styles from "./Vehicles.module.css";
function Vehicles({ seletedScenario, simulationPlayState }) {
  const maxVehicleSpeed = 30;
  const maxXPosition = 950;
  const maxYPosition = 425;
  const scenarioTime = seletedScenario.scenarioTime;
  let timeout;

  if (simulationPlayState === true) {
    document.documentElement.style.setProperty("--simulation", `running`);
    timeout = setTimeout(() => {
      document.documentElement.style.setProperty("--simulation", `paused`);
    }, scenarioTime * 1000);
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
                    vehicle.positionX <= maxXPosition
                      ? vehicle.positionX
                      : maxXPosition
                  }px ${
                    vehicle.positionY <= maxYPosition
                      ? vehicle.positionY
                      : maxXPosition
                  }px`,
                  animationDuration: `${
                    vehicle.speed <= maxVehicleSpeed
                      ? maxVehicleSpeed - vehicle.speed + 1
                      : 1
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
