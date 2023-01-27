import React, {useState} from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/navbar";
import SideBar from "components/sideBar";
import { useGetUserQuery } from "reduxStore/api";
import { useSelector } from "react-redux";

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSideBarOpen, setIsSideBarOpen ] = useState(true);
    const userId = useSelector((state) => state.global.userId);
    const { data} = useGetUserQuery(userId);
    console.log("data ", userId, data)
    return (
        <Box display={ isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <SideBar 
                user={data || {} }
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <Box flexGrow={1}>
                <Navbar 
                    user={ data || {} }
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                    />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout;