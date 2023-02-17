import { Box } from "@mui/material";
import Header from "components/header";
import BreakdownChart from "components/nevo/breakdownChart";
import React from "react";

const Breakdown = () => {
    return (
        <Box margin="1.5rem 2.5rem">
            <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
            <Box mt="40px" height="75vh">
                <BreakdownChart />
            </Box>
        </Box>
    )
}

export default Breakdown;