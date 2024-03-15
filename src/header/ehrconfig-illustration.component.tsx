import React from "react";
import { SettingsServices } from "@carbon/react/icons";
import styles from "./ehrconfig-header.scss";

const EHRConfigIllustration: React.FC = () => {
  return (
    <div className={styles.svgContainer}>
      <SettingsServices className={styles.iconOverrides} />
    </div>
  );
};

export default EHRConfigIllustration;
