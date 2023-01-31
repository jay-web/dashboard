import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolBar from "components/dataGridCustomToolBar";
import Header from "components/header";
import React, { useState } from "react";
import { useGetTransactionsQuery } from "reduxStore/api";

const initialFilterState = {
    page: 0,
    pageSize: 20,
    sort: {},
    search: "",
    searchInput: ""
};

const Transactions = () => {
    const [state, setState ] = useState(initialFilterState);
    const theme = useTheme();
    const {data, isLoading} = useGetTransactionsQuery({
        page: state.page,
        pageSize: state.pageSize,
        sort: JSON.stringify(state.sort),
        search: state.search
    });

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex:1
        },
        {
            field: "userId",
            headerName: "User Id",
            flex:1
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex:1
        },
        {
            field: "products",
            headerName: "# of Products",
            flex:0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex:1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ]
    return (<Box margin="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of Transactions" />
        <Box height="80vh"
            sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.secondary[200]} !important`,
                },
              }}
            >
            <DataGrid 
                loading={isLoading}
                getRowId={(rows) => rows._id}
                rows={(data && data.transactions) || []}
                columns={columns}
                rowCount={(data && data.total) || 0}
                rowsPerPageOptions={[20, 50, 100]}
                paginations
                page={state.page}
                pageSize={state.pageSize}
                paginationMode="server"
                sortingMode="server"
                onPageChange={(newPage) => setState({...state, page:newPage }) }
                onPageSizeChange ={(newPageSize) => setState({...state, pageSize:newPageSize }) }
                onSortModelChange={(newSortModel) => setState({...state, sort: newSortModel}) }
                components={{ Toolbar: DataGridCustomToolBar }}
                componentsProps={{
                    toolbar: {state,  setState }
                }}
            />
        </Box>

    </Box>)
}

export default Transactions;