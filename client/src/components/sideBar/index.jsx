import { ChevronRight, ChevronRightOutlined, SettingsOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/flexBetween";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import navItems from "./navItems";

import profileImage from "assets/profileImage.jpg"

const SideBar = ({
  user,
  isNonMobile,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box margin="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    TechAveo
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronRight />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                return (
                  <ShowNavItems
                    text={text}
                    icon={icon}
                    navigate={navigate}
                    active={active}
                    setActive={setActive}
                    key={text}
                  />
                );
              })}
            </List>
          </Box>

          <Box bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" margin="1.5rem 2rem 0 3rem">
              <Box 
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography

                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>

          </Box>

        </Drawer>
      )}
    </Box>
  );
};

const ShowNavItems = ({ text, icon, navigate, active, setActive }) => {
  const theme = useTheme();

  if (!icon) {
    return (
      <Typography key={text} sx={{ margin: "2.25rem 0 1rem 3rem " }}>
        {text}
      </Typography>
    );
  }

  let lowerText = text.toLowerCase();

  return (
    <ListItem key={text} disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(`/${lowerText}`);
          setActive(lowerText);
        }}
        sx={{
          backgroundColor:
            active === lowerText ? theme.palette.secondary[300] : "transparent",
          color:
            active === lowerText
              ? theme.palette.primary[600]
              : theme.palette.primary[100],
        }}
      >
        <ListItemIcon
          sx={{
            ml: "2rem",
            color:
              active === lowerText
                ? theme.palette.primary[600]
                : theme.palette.primary[200],
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
        {active === lowerText && <ChevronRightOutlined sm={{ ml: "auto" }} />}
      </ListItemButton>
    </ListItem>
  );
};

export default SideBar;
