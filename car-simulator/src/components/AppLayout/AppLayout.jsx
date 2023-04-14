import SideBar from "../Sidebar/Sidebar";
import styles from "./AppLayout.module.css";
function AppLayout({ children }) {
  return (
    <div className={styles.appLayout}>
      <SideBar />
      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default AppLayout;
