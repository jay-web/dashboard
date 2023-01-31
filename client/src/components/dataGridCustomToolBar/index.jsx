import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import FlexBetween from "components/flexBetween";
import React from "react";


const DataGridCustomToolBar = ({ state, setState }) => {
    return (
        <GridToolbarContainer >
            <FlexBetween width="100%">
                <FlexBetween >
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />

                </FlexBetween>
                <TextField 
                    label="Search by User Id"
                    sx={{ marginBottom:"0.5rem", width:"15rem"}}
                    onChange={(e) => setState({...state, searchInput: e.target.value})}
                    value={state.searchInput}
                    variant="standard"
                    InputProps={
                        { endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={(() => {
                                        setState({...state, search: state.searchInput, searchInput: "" })
                                    
                                    })}
                                >
                                    <Search />
                                </IconButton>
                                
                            </InputAdornment>
                        )}
                    }
                />
            </FlexBetween>
        </GridToolbarContainer>
    )
}

export default DataGridCustomToolBar;