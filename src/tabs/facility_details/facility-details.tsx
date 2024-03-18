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
  TextArea,
} from "@carbon/react";
import { formatDate, parseDate, usePagination } from "@openmrs/esm-framework";

export const FacilityDetails: React.FC = () => {
  const { t } = useTranslation();
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Placeholder for workListEntries
  const workListEntries = [];
  // Placeholder for isLoading
  const isLoading = false;

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
    { id: 0, header: t("category", "Drug Category"), key: "category" },
    { id: 1, header: t("description", "Description"), key: "description" },
  ];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div>
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
                    Add drug Category
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {rows.map((row) => (
                      <TableHeader {...getHeaderProps({ row })}>
                        {row.cells[0].value}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {headers.map((header) => (
                    <TableRow>
                      {rows.map((row) => (
                        <TableCell key={row.cells[header.id].id}>
                          {row.cells[header.id].value}
                        </TableCell>
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
        primaryButtonText="Add drug category"
        secondaryButtonText="Cancel"
        open={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalLabel="Add drug category"
        modalHeading="Drug Category"
      >
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Drug Category Name*"
          placeholder="Enter your Drug Category Name"
          required
          style={{
            marginBottom: "1rem",
          }}
        />
        <TextArea
          labelText="Drug Category Description*"
          rows={4}
          id="text-area-1"
          required
        />
      </Modal>
    </div>
  );
};
