import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "reduxStore/api";


const OverviewChart = ({ isDashboard = false, view}) => {
    const theme = useTheme();
    const { data, isLoading} = useGetSalesQuery();
    return (
        <div>Box</div>
    )
}

export default OverviewChart;