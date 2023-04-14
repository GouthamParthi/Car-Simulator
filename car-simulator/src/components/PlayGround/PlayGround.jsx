import styles from "./PlayGround.module.css";
import Vehicles from "../Vehicles/Vehicles";
function PlayGround({ seletedScenario, simulationPlayState }) {
  return (
    <div className={styles.playGround}>
      {seletedScenario ? (
        <Vehicles
          seletedScenario={seletedScenario}
          simulationPlayState={simulationPlayState}
        />
      ) : null}
      <div className={styles.verticalLines}>
        {(() => {
          let verticalLines = [];
          for (let i = 0; i < 17; i++) {
            verticalLines.push(
              <div className={styles.verticalLine} key={i}></div>
            );
          }
          return verticalLines;
        })()}
      </div>
      <div>
        {(() => {
          let horizontalLines = [];
          for (let i = 0; i < 9; i++) {
            horizontalLines.push(
              <div
                className={styles.horizontalLine}
                style={{ top: `${i * 56.1}px` }}
                key={i}
              ></div>
            );
          }
          return horizontalLines;
        })()}
      </div>
    </div>
  );
}

export default PlayGround;
