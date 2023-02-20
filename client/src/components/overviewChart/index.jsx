import React, { useMemo } from "react";
import MyResponsiveLine from "components/nevo/lineChart";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "reduxStore/api";
import { formatDataForOverview } from "utils/formatData";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    return formatDataForOverview(data, theme);
  }, [data]);

  if (!data || isLoading) return <>...Loading</>;

  return (
   
      <MyResponsiveLine
        data={view === "sales" ? totalSalesLine : totalUnitsLine}
        dashboard={isDashboard}
        view={view}
      />
    
  );
};

export default OverviewChart;
