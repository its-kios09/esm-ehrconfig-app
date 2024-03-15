import React from "react";
import EHRconfigHeader from "./header/ehrconfig-header.component";
import { EHRConfigTabs } from "./tabs/ehrconfig-tabs.component";

const Ehrconfig: React.FC = () => {
  return (
    <div className={`omrs-main-content`}>
      <EHRconfigHeader />
      <EHRConfigTabs />
    </div>
  );
};

export default Ehrconfig;
