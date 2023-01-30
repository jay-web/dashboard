import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/header";
import React, { useState } from "react";
import { useGetTransactionsQuery } from "reduxStore/api";

const initialFilterState = {
    page: 0,
    pageSize: 20,
    sort: {},
    search: ""
};

const Transactions = () => {
    const [state, setState ] = useState(initialFilterState);
    
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
        <Box height="80vh">
            <DataGrid 
                loading={isLoading}
                getRowId={(rows) => rows._id}
                rows={(data && data.transactions) || []}
                columns={columns}
                rowCount={(data && data.total) || 0}
                paginations
                page={state.page}
                pageSize={state.pageSize}
                paginationMode="server"
                sortingMode="server"
                onPageChange={(newPage) => setState({...state, page:newPage }) }
                onPageSizeChange ={(newPageSize) => setState({...state, pageSize:newPageSize }) }
                onSortModelChange={(newSortModel) => setState({...state, sort: newSortModel}) }
                
            />
        </Box>

    </Box>)
}

export default Transactions;