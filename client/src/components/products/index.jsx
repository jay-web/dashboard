import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Header from "components/header";
import React from "react";
import { useGetProductsQuery } from "reduxStore/api";
import Product from "../product/index";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box margin="1.5rem 2rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {data || !isLoading ? (
        <Box
          marginTop="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {data.map(
            (pro) => (
              <Product
                key={pro._id}
                singleProduct={pro}
              />
            )
          )}
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Products;
