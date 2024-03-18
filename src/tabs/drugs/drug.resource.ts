import { openmrsFetch } from "@openmrs/esm-framework";
import useSWR from "swr";

export function useDrugList() {
  const fetcher = async (url: string) => {
    try {
      const response = await openmrsFetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, error } = useSWR("/openmrs/ws/rest/v1/drug", fetcher);

  return {
    drugs: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
}
