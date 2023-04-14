import React from "react";
import styles from "./Vehicles.module.css";
function Vehicles({ seletedScenario, simulationPlayState }) {
  const animationDuration = [];
  for (let i = 20; i >= 1; i--) {
    animationDuration.push(i);
  }

  if (simulationPlayState === true) {
    document.documentElement.style.setProperty("--simulation", `running`);
    setTimeout(() => {
      document.documentElement.style.setProperty("--simulation", `paused`);
    }, seletedScenario.scenarioTime * 1000);
  } else {
    document.documentElement.style.setProperty("--simulation", `paused`);
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
                    animationDuration[vehicle.speed]
                      ? animationDuration[vehicle.speed - 1]
                      : 20
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
