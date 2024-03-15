import { useSession } from "@openmrs/esm-framework";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ehrconfig-header.scss";
import EHRConfigIllustration from "./ehrconfig-illustration.component";
import { Location } from "@carbon/react/icons";
import { DatePicker, DatePickerInput } from "@carbon/react";
import dayjs from "dayjs";
import SelectedDateContext from "../hooks/selectedDateContext";
import { omrsDateFormat } from "../constants";

const EHRconfigHeader: React.FC = () => {
  const { t } = useTranslation();
  const userSession = useSession();
  const userLocation = userSession?.sessionLocation?.display;
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  return (
    <div className={styles.header}>
      <div className={styles["left-justified-items"]}>
        <EHRConfigIllustration />
        <div className={styles["page-labels"]}>
          <p>{t("ehrconfigs", "EHR configurations")}</p>
          <p className={styles["page-name"]}>Home</p>
        </div>
      </div>
      <div className={styles["right-justified-items"]}>
        <div className={styles["date-and-location"]}>
          <Location size={16} />
          <span className={styles.value}>{userLocation}</span>
          <span className={styles.middot}>&middot;</span>
          <DatePicker
            onChange={([date]) =>
              setSelectedDate(dayjs(date).startOf("day").format(omrsDateFormat))
            }
            value={dayjs(selectedDate).format("DD MMM YYYY")}
            dateFormat="d-M-Y"
            datePickerType="single"
          >
            <DatePickerInput
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                maxWidth: "10rem",
              }}
              id="appointment-date-picker"
              placeholder="DD-MMM-YYYY"
              labelText=""
              type="text"
            />
          </DatePicker>
        </div>
      </div>
    </div>
  );
};

export default EHRconfigHeader;
