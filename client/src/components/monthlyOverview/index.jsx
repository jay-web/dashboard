import { Box, useTheme } from "@mui/material";
import Header from "components/header";
import MyResponsiveLine from "components/nevo/lineChart";
import React, { useMemo, useState } from "react";
// import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetSalesQuery } from "reduxStore/api";
import {  formatDataForMonthlyOverview } from "utils/formatData";



const MonthlyOverview = ({ view }) => {
//   const [startDate, setStartDate] = useState(new Date("2021-02-01"));
//   const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    return formatDataForMonthlyOverview(data, theme);
  }, [data]);

  

  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="Monthly SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
       
        {data && !isLoading && (
          <MyResponsiveLine
            data={formattedData}
            dashboard={false}
            view={view}
            calender="monthly"
          />
        )}
      </Box>
    </Box>
  );
};

export default MonthlyOverview;
