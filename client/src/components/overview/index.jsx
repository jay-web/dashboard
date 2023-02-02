import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "components/header";
import OverviewChart from "components/overviewChart";
import React, { useState } from "react";
import { useGetSalesQuery } from "reduxStore/api";


const Overview = () => {
    const { data, isLoading } = useGetSalesQuery();
    const [view, setView] = useState("units");
    console.log(data);
    return (
        <Box margin="1.5rem 2.5rem">
            <Header title="OVERVIEW" subtitle="Overview of general revenue and profit" />
            <Box height="75vh">
                <FormControl sx={{ mt: "1rem"}}>
                    <InputLabel>View</InputLabel>
                    <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    )
}

export default Overview;