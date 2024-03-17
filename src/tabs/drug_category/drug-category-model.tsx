import React from "react";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./drug-category.scss";

interface DrugCatergoryModalProps {
  closeModal: () => void;
}

const DrugCatergoryModal: React.FC<DrugCatergoryModalProps> = ({
  closeModal,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <ModalHeader
        closeModal={closeModal}
        title={t("radiologyInstructions", "Procedure Order Instructions")}
      />
      <ModalBody>
        <div className={styles.modalBody}>
          <section className={styles.section}></section>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          {t("cancel", "Cancel")}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default DrugCatergoryModal;
