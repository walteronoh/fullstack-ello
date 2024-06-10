import React from 'react';
import './App.css';
import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText, AppBar, Button, CssBaseline, Drawer, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AppLogo from './components/shared/app_logo/AppLogo';

interface Props {
  element?: React.ReactNode;
}

function App(props: Props) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [{ text: 'Books', path: '/' }, { text: 'Reading List', path: '/reading-list' }];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleRedirect = (path: string) => {
    navigate(path);
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <AppLogo />
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleRedirect(item.path)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <CssBaseline />
      <AppBar component="nav" color='inherit' sx={{ boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <AppLogo />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, i) => (
              <Button key={i} onClick={() => handleRedirect(item.path)}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
      {props.element}
    </Box>
  );
}

export default App;
