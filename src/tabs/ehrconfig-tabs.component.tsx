import React from "react";
import { TabPanels, TabList, Tabs, Tab } from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./ehrconfig-tabs.scss";

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
            {t("drug-category", "Drug categories")}
          </Tab>
          <Tab className={styles.tab}>
            {t("drug-formulations", "Drug and formulations")}
          </Tab>
          <Tab className={styles.tab}>
            {t("add-formulation-to-drug", "Add formulation to drug")}
          </Tab>
          <Tab className={styles.tab}>{t("morgue-units", "Morgue units")}</Tab>
          <Tab className={styles.tab}>{t("ipd-wards", "IPD wards")}</Tab>
        </TabList>
      </Tabs>
    </main>
  );
};
