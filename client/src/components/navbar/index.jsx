import React, { useState } from "react";
import { AppBar, Box, Button, Icon, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';

import FlexBetween from "components/flexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "reduxStore";
import profileImage from "assets/profileImage.jpg";

const Navbar = ({
  user,
  isSideBarOpen,
  setIsSideBarOpen
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorEl, setAnchorEl ] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
            <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                <MenuIcon />
            </IconButton>
            <FlexBetween 
                backgroundcolor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
                >
                <InputBase placeholder="...search"/>
                <IconButton>
                    <Search />
                </IconButton>
            </FlexBetween>
        </FlexBetween>
        {/* Right Side */}
        <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
                {
                    theme.palette.mode === "dark"
                    ? (<DarkModeOutlined sx={{ fontSize: '25px' }} />)
                    : (<LightModeOutlined sx={{ fontSize: '25px' }} />)
                }
            </IconButton>
            <IconButton>
                    <SettingsOutlined sx={{ fontSize: '25px' }} />
            </IconButton>

            <FlexBetween>
              <Button 
              onClick={handleClick}
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem"}}
              >
                <Box 
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography

                  fontSize="0.7rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />

              </Button>
              <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>

            </FlexBetween>

        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
