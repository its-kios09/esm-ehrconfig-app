/* eslint-disable no-console */
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTable,
  DataTableSkeleton,
  Pagination,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  TextInput,
  Modal,
  Select,
  ComboBox,
  SelectItem,
  TextArea,
} from "@carbon/react";
import { formatDate, parseDate, usePagination } from "@openmrs/esm-framework";
import { CardHeader } from "@openmrs/esm-patient-common-lib";

export const NewFormulation: React.FC = () => {
  const { t } = useTranslation();
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const headerTitle = t("formulation", "NEW FORMULATION");

  // Placeholder for workListEntries
  const workListEntries = [];
  // Placeholder for isLoading
  const isLoading = false;
  const filterItems = (menu) => {
    return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
  };

  const searchResults = workListEntries.filter((item) => {
    return item.action === "NEW" && item.status === "DECLINED";
  });

  const {
    goTo,
    results: paginatedResults,
    currentPage,
  } = usePagination(searchResults, currentPageSize);

  const pageSizes = [10, 20, 30, 40, 50];

  const rows = useMemo(() => {
    return paginatedResults.map((entry) => ({
      ...entry,
      //TODO: add action items here
    }));
  }, [paginatedResults]);

  const tableColums = [
    { id: 0, header: t("id", "ID"), key: "id" },
    { id: 1, header: t("Formulation", "FORMULATIONS"), key: "Formulation" },
    { id: 2, header: t("dose", "DOSAGE"), key: "dose" },
    { id: 3, header: t("description", "DESCRIPTION"), key: "description" },
  ];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div>
      <CardHeader title={headerTitle} children={""}></CardHeader>
      <DataTable
        rows={rows}
        headers={tableColums}
        useZebraStyles
        overflowMenuOnHover={true}
        isSortable
      >
        {({
          rows,
          headers,
          getTableProps,
          getHeaderProps,
          getRowProps,
          getTableContainerProps,
        }) => (
          <>
            <TableContainer {...getTableContainerProps()}>
              {" "}
              <TableToolbar
                style={{
                  position: "static",
                  height: "1rem",
                  overflow: "visible",
                  margin: 0,
                  // TODO: add background color to the toolbar
                }}
              >
                <TableToolbarContent style={{ margin: 0 }}>
                  <TableToolbarSearch
                    style={{
                      backgroundColor: "#f4f4f4",
                    }}
                    onChange={(event) => setSearchString(event.target.value)}
                  />
                  <Button onClick={() => setIsModalOpen(true)}>
                    ADD NEW FORMULATIONS
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                forwardText="Next page"
                backwardText="Previous page"
                page={currentPage}
                pageSize={currentPageSize}
                pageSizes={pageSizes}
                totalItems={workListEntries.length}
                onChange={({ pageSize, page }) => {
                  if (pageSize !== currentPageSize) {
                    setCurrentPageSize(pageSize);
                  }
                  if (page !== currentPage) {
                    goTo(page);
                  }
                }}
              />
            </TableContainer>
          </>
        )}
      </DataTable>
      <style>
        {`.cds--modal-close-button {
          display: none;
        }`}
      </style>
      <Modal
        primaryButtonText="ADD NEW FORMULATIONS"
        secondaryButtonText="CANCEL"
        open={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalLabel="ADD NEW FORMULATIONS"
        modalHeading="FORMULATIONS"
        hasScrollingContent
      >
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Formulation*"
          placeholder="Enter your Formulation"
          required
          style={{
            marginBottom: "1rem",
          }}
        />
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Dosage*"
          placeholder="Enter your Dosage"
          required
          style={{
            marginBottom: "1rem",
          }}
        />
        <TextArea labelText="Description*" rows={4} id="text-area-1" required />
      </Modal>
    </div>
  );
};
