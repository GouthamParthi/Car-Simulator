import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SideBar = () => {
  const currentPageName = useLocation().pathname.split("/");
  return (
    <div className={styles.sideBar}>
      <Link className={styles.link} to={`/`}>
        <button
          className={
            currentPageName[1] !== ""
              ? `${styles.button}`
              : [styles.button, styles.active].join(" ")
          }
        >
          Home
        </button>
      </Link>

      <Link className={styles.link} to={`/addscenario`}>
        <button
          className={
            currentPageName[1] !== "addscenario"
              ? `${styles.button}`
              : [styles.button, styles.active].join(" ")
          }
        >
          Add Scenario
        </button>
      </Link>

      <Link className={styles.link} to={`/allscenarios`}>
        <button
          className={
            currentPageName[1] !== "allscenarios"
              ? `${styles.button}`
              : [styles.button, styles.active].join(" ")
          }
        >
          All Scenarios
        </button>
      </Link>

      <Link className={styles.link} to={`/addvehicle`}>
        <button
          className={
            currentPageName[1] !== "addvehicle"
              ? `${styles.button}`
              : [styles.button, styles.active].join(" ")
          }
        >
          Add Vehicle
        </button>
      </Link>
    </div>
  );
};
export default SideBar;
