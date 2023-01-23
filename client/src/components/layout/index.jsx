import React, {useState} from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/navbar";
import SideBar from "components/sideBar";

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSideBarOpen, setIsSideBarOpen ] = useState(true);
    return (
        <Box display={ isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <SideBar 
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <Box flexGrow={1}>
                <Navbar 
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                    />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout;