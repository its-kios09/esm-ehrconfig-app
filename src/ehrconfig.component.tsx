import React from "react";
import EHRconfigHeader from "./header/ehrconfig-header.component";

const Ehrconfig: React.FC = () => {
  return (
    <div className={`omrs-main-content`}>
      <EHRconfigHeader />
    </div>
  );
};

export default Ehrconfig;
