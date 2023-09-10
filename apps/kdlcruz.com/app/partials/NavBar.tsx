'use client'

import { Apps, ArrowBack, AssignmentInd, ContactMail, GitHub, Handyman, Home } from "@mui/icons-material"
import { AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Dialog, Divider, Drawer, IconButton, List, Link, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Toolbar, Typography } from "@mui/material"
import React, { useState } from "react"

const menuItems = [
  { listIcon: <Home color="secondary" />, listText: "Home", listPath: "/" },
  { listIcon: <AssignmentInd color="secondary" />, listText: "Resume", listPath: "/resume" },
  { listIcon: <Handyman color="secondary" />, listText: "My Tools", listPath: "/tools" },
  { listIcon: <Apps color="secondary" />, listText: "Portfolio", listPath: "/portfolio" },
  // { listIcon: <ContactMail color="secondary" />, listText: "Contact", listPath: "/contact" },
]

const StackOverflowIcon = () => (
  <SvgIcon color="secondary">
    <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z" />
  </SvgIcon>
)

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const sideList = () => (
    <Box width={250} bgcolor="#511" height="100%" component="div" zIndex={1}>
      <Avatar sx={{ width: 105, height: 105, display: 'block', margin: '0.5rem auto' }} src="../avatar.jpg" />
      <Divider />
      <List>
        {menuItems.map((item, i) => (
          <ListItemButton
            key={i}
            onClick={() => setOpen(false)}
            component={Link}
            href={item.listPath}
            color="secondary"
          >
            <ListItemIcon>
              {item.listIcon}
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Typography color="secondary">
                {item.listText}
              </Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <React.Fragment>
      <Box component="nav">
        <AppBar sx={{ position: 'static', background: '#222', margin: 0}}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
              <ArrowBack color="primary"/>
            </IconButton>
            <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1 }}>
              Discover
            </Typography>
            <Typography color="primary">Contact at kj_delacruz28@yahoo.com</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        {sideList()}
        <BottomNavigation sx={{ background: '#222', height: '55px', overflow: 'hidden' }}>
          <BottomNavigationAction href="https://github.com/kdlcruz" target="_blank" icon={<GitHub color="secondary"/>} />
          <BottomNavigationAction href="https://stackoverflow.com/users/2148468/kdlcruz" target="_blank" icon={<StackOverflowIcon/>} />
        </BottomNavigation>
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;