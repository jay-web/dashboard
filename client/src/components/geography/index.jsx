import { Box, useTheme } from "@mui/material";
import Header from "components/header";
import React from "react";
import { useGetGeographyQuery } from "reduxStore/api";
import MyResponsiveChoropleth from "components/nevo/chropleth";

const Geography = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetGeographyQuery();
    console.log(data);
    return (
        <Box margin="1.5rem 2.5rem">
            <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
            <Box
                mt="40px"
                height="75vh"
                // border={`1px solid ${theme.palette.secondary[200]}`}
                borderRadius="4px"
            >
                {data ? (
                    <MyResponsiveChoropleth data={data}/>
                ) : <>Loading ...</>}
            </Box>
        </Box>
    )
}

export default Geography;