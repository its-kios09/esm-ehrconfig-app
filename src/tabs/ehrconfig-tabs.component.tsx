import React from "react";
import { TabPanels, TabPanel, TabList, Tabs, Tab } from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./ehrconfig-tabs.scss";
import { DrugCategory } from "./drug_category/drug-category.component";
import { FacilityDetails } from "./facility_details/facility-details";
import { NewDrug } from "./drugs/drug";
import { NewFormulation } from "./formulations/formulations";
import { AddFormulationToDrug } from "./add_formulation_drug/add-formulation-drug";

export const EHRConfigTabs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Tabs className={styles.tabs}>
        <TabList className={styles.tablist} aria-label="List tabs" contained>
          <Tab className={styles.tab}>
            {t("facility-details", "Facility details")}
          </Tab>
          <Tab className={styles.tab}>
            {t("drug-category", "Add New Drug category")}
          </Tab>
          <Tab className={styles.tab}>{t("drug", "Add New Drugs")}</Tab>
          <Tab className={styles.tab}>
            {t("new-formulations", "Add New Formulations")}
          </Tab>
          <Tab className={styles.tab}>
            {t("add-formulation-to-drug", "Add formulation to drug")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FacilityDetails />
          </TabPanel>
          <TabPanel>
            <DrugCategory />
          </TabPanel>
          <TabPanel>
            <NewDrug />
          </TabPanel>
          <TabPanel>
            <NewFormulation />
          </TabPanel>
          <TabPanel>
            <AddFormulationToDrug />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  );
};
