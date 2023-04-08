import React, { useState } from "react";
import SideBar from "../Sidebar/Sidebar";
import styles from "./AppLayout.module.css";
import ModalDelete from "../ModalDelete/ModalDelete";
function AppLayout({ children }) {
  return (
    <div className={styles.appLayout}>
      <SideBar />
      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default AppLayout;
