import { Box, useTheme } from "@mui/material";
import Header from "components/header";
import MyResponsiveLine from "components/nevo/lineChart";
import React, { useMemo, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetSalesQuery } from "reduxStore/api";
import { formatDataForDailyOverview } from "utils/formatData";

import "./style.css";

const DailyOverview = ({ view }) => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    return formatDataForDailyOverview(data, theme, startDate, endDate);
  }, [data, startDate, endDate]);

  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}>
            What is your favorite day?
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
            <Box marginRight="1.5rem">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            calendarContainer={MyContainer}
          />
          </Box>
          <Box>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
          </Box>
        </Box>
        {data && !isLoading && (
          <MyResponsiveLine
            data={formattedData}
            dashboard={false}
            view={view}
          />
        )}
      </Box>
    </Box>
  );
};

export default DailyOverview;
